import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
//icons
import {ChevronDown}  from 'mdi-material-ui';

class About extends Component {
  state = {
    expanded: false
  }

  render() {
//    const { expanded } = this.state;

    return (
        <Grid item xs={12} lg={12}>
          <Typography variant="h2" gutterBottom>
            Projects
          </Typography>
          <ExpansionPanel variant="outlined">
            <ExpansionPanelSummary
              expandIcon={<ChevronDown />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Pacta</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Box>
                <Typography variant="body2" gutterBottom>
                My startup. Products for and built with the blockchain, using cryptocurrency Bitcoin and decentralized software platform Ethereum.
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <Button variant="outlined" color="secondary">Go to Pacta.app</Button>
                </Typography>
              </Box>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel variant="outlined">
            <ExpansionPanelSummary
              expandIcon={<ChevronDown />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Raisin Picker</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Box>
              <Typography variant="body2">
              Raisin Picker is a personal knowledge management tool. It features tagging, rating and linking of content nodes. Using Apache Solr, a faceted search enables you to find content quickly. It is based on Drupal content management system and is available as open source.
              </Typography>
              </Box>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
    );
  }
}

export default withTranslation()(About);
