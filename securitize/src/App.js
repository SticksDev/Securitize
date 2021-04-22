import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Dash from "./pages/dash"


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dash">
            <Dash/>
        </Route>
        <Route path="/">
          <div>
          <h1>Welcome to Securitize!</h1>
          <p>If you see this page, the Securitize server is successfully installed and
          working. Please see the readme.md for more info, in the docker container</p>
          <p><em>Thank you for using Securitize.</em></p>
          </div>
        </Route>
      </Switch>
    </Router>
)}

export default App;
