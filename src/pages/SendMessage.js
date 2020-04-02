import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

class SendMessage extends Component {

  render() {
    const { t } = this.props;

    return (
      <>
        <Typography variant="h2" gutterBottom>
          {t("sendMessage.title")}
        </Typography>    
        <Box my={2}>
          <form noValidate autoComplete="off">
            <TextField 
              id="subject" 
              label={t("sendMessage.subjectLabel")}
              placeholder={t("sendMessage.subjectPlaceholder")}
              fullWidth 
              margin="normal"
            />
            <TextField
              id="message"
              label={t("sendMessage.messageLabel")}
              placeholder={t("sendMessage.messagePlaceholder")}
              multiline
              rows="4"
              fullWidth
              margin="normal"
            />
            <TextField 
              id="name" 
              label={t("sendMessage.nameLabel")}
              fullWidth 
              margin="normal"
            />
            <TextField 
              id="email" 
              label={t("sendMessage.emailLabel")}
              fullWidth 
              margin="normal"
            />
            <TextField 
              id="phone" 
              label={t("sendMessage.phoneLabel")}
              fullWidth 
              margin="normal"
            />
            <Button 
              variant="contained" 
              color="primary"
            >
            {t("sendMessage.buttonSend")}
            </Button>
          </form>
        </Box>
        <Typography variant="body2" gutterBottom>
        {t("sendMessage.paragraph1")}
        </Typography> 
      </>
    );
  }
}

export default withTranslation()(SendMessage);
