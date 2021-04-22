import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    color: "darkslategray"
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

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          System - Stats
        </Typography>
        <Typography variant="h5" component="h2">
          Current Stats
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Last Updated on xx:xx
        </Typography>
        <Typography variant="body2" component="p" align="right">
          Keys: x
          API Version: x.x.x
          Frontend Version: React xx.x.x, running Material-UI vx.xx.x
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}