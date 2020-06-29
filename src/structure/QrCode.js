import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import QRCode from "qrcode.react";
//material-ui
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
//icons
import { Qrcode } from "mdi-material-ui";

class QrCode extends Component {
  state = {
    dialogQr: false,
  };

  handleDialogQrOpen = () => {
    this.setState({ dialogQr: true });
  };
  handleDialogQrClose = () => {
    this.setState({ dialogQr: false });
  };

  render() {
    const { t, text } = this.props;

    return (
      <React.Fragment>
        <Tooltip title={t("base.showQr")} aria-label={t("base.showQr")}>
          <IconButton aria-label="Copy" onClick={this.handleDialogQrOpen}>
            <Qrcode />
          </IconButton>
        </Tooltip>

        <Dialog onClose={this.handleDialogQrClose} aria-labelledby="dialogInfo" open={this.state.dialogQr}>
          <DialogContent>
            <Typography variant="body2" gutterBottom>
              {t("base.qrCode")}
            </Typography>
            <QRCode value={text} size={400} bgColor="#FFFFFF" fgColor="#000000" />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogQrClose} color="secondary" autoFocus>
              {t("base.close")}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withTranslation()(QrCode);