import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

class Resources extends Component {
  render() {
    return (
        <Grid item xs={12} lg={12}>
          <Typography variant="h4" gutterBottom>
            Resources
          </Typography>
        </Grid>
    );
  }
}

export default withTranslation()(Resources);
