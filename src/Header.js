import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
//icons
import Web from 'mdi-material-ui/Web';
import Brightness6 from 'mdi-material-ui/Brightness6';

class Header extends Component {
  render() {
    return (
      <>
      <Grid item xs={12} sm={3}>
        <Box mt={2}>
          <Tooltip title="Language">
            <IconButton aria-label="Language">
              <Web />
            </IconButton>
            </Tooltip>
            <Tooltip title="Switch theme">
            <IconButton aria-label="delete">
                <Brightness6 />
            </IconButton>
            </Tooltip>
          </Box>
        </Grid>
        <Grid item xs={12} sm={9}>
        <Box my={4}>
          <Typography variant="h2" gutterBottom>
            Simon Büchi
          </Typography>
        </Box>
      </Grid>
      </>
    );
  }
}


export default withTranslation()(Header);
