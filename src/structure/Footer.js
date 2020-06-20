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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Tooltip from "@material-ui/core/Tooltip";
//icons
import { InformationOutline, Ethereum, Hexagon } from "mdi-material-ui";
//package.json
import pkg from "../../package.json";
import config from "../config.json";

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
          <Box my={6}>
            <Typography variant="body2" gutterBottom>
              <Tooltip title="Disclaimer">
                <IconButton onClick={this.handledialogFooterOpen}>
                  <InformationOutline />
                </IconButton>
              </Tooltip>
              © Copyright {new Date().getFullYear()} Simon Büchi | v{pkg.version}
            </Typography>
          </Box>
        </Grid>
        <Dialog onClose={this.handledialogFooterClose} aria-labelledby="dialogFooter" open={dialogFooter}>
          <DialogContent>
            <Typography variant="h2" gutterBottom>
              {t("base.dialogFooterTitle")}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t("start.dialogFooterBody")}
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <Ethereum />
                </ListItemIcon>
                <ListItemText primary={config.ensName} secondary="ENS name" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Ethereum />
                </ListItemIcon>
                <ListItemText primary={config.ethereumAddress} secondary="Ethereum address" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Hexagon />
                </ListItemIcon>
                <ListItemText primary={config.ipfsAddress} secondary="IPFS address" />
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handledialogFooterClose} color="secondary" autoFocus>
              {t("base.close")}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withTranslation()(Footer);
