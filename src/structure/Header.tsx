import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
// material-ui
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Divider from "@mui/material/Divider";
//icons
import Icon from "../utils/Icon";
import { mdiMenu } from "@mdi/js";
//custom
import Settings from "./Settings";
//import EthereumSpinner from "./EthereumSpinner";

function Header() {
  const { t } = useTranslation();
  const [dialogMenu, setDialogMenu] = useState(false);
  const handleDialogMenuOpen = () => {
    setDialogMenu(true);
  };
  const handleDialogMenuClose = () => {
    setDialogMenu(false);
  };

  return (
    <React.Fragment>
      <Hidden xsDown>
        <Grid item xs={12} sm={3} lg={3} xl={3}>
          <Box mt={2} mr={2} textAlign="center"></Box>
        </Grid>
        <Grid item xs={12} sm={9} lg={9} xl={9}>
          <Box mt={2} mb={4}>
            <Typography variant="h1">{t("base.title")}</Typography>
            <Divider />
          </Box>
        </Grid>
      </Hidden>
      <Hidden smUp>
        <Fab color="primary" aria-label="menu" onClick={handleDialogMenuOpen}>
          <Icon path={mdiMenu} />
        </Fab>
        <Grid item xs={12}>
          <Box my={1}>
            <Typography variant="h1">{t("base.title")}</Typography>
            <Divider />
          </Box>
        </Grid>
        <div>
          <Dialog onClose={handleDialogMenuClose} aria-labelledby="menu" open={dialogMenu} keepMounted maxWidth="lg">
            <DialogContent>
              <Typography variant="h2" gutterBottom>
                {t("base.menu")}
              </Typography>

              <List>
                <ListItem button onClick={handleDialogMenuClose} component={Link} to="/">
                  <ListItemText primary={t("base.navStart")} />
                </ListItem>
                <ListItem button onClick={handleDialogMenuClose} component={Link} to="/about">
                  <ListItemText primary={t("base.navAbout")} />
                </ListItem>
                <ListItem button onClick={handleDialogMenuClose} component={Link} to="/services">
                  <ListItemText primary={t("base.navOffering")} />
                </ListItem>
                <ListItem button onClick={handleDialogMenuClose} component={Link} to="/projects">
                  <ListItemText primary={t("base.navProjects")} />
                </ListItem>
                <ListItem button onClick={handleDialogMenuClose} component={Link} to="/arts">
                  <ListItemText primary={t("base.navArts")} />
                </ListItem>
                <ListItem button onClick={handleDialogMenuClose} component={Link} to="/blog">
                  <ListItemText primary={t("base.navBlog")} />
                </ListItem>
                <ListItem button onClick={handleDialogMenuClose} component={Link} to="/wall">
                  <ListItemText primary={t("base.navWall")} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={<Settings />} />
                </ListItem>
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogMenuClose} variant="contained" color="primary">
                {t("base.close")}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Hidden>
    </React.Fragment>
  );
}

export default Header;
