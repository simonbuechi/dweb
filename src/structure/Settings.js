import React, { Component, Suspense, lazy } from "react";
import { withTranslation } from "react-i18next";
import i18n from "../i18n/i18n";
//material-ui
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
//icons
//import { InformationOutline, AccountBox } from "mdi-material-ui";
//import Brightness6 from 'mdi-material-ui/Brightness6';
//custom
const Web3 = lazy(() => import("../web3/Web3"));

class Settings extends Component {
  state = {
    dialogDisclaimer: false,
    dialogWeb3: false,
  };
  handleDialogDisclaimerOpen = () => {
    this.setState({ dialogDisclaimer: true });
  };
  handleDialogDisclaimerClose = () => {
    this.setState({ dialogDisclaimer: false });
  };
  handleDialogWeb3Open = () => {
    this.setState({ dialogWeb3: true });
  };
  handleDialogWeb3Close = () => {
    this.setState({ dialogWeb3: false });
  };
  handleLangChange = (name) => (event) => {
    i18n.changeLanguage(name);
  };

  render() {
    const { t } = this.props;
    const { dialogDisclaimer, dialogWeb3 } = this.state;

    return (
      <React.Fragment>
        <ButtonGroup color="secondary" size="small">
          <Tooltip title={i18n.language === "en" ? "" : t("base.toEnglish")}>
            <Button onClick={this.handleLangChange("en")} disabled={i18n.language === "en" ? true : false}>
              En
            </Button>
          </Tooltip>
          <Tooltip title={i18n.language === "de" ? "" : t("base.toGerman")}>
            <Button onClick={this.handleLangChange("de")} disabled={i18n.language === "de" ? true : false}>
              De
            </Button>
          </Tooltip>
        </ButtonGroup>
        <Box mt={1}>
          <Tooltip title="Connect to your Ethereum account">
            <Button size="small" variant="outlined" color="secondary" onClick={this.handleDialogWeb3Open}>
              Web3 Connect
          </Button>
          </Tooltip>
        </Box>
        <Box mt={1}>
          <Tooltip title="Disclaimer">
            <Button size="small" variant="outlined" color="secondary" onClick={this.handleDialogDisclaimerOpen}>
              Disclaimer
          </Button>
          </Tooltip>
        </Box>
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
        <Dialog onClose={this.handleDialogDisclaimerClose} aria-labelledby="dialogDisclaimer" open={dialogDisclaimer}>
          <DialogContent>
            <Typography variant="h2" gutterBottom>
              {t("base.dialogDisclaimerTitle")}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t("base.dialogDisclaimerBody")}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t("base.dialogDisclaimerBody2")}
            </Typography>
            <Typography variant="body2" gutterBottom>
              © Copyright {new Date().getFullYear()} Simon Buechi
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogDisclaimerClose} color="primary" variant="contained" autoFocus>
              {t("base.close")}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withTranslation()(Settings);
