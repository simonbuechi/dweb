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
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";
//icons
import { ArrowExpand, Close, OpenInNew, Image } from "mdi-material-ui";
//artworks
const A001 = lazy(() => import("../artworks/A001"));
const A002 = lazy(() => import("../artworks/A002"));
const A003 = lazy(() => import("../artworks/A003"));
const A004 = lazy(() => import("../artworks/A004"));
const A005 = lazy(() => import("../artworks/A005"));
const A006 = lazy(() => import("../artworks/A006"));

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
    date: new Date(2021, 0, 3),
    content: <A002 />,
    group: "drafts",
  },
  {
    id: "A003",
    primary: "Mondrian recursive",
    secondary: "inspired by sofiagarcia/mondrian",
    link: "https://github.com/sofiagarcia/mondrian/blob/master/mondrian-v.1/sketch.js",
    date: new Date(2021, 0, 7),
    content: <A003 />,
    group: "drafts",
  },
  {
    id: "A004",
    primary: "A new world",
    secondary: "inspired by openprocessing/397924",
    link: "https://editor.p5js.org/Kubi/sketches/CHPTDZOu2",
    date: new Date(2021, 0, 5),
    content: <A004 />,
    group: "drafts",
  },
  {
    id: "A005",
    primary: "Mondrian recursive",
    secondary: "inspired by openprocessing/397924",
    link: "...",
    date: new Date(2021, 0, 10),
    content: <A005 />,
    group: "drafts",
  },
  {
    id: "A006",
    primary: "Procedural waves on a good trip",
    secondary: "inspired by procedural night reflections",
    date: new Date(2021, 0, 10),
    content: <A006 />,
    group: "drafts",
    webgl: true,
  },
];

class Arts extends Component {
  state = {
    dialog: false,
    currentContent: <></>,
    currentTitle: "",
    signatureCollapsed: false,
    signature: "",
    seed: "",
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
    return Intl.DateTimeFormat("default", { year: "2-digit", month: "long", day: "numeric" }).format(date);
  };
  setSeed = () => {
    window.localStorage.setItem("seed", this.state.seed);
  };
  removeSeed = () => {
    window.localStorage.removeItem("seed");
  };
  handleSeed = (event) => {
    this.setState({ seed: event.target.value });
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
          <Tooltip title="Click to configure">
            <FormControlLabel value="end" control={<Switch color="primary" onClick={this.handleSwitch} />} label="Set custom seed" labelPlacement="end" />
          </Tooltip>
          <Collapse in={signatureCollapsed}>
            <TextField
              name="name"
              label={t("sendMessage.nameLabel")}
              fullWidth
              margin="normal"
              variant="outlined"
              value={this.state.seed}
              onChange={this.handleSeed}
              disabled={window.localStorage.getItem("seed") !== null}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {window.localStorage.getItem("seed") === null ? (
                      <Button color="primary" variant="contained" onClick={this.setSeed}>
                        {t("base.save")}
                      </Button>
                    ) : (
                      <Button color="primary" variant="contained" onClick={this.removeSeed} startIcon={<Close />}>
                        {t("base.remove")}
                      </Button>
                    )}
                  </InputAdornment>
                ),
              }}
            />
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
                      <Tooltip title="Show artwork">
                        <ListItemIcon color="secondary">
                          <ArrowExpand />
                        </ListItemIcon>
                      </Tooltip>
                      <ListItemText primary={item.primary + " (" + this.formatDate(item.date) + ")"} secondary={item.secondary} />

                      <ListItemSecondaryAction>
                        {item.staticImage && (
                          <Tooltip title="Show static image">
                            <IconButton edge="end" href={item.staticImage}>
                              <Image />
                            </IconButton>
                          </Tooltip>
                        )}
                        {item.link && (
                          <Tooltip title="Go to original piece">
                            <IconButton edge="end" href={item.link}>
                              <OpenInNew />
                            </IconButton>
                          </Tooltip>
                        )}
                      </ListItemSecondaryAction>
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
                <Typography variant="h2">{currentTitle}</Typography>
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
