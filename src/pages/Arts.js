import React, { Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
//material-ui
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Zoom from "@mui/material/Zoom";
import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Paper from "@mui/material/Paper";
//icons
import Icon from "../utils/Icon";
import { mdiClose, mdiOpenInNew, mdiImage, mdiCheck, mdiGithub, mdiRadioboxBlank } from "@mdi/js";
// custom
import { artworkIndex } from "../artworks/ArtworkIndex";
//lazy
//const Web3 = lazy(() => import("../web3/Web3"));

const STATIC_IMAGE_URL = "https://gateway.pinata.cloud/ipfs/QmaQF2DBoFtsqZ7G3EmWghtt2REwYYCsyWUJ2jbouf39Xv/";

function Arts() {
  const { t } = useTranslation();
  const [dialog, setDialog] = useState(false);
  const [dialogWeb3, setDialogWeb3] = useState(false);
  const [currentContent, setCurrentContent] = useState(<></>);
  const [currentTitle, setCurrentTitle] = useState("");
  const [signatureCollapsed, setSignatureCollapsed] = useState(false);
  const [customCollapsed, setCustomCollapsed] = useState(false);
  const [seed, setSeed] = useState(null);
  const [customField, setCustomField] = useState("");
  const [filter, setFilter] = useState("starred");

  /*
  componentDidMount = () => {
    if (window.localStorage.getItem("seed")) {
      const currentSeed = window.localStorage.getItem("seed");
      setSeed(currentSeed);
    }
    if (this.props.match.params.id && !this.state.dialog) {
      let currentArtwork = artworkIndex.find((x) => x.id === this.props.match.params.id);
      this.setState({ currentTitle: currentArtwork.primary, currentContent: currentArtwork.content });
      this.handledialogOpen();
    }
  };
*/
  const componentDidUpdate = () => {
    if (this.props.match.params.id && !dialog) {
      let currentArtwork = artworkIndex.find((x) => x.id === this.props.match.params.id);
      setCurrentTitle(currentArtwork.primary);
      setCurrentContent(currentArtwork.content);
      handledialogOpen();
    }
  };
  const handledialogOpen = () => {
    setDialog(true);
  };
  const handledialogClose = () => {
    setDialog(false);
    setCurrentTitle("");
    setCurrentContent(<></>);
    this.props.history.push("/arts");
  };
  const handleDialogWeb3Open = () => {
    setDialogWeb3(true);
  };
  const handleDialogWeb3Close = () => {
    setDialogWeb3(false);
  };
  const handleSwitch = (item) => {
    if (item === "customCollapsed") {
      setSignatureCollapsed(false);
      setCustomCollapsed(!customCollapsed);
    } else {
      setSignatureCollapsed(!signatureCollapsed);
      setCustomCollapsed(false);
    }
  };
  const openArtwork = (currentTitle, currentContent) => {
    setCurrentTitle(currentTitle);
    setCurrentContent(currentContent);
    handledialogOpen();
  };
  const formatDate = (date) => {
    return Intl.DateTimeFormat("default", { year: "2-digit", month: "long", day: "numeric" }).format(date);
  };
  const storeSeed = () => {
    window.localStorage.setItem("seed", customField);
    setSeed(customField);
  };
  const removeSeed = () => {
    window.localStorage.removeItem("seed");
    setSeed(null);
  };
  const handleCustomSeed = (event) => {
    setCustomField(event.target.value);
  };
  const handleFilter = (filter) => {
    setFilter(filter);
  };
  const checkFilter = (color, noise, animated, starred) => {
    while (filter === "all") return true;
    while (filter === "starred" && starred) return true;
    while (filter === "noise" && noise) return true;
    while (filter === "color" && color) return true;
    while (filter === "animated" && animated) return true;
    return false;
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={4}>
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
            startIcon={<Icon path={mdiGithub} />}>
            Source Code
          </Button>
          &nbsp;
          <Button color="primary" variant="contained" component="a" href="https://p5js.org" startIcon={<Icon path={mdiOpenInNew} />}>
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
            onChange={handleCustomSeed}
            disabled={seed !== null}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {seed === null ? (
                    <Button color="primary" variant="contained" onClick={storeSeed}>
                      {t("base.save")}
                    </Button>
                  ) : (
                    <Button color="primary" variant="contained" onClick={removeSeed} startIcon={<Icon path={mdiClose} />}>
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
            control={<Switch color="primary" checked={signatureCollapsed} onClick={() => handleSwitch("signatureCollapsed")} />}
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
                    <Button color="primary" variant="contained" onClick={handleDialogWeb3Open}>
                      {t("arts.signWithWallet")}
                    </Button>
                  ) : (
                    <Button color="primary" variant="contained" onClick={removeSeed} startIcon={<Icon path={mdiClose} />}>
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
          <Paper>
            <Box py={2} px={2}>
              <Chip
                color={filter === "all" ? "primary" : "default"}
                size="small"
                label="All"
                variant={filter === "all" ? "default" : "outlined"}
                clickable
                onClick={() => handleFilter("all")}
                icon={filter === "all" ? <Icon path={mdiCheck} /> : <Icon path={mdiRadioboxBlank} />}
              />
              <Chip
                color={filter === "starred" ? "primary" : "default"}
                size="small"
                label="Favorites"
                variant={filter === "starred" ? "default" : "outlined"}
                clickable
                onClick={() => handleFilter("starred")}
                icon={filter === "starred" ? <Icon path={mdiCheck} /> : <Icon path={mdiRadioboxBlank} />}
              />
              <Chip
                color={filter === "noise" ? "primary" : "default"}
                size="small"
                label="Seed Supported"
                variant={filter === "noise" ? "default" : "outlined"}
                clickable
                onClick={() => handleFilter("noise")}
                icon={filter === "noise" ? <Icon path={mdiCheck} /> : <Icon path={mdiRadioboxBlank} />}
              />
              <Chip
                color={filter === "color" ? "primary" : "default"}
                size="small"
                label="Color Theory"
                variant={filter === "color" ? "default" : "outlined"}
                clickable
                onClick={() => handleFilter("color")}
                icon={filter === "color" ? <Icon path={mdiCheck} /> : <Icon path={mdiRadioboxBlank} />}
              />
              <Chip
                color={filter === "animated" ? "primary" : "default"}
                size="small"
                label="Animated"
                variant={filter === "animated" ? "default" : "outlined"}
                clickable
                onClick={() => handleFilter("animated")}
                icon={filter === "animated" ? <Icon path={mdiCheck} /> : <Icon path={mdiRadioboxBlank} />}
              />
            </Box>
            <List dense>
              {artworkIndex.map(
                (item, index) =>
                  checkFilter(item.color, item.noise, item.animated, item.starred) && (
                    <Zoom in key={index}>
                      <div>
                        <ListItem button component={Link} to={"/arts/" + item.id}>
                          <Tooltip title={t("arts.artworkTooltipShow")}>
                            <ListItemAvatar color="secondary">
                              <Avatar>{index}</Avatar>
                            </ListItemAvatar>
                          </Tooltip>
                          <ListItemText primary={item.primary + " (" + formatDate(item.date) + ")"} secondary={item.secondary} />

                          <ListItemSecondaryAction>
                            {item.staticImage && (
                              <Tooltip title={t("arts.artworkTooltipImage")}>
                                <IconButton edge="end" href={STATIC_IMAGE_URL + "large/" + item.id + ".jpg"} target="_blank">
                                  <Icon path={mdiImage} />
                                </IconButton>
                              </Tooltip>
                            )}
                            {item.link && (
                              <Tooltip title={t("arts.artworkTooltipLink")}>
                                <IconButton edge="end" href={item.link} target="_blank">
                                  <Icon path={mdiOpenInNew} />
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
          </Paper>
        </Box>
        <Dialog fullScreen onClose={handledialogClose} aria-labelledby="dialog" open={dialog}>
          <AppBar color="transparent" position="fixed">
            <Toolbar>
              <Button startIcon={<Icon path={mdiClose} />} color="primary" variant="contained" onClick={handledialogClose}>
                {currentTitle}
              </Button>
            </Toolbar>
          </AppBar>
          <Suspense fallback={<CircularProgress color="primary" />}>{currentContent}</Suspense>
        </Dialog>
        <Dialog onClose={handleDialogWeb3Close} open={dialogWeb3} keepMounted maxWidth="lg">
          <DialogContent>
            <Typography variant="h2" gutterBottom>
              Connect Wallet
            </Typography>
            <Suspense fallback={<CircularProgress color="primary" />}></Suspense>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogWeb3Close} variant="contained" color="primary">
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

export default Arts;
