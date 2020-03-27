import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

class CV extends Component {
  render() {
    return (
      <>
        <Grid item xs={12} lg={12}>
          <Typography variant="h4" gutterBottom>
            CV
          </Typography>
          <Typography variant="body2" gutterBottom>
            Request CV (PDF)
          </Typography>
        </Grid>
      </>
    );
  }
}

export default withTranslation()(CV);
