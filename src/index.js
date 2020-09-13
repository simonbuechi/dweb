import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import theme from "./style/theme";
import "./i18n/i18n";
//import * as serviceWorker from "./serviceWorker";
//import bgvideo from "./assets/bgvideo.mp4";
/*
      <video autoPlay loop muted id="myVideo">
        <source src={bgvideo} type="video/mp4" />
      </video>
*/
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router basename="/">
      <CssBaseline />

      <App />
    </Router>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
