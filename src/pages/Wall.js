import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { getThread, listSpaces, getProfile } from "3box/lib/api";
//material-ui
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Zoom from "@mui/material/Zoom";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Alert from "@material-ui/lab/Alert";
//icons
import { mdiAccount, mdiWeb, mdiTwitter, mdiNumeric3Box, mdiGithub, mdiEmail, mdiOpenInNew, mdiInformation } from "@mdi/js";
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
          <Alert variant="filled" severity="warning">
            {t("base.experimental")}
          </Alert>
        </Box>
        <Typography variant="body2" gutterBottom>
          {t("wall.description")} ( {t("wall.buttonWriteWallNote")} )
        </Typography>
        <Button variant="contained" color="primary" href={"https://3box.io/" + config.ethereumAddress} startIcon={<mdiOpenInNew />}>
          {t("wall.buttonWriteWall")}
        </Button>
        &nbsp;
        <Button variant="outlined" color="primary" onClick={this.handleDialogOpen} startIcon={<mdiInformation />}>
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
                            <mdiAccount />
                          </Avatar>
                        )}
                      </Tooltip>
                    }
                    action={
                      <>
                        {wallAuthors.hasOwnProperty(item.author) && wallAuthors[item.author].hasOwnProperty("website") && (
                          <Tooltip title="Website">
                            <IconButton href={wallAuthors[item.author].website}>
                              <mdiWeb />
                            </IconButton>
                          </Tooltip>
                        )}
                        {wallAuthors.hasOwnProperty(item.author) && wallAuthors[item.author].hasOwnProperty("email") && (
                          <Tooltip title="Email">
                            <IconButton>
                              <mdiEmail />
                            </IconButton>
                          </Tooltip>
                        )}
                        {wallAuthors.hasOwnProperty(item.author) && wallAuthors[item.author].hasOwnProperty("github") && (
                          <Tooltip title="Github">
                            <IconButton>
                              <mdiGithub />
                            </IconButton>
                          </Tooltip>
                        )}
                        {wallAuthors.hasOwnProperty(item.author) && wallAuthors[item.author].hasOwnProperty("twitter") && (
                          <Tooltip title="Twitter">
                            <IconButton>
                              <mdiTwitter />
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
            <Button variant="outlined" color="primary" href="https://docs.3box.io/" startIcon={<mdiNumeric3Box />}>
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
