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
const wallSpaceName = "MyFollowing";
const profileWall = "profileWall";

class Offering extends Component {
  state = {
    dialogOpen: false,
    wallPosts: [],
    wallAuthors: {},
    ready: false,
  };

  componentDidMount = async () => {
    const spaces = await listSpaces(profileAddress);
    if (spaces.includes(wallSpaceName)) {
      const wallPosts = await getThread(wallSpaceName, profileWall, profileAddress, false, {});
      this.setState({
        wallPosts,
      });
      this.setState({ ready: true });
      let wallAuthors = {};
      /*
      wallPosts.forEach(async (item) => {
        if (!wallAuthors.hasOwnProperty(item.author)) {
          let x = await getProfile(item.author);
          wallAuthors[item.author] = x;
        }
      });
      */
      for (var i = 0; i < wallPosts.length; i++) {
        if (!wallAuthors.hasOwnProperty(wallPosts[i].author)) {
          const x = await getProfile(wallPosts[i].author);
          wallAuthors[wallPosts[i].author] = x;
        }
      }
      //console.log(wallAuthors);
      //console.log(wallAuthors["did:3:bafyreic5d24y7f3dd4b565ctupaobf45nezbvryhyual2xp64yduhixj7y"].coverPhoto[0].contentUrl["/"]);
      //console.log(wallAuthors.hasOwnProperty("did:3:bafyreic5d24y7f3dd4b565ctupaobf45nezbvryhyual2xp64yduhixj7y"));
      //console.log(wallPosts);
      this.setState({ wallAuthors });
    }
  };

  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };
  unixToDate = (timestamp) => {
    return Intl.DateTimeFormat("default", { weekday: "long", year: "numeric", month: "long", day: "numeric" }).format(new Date(timestamp * 1000));
  };

  render() {
    const { ready, wallPosts, wallAuthors } = this.state;

    return (
      <Grid item xs={12} lg={12}>
        <Typography variant="h2" gutterBottom>
          My Wall
        </Typography>
        <Typography variant="body2" gutterBottom>
          My Wall
        </Typography>
        <Button variant="outlined" color="primary" href={"https://3box.io/" + profileAddress} startIcon={<OpenInNew />}>
          Write on my Wall
        </Button>
        &nbsp;
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen} startIcon={<Information />}>
          What is this about?
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
                      wallAuthors.hasOwnProperty(item.author) ? (
                        <Avatar
                          src={
                            wallAuthors[item.author].coverPhoto[0].contentUrl
                              ? "https://ipfs.infura.io/ipfs/" + wallAuthors[item.author].image[0].contentUrl["/"]
                              : ""
                          }
                          alt={wallAuthors[item.author].name ? wallAuthors[item.author].name : item.author}
                        />
                      ) : (
                        <Avatar>
                          <Account />
                        </Avatar>
                      )
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
        <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.dialogOpen} maxWidth="xl">
          <DialogContent>
            How does this wall work? ...
            <Button variant="outlined" color="primary" href="https://docs.3box.io/" startIcon={<Numeric3Box />}>
              Learn more about 3box
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  }
}

export default withTranslation()(Offering);
