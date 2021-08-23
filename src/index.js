import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import theme from "./style/theme";
import "./i18n/i18n";
import SplashScreen from "./structure/SplashScreen";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
//import reportWebVitals from './reportWebVitals';
//lazy load
const ThemeProvider = lazy(() => import("./utils/ThemeProvider"));
const Router = lazy(() => import("./utils/Router"));
const App = lazy(() => import("./App"));
const CssBaseline = lazy(() => import("@material-ui/core/CssBaseline"));

ReactDOM.render(
  <Suspense fallback={<SplashScreen />}>
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <App />
      </Router>
    </ThemeProvider>
  </Suspense>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
//reportWebVitals(console.log);