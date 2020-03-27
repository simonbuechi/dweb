import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//material-ui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
//icons
import { FileDocument }  from 'mdi-material-ui';

class About extends Component {
  render() {
    return (
        <Grid item xs={12} lg={12}>
          <Typography variant="h4" gutterBottom>
            About
          </Typography>
          <Typography variant="body2" gutterBottom>
            This site is about me, Simon Büchi. Swiss national, citizen of the canton of Zurich, resident of the city of Winterthur. Alumnus of Kantonsschule Buelrain and University of St. Gallen. I have been working as business analyst, programmer, business engineer, project manager. I am interested in trends in banking and web devolopment. More than technologies I am fascinated by disruptive business models. I enjoy reading about philosophy, economics, politics, history and technology. I enjoy classical music.
          </Typography>
          <Box my={2}>
            <List component="nav" aria-label="main mailbox folders">
              <Divider />
              <ListItem button>
                <ListItemIcon>
                  <FileDocument />
                </ListItemIcon>
                <ListItemText primary="Simon's CV as PDF" />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemIcon>
                  <FileDocument />
                </ListItemIcon>
                <ListItemText primary="Portrait picture" />
              </ListItem>
              <Divider />
            </List>
            
          </Box>
        </Grid>
    );
  }
}

export default withTranslation()(About);
