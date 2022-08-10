import React, { Component } from "react";
import CircularProgress from "@mui/material/CircularProgress";

class SplashScreen extends Component {
  render() {
    const styleWrapper = {
      textAlign: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    };
    /*
    const styleDiv  = {
      backgroundImage: "linear-gradient(90deg, #a1887f, #bcaaa4 )",
      borderRadius: "50%",
      width: 200,
      height: 200,
      margin: "0 auto",
      display: "flex",
    }
    const styleSvg = {
      fill: "#ffffff",
      display: "block",
      margin: "auto auto",
    }
    <div style={styleDiv}>
          <svg viewBox="0 0 24 24" width="60%" height="60%" style={styleSvg}>
            <rect x="3.05" y="15.18" width="18.31" height="1.77" transform="translate(-3.37 3.24) rotate(-13.32)" />
            <rect x="14.79" y="0.34" width="4.42" height="12.36" transform="translate(-1.05 4.09) rotate(-13.32)" />
            <rect x="8.08" y="1.97" width="4.42" height="12.36" transform="translate(-1.6 2.59) rotate(-13.32)" />
            <rect x="1.36" y="3.55" width="4.42" height="12.36" transform="translate(-2.15 1.09) rotate(-13.32)" />
            <path d="M4,20A10.4,10.4,0,0,0,14,23.82a10.4,10.4,0,0,0,7.42-7.94Z" />
          </svg>
        </div>
    */

    return (
      <div style={styleWrapper}>
        <CircularProgress color="primary" />
        <p>Loading...</p>
      </div>
    );
  }
}

export default SplashScreen;
