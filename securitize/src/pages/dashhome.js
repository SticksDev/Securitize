import React from "react"
import { CAlert, CFooter, CLink } from '@coreui/react';

function App() {
    return (<CFooter>
        <div>
          <CAlert color="primary">Welcome to </CAlert>
          <CLink href="https://coreui.io">CoreUI</CLink>
          <span>&copy; 2020 creativeLabs.</span>
        </div>
        <div>
          <span>Powered by</span>
          <CLink href="https://coreui.io">CoreUI</CLink>
        </div>
        </CFooter>
 )     
}

export default App;
