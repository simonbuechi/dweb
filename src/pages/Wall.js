import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
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
import Alert from "@material-ui/lab/Alert";
//icons
import { Account, Web, Twitter, Numeric3Box, Github, Email, OpenInNew, Information } from "mdi-material-ui";
// custom
import config from "../config.json";

class Wall extends Component {
  state = {
    dialogOpen: false,
    wallPosts: [],
    wallAuthors: {},
    ready: false,
  };

  componentDidMount = async () => {
    const spaces = await listSpaces(config.ethereumAddress);
    if (spaces.includes(config.wallSpaceName)) {
      let wallPosts = await getThread(config.wallSpaceName, config.wallProfile, config.ethereumAddress, false, {});
      // sort by timestamp
      wallPosts = wallPosts.sort((a, b) => {
        a = a.timestamp;
        b = b.timestamp;
        return a > b ? -1 : a < b ? 1 : 0;
      });
      this.setState({ wallPosts });
      // render wallPosts without profile information
      this.setState({ ready: true });
      let wallAuthors = {};
      // get all authors from wallposts and get their profiles
      for (var i = 0; i < wallPosts.length; i++) {
        if (!wallAuthors.hasOwnProperty(wallPosts[i].author)) {
          const x = await getProfile(wallPosts[i].author);
          wallAuthors[wallPosts[i].author] = x;
        }
      }
      this.setState({ wallAuthors });
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
    const { t } = this.props;
    const { ready, wallPosts, wallAuthors, dialogOpen } = this.state;

    return (
      <Grid item xs={12} lg={12}>
                <Helmet>
          <title>Simon Buechi | Wall</title>
          <meta name="description" content="Simon Buechi Büchi wall" />
        </Helmet>
        <Typography variant="h2" gutterBottom>
          {t("wall.title")}
        </Typography>
        <Box my={2}>
          <Alert variant="filled" severity="warning">{t("base.experimental")}</Alert>
        </Box>
        <Typography variant="body2" gutterBottom>
          {t("wall.description")} ( {t("wall.buttonWriteWallNote")} )
        </Typography>
        <Button variant="contained" color="primary" href={"https://3box.io/" + config.ethereumAddress} startIcon={<OpenInNew />}>
          {t("wall.buttonWriteWall")}
        </Button>
        &nbsp;
        <Button variant="outlined" color="primary" onClick={this.handleDialogOpen} startIcon={<Information />}>
          {t("wall.dialogInfoButton")}
        </Button>
        {!ready ? (
          <Box my={3}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          wallPosts.map((item, index) => (
            <Zoom in style={{ transitionDelay: 450 + index * 100 + "ms" }} key={item.postId}>
              <Box my={1}>
                <Card>
                  <CardHeader
                    avatar={
                      <Tooltip title={item.author}>
                        {wallAuthors.hasOwnProperty(item.author) && wallAuthors[item.author].hasOwnProperty("image") ? (
                          <Avatar src={"https://ipfs.infura.io/ipfs/" + wallAuthors[item.author].image[0].contentUrl["/"]} />
                        ) : (
                          <Avatar>
                            <Account />
                          </Avatar>
                        )}
                      </Tooltip>
                    }
                    action={
                      <>
                        {wallAuthors.hasOwnProperty(item.author) && wallAuthors[item.author].hasOwnProperty("website") && (
                          <Tooltip title="Website">
                            <IconButton href={wallAuthors[item.author].website}>
                              <Web />
                            </IconButton>
                          </Tooltip>
                        )}
                        {wallAuthors.hasOwnProperty(item.author) && wallAuthors[item.author].hasOwnProperty("email") && (
                          <Tooltip title="Email">
                            <IconButton>
                              <Email />
                            </IconButton>
                          </Tooltip>
                        )}
                        {wallAuthors.hasOwnProperty(item.author) && wallAuthors[item.author].hasOwnProperty("github") && (
                          <Tooltip title="Github">
                            <IconButton>
                              <Github />
                            </IconButton>
                          </Tooltip>
                        )}
                        {wallAuthors.hasOwnProperty(item.author) && wallAuthors[item.author].hasOwnProperty("twitter") && (
                          <Tooltip title="Twitter">
                            <IconButton>
                              <Twitter />
                            </IconButton>
                          </Tooltip>
                        )}
                      </>
                    }
                    title={
                      wallAuthors.hasOwnProperty(item.author) && wallAuthors[item.author].hasOwnProperty("name") ? wallAuthors[item.author].name : item.author
                    }
                    subheader={this.unixToDate(item.timestamp)}
                  />
                  <CardContent>
                    <Typography variant="body2">{item.message}</Typography>
                  </CardContent>
                </Card>
              </Box>
            </Zoom>
          ))
        )}
        <Dialog onClose={this.handleDialogClose} aria-labelledby="simple-dialog-title" open={dialogOpen} maxWidth="xl">
          <DialogContent>
            {t("wall.dialogInfoTitle")}
            <Button variant="outlined" color="primary" href="https://docs.3box.io/" startIcon={<Numeric3Box />}>
              {t("wall.dialogInfo3boxButton")}
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

export default withTranslation()(Wall);
