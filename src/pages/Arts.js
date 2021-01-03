import React, { Component, Suspense, lazy } from "react";
import { withTranslation } from "react-i18next";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
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
import Switch from "@material-ui/core/Switch";
import Collapse from "@material-ui/core/Collapse";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
//icons
import { ArrowExpand, Close, OpenInNew } from "mdi-material-ui";
//artworks
const A001 = lazy(() => import("../artworks/A001"));
const A002 = lazy(() => import("../artworks/A002"));
const A003 = lazy(() => import("../artworks/A003"));
const A004 = lazy(() => import("../artworks/A004"));

const myArtworks = [
  {
    id: "A001",
    primary: "Bar code",
    secondary: " ",
    date: new Date(2020, 12, 5),
    content: <A001 />,
    group: "drafts",
  },
  {
    id: "A002",
    primary: "Mondrian playground",
    secondary: "inspired by angichau/r1BOM69-4",
    link: "https://editor.p5js.org/angichau/sketches/r1BOM69-4",
    date: new Date(2020, 1, 5),
    content: <A002 />,
    group: "drafts",
  },
  {
    id: "A003",
    primary: "Mondrian recursive",
    secondary: "inspired by sofiagarcia/mondrian",
    link: "https://github.com/sofiagarcia/mondrian/blob/master/mondrian-v.1/sketch.js",
    date: new Date(2020, 12, 5),
    content: <A003 />,
    group: "drafts",
  },
  {
    id: "A004",
    primary: "Mondrian recursive",
    secondary: "inspired by openprocessing/397924",
    link: "https://www.openprocessing.org/sketch/397924/",
    date: new Date(2020, 12, 5),
    content: <A004 />,
    group: "drafts",
  },
];

class Arts extends Component {
  state = {
    dialog: false,
    currentContent: <></>,
    currentTitle: "",
    signatureCollapsed: false,
    signature: "",
  };

  componentDidUpdate = () => {
    if (this.props.match.params.id && !this.state.dialog) {
      let currentArtwork = myArtworks.find((x) => x.id === this.props.match.params.id);
      this.setState({ currentTitle: currentArtwork.primary, currentContent: currentArtwork.content });
      this.handledialogOpen();
    }
  };
  handledialogOpen = () => {
    this.setState({ dialog: true });
  };
  handledialogClose = () => {
    this.setState({ dialog: false });
    this.setState({ currentTitle: "", currentContent: <></> });
    this.props.history.push("/arts");
  };
  handleSwitch = () => {
    this.setState({ signatureCollapsed: !this.state.signatureCollapsed });
  };
  openArtwork = (currentTitle, currentContent) => {
    this.setState({ currentTitle, currentContent });
    this.handledialogOpen();
  };
  formatDate = (date) => {
    return Intl.DateTimeFormat("default", { year: "2-digit", month: "short" }).format(date);
  };
  render() {
    const { t } = this.props;
    const { dialog, currentContent, currentTitle, signatureCollapsed } = this.state;
    // tags: animated,

    return (
      <Grid container direction="row" justify="center" alignItems="flex-start" spacing={4}>
        <Helmet>
          <title>Simon Buechi Artworks</title>
          <meta name="description" content="Generative artworks created with p5.js and crypto signatures" />
        </Helmet>
        <Grid item xs={12} md={12}>
          <Typography variant="h2" gutterBottom>
            {t("arts.title")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {t("arts.about")}
            Please note that artworks are generated ad hoc and adapt to your screen size. It is generally recommended to use at least a tablet-sized screen.
          </Typography>
          <FormControlLabel value="end" control={<Switch color="primary" onClick={this.handleSwitch} />} label="Set custom seed" labelPlacement="end" />
          <Collapse in={signatureCollapsed}>
            <TextField name="name" label={t("sendMessage.nameLabel")} fullWidth margin="normal" variant="outlined" />
          </Collapse>

          <Box my={3}>
            <Typography variant="h2" gutterBottom>
              {t("arts.draftsTitle")}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t("arts.draftsAbout")}
            </Typography>
            <List dense>
              {myArtworks.map((item, index) => (
                <Zoom in style={{ transitionDelay: 50 + index * 100 + "ms" }} key={index}>
                  <div>
                    <ListItem button component={Link} to={"/arts/" + item.id}>
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
            <Suspense fallback={<CircularProgress color="primary" />}>{currentContent}</Suspense>
          </Dialog>
        </Grid>
        <Grid item xs={12} md={4}>
          &nbsp;
        </Grid>
      </Grid>
    );
  }
}

export default withTranslation()(withRouter(Arts));
