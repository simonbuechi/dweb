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
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
//icons
import { Close, OpenInNew, Image, Check, Github, RadioboxBlank } from "mdi-material-ui";
// custom
import { artworkIndex } from "../artworks/ArtworkIndex";
//lazy 
const Web3 = lazy(() => import("../web3/Web3"));

class Arts extends Component {
  state = {
    dialog: false,
    dialogWeb3: false,
    currentContent: <></>,
    currentTitle: "",
    signatureCollapsed: false,
    customCollapsed: false,
    seed: null,
    customField: "",
    filter: "all",
  };

  componentDidMount = () => {
    if (window.localStorage.getItem("seed")) {
      const currentSeed = window.localStorage.getItem("seed");
      this.setState({ seed: currentSeed });
    }
    if (this.props.match.params.id && !this.state.dialog) {
      let currentArtwork = artworkIndex.find((x) => x.id === this.props.match.params.id);
      this.setState({ currentTitle: currentArtwork.primary, currentContent: currentArtwork.content });
      this.handledialogOpen();
    }
  };

  componentDidUpdate = () => {
    if (this.props.match.params.id && !this.state.dialog) {
      let currentArtwork = artworkIndex.find((x) => x.id === this.props.match.params.id);
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
  handleDialogWeb3Open = () => {
    this.setState({ dialogWeb3: true });
  };
  handleDialogWeb3Close = () => {
    this.setState({ dialogWeb3: false });
  };
  handleSwitch = (item) => {
    if(item === "customCollapsed") {
      this.setState({
        signatureCollapsed: false,
        customCollapsed: !this.state.customCollapsed
      });
    } else {
      this.setState({
        signatureCollapsed: !this.state.signatureCollapsed,
        customCollapsed: false
      });
    }
  };
  openArtwork = (currentTitle, currentContent) => {
    this.setState({ currentTitle, currentContent });
    this.handledialogOpen();
  };
  formatDate = (date) => {
    return Intl.DateTimeFormat("default", { year: "2-digit", month: "long", day: "numeric" }).format(date);
  };
  setSeed = () => {
    window.localStorage.setItem("seed", this.state.customField);
    this.setState({ seed: this.state.customField });
  };
  removeSeed = () => {
    window.localStorage.removeItem("seed");
    this.setState({ seed: null });
  };
  handleCustomSeed = (event) => {
    this.setState({ customField: event.target.value });
  };
  setSignature = () => {

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
    const { dialog, currentContent, currentTitle, signatureCollapsed, seed, customCollapsed, customField, dialogWeb3 } = this.state;

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
          <Box mt={1} mb={3}>
          <Button
            color="primary"
            variant="contained"
            component="a"
            href="https://github.com/simonbuechi/dweb/tree/master/src/artworks"
            startIcon={<Github />}
          >
            Source Code
          </Button>
          &nbsp;
          <Button
            color="primary"
            variant="contained"
            component="a"
            href="https://p5js.org"
            startIcon={<OpenInNew />}
          >
            Learn about P5
          </Button>
          </Box>
          <Tooltip title={t("arts.seedSwitchTooltip")}>
            <FormControlLabel
              value="end"
              control={<Switch color="primary" checked={customCollapsed} onClick={() => this.handleSwitch("customCollapsed")} />}
              label={t("arts.seedSwitchLabel")}
              labelPlacement="end"
            />
          </Tooltip>
          <Collapse in={customCollapsed}>
            <TextField
              name="name"
              label={t("arts.seedLabel")}
              helperText={t("arts.seedHelper")}
              fullWidth
              margin="normal"
              variant="outlined"
              value={customField}
              onChange={this.handleCustomSeed}
              disabled={seed !== null}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {seed === null ? (
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
          <Tooltip title={t("arts.cryptoSeedSwitchTooltip")}>
            <FormControlLabel
              value="end"
              control={<Switch color="primary" checked={signatureCollapsed}  onClick={() => this.handleSwitch("signatureCollapsed")} />}
              label={t("arts.cryptoSeedSwitchLabel")}
              labelPlacement="end"
            />
          </Tooltip>
          <Collapse in={signatureCollapsed}>
            <TextField
              name="name"
              label={t("arts.cryptoSeedLabel")}
              helperText={t("arts.cryptoSeedHelper")}
              fullWidth
              margin="normal"
              variant="outlined"
              disabled
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {seed === null ? (
                      <Button color="primary" variant="contained"  onClick={this.handleDialogWeb3Open}>
                        {t("arts.signWithWallet")}
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
                variant="outlined"
                clickable
                onClick={() => this.handleFilter("all")}
                icon={this.state.filter === "all" ? <Check /> : <RadioboxBlank />}
              />
              <Chip
                color={this.state.filter === "noise" ? "primary" : "default"}
                size="small"
                label="Seed Supported"
                variant="outlined"
                clickable
                onClick={() => this.handleFilter("noise")}
                icon={this.state.filter === "noise" ? <Check /> : <RadioboxBlank />}
              />
              <Chip
                color={this.state.filter === "color" ? "primary" : "default"}
                size="small"
                label="Color Theory"
                variant="outlined"
                clickable
                onClick={() => this.handleFilter("color")}
                icon={this.state.filter === "color" ? <Check /> : <RadioboxBlank />}
              />
              <Chip
                color={this.state.filter === "animated" ? "primary" : "default"}
                size="small"
                label="Animated"
                variant="outlined"
                clickable
                onClick={() => this.handleFilter("animated")}
                icon={this.state.filter === "animated" ? <Check /> : <RadioboxBlank />}
              />
            </Box>
            <List dense>
              {artworkIndex.map(
                (item, index) =>
                  this.checkFilter(item.color, item.noise, item.animated) && (
                    <Zoom in key={index}>
                      <div>
                        <ListItem button component={Link} to={"/arts/" + item.id}>
                          <Tooltip title={t("arts.artworkTooltipShow")}>
                            <ListItemAvatar color="secondary">
                              <Avatar>{index}</Avatar>
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
          <Dialog onClose={this.handleDialogWeb3Close} open={dialogWeb3} keepMounted maxWidth="lg">
          <DialogContent>
            <Typography variant="h2" gutterBottom>
              Connect Wallet
            </Typography>
            <Suspense fallback={<CircularProgress color="primary" />}>
              <Web3 />
            </Suspense>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogWeb3Close} variant="contained" color="primary">
              {t("base.close")}
            </Button>
          </DialogActions>
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
