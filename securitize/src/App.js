import {
  BrowserRouter as Router,
  Switch,
  Route,
  // eslint-disable-next-line
  Link
} from "react-router-dom";
import Dash from "./pages/dash"
import Particles from './particals';

const styles = {
  root: {
    fontFamily: "sans-serif",
    color: "white",
    textAlign: "center",
    height: "100%",
    background: "#222",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.33
  }
};


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dash">
          <Dash />
        </Route>
        <Route path="/">
          <script src="https://cdn.rawgit.com/progers/pathseg/master/pathseg.js"></script>
          <div id="particles-js"></div>
          <div style={styles.root}>
            <p>If you see this page, the Securitize server is successfully installed and
          working. To acess the GUI, please go to /dash </p>
          </div>
          <Particles/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
