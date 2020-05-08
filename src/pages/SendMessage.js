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
          <form 
            noValidate 
            autoComplete="off"
            action="https://formspree.io/mknqwgbz"
            method="POST"
          >
            <TextField 
              name="subject" 
              label={t("sendMessage.subjectLabel")}
              placeholder={t("sendMessage.subjectPlaceholder")}
              fullWidth 
              margin="normal"
              variant="outlined"
            />
            <TextField
              name="message"
              label={t("sendMessage.messageLabel")}
              placeholder={t("sendMessage.messagePlaceholder")}
              multiline
              rows="4"
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField 
              name="name" 
              label={t("sendMessage.nameLabel")}
              fullWidth 
              margin="normal"
              variant="outlined"
            />
            <TextField 
              name="email" 
              label={t("sendMessage.emailLabel")}
              fullWidth 
              type="email"
              margin="normal"
              variant="outlined"
            />
            <TextField 
              name="phone" 
              label={t("sendMessage.phoneLabel")}
              fullWidth 
              margin="normal"
              variant="outlined"
            />
            <Button 
              variant="contained" 
              color="primary"
              type="submit"
              value="Send"
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
