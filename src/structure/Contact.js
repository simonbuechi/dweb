import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//material-ui
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {
  Whatsapp,
  Email,
  Linkedin
} from "mdi-material-ui";

class Contact extends Component {

  render() {
    const { t } = this.props;

    return (
      <React.Fragment>
      <Typography variant="h2" gutterBottom>
            {t("offering.reachoutTitle")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {t("offering.reachoutDescription")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <Button variant="outlined" color="primary" href="mailto:simon.buechi@gmail.com" startIcon={<Email />}>
              Email 
            </Button> 
          </Typography>
          <Typography variant="body2" gutterBottom>
            <Button variant="outlined" color="primary" href="https://wa.me/41787401627" startIcon={<Whatsapp />}>
              Whatsapp
            </Button>
          </Typography>
          <Typography variant="body2" gutterBottom>
            <Button variant="outlined" color="primary" href="https://www.linkedin.com/in/simonbuechi" startIcon={<Linkedin />}>
              LinkedIn
            </Button>
          </Typography>
          </React.Fragment>
    );
  }
}

export default withTranslation()(Contact);
