import React, {Suspense, lazy} from "react";
import ReactDOM from "react-dom";
import theme from "./style/theme";
import "./i18n/i18n";
import SplashScreen from "./structure/SplashScreen"
import * as serviceWorker from "./serviceWorker";
//lazy load
const ThemeProvider = lazy(() => import("./utils/ThemeProvider"));
const Router = lazy(() => import("./utils/Router"));
const App = lazy(() => import("./App"));
const CssBaseline = lazy(() => import( "@material-ui/core/CssBaseline"));

ReactDOM.render(
    <Suspense fallback={<SplashScreen />}>
      <ThemeProvider theme={theme}>
    <Router basename="/">
    <CssBaseline />
      <App />
      </Router>
  </ThemeProvider>
      </Suspense>
    ,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
