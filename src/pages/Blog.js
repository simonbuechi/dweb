import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { getThread, listSpaces, getProfile } from "3box/lib/api";
//material-ui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Zoom from "@material-ui/core/Zoom";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
//icons
import { Account, Web, Twitter, Numeric3Box, Github, Email, OpenInNew, Information } from "mdi-material-ui";

const profileAddress = "0x254b358a6047a03243971B4814b1AAfdF312EC56";
const blogSpaceName = "MyFollowing";
const blogProfile = "profileWall";

class Blog extends Component {
  state = {
    dialogOpen: false,
    blogPosts: [],
    ready: false,
  };

  componentDidMount = async () => {
    const spaces = await listSpaces(profileAddress);
    if (spaces.includes(blogSpaceName)) {
      const blogPosts = await getThread(blogSpaceName, blogProfile, profileAddress, false, {});
      this.setState({
        blogPosts,
      });
      this.setState({ ready: true });
    }
  };

  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };
  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };
  unixToDate = (timestamp) => {
    return Intl.DateTimeFormat("default", { weekday: "long", year: "numeric", month: "long", day: "numeric" }).format(new Date(timestamp * 1000));
  };

  render() {
    const { ready, blogPosts, dialogOpen } = this.state;

    return (
      <Grid item xs={12} lg={12}>
        <Typography variant="h2" gutterBottom>
          {t("blog.title")}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {t("blog.description")}
        </Typography>
        <Button variant="outlined" color="primary" href={"https://3box.io/" + profileAddress} startIcon={<OpenInNew />}>
          {t("blog.buttonWriteblog")}
        </Button>
        <Typography variant="body2" gutterBottom>
          {t("blog.buttonWriteblogNote")}
        </Typography>
        &nbsp;
        <Button variant="outlined" color="primary" onClick={this.handleDialogOpen} startIcon={<Information />}>
          {t("blog.dialogButton")}
        </Button>
        {!ready ? (
          <Box my={3}>
            <CircularProgress color="primary" />
          </Box>
        ) : (<></>)}
          
        <Dialog onClose={this.handleDialogClose} aria-labelledby="simple-dialog-title" open={dialogOpen} maxWidth="xl">
          <DialogContent>
            {t("blog.dialogTitle")}
            <Button variant="outlined" color="primary" href="https://docs.3box.io/" startIcon={<Numeric3Box />}>
              Learn more about 3box
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="secondary" autoFocus>
            {t("base.close")}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  }
}

export default withTranslation()(Blog);