import React, { Component, Suspense, lazy } from "react";
import { withTranslation } from "react-i18next";
//material-ui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Zoom from "@material-ui/core/Zoom";
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
//icons
import { ArrowExpand, Close, OpenInNew } from "mdi-material-ui";
//artworks
const A001 = lazy(() => import("../artworks/A001"));
const A002 = lazy(() => import("../artworks/A002"));
const A003 = lazy(() => import("../artworks/A003"));

class Arts extends Component {
  state = {
    dialog: false,
    currentArtwork: <></>,
    currentTitle: "",
  };

  handledialogOpen = () => {
    this.setState({ dialog: true });
  };
  handledialogClose = () => {
    this.setState({ dialog: false });
    this.setState({ currentTitle: "", currentArtwork: <></> });
  };
  openArtwork = (currentTitle, currentArtwork) => {
    this.setState({ currentTitle, currentArtwork });
    this.handledialogOpen();
  };
  formatDate = (date) => {
    return Intl.DateTimeFormat("default", { year: "2-digit", month: "short" }).format(date);
  };
  render() {
    const { t } = this.props;
    const { dialog, currentArtwork, currentTitle } = this.state;

    // tags: animated,

    const myDrafts = [
      { primary: "Bar code", secondary: " ", date: new Date(2020, 12, 5), content: <A001 /> },
      {
        primary: "Mondrian playground",
        secondary: "inspired by angichau/r1BOM69-4",
        link: "https://editor.p5js.org/angichau/sketches/r1BOM69-4",
        date: new Date(2020, 1, 5),
        content: <A002 />,
      },
      {
        primary: "Mondrian recursive",
        secondary: "inspired by sofiagarcia/mondrian",
        link: "https://github.com/sofiagarcia/mondrian/blob/master/mondrian-v.1/sketch.js",
        date: new Date(2020, 12, 5),
        content: <A003 />,
      },
    ];

    const myArtworks = [
      { primary: "Demo stuff", secondary: "Some demo stuff", date: new Date(2020, 12, 5), content: <A001 /> },
      { primary: "Demo stuff", secondary: "Some demo stuff", date: new Date(2020, 1, 5), content: <A002 /> },
      { primary: "Demo stuff", secondary: "Some demo stuff", date: new Date(2020, 12, 5), content: <A003 /> },
    ];

    return (
      <Grid container direction="row" justify="center" alignItems="flex-start" spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h2" gutterBottom>
            {t("arts.title")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {t("arts.about")}
          </Typography>
          <List dense>
            {myArtworks.map((item, index) => (
              <Zoom in style={{ transitionDelay: 50 + index * 100 + "ms" }} key={index}>
                <div>
                  <ListItem button onClick={() => this.openArtwork(item.primary, item.content)}>
                    <ListItemIcon color="secondary">
                      <ArrowExpand />
                    </ListItemIcon>
                    <ListItemText primary={item.primary + " (" + this.formatDate(item.date) + ")"} secondary={item.secondary} />
                    {item.link && (
                      <ListItemSecondaryAction>
                        <IconButton edge="end" href={item.link}>
                          <OpenInNew />
                        </IconButton>
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                </div>
              </Zoom>
            ))}
          </List>
          <Box my={3}>
            <Typography variant="h2" gutterBottom>
              {t("arts.draftsTitle")}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t("arts.draftsAbout")}
            </Typography>
            <List dense>
              {myDrafts.map((item, index) => (
                <Zoom in style={{ transitionDelay: 50 + index * 100 + "ms" }} key={index}>
                  <div>
                    <ListItem button onClick={() => this.openArtwork(item.primary, item.content)}>
                      <ListItemIcon color="secondary">
                        <ArrowExpand />
                      </ListItemIcon>
                      <ListItemText primary={item.primary + " (" + this.formatDate(item.date) + ")"} secondary={item.secondary} />
                      {item.link && (
                        <ListItemSecondaryAction>
                          <IconButton edge="end" href={item.link}>
                            <OpenInNew />
                          </IconButton>
                        </ListItemSecondaryAction>
                      )}
                    </ListItem>
                  </div>
                </Zoom>
              ))}
            </List>
          </Box>
          <Dialog fullScreen onClose={this.handledialogClose} aria-labelledby="dialog" open={dialog}>
            <AppBar color="transparent" position="relative">
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={this.handledialogClose} aria-label="close">
                  <Close />
                </IconButton>
                <Typography variant="h3">{currentTitle}</Typography>
              </Toolbar>
            </AppBar>
            <Suspense fallback={<CircularProgress color="primary" />}>{currentArtwork}</Suspense>
          </Dialog>
        </Grid>
        <Grid item xs={12} md={4}>
          &nbsp;
        </Grid>
      </Grid>
    );
  }
}

export default withTranslation()(Arts);
