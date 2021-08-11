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
import Box from "@material-ui/core/Box";
//icons
import { OpenInNew, Face, CreativeCommons } from "mdi-material-ui";
//images
import portraitBig from "../assets/simonbuechi-landscape-medium.jpg";

class Start extends Component {
  state = {
    dialogPortrait: false,
  };

  handleDialogPortraitOpen = () => {
    this.setState({ dialogPortrait: true });
  };
  handleDialogPortraitClose = () => {
    this.setState({ dialogPortrait: false });
  };

  render() {
    const { t } = this.props;
    const { dialogPortrait } = this.state;
    const myJobs = [
      { primary: "SWIC Digital", secondary: "CTO", link: "https://swic.digital", icon: <OpenInNew /> },
      { primary: "Voveo", secondary: "Founder & Developer", link: "https://voveo.ch", icon: <OpenInNew /> },
      { primary: "Pacta", secondary: "Founder", link: "https://pacta.app", icon: <OpenInNew /> },
      { primary: "Blockchain Innovation Group", secondary: "Network Partner", link: "https://big-swiss.com", icon: <OpenInNew /> },
    ];

    return (
      <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={4}>
        <Grid item xs={12} md={12}>
          <Typography variant="h2" gutterBottom>
            {t("start.title")}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box mb={3}>
            <Typography variant="h3" gutterBottom>
              {t("about.personTitle")}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t("start.paragraph1")}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t("about.body1")}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t("about.body2")}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t("about.body3")}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t("about.body4")}
            </Typography>
            <Typography gutterBottom>
              <Button variant="contained" color="primary" onClick={this.handleDialogPortraitOpen} startIcon={<Face />}>
                {t("start.image")}
              </Button>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom>
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
        </Grid>
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
      </Grid>
    );
  }
}

export default withTranslation()(Start);
