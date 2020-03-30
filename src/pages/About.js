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
import Paper from "@material-ui/core/Paper";
import Zoom from "@material-ui/core/Zoom";
//icons
import { Gamepad, Filmstrip, BookOpenVariant }  from 'mdi-material-ui';

class About extends Component {

  render() {

    const myLinks = [
      {primary: "My books", secondary: "on Goodreads", link: 2, icon: <BookOpenVariant />},
      {primary: "My movies", secondary: "on IMDB", link: 2, icon: <Filmstrip />},
      {primary: "My games", secondary: "on IGDB", link: 1, icon: <Gamepad />}
    ];

    return (
      <Grid
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
      spacing={4}
    >
      <Grid item xs={12} lg={6}>
        <Typography variant="h2" gutterBottom>
          About
        </Typography>
        <Typography variant="body2" gutterBottom>
          This site is about me, Simon Büchi. Swiss national, citizen of the canton of Zurich, resident of the city of Winterthur. Alumnus of Kantonsschule Buelrain and University of St. Gallen. I have been working as business analyst, programmer, business engineer, project manager. I am interested in trends in banking and web devolopment. More than technologies I am fascinated by disruptive business models. I enjoy reading about philosophy, economics, politics, history and technology. I enjoy classical music.
        </Typography>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography variant="h2" gutterBottom>
          More
        </Typography>
        <Box>
          <List dense>
          <Paper variant="outlined">
          {myLinks.map((item, index) => (
            <Zoom in style={{ transitionDelay: 150 + index * 100 + "ms" }} key={item.primary}>
              <div>
              <ListItem button>
                <ListItemIcon color="secondary">
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.primary} secondary={item.secondary} />
              </ListItem>
              <Divider />
              </div>
            </Zoom>
          ))}
            </Paper>
          </List>
        </Box>
        </Grid>
      </Grid>
    );
  }
}

export default withTranslation()(About);
