import React from "react"
import Loader from "react-loader-spinner";
import DashHome from "./dashhome.js"

function App() {
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        const handle = window.setTimeout(() => {
            setLoaded(true);
        }, 3000);

        return () => { window.clearTimeout(handle); }
    })
    const loaders = ["Audio"
        , "BallTriangle"
        , "Bars"
        , "Circles"
        , "Grid"
        , "Hearts"
        , "Oval"
        , "Puff"
        , "Rings"
        , "TailSpin"
        , "ThreeDots"
        , "Watch"
        , "RevolvingDot"
        , "MutatingDots"
        , "CradleLoader"]
    const randomloader = Math.floor(Math.random() * loaders.length)
    return (
        <div style={{ textAlign: "center", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          {!loaded ? <Loader type={loaders[randomloader]} color="#00BFFF" height={100} width={100} /> : <DashHome />}
        </div>
      );
}

export default App;
