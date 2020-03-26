import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class Contact extends Component {

  render() {

    return (
        <Grid item xs={12} lg={9} className="defaultpadding">
          <Typography variant="h4" gutterBottom>
            Contact
          </Typography>    
           
          <form noValidate autoComplete="off">
            <TextField 
                id="key" 
                label="Key" 
                variant="outlined" 
                fullWidth 
                margin="normal"
            />
            <TextField
                id="value"
                label="Value"
                multiline
                rows="4"
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


export default withTranslation()(Contact);
