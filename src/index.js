import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import theme from "./style/theme";
import "./i18n/i18n";
import SplashScreen from "./structure/SplashScreen";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
//import reportWebVitals from './reportWebVitals';
//lazy load
const ThemeProvider = lazy(() => import("./utils/ThemeProvider"));
const Router = lazy(() => import("./utils/Router"));
const App = lazy(() => import("./App"));
const CssBaseline = lazy(() => import("@mui/material/CssBaseline"));

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Suspense fallback={<SplashScreen />}>
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <App />
      </Router>
    </ThemeProvider>
  </Suspense>
);

serviceWorkerRegistration.register();
//reportWebVitals(console.log);
