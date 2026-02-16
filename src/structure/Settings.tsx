import React, { useState, Suspense, lazy } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/i18n";
//material-ui
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
//icons
//import { InformationOutline, AccountBox } from "@mdi/js";
//import Brightness6 from 'mdi-material-ui/Brightness6';
//custom
//const Web3 = lazy(() => import("../web3/Web3"));

function Settings() {
  const { t } = useTranslation();
  const [dialogDisclaimer, setDialogDisclaimer] = useState(false);
  const [dialogWeb3, setDialogWeb3] = useState(false);

  const handleDialogDisclaimerOpen = () => {
    setDialogDisclaimer(true);
  };
  const handleDialogDisclaimerClose = () => {
    setDialogDisclaimer(false);
  };
  const handleDialogWeb3Open = () => {
    setDialogWeb3(true);
  };
  const handleDialogWeb3Close = () => {
    setDialogWeb3(false);
  };
  const handleLangChange = (name) => (event) => {
    i18n.changeLanguage(name);
  };

  return (
    <React.Fragment>
      <ButtonGroup color="secondary" size="small">
        <Tooltip title={i18n.language === "en" ? "" : t("base.toEnglish")}>
          <Button onClick={handleLangChange("en")} disabled={i18n.language === "en" ? true : false}>
            En
          </Button>
        </Tooltip>
        <Tooltip title={i18n.language === "de" ? "" : t("base.toGerman")}>
          <Button onClick={handleLangChange("de")} disabled={i18n.language === "de" ? true : false}>
            De
          </Button>
        </Tooltip>
      </ButtonGroup>
      <Box mt={1}>
        <Tooltip title="Connect to your Ethereum account">
          <Button size="small" variant="outlined" color="secondary" onClick={handleDialogWeb3Open}>
            Web3 Connect
          </Button>
        </Tooltip>
      </Box>
      <Box mt={1}>
        <Tooltip title="Disclaimer">
          <Button size="small" variant="outlined" color="secondary" onClick={handleDialogDisclaimerOpen}>
            Disclaimer
          </Button>
        </Tooltip>
      </Box>
      <Dialog onClose={handleDialogWeb3Close} open={dialogWeb3} keepMounted maxWidth="lg">
        <DialogContent>
          <Typography variant="h2" gutterBottom>
            Connect Wallet
          </Typography>
          <Suspense fallback={<CircularProgress color="primary" />}>
            {/* <Web3 />  */} 
          </Suspense>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogWeb3Close} variant="contained" color="primary">
            {t("base.close")}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog onClose={handleDialogDisclaimerClose} aria-labelledby="dialogDisclaimer" open={dialogDisclaimer}>
        <DialogContent>
          <Typography variant="h2" gutterBottom>
            {t("base.dialogFooterTitle")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {t("base.dialogFooterBody")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {t("base.dialogFooterBody2")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            © Copyright {new Date().getFullYear()} Simon Buechi
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogDisclaimerClose} color="primary" variant="contained" autoFocus>
            {t("base.close")}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default Settings;
