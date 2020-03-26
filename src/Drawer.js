import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import Drawer from "@material-ui/core/Drawer";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
//icons
import Launch from 'mdi-material-ui/Launch';

class NavigationLeft extends Component {
  handleDrawerToggle = () => {
    this.props.onToggle();
  };

  render() {
    const { t, menutoggle } = this.props;

    const drawer = (
      <List>
        <ListItem>
          <Typography variant="h6" color="inherit">
            {t("base.app.title")}
          </Typography>
        </ListItem>
        <ListItem button component={Link} to="/">
          <ListItemText
            primary={
              <Typography variant="body1" color="inherit">
                Start
              </Typography>
            }
          />
        </ListItem>
        <ListItem button component={Link} to="/chat">
          <ListItemText
            primary={
              <Typography variant="body1" color="inherit">
                Chat
              </Typography>
            }
          />
        </ListItem>
        <ListItem button component={Link} to="/storage">
          <ListItemText
            primary={
              <Typography variant="body1" color="inherit">
                Storage
              </Typography>
            }
          />
        </ListItem>
        <ListItem button component={Link} to="/profile" disabled>
          <ListItemText
            primary={
              <Typography variant="body1" color="inherit">
                Profile
              </Typography>
            }
          />
        </ListItem>
        <ListItem button component="a" href="https://pacta.app" target="_blank" divider>
          <ListItemText
            primary={
              <Typography variant="body1" color="inherit">
                About
              </Typography>
            }
          />
          <ListItemSecondaryAction>
            <Launch fontSize="small" color="secondary" />
          </ListItemSecondaryAction>
        </ListItem>
        {this.props.isAppInstallable && !this.props.isAppInstalled ? (
          <ListItem button disabled>
            <ListItemText
              primary={
                <Typography variant="body1" color="inherit">
                  {t("menu.drawer.installapp")}
                </Typography>
              }
              onClick={() => this.props.deferredPrompt.prompt()}
            />
          </ListItem>
        ) : (
          <> </>
        )}
      </List>
    );

    return (
      <React.Fragment>
        <Hidden xsDown>
          <Drawer variant="persistent" open={menutoggle}>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smUp>
          <SwipeableDrawer
            variant="temporary"
            anchor="left"
            open={!menutoggle}
            onClose={this.handleDrawerToggle}
            onOpen={this.handleDrawerToggle}
          >
            <div onClick={this.handleDrawerToggle}>
              {drawer}
            </div>
          </SwipeableDrawer>
        </Hidden>
      </React.Fragment>
    );
  }
}

export default withTranslation()(NavigationLeft);
