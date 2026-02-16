import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import QRCode from "qrcode.react";
//material-ui
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
//icons
import Icon from "../utils/Icon";
import { mdiQrcode } from "@mdi/js";

function QrCode(props) {
  const { t } = useTranslation();
  const [dialogQr, setDialogQr] = useState(false);

  const handleDialogQrOpen = () => {
    setDialogQr(true);
  };
  const handleDialogQrClose = () => {
    setDialogQr(false);
  };

  const { text } = props;

  return (
    <React.Fragment>
      <Tooltip title={t("base.showQr")} aria-label={t("base.showQr")}>
        <IconButton color="secondary" aria-label="Copy" onClick={handleDialogQrOpen}>
          <Icon path={mdiQrcode} fontSize="small" />
        </IconButton>
      </Tooltip>

      <Dialog onClose={handleDialogQrClose} aria-labelledby="dialogInfo" open={dialogQr}>
        <DialogContent>
          <Typography variant="body2" gutterBottom>
            {t("base.qrCode")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {text}
          </Typography>
          <QRCode value={text} size={350} bgColor="#FFFFFF" fgColor="#000000" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogQrClose} variant="contained" color="primary" autoFocus>
            {t("base.close")}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default QrCode;
