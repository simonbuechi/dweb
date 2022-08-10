import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { getThreadByAddress, listSpaces, getProfile } from "3box/lib/api";
import Markdown from "react-showdown";
import fm from "front-matter";
//material-ui
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Zoom from "@mui/material/Zoom";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Collapse from "@mui/material/Collapse";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Alert from "@material-ui/lab/Alert";
//icons
import { mdiOpenInNew, mdiInformationOutline, mdiMessage, mdiShare, mdiChevronDown, mdiAccount } from "@mdi/js";
//custom
import config from "../config.json";
import configShowdown from "../style/configShowdown.json";

class Blog extends Component {
  state = {
    dialogOpen: false,
    blogPosts: [],
    blogAuthors: {},
    ready: false,
    blogExpanded: [],
  };

  componentDidMount = async () => {
    const spaces = await listSpaces(config.ethereumAddress);
    if (spaces.includes(config.blogSpaceName)) {
      let blogPosts = await getThreadByAddress(config.blogThread);
      //sort by date
      blogPosts = blogPosts.sort((a, b) => {
        a = a.timestamp;
        b = b.timestamp;
        return a > b ? -1 : a < b ? 1 : 0;
      });
      //parse thread
      for (var i = 0; i < blogPosts.length; i++) {
        blogPosts[i] = this.parseThread(blogPosts[i]);
      }
      this.setState({ blogPosts });
      this.setState({ ready: true });
      //get authors
      let blogAuthors = {};
      for (var j = 0; j < blogPosts.length; j++) {
        if (!blogAuthors.hasOwnProperty(blogPosts[j].author)) {
          const profile = await getProfile(blogPosts[j].author);
          blogAuthors[blogPosts[j].author] = profile;
        }
      }
      this.setState({ blogAuthors });
    }
  };

  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };
  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };
  handleExpandClick = (index) => () => {
    let blogExpanded = this.state.blogExpanded;
    blogExpanded[index] = blogExpanded[index] ? !blogExpanded[index] : true;
    this.setState({ blogExpanded });
  };
  unixToDate = (timestamp) => {
    return Intl.DateTimeFormat("default", { weekday: "long", year: "numeric", month: "long", day: "numeric" }).format(new Date(timestamp * 1000));
  };
  parseThread = (postThread) => {
    try {
      const parsedMessage = fm(postThread.message);
      const tags = parsedMessage.attributes.tags ? parsedMessage.attributes.tags.split(",") : [];
      const date = this.unixToDate(postThread.timestamp);
      return {
        title: parsedMessage.attributes.title,
        description: parsedMessage.attributes.description,
        body: parsedMessage.body,
        ...postThread,
        tags,
        date,
      };
    } catch (error) {
      console.error(error);
      return {
        title: "Error Parsing message",
        description: "",
        body: postThread.message,
        ...postThread,
        author: "author",
        tags: [],
        date: "",
      };
    }
  };

  render() {
    const { t } = this.props;
    const { ready, blogPosts, blogAuthors, dialogOpen, blogExpanded } = this.state;
    //console.log(blogExpanded);
    return (
      <Grid item xs={12} lg={12}>
        <Helmet>
          <title>Simon Buechi | Blog</title>
          <meta name="description" content="Simon Buechi Büchi blog" />
        </Helmet>
        <Typography variant="h2" gutterBottom>
          {t("blog.title")}
        </Typography>
        <Box my={2}>
          <Alert variant="filled" severity="warning">
            {t("base.experimental")}
          </Alert>
        </Box>
        <Typography variant="body2" gutterBottom>
          {t("blog.description")}
        </Typography>
        <Button variant="outlined" color="secondary" href="/" startIcon={<mdiOpenInNew />} disabled>
          {t("blog.linkMain")}
        </Button>
        &nbsp;
        <Button variant="outlined" color="secondary" href="https://medium.com/@simonbuechi" startIcon={<mdiOpenInNew />}>
          {t("blog.linkMedium")}
        </Button>
        &nbsp;
        <Button variant="outlined" color="primary" onClick={this.handleDialogOpen} startIcon={<mdiInformationOutline />}>
          {t("blog.dialogButton")}
        </Button>
        {!ready ? (
          <Box my={3}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          blogPosts.map((item, index) => (
            <Zoom in style={{ transitionDelay: 450 + index * 100 + "ms" }} key={index}>
              <Box my={2}>
                <Card>
                  <CardActionArea onClick={this.handleExpandClick(index)}>
                    <CardHeader
                      avatar={
                        blogAuthors.hasOwnProperty(item.author) && blogAuthors[item.author].hasOwnProperty("image") ? (
                          <Avatar src={"https://ipfs.infura.io/ipfs/" + blogAuthors[item.author].image[0].contentUrl["/"]} />
                        ) : (
                          <Avatar>
                            <mdiAccount />
                          </Avatar>
                        )
                      }
                      title={
                        blogAuthors.hasOwnProperty(item.author) && blogAuthors[item.author].hasOwnProperty("name") ? blogAuthors[item.author].name : item.author
                      }
                      subheader={this.unixToDate(item.timestamp)}
                    />
                    <CardContent>
                      <Typography variant="h2">{item.title}</Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions disableSpacing>
                    <Tooltip title="Read more">
                      <IconButton onClick={this.handleExpandClick(index)}>
                        <mdiChevronDown />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Share">
                      <IconButton>
                        <mdiShare />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Copy full message">
                      <IconButton>
                        <mdiMessage />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Copy ID">
                      <IconButton>
                        <mdiShare />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={"Post ID is " + item.postId + ", created by " + item.author}>
                      <IconButton>
                        <mdiInformationOutline />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                  <Collapse in={blogExpanded[index]} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Markdown dangerouslySetInnerHTML markdown={item.body} options={configShowdown} />
                    </CardContent>
                  </Collapse>
                </Card>
              </Box>
            </Zoom>
          ))
        )}
        <Dialog onClose={this.handleDialogClose} aria-labelledby="simple-dialog-title" open={dialogOpen} maxWidth="xl">
          <DialogContent>
            <Typography variant="h2" gutterBottom>
              {t("blog.dialogTitle")}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t("blog.dialogBody1")}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t("blog.dialogBody2")}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t("blog.dialogBody3")}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t("blog.dialogBody4")}
            </Typography>
            <Button variant="contained" color="secondary" href="/" disabled>
              {t("blog.dialogBlogLink")}
            </Button>
            &nbsp;
            <Button variant="outlined" color="primary" href="https://docs.3box.io">
              {t("blog.dialog3BoxLink")}
            </Button>
            &nbsp;
            <Button variant="outlined" color="primary" href="https://orbitdb.org">
              {t("blog.dialogOrbitLink")}
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
