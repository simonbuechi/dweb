import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//material-ui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
//package.json
import pkg from "../../package.json";

class Footer extends Component {

  render() {
    return (
      <React.Fragment>
        <Grid item xs={12} sm={3} lg={3} xl={3}>
          &nbsp;
        </Grid>
        <Grid item xs={12} sm={9} lg={9} xl={9}>
          <Box mt={10} mb={2}>
            <Divider />
            <Typography variant="caption" color="textSecondary" gutterBottom>
              Copyright {new Date().getFullYear()} Simon Buechi | v{pkg.version}
            </Typography>
          </Box>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withTranslation()(Footer);
