import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//material-ui
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Zoom from "@material-ui/core/Zoom";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import List from "@material-ui/core/List";
//icons
import { Facebook, Linkedin, Email, Numeric3Box, Information, CreativeCommons, Twitter, Face } from "mdi-material-ui";
//images
import portraitBig from "../assets/simonbuechi-landscape-medium.jpg";

class Start extends Component {
  state = {
    dialogPortrait: false,
    dialogInfo: false,
  };

  handleDialogPortraitOpen = () => {
    this.setState({ dialogPortrait: true });
  };
  handleDialogPortraitClose = () => {
    this.setState({ dialogPortrait: false });
  };
  handleDialogInfoOpen = () => {
    this.setState({ dialogInfo: true });
  };
  handleDialogInfoClose = () => {
    this.setState({ dialogInfo: false });
  };

  render() {
    const { t } = this.props;
    const { dialogPortrait, dialogInfo } = this.state;

    const questions = [
      {
        question: t("start.q1"),
        answer: t("start.a1"),
      },
      {
        question: t("start.q2"),
        answer: t("start.a2"),
      },
      {
        question: t("start.q3"),
        answer: t("start.a3"),
      },
      {
        question: t("start.q4"),
        answer: t("start.a4"),
      },
    ];

    const myContacts = [
      { primary: "LinkedIn", secondary: "", link: "https://www.linkedin.com/in/simonbuechi", icon: <Linkedin /> },
      { primary: "Facebook", secondary: "", link: "https://www.linkedin.com/in/simonbuechi", icon: <Facebook /> },
      { primary: "Twitter", secondary: "", link: "https://twitter.com/simonbuechi", icon: <Twitter /> },
      { primary: "3Box", secondary: "", link: "https://3box.io/0x254b358a6047a03243971B4814b1AAfdF312EC56", icon: <Numeric3Box /> },
      { primary: "Email", secondary: "", link: "mailto:simon.buechi@gmail.com", icon: <Email /> },
    ];

    const myJobs = [
      { primary: "SWIC Digital", secondary: "CTO", link: "https://swic.digital" },
      { primary: "Pacta", secondary: "Founder", link: "https://pacta.app" },
      { primary: "Pacta Vote", secondary: "Founder & Developer", link: "https://pacta.vote" },
      { primary: "Blockchain Innovation Group", secondary: "Network Partner", link: "https://big-swiss.com" },
    ];

    return (
      <Grid container direction="row" justify="center" alignItems="flex-start" spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography variant="h2" gutterBottom>
            {t("start.title")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {t("start.paragraph1")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {t("start.paragraph2")}
          </Typography>
          <Typography gutterBottom>
            <Button variant="outlined" color="primary" onClick={this.handleDialogInfoOpen} startIcon={<Information />}>
              {t("start.dialogInfoButton")}
            </Button>
          </Typography>
          <Typography gutterBottom>
            <Button variant="outlined" color="primary" onClick={this.handleDialogPortraitOpen} startIcon={<Face />}>
              {t("start.image")}
            </Button>
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h2" gutterBottom>
            {t("start.connectTitle")}
          </Typography>
          <List dense>
            {myContacts.map((item, index) => (
              <Zoom in style={{ transitionDelay: 450 + index * 100 + "ms" }} key={item.primary}>
                <div>
                  <ListItem button component="a" href={item.link}>
                    <ListItemIcon color="secondary">{item.icon}</ListItemIcon>
                    <ListItemText primary={item.primary} secondary={item.secondary} />
                  </ListItem>
                </div>
              </Zoom>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h2" gutterBottom>
            {t("start.engagementsTitle")}
          </Typography>
          <List dense>
            {myJobs.map((item, index) => (
              <Zoom in style={{ transitionDelay: 450 + index * 100 + "ms" }} key={item.primary}>
                <div>
                  <ListItem button component="a" href={item.link}>
                    <ListItemText primary={item.primary} secondary={item.secondary} />
                  </ListItem>
                </div>
              </Zoom>
            ))}
          </List>
          <Dialog onClose={this.handleDialogPortraitClose} aria-labelledby="dialogPortrait" open={dialogPortrait} maxWidth="xl">
            <DialogContent>
              <img src={portraitBig} alt="simon buechi portrait" className="dialog" />
            </DialogContent>
            <DialogActions>
              <Button rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/" color="secondary" startIcon={<CreativeCommons />}>
                {t("base.creativecommons")}
              </Button>
              &nbsp;
              <Button onClick={this.handleDialogPortraitClose} color="secondary" autoFocus>
                {t("base.close")}
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog onClose={this.handleDialogInfoClose} aria-labelledby="dialogInfo" open={dialogInfo}>
            <DialogContent>
              <Typography variant="h2" gutterBottom>
                {t("start.dialogInfoTitle")}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {t("start.dialogInfoBody")}
              </Typography>
              <List>
                {questions.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={item.question} secondary={item.answer} />
                  </ListItem>
                ))}
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDialogInfoClose} color="secondary" autoFocus>
                {t("base.close")}
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    );
  }
}

export default withTranslation()(Start);
