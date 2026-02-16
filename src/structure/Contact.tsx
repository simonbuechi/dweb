import React from "react";
import { useTranslation } from "react-i18next";
//material-ui
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
//icons
import Icon from "../utils/Icon";
import { mdiWhatsapp, mdiEmail, mdiLinkedin } from "@mdi/js";

function Contact() {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Typography variant="h2" gutterBottom>
        {t("offering.reachoutTitle")}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {t("offering.reachoutDescription")}
      </Typography>
      <Typography variant="body2" gutterBottom>
        <Button variant="contained" color="primary" href="mailto:simon.buechi@gmail.com" startIcon={<Icon path={mdiEmail} />}>
          Email
        </Button>
      </Typography>
      <Typography variant="body2" gutterBottom>
        <Button variant="contained" color="primary" href="https://wa.me/41787401627" startIcon={<Icon path={mdiWhatsapp} />}>
          Whatsapp
        </Button>
      </Typography>
      <Typography variant="body2" gutterBottom>
        <Button variant="contained" color="primary" href="https://www.linkedin.com/in/simonbuechi" startIcon={<Icon path={mdiLinkedin} />}>
          LinkedIn
        </Button>
      </Typography>
    </React.Fragment>
  );
}

export default Contact;
