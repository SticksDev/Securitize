import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Swal from 'sweetalert2'
import packagejson from '../../../package.json'
import config from '../../config.json'



const useStyles = makeStyles({
  root: {
    minWidth: 275,
    color: "darkslategray",
  },
  title: {
    fontSize: 14,
    color: "darkslategray"
  },
  pos: {
    marginBottom: 12,
    color: "darkslategray"
  },
});

export default function SimpleCard() {
  const classes = useStyles();
  const [APIversion, setAPIVersion] = useState(null)
  const [KeyCount, setKeyCount] = useState(null)
  const [LastUpdated, setLastUpdated] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [textBoxContent, setTextBoxContent] = useState("")
  const [textBoxContent2, setTextBoxContent2] = useState("")

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false)
  };

  //TODO: HOUSKEEPING: Refactor this shit lmao (TECHINCAL DEBT)
  React.useEffect(() => {
    fetch(`http://${config.backendip}:${config.backendport}/api/process/version`).then((response) => response.json()).then((response) => {
      console.log()
      if (!response) {
        setAPIVersion("Could Not Fetch API Version")
      } else {
        setAPIVersion(response.message)
      }
    })
    fetch(`http://${config.backendip}:${config.backendport}/api/process/keycount`).then((response) => response.json()).then((response) => {
      if (!response) {
        setKeyCount("Could Not Fetch KeyCount")
      } else {
        setKeyCount(response.message)
      }
    })
    fetch(`http://${config.backendip}:${config.backendport}/api/process/keylist`).then((response) => response.json()).then((response) => {
      if (!response) {
        setLastUpdated("Could Not Fetch LastUpdated")
      } else {
        if (response.lastupdated === null) {
          setLastUpdated("Create a key to get the last updated time!")
        } else {
          setLastUpdated(response.lastupdated)
        }
      }
    })
  }, [])
  function sendtoapi(action, data) {
    if(action === "add") {
      fetch(`http://${config.backendip}:${config.backendport}/api/process/addkey?key=${data}`).then((response) => response.json()).then((response) => {
          if (response.complete === "true") {
            setOpen(false)
            Swal.fire({
              title: 'Key Added',
              text: `Sucess! You can acess your key at ${config.backendip}:${config.backendport}/api/process/keys?key=nameofnewkeyhere. The page will now refresh.`,
              icon: 'success',
              onClose: () => {
                window.location.reload()
              }
            })
          } else {
            setOpen(false)
            Swal.fire({
              title: 'Error!',
              text: 'Could not create. Please Check Logs. The page will now refresh.',
              icon: 'error',
              confirmButtonText: 'OK',
              onClose: () => {
                window.location.reload()
              }
            })
          }
        })
    }else if (action === "remove") {
      fetch(`http://${config.backendip}:${config.backendport}/api/process/removekey?key=${data}`).then((response) => response.json()).then((response) => {
          if (response.complete === "true") {
            setOpen(false)
            Swal.fire({
              title: 'Key Removed',
              text: `Key was removed from keysdb. The page will now refresh.`,
              icon: 'success',
              onClose: () => {
                window.location.reload()
              }
            })
          } else {
            setOpen(false)
            Swal.fire({
              title: 'Error!',
              text: 'Could not create. Please Check Logs. The page will now refresh.',
              icon: 'error',
              confirmButtonText: 'OK',
              onClose: () => {
                window.location.reload()
              }
            })
          }
        })
    }
  }
  return (<div>
    <Card className={classes.root} variant="outlined" style={{ float: "left !important" }}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          System - Stats
        </Typography>
        <Typography variant="h5" component="h2">
          Current Stats
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Last Updated on {LastUpdated}
        </Typography>
        <Typography variant="body2" component="p" align="right">
          <span style={{ display: 'inline-block' }}>
            <ul style={{ listStyleType: 'none', textAlign: 'left' }}>
              <li>Keys: {KeyCount} </li>
              <li>API Version: {APIversion} </li>
              <li>Frontend Version: React {packagejson.dependencies.react}, running Material-UI {packagejson.dependencies['@material-ui/core']}</li>
            </ul>
          </span>
        </Typography>
      </CardContent>
      <CardActions>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          New Action..
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => {setAnchorEl(false)}}
        >
          <MenuItem onClick={() => { setAnchorEl(false); setOpen(true) }}>Create Key</MenuItem>
          <MenuItem onClick={() => { setAnchorEl(false); setOpen1(true) }}>Remove Key</MenuItem>
          <MenuItem onClick={() => {window.location.reload()}}>Reload</MenuItem>
        </Menu>
      </CardActions>
    </Card>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add New Key To DB</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the key you would like to add.
          </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Enter key here..."
          type="password"
          onChange={(event) => setTextBoxContent(event.currentTarget.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
          </Button>
        <Button onClick={() => { sendtoapi("add", textBoxContent) }} color="primary">
          Add Key
          </Button>
      </DialogActions>
    </Dialog>
    <Dialog open={open1} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Remove Key From DB</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the key you would like to REMOVE, CASE SENTIVE!
          </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Enter key here..."
          type="password"
          onChange={(event) => setTextBoxContent2(event.currentTarget.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { setOpen1(false) }} color="primary">
          Cancel
          </Button>
        <Button onClick={() => { sendtoapi("remove", textBoxContent2) }} color="primary">
          Delete Key
          </Button>
      </DialogActions>
    </Dialog>
  </div>
  );
}
