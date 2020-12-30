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
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import Divider from "@material-ui/core/Divider";
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
      handleChange(null, path);
    };

    return (
      <React.Fragment>
        <Hidden xsDown>
          <Grid item xs={12} sm={3} lg={2}>
            <Box mt={8} mr={2} textAlign="center"></Box>
          </Grid>
          <Grid item xs={12} sm={9} lg={10}>
            <Box mt={4} mb={8}>
              <Typography variant="h1">{t("base.title")}</Typography>
              <Divider />
            </Box>
          </Grid>
        </Hidden>
        <Hidden smUp>
          <Fab color="primary" aria-label="menu" onClick={this.handleDialogMenuOpen}>
            <Menu />
          </Fab>
          <Grid item xs={12}>
            <Box my={1}>
              <Typography variant="h1">{t("base.title")}</Typography>
              <Divider />
            </Box>
          </Grid>
          <div>
            <Dialog fullScreen onClose={this.handleDialogMenuClose} aria-labelledby="menu" open={dialogMenu} keepMounted>
              <DialogContent>
                <Grid container>
                  <Grid item xs={4}>
                    <Box my={4}>
                      <EthereumSpinner />
                    </Box>
                  </Grid>
                  <Grid item xs={8}>
                    <Box my={4}>
                      <Typography variant="h2" gutterBottom>
                        {t("base.menu")}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
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
                <Button onClick={this.handleDialogMenuClose} color="secondary">
                  {t("base.close")}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Hidden>
      </React.Fragment>
    );
  }
}

export default withTranslation()(Header);
