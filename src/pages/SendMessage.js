import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

class SendMessage extends Component {

  render() {
    return (
      <>
        <Typography variant="h2" gutterBottom>
          Send Message
        </Typography>    
        <Box my={2}>
          <form noValidate autoComplete="off">
            <TextField 
                id="subject" 
                label="Subject" 
                placeholder="be specific"
                
                fullWidth 
                margin="normal"
            />
            <TextField
                id="message"
                label="Message"
                placeholder="go straight to the point"
                multiline
                rows="4"
                
                fullWidth
                margin="normal"
            />
            <TextField 
                id="name" 
                label="Your name" 
                
                fullWidth 
                margin="normal"
            />
            <TextField 
                id="email" 
                label="Your email" 
                
                fullWidth 
                margin="normal"
            />
            <TextField 
                id="phone" 
                label="Your phone" 
                
                fullWidth 
                margin="normal"
            />
            <Button 
                variant="contained" 
                color="primary"
            >
            Send message
            </Button>
          </form>
        </Box>
        <Typography variant="body2" gutterBottom>
          &nbsp;
        </Typography> 
      </>
    );
  }
}


export default withTranslation()(SendMessage);
