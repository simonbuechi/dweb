import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class SendMessage extends Component {

  render() {

    return (
        <Grid item xs={12} lg={9} className="defaultpadding">
          <Typography variant="h4" gutterBottom>
            Send Message
          </Typography>    
           
          <form noValidate autoComplete="off">
            <TextField 
                id="subject" 
                label="Subject" 
                placeholder="be specific"
                variant="outlined" 
                fullWidth 
                margin="normal"
            />
            <TextField
                id="message"
                label="Message"
                placeholder="go straight to the point"
                multiline
                rows="4"
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <TextField 
                id="name" 
                label="name" 
                variant="outlined" 
                fullWidth 
                margin="normal"
            />
            <TextField 
                id="email" 
                label="email" 
                variant="outlined" 
                fullWidth 
                margin="normal"
            />
            <TextField 
                id="phone" 
                label="phone" 
                variant="outlined" 
                fullWidth 
                margin="normal"
            />
            <Button 
                variant="contained" 
                color="primary"
            >
            Set data
            </Button>
            </form>

        </Grid>
    );
  }
}


export default withTranslation()(SendMessage);
