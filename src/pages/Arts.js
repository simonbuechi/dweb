import React, { Component, Suspense, lazy } from "react";
import { withTranslation } from "react-i18next";
//material-ui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Zoom from "@material-ui/core/Zoom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
//icons
import { ArrowExpand } from "mdi-material-ui";
//artworks
const A001 = lazy(() => import("../artworks/A001"));
const A002 = lazy(() => import("../artworks/A002"));
const A003 = lazy(() => import("../artworks/A003"));

class Arts extends Component {
  state = {
    dialog: false,
    currentArtwork: <></>,
  };

  handledialogOpen = () => {
    this.setState({ dialog: true });
  };
  handledialogClose = () => {
    this.setState({ dialog: false });
  };
  openArtwork = (currentArtwork) => {
    this.setState({ currentArtwork });
    this.handledialogOpen();
  };
  formatDate = (timestamp) => {
    return Intl.DateTimeFormat("default", { weekday: "long", year: "numeric", month: "long", day: "numeric" }).format(new Date(timestamp * 1000));
  };
  render() {
    const { t } = this.props;
    const { dialog, currentArtwork } = this.state;

    // tags: animated,

    const myDrafts = [
      { primary: "Demo stuff", secondary: "Some demo stuff", date: new Date(2020, 12, 5), content: <A001 /> },
      { primary: "Demo stuff", secondary: "Some demo stuff", date: new Date(2020, 1, 5), content: <A002 /> },
      { primary: "Demo stuff", secondary: "Some demo stuff", date: new Date(2020, 12, 5), content: <A003 /> },
    ];

    const myArtworks = [
      { primary: "Demo stuff", secondary: "Some demo stuff", date: new Date(2020, 12, 5), content: <A001 /> },
      { primary: "Demo stuff", secondary: "Some demo stuff", date: new Date(2020, 1, 5), content: <A002 /> },
      { primary: "Demo stuff", secondary: "Some demo stuff", date: new Date(2020, 12, 5), content: <A003 /> },
    ];

    return (
      <Grid container direction="row" justify="center" alignItems="flex-start" spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h2" gutterBottom>
            {t("arts.title")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {t("arts.about")}
          </Typography>
          <List dense>
            {myArtworks.map((item, index) => (
              <Zoom in style={{ transitionDelay: 50 + index * 100 + "ms" }} key={index}>
                <div>
                  <ListItem button onClick={() => this.openArtwork(item.content)}>
                    <ListItemIcon color="secondary">
                      <ArrowExpand />
                    </ListItemIcon>
                    <ListItemText primary={item.primary} secondary={item.secondary} />
                    <ListItemSecondaryAction>{Intl.DateTimeFormat("default").format(item.date)}</ListItemSecondaryAction>
                  </ListItem>
                </div>
              </Zoom>
            ))}
          </List>
          <Box my={3}>
            <Typography variant="h2" gutterBottom>
              {t("arts.draftsTitle")}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t("arts.draftsAbout")}
            </Typography>
            <List dense>
              {myDrafts.map((item, index) => (
                <Zoom in style={{ transitionDelay: 400 + index * 100 + "ms" }} key={index}>
                  <div>
                    <ListItem button onClick={() => this.openArtwork(item.content)}>
                      <ListItemIcon color="secondary">
                        <ArrowExpand />
                      </ListItemIcon>
                      <ListItemText primary={item.primary} secondary={item.secondary} />
                      <ListItemSecondaryAction>{Intl.DateTimeFormat("default").format(item.date)}</ListItemSecondaryAction>
                    </ListItem>
                  </div>
                </Zoom>
              ))}
            </List>
          </Box>
          <Dialog fullScreen onClose={this.handledialogClose} aria-labelledby="dialog" open={dialog}>
            <Suspense fallback={<CircularProgress color="primary" />}>{currentArtwork}</Suspense>

            <DialogActions>
              <Button onClick={this.handledialogClose} color="secondary" autoFocus>
                {t("base.close")}
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Grid item xs={12} md={4}>
          &nbsp;
        </Grid>
      </Grid>
    );
  }
}

export default withTranslation()(Arts);
