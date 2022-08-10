import React, { useState } from "react";
import { useTranslation } from "react-i18next";
//material-ui
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Zoom from "@mui/material/Zoom";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
//icons
import Icon from "../utils/Icon";
import { mdiOpenInNew, mdiFaceMan, mdiCreativeCommons } from "@mdi/js";
//images
import portraitBig from "../assets/simonbuechi-landscape-medium.jpg";

function Start() {
  const { t } = useTranslation();
  const [dialogPortrait, setDialogPortrait] = useState(false);

  const handleDialogPortraitOpen = () => {
    setDialogPortrait(true);
  };
  const handleDialogPortraitClose = () => {
    setDialogPortrait(false);
  };
  const myJobs = [
    { primary: "SWIC Digital", secondary: "CTO", link: "https://swic.digital", icon: <Icon path={mdiOpenInNew} /> },
    { primary: "Voveo", secondary: "Founder & Developer", link: "https://voveo.ch", icon: <Icon path={mdiOpenInNew} /> },
    { primary: "Pacta", secondary: "Founder", link: "https://pacta.app", icon: <Icon path={mdiOpenInNew} /> },
    { primary: "Blockchain Innovation Group", secondary: "Network Partner", link: "https://big-swiss.com", icon: <Icon path={mdiOpenInNew} /> },
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
            <Button variant="contained" color="primary" onClick={handleDialogPortraitOpen} startIcon={<Icon path={mdiFaceMan} />}>
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
      <Dialog onClose={handleDialogPortraitClose} aria-labelledby="dialogPortrait" open={dialogPortrait} maxWidth="xl">
        <DialogContent>
          <img src={portraitBig} alt="simon buechi portrait" className="dialog" />
        </DialogContent>
        <DialogActions>
          <Button rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/" color="secondary" startIcon={<Icon path={mdiCreativeCommons} />}>
            {t("base.creativecommons")}
          </Button>
          &nbsp;
          <Button onClick={handleDialogPortraitClose} color="secondary" autoFocus>
            {t("base.close")}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default Start;
