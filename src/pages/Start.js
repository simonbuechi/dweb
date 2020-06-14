import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//material-ui
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import CardActionArea from "@material-ui/core/CardActionArea";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Zoom from "@material-ui/core/Zoom";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import Tooltip from "@material-ui/core/Tooltip";
import List from "@material-ui/core/List";
//icons
import { Facebook, Domain, Linkedin, Email, Numeric3Box } from "mdi-material-ui";
//images
//import portrait from "../assets/simonbuechi-square-medium.jpg";
//import portraitBw from "../assets/simonbuechi-landscape-bw.jpg";
import portraitBig from "../assets/simonbuechi-landscape-medium.jpg";

class Start extends Component {
  state = {
    dialogOpen: false,
    profile: null,
    space: null,
  };

  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  render() {
    const { t } = this.props;

    const myContacts = [
      { primary: "LinkedIn", secondary: "", link: "https://www.linkedin.com/in/simonbuechi", icon: <Linkedin /> },
      { primary: "Facebook", secondary: "", link: "https://www.linkedin.com/in/simonbuechi", icon: <Facebook /> },
      { primary: "3Box", secondary: "", link: "https://3box.io/0x254b358a6047a03243971B4814b1AAfdF312EC56", icon: <Numeric3Box /> },
      { primary: "Email", secondary: "", link: "mailto:simon.buechi@gmail.com", icon: <Email /> },
    ];

    const myJobs = [
      { primary: "SWIC Digital", secondary: "CTO", link: "https://swic.digital", icon: <Domain /> },
      { primary: "Pacta", secondary: "Founder", link: "https://pacta.app", icon: <Domain /> },
      { primary: "Pacta Vote", secondary: "Founder & Developer", link: "https://pacta.vote", icon: <Domain /> },
      { primary: "Blockchain Innovation Group", secondary: "Network Partner", link: "https://big-swiss.com", icon: <Domain /> },
    ];

    return (
      <Grid container direction="row" justify="center" alignItems="flex-start" spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h2" gutterBottom>
            {t("start.title")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {t("start.paragraph1")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {t("start.paragraph2")}
          </Typography>
          <Grid container direction="row" justify="center" alignItems="flex-start" spacing={0}>
            <Grid item xs={12} md={6}>
              <Box my={2}>
                <Typography variant="h2" gutterBottom>
                  {t("start.connectTitle")}
                </Typography>
                <List>
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
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box my={2}>
                <Typography variant="h2" gutterBottom>
                  {t("start.engagementsTitle")}
                </Typography>
                <List dense>
                  {myJobs.map((item, index) => (
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
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box textAlign="center">
            <Tooltip title={t("start.image")}>
              <Card>
                <CardActionArea onClick={this.handleClickOpen}>
                  <CardMedia component="img" image={portraitBig} />
                </CardActionArea>
              </Card>
            </Tooltip>
          </Box>
          <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.dialogOpen} maxWidth="xl">
            <DialogContent>
              <img src={portraitBig} alt="simon buechi portrait" className="dialog" />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="secondary" autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    );
  }
}

export default withTranslation()(Start);
