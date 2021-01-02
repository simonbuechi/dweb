import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import theme from "./style/theme";
import "./i18n/i18n";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router basename="/">
      <CssBaseline />
      <App />
    </Router>
  </ThemeProvider>,
  document.getElementById("root")
);
