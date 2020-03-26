import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
//icons
import Web from 'mdi-material-ui/Web';
import Brightness6 from 'mdi-material-ui/Brightness6';

class Settings extends Component {
  render() {
    return (
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
    );
  }
}


export default withTranslation()(Settings);
