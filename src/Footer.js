import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

class Footer extends Component {
  render() {
    return (
      <>
      <Grid item xs={12} sm={3}>
        &nbsp;
      </Grid>
      <Grid item xs={12} sm={9}>
        <Box my={4}>
          <Typography variant="body2" gutterBottom>       
            © Copyright {new Date().getFullYear()} Simon Büchi
          </Typography>
        </Box>
      </Grid>
      </>
    );
  }
}

export default withTranslation()(Footer);
