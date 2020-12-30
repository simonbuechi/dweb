import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//material-ui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
//icons
import { InformationOutline } from "mdi-material-ui";
//package.json
import pkg from "../../package.json";

class Footer extends Component {
  state = {
    dialogFooter: false,
  };
  handledialogFooterOpen = () => {
    this.setState({ dialogFooter: true });
  };
  handledialogFooterClose = () => {
    this.setState({ dialogFooter: false });
  };
  render() {
    const { t } = this.props;
    const { dialogFooter } = this.state;

    return (
      <React.Fragment>
        <Grid item xs={12} sm={3} lg={2}>
          &nbsp;
        </Grid>
        <Grid item xs={12} sm={9} lg={10}>
          <Box mt={10} mb={2}>
            <Hidden smUp>
              <Divider />
              <Typography variant="caption" color="textSecondary" gutterBottom>
                <Tooltip title="Disclaimer">
                  <IconButton onClick={this.handledialogFooterOpen}>
                    <InformationOutline color="primary" />
                  </IconButton>
                </Tooltip>
                Copyright {new Date().getFullYear()} Simon Buechi | v{pkg.version}
              </Typography>
            </Hidden>
            <Hidden xsDown>
              <Divider />
              <Typography variant="caption" color="textSecondary" gutterBottom>
                <IconButton onClick={this.handledialogFooterOpen}>
                  <InformationOutline color="primary" />
                </IconButton>
                Copyright {new Date().getFullYear()} Simon Buechi | v{pkg.version}
              </Typography>{" "}
              <Box my={1}></Box>
            </Hidden>
          </Box>
        </Grid>
        <Dialog onClose={this.handledialogFooterClose} aria-labelledby="dialogFooter" open={dialogFooter}>
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
              © Copyright {new Date().getFullYear()} Simon Buechi | v{pkg.version}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handledialogFooterClose} color="primary" variant="contained" autoFocus>
              {t("base.close")}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withTranslation()(Footer);
