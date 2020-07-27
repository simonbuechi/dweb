import React, { Component } from "react";
import { withTranslation } from "react-i18next";
// material-ui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
//icons
import { Menu } from "mdi-material-ui";
//custom
import Settings from "./Settings";
import EthereumSpinner from "./EthereumSpinner";

class Header extends Component {
  state = {
    dialogMenu: false,
  };
  handleDialogMenuOpen = () => {
    this.setState({ dialogMenu: true });
  };
  handleDialogMenuClose = () => {
    this.setState({ dialogMenu: false });
  };

  render() {
    const { t, handleChange } = this.props;
    const { dialogMenu } = this.state;

    const setPath = (path) => {
      this.handleDialogMenuClose();
      handleChange(null, path)
    };
    
    return (
      <React.Fragment>
        <Hidden xsDown>
          <Grid item xs={12} sm={3} lg={2}>
          <Box mt={8} mr={2} textAlign="center">
            <EthereumSpinner />
            </Box>
          </Grid>
          <Grid item xs={12} sm={9} lg={10}>
            <Box mt={4} mb={6}>
              <Typography variant="h1">{t("base.title")}</Typography>
            </Box>
          </Grid>
        </Hidden>
        <Hidden smUp>
          <Grid item xs={10}>
            <Box my={1}>
              <Typography variant="h1">{t("base.title")}</Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box mt={2}>
            <IconButton onClick={this.handleDialogMenuOpen}>
              <Menu />
            </IconButton>
            </Box>
          </Grid>
          <Dialog onClose={this.handleDialogMenuClose} aria-labelledby="dialogInfo" open={dialogMenu}>
            <DialogContent>
              <Typography variant="h2" gutterBottom>
                {t("base.menu")}
              </Typography>
              <List>
                <ListItem button onClick={() => setPath("/")}>
                  <ListItemText primary={t("base.navStart")} />
                </ListItem>
                <ListItem button onClick={() => setPath("/about")}>
                  <ListItemText primary={t("base.navAbout")} />
                </ListItem>
                <ListItem button onClick={() => setPath("/services")}>
                  <ListItemText primary={t("base.navOffering")} />
                </ListItem>
                <ListItem button onClick={() => setPath("/projects")}>
                  <ListItemText primary={t("base.navProjects")} />
                </ListItem>
                <ListItem button onClick={() => setPath("/blog")}>
                  <ListItemText primary={t("base.navBlog")} />
                </ListItem>
                <ListItem button onClick={() => setPath("/wall")}>
                  <ListItemText primary={t("base.navWall")} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={<Settings />} />
                </ListItem>
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDialogMenuClose} color="secondary" autoFocus>
                {t("base.close")}
              </Button>
            </DialogActions>
          </Dialog>
        </Hidden>
        
      </React.Fragment>
    );
  }
}

export default withTranslation()(Header);
