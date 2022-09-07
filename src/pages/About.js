import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { CopyToClipboard } from "react-copy-to-clipboard";
//material-ui
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Zoom from "@mui/material/Zoom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Tooltip from "@mui/material/Tooltip";
//icons
import Icon from "../utils/Icon";
import {
  mdiGamepad,
  mdiFilmstrip,
  mdiBookOpenVariant,
  mdiBitcoin,
  mdiEthereum,
  mdiGithub,
  mdiInformation,
  mdiOpenInNew,
  mdiFacebook,
  mdiLinkedin,
  mdiTwitter,
  mdiWhatsapp,
} from "@mdi/js";
//custom
import QrCode from "../structure/QrCode";
import config from "../config.json";

function About() {
  const { t } = useTranslation();
  const [success, setSuccess] = useState(false);
  const [dialogInfo, setDialogInfo] = useState(false);

  const handleCopyClick = () => {
    if (!success) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
    }
  };

  const handleDialogInfoOpen = () => {
    setDialogInfo(true);
  };
  const handleDialogInfoClose = () => {
    setDialogInfo(false);
  };

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
    { primary: "LinkedIn", secondary: "", link: "https://www.linkedin.com/in/simonbuechi", icon: <Icon path={mdiLinkedin} /> },
    { primary: "Facebook", secondary: "", link: "https://www.linkedin.com/in/simonbuechi", icon: <Icon path={mdiFacebook} /> },
    { primary: "Twitter", secondary: "", link: "https://twitter.com/simonbuechi", icon: <Icon path={mdiTwitter} /> },
    { primary: "Whatsapp", secondary: "", link: "https://wa.me/41787401627", icon: <Icon path={mdiWhatsapp} /> },
  ];

  const myCryptos = [
    { primary: "Ethereum Name System (ENS)", secondary: config.ensName, qr: false, copy: true, icon: <Icon path={mdiEthereum} /> },
    { primary: "Ethereum", secondary: config.ethereumAddress, qr: true, copy: true, icon: <Icon path={mdiEthereum} /> },
    { primary: "Bitcoin", secondary: config.bitcoinAddress, qr: true, copy: true, icon: <Icon path={mdiBitcoin} /> },
  ];

  const myLinks = [
    { primary: t("about.linksCode"), secondary: t("about.linksCode2"), link: "https://github.com/simonbuechi", icon: <Icon path={mdiGithub} /> },
    {
      primary: t("about.linksBooks"),
      secondary: t("about.linksBooks2"),
      link: "https://www.goodreads.com/user/show/32950234-simon-b-chi",
      icon: <Icon path={mdiBookOpenVariant} />,
    },
    { primary: t("about.linksMovies"), secondary: t("about.linksMovies2"), link: "http://www.imdb.com/user/ur27356928/", icon: <Icon path={mdiFilmstrip} /> },
    { primary: t("about.linksGames"), secondary: t("about.linksGames2"), link: "https://www.igdb.com/users/simonbuechi", icon: <Icon path={mdiGamepad} /> },
  ];

  return (
    <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={4}>
      <Helmet>
        <title>Simon Buechi | About</title>
        <meta name="description" content="Simon Buechi Büchi about" />
      </Helmet>
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
          {t("about.aboutSiteBody")}
        </Typography>
        <Typography gutterBottom>
          <Button variant="contained" color="primary" onClick={handleDialogInfoOpen} startIcon={<Icon path={mdiInformation} />}>
            {t("start.dialogInfoButton")}
          </Button>
          &nbsp;
          <Button variant="contained" color="primary" href="https://github.com/simonbuechi/dweb" startIcon={<Icon path={mdiOpenInNew} />}>
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
            <Zoom in style={{ transitionDelay: 500 + index * 100 + "ms" }} key={item.primary}>
              <div>
                <CopyToClipboard text={item.secondary} onCopy={handleCopyClick}>
                  <ListItem button>
                    <Tooltip title={success ? t("base.copied") : t("base.copyClipboard")}>
                      <ListItemIcon color="secondary">{item.icon}</ListItemIcon>
                    </Tooltip>
                    <ListItemText
                      primary={item.primary}
                      secondary={
                        <Typography variant="body2" noWrap>
                          {item.secondary}
                        </Typography>
                      }
                    />
                    {item.qr && <QrCode text={item.secondary} />}
                  </ListItem>
                </CopyToClipboard>
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
              <Zoom in style={{ transitionDelay: 900 + index * 100 + "ms" }} key={item.primary}>
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
        <Dialog onClose={handleDialogInfoClose} aria-labelledby="dialogInfo" open={dialogInfo}>
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
            <Button color="primary" variant="contained" onClick={handleDialogInfoClose} autoFocus>
              {t("base.close")}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
}

export default About;
