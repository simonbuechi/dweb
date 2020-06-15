import React, { useEffect } from "react";
import * as serviceWorker from "../serviceWorker";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const ServiceWorkerWrapper = () => {
  const [showReload, setShowReload] = React.useState(false);
  const [waitingWorker, setWaitingWorker] = React.useState(null);

  const onSWUpdate = (registration) => {
    setShowReload(true);
    setWaitingWorker(registration.waiting);
  };

  useEffect(() => {
    serviceWorker.register({ onUpdate: onSWUpdate });
  }, []);

  const reloadPage = () => {
    waitingWorker.postMessage({ type: "SKIP_WAITING" });
    setShowReload(false);
    window.location.reload(true);
  };

  return (
    showReload && (
      <Grid item xs={12}>
        <Alert
          variant="filled"
          severity="warning"
          action={
            <Button color="inherit" size="small" onClick={reloadPage}>
              Reload now
            </Button>
          }
        >
          A new version of this site is available.
        </Alert>
      </Grid>
    )
  );
};

export default ServiceWorkerWrapper;
