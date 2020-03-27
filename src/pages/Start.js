import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

class Start extends Component {
  render() {
    return (
        <Grid item xs={12} lg={12}>
          <Typography variant="h2" gutterBottom>
            Start
          </Typography>
          <Typography variant="body2" gutterBottom>
            
          </Typography>
        </Grid>
    );
  }
}

export default withTranslation()(Start);
