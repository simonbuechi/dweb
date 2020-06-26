import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { getThreadByAddress, listSpaces } from "3box/lib/api";
import Markdown from "react-showdown";
//material-ui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Zoom from "@material-ui/core/Zoom";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
//icons
import { Numeric3Box, OpenInNew, Information, ChevronDown } from "mdi-material-ui";
//custom
import config from "../config.json";
import configShowdown from "../style/configShowdown.json";
//import { getParsedThread } from "../utils/parseThread";

class Blog extends Component {
  state = {
    dialogOpen: false,
    blogPosts: [],
    ready: false,
  };

  componentDidMount = async () => {
    const spaces = await listSpaces(config.ethereumAddress);
    if (spaces.includes(config.blogSpaceName)) {
      let blogPosts = await getThreadByAddress(config.blogThread);
      blogPosts = blogPosts.sort((a, b) => {
        a = a.timestamp;
        b = b.timestamp;
        return a > b ? -1 : a < b ? 1 : 0;
      });

      /*
      for (var i = 0; i < blogPosts.length; i++) {
        try {
          const parsedMessage = fm(postThread.message);
          const author = postThread.author;
          const tags = parsedMessage.attributes.tags ? parsedMessage.attributes.tags.split(",") : [];
          return {
            title: parsedMessage.attributes.title,
            description: parsedMessage.attributes.description,
            body: parsedMessage.body,
            threadData: { ...postThread, author },
            tags,
          };
        } catch (error) {
          console.error(error);
          return {
            title: "Error Parsing message",
            description: "",
            body: postThread.message,
            threadData: { ...postThread, author: "author" },
            tags: [],
          };
        }
      }
      */

      this.setState({ blogPosts });
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
    const { t } = this.props;
    const { ready, blogPosts, dialogOpen } = this.state;

    return (
      <Grid item xs={12} lg={12}>
        <Typography variant="h2" gutterBottom>
          {t("blog.title")}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {t("blog.description")}
        </Typography>
        <Button variant="outlined" color="primary" href={"https://3box.io/" + config.ethereumAddress} startIcon={<OpenInNew />}>
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
        ) : (
          blogPosts.map((item, index) => (
            <Zoom in style={{ transitionDelay: 450 + index * 100 + "ms" }} key={item.postId}>
              <Box my={2}>
                <ExpansionPanel>
                  <Tooltip title="Click to get details">
                    <ExpansionPanelSummary expandIcon={<ChevronDown />}>
                      <Typography>
                        {item.author} ({this.unixToDate(item.timestamp)})
                      </Typography>
                    </ExpansionPanelSummary>
                  </Tooltip>
                  <ExpansionPanelDetails>
                    <Box>
                      <Markdown dangerouslySetInnerHTML markdown={item.message} options={configShowdown} />
                    </Box>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Box>
            </Zoom>
          ))
        )}
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
