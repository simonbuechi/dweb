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
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
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
import { Close, OpenInNew, Image, Check } from "mdi-material-ui";
//artworks
const A001 = lazy(() => import("../artworks/A001"));
const A002 = lazy(() => import("../artworks/A002"));
const A003 = lazy(() => import("../artworks/A003"));
const A004 = lazy(() => import("../artworks/A004"));
const A005 = lazy(() => import("../artworks/A005"));
const A006 = lazy(() => import("../artworks/A006"));
//const A007 = lazy(() => import("../artworks/A007"));
//const A008 = lazy(() => import("../artworks/A008"));

const myArtworks = [
  {
    id: "A001",
    primary: "Bar code",
    secondary: "A simple case of color theory",
    date: new Date(2020, 12, 5),
    content: <A001 />,
    color: true,
    noise: true,
  },
  {
    id: "A002",
    primary: "Mondrian playground",
    secondary: "inspired by angichau/r1BOM69-4",
    link: "https://editor.p5js.org/angichau/sketches/r1BOM69-4",
    date: new Date(2021, 0, 3),
    content: <A002 />,
    color: true,
    noise: true,
  },
  {
    id: "A003",
    primary: "Mondrian recursive",
    secondary: "inspired by sofiagarcia/mondrian",
    link: "https://github.com/sofiagarcia/mondrian/blob/master/mondrian-v.1/sketch.js",
    date: new Date(2021, 0, 5),
    content: <A003 />,
    color: false,
    noise: true,
  },
  {
    id: "A004",
    primary: "A new world",
    secondary: "inspired by openprocessing/397924",
    link: "https://editor.p5js.org/Kubi/sketches/CHPTDZOu2",
    date: new Date(2021, 0, 7),
    content: <A004 />,
    color: false,
    noise: false,
  },
  {
    id: "A005",
    primary: "Noisy pathways",
    secondary: "Experimenting with Perlin noise",
    date: new Date(2021, 0, 10),
    content: <A005 />,
    animated: true,
    noise: false,
  },
  {
    id: "A006",
    primary: "Procedural Tripping",
    secondary: "inspired by procedural night reflections",
    date: new Date(2021, 0, 11),
    content: <A006 />,
    webgl: true,
    animated: true,
    color: true,
    noise: false,
  },
  {
    id: "A007",
    primary: "...",
    secondary: "inspired by https://www.youtube.com/watch?v=n66jkd94qN4",
    link: "https://github.com/matthewepler/Generative-Design-Systems-with-P5js/tree/master/21_final",
    date: new Date(2021, 0, 12),
    content: <></>,
  },
];

class Arts extends Component {
  state = {
    dialog: false,
    currentContent: <></>,
    currentTitle: "",
    signatureCollapsed: false,
    signature: null,
    seedField: "",
    filter: "all",
  };

  componentDidMount = () => {
    if (window.localStorage.getItem("signature")) {
      const currentSignature = window.localStorage.getItem("signature");
      this.setState({ 
        signature: currentSignature,
        seedField: currentSignature
      })
    }
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
    window.localStorage.setItem("signature", this.state.seedField);
    this.setState({signature: this.state.seedField});
  };
  removeSeed = () => {
    window.localStorage.removeItem("signature");
    this.setState({signature: null});
  };
  handleSeed = (event) => {
    this.setState({ seedField: event.target.value });
  };
  handleFilter = (filter) => {
    this.setState({ filter });
  };
  checkFilter = (color, noise, animated) => {
    while (this.state.filter === "all") return true;
    while (this.state.filter === "noise" && noise) return true;
    while (this.state.filter === "color" && color) return true;
    while (this.state.filter === "animated" && animated) return true;
    return false;
  };

  render() {
    const { t } = this.props;
    const { dialog, currentContent, currentTitle, signatureCollapsed, signature, seedField } = this.state;

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
          </Typography>
          <Typography variant="body2" gutterBottom>
            {t("arts.draftsAbout")}
          </Typography>
          <Tooltip title={t("arts.seedSwitchTooltip")}>
            <FormControlLabel
              value="end"
              control={<Switch color="primary" onClick={this.handleSwitch} />}
              label={t("arts.seedSwitchLabel")}
              labelPlacement="end"
            />
          </Tooltip>
          <Collapse in={signatureCollapsed}>
            <TextField
              name="name"
              label={t("arts.seedLabel")}
              helperText={t("arts.seedHelper")}
              fullWidth
              margin="normal"
              variant="outlined"
              value={seedField}
              onChange={this.handleSeed}
              disabled={signature !== null}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {signature === null ? (
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
            <Box my={1}>
              <Chip
                color={this.state.filter === "all" ? "primary" : "default"}
                size="small"
                label="All"
                clickable
                onClick={() => this.handleFilter("all")}
                icon={this.state.filter === "all" ? <Check /> : <></>}
              />
              <Chip
                color={this.state.filter === "noise" ? "primary" : "default"}
                size="small"
                label="Seedworthy"
                clickable
                onClick={() => this.handleFilter("noise")}
                icon={this.state.filter === "noise" ? <Check /> : <></>}
              />
              <Chip
                color={this.state.filter === "color" ? "primary" : "default"}
                size="small"
                label="Color Theory"
                clickable
                onClick={() => this.handleFilter("color")}
                icon={this.state.filter === "color" ? <Check /> : <></>}
              />
              <Chip
                color={this.state.filter === "animated" ? "primary" : "default"}
                size="small"
                label="Animated"
                clickable
                onClick={() => this.handleFilter("animated")}
                icon={this.state.filter === "animated" ? <Check /> : <></>}
              />
            </Box>
            <List dense>
              {myArtworks.map(
                (item, index) =>
                  this.checkFilter(item.color, item.noise, item.animated) && (
                    <Zoom in key={index}>
                      <div>
                        <ListItem button component={Link} to={"/arts/" + item.id}>
                          <Tooltip title={t("arts.artworkTooltipShow")}>
                            <ListItemAvatar color="secondary">
                              <Avatar>{index + 1}</Avatar>
                            </ListItemAvatar>
                          </Tooltip>
                          <ListItemText primary={item.primary + " (" + this.formatDate(item.date) + ")"} secondary={item.secondary} />

                          <ListItemSecondaryAction>
                            {item.staticImage && (
                              <Tooltip title={t("arts.artworkTooltipImage")}>
                                <IconButton edge="end" href={item.staticImage}>
                                  <Image />
                                </IconButton>
                              </Tooltip>
                            )}
                            {item.link && (
                              <Tooltip title={t("arts.artworkTooltipLink")}>
                                <IconButton edge="end" href={item.link}>
                                  <OpenInNew />
                                </IconButton>
                              </Tooltip>
                            )}
                          </ListItemSecondaryAction>
                        </ListItem>
                      </div>
                    </Zoom>
                  )
              )}
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
