import React, { Component } from "react";
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
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
//icons
import {
  Gamepad,
  Filmstrip,
  BookOpenVariant,
  Bitcoin,
  Ethereum,
  Github,
  Information,
  OpenInNew,
  Facebook,
  Linkedin,
  Numeric3Box,
  Twitter,
  Whatsapp,
} from "mdi-material-ui";
//custom
import CopyButton from "../structure/CopyButton";
import QrCode from "../structure/QrCode";
import config from "../config.json";

class About extends Component {
  state = {
    dialogInfo: false,
  };

  handleDialogInfoOpen = () => {
    this.setState({ dialogInfo: true });
  };
  handleDialogInfoClose = () => {
    this.setState({ dialogInfo: false });
  };

  render() {
    const { t } = this.props;
    const { dialogInfo } = this.state;

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
      { primary: "Whatsapp", secondary: "", link: "https://wa.me/41787401627", icon: <Whatsapp /> }
        ];

    const myCryptos = [
      { primary: "Ethereum", secondary: config.ethereumAddress, link: 2, icon: <Ethereum /> },
      { primary: "Bitcoin", secondary: config.bitcoinAddress, link: 2, icon: <Bitcoin /> },
    ];

    const myLinks = [
      { primary: t("about.linksCode"), secondary: t("about.linksCode2"), link: "https://github.com/simonbuechi", icon: <Github /> },
      {
        primary: t("about.linksBooks"),
        secondary: t("about.linksBooks2"),
        link: "https://www.goodreads.com/user/show/32950234-simon-b-chi",
        icon: <BookOpenVariant />,
      },
      { primary: t("about.linksMovies"), secondary: t("about.linksMovies2"), link: "http://www.imdb.com/user/ur27356928/", icon: <Filmstrip /> },
      { primary: t("about.linksGames"), secondary: t("about.linksGames2"), link: "https://www.igdb.com/users/simonbuechi", icon: <Gamepad /> },
    ];

    return (
      <Grid container direction="row" justify="center" alignItems="flex-start" spacing={4}>
        <Grid item xs={12} md={12}>
          <Typography variant="h2" gutterBottom>
            {t("about.title")}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box mb={3}>
            <Typography variant="h3" gutterBottom>
              {t("start.connectTitle")}
            </Typography>
            <List dense>
              {myContacts.map((item, index) => (
                <Zoom in style={{ transitionDelay: 50 + index * 100 + "ms" }} key={item.primary}>
                  <div>
                    <ListItem button component="a" href={item.link}>
                      <ListItemIcon color="secondary">{item.icon}</ListItemIcon>
                      <ListItemText primary={item.primary} secondary={item.secondary} />
                    </ListItem>
                  </div>
                </Zoom>
              ))}
            </List>
          </Box>
          <Typography variant="h3" gutterBottom>
            {t("about.aboutSiteTitle")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {t("start.paragraph2")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {t("about.aboutSiteBody")}
          </Typography>
          <Typography gutterBottom>
            <Button variant="contained" color="primary" onClick={this.handleDialogInfoOpen} startIcon={<Information />}>
              {t("start.dialogInfoButton")}
            </Button>
            &nbsp;
            <Button variant="contained" color="primary" href="https://github.com/simonbuechi/dweb" startIcon={<OpenInNew />}>
              {t("about.linkGithub")}
            </Button>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom>
            {t("about.blockchainTitle")}
          </Typography>
          <List dense>
            {myCryptos.map((item, index) => (
              <Zoom in style={{ transitionDelay: 150 + index * 100 + "ms" }} key={item.primary}>
                <div>
                  <ListItem>
                    <ListItemIcon color="secondary">{item.icon}</ListItemIcon>
                    <ListItemText
                      primary={item.primary}
                      secondary={
                        <Typography variant="body2" noWrap>
                          {item.secondary}
                        </Typography>
                      }
                    />
                    <QrCode text={item.secondary} />
                    <CopyButton text={item.secondary} />
                  </ListItem>
                </div>
              </Zoom>
            ))}
          </List>
          <Typography variant="h3" gutterBottom>
            {t("about.linksTitle")}
          </Typography>
          <Box>
            <List dense>
              {myLinks.map((item, index) => (
                <Zoom in style={{ transitionDelay: 850 + index * 100 + "ms" }} key={item.primary}>
                  <div>
                    <ListItem button component="a" href={item.link}>
                      <ListItemIcon color="secondary">{item.icon}</ListItemIcon>
                      <ListItemText primary={item.primary} secondary={item.secondary} />
                    </ListItem>
                  </div>
                </Zoom>
              ))}
            </List>
          </Box>
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
              <Button color="primary" variant="contained" onClick={this.handleDialogInfoClose} autoFocus>
                {t("base.close")}
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    );
  }
}

export default withTranslation()(About);
