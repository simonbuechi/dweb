import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
//icons
import { Facebook, Twitter, Linkedin, Email, Bitcoin, Ethereum }  from 'mdi-material-ui';

class Contact extends Component {

  render() {

    return (
        <Grid item xs={12} lg={9} className="defaultpadding">
          <Typography variant="h4" gutterBottom>
            Contact
          </Typography>    
           
          <List component="nav" aria-label="main mailbox folders">
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <Facebook />
              </ListItemIcon>
              <ListItemText primary="Simon on Facebook" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <Twitter />
              </ListItemIcon>
              <ListItemText primary="Simon on Twitter" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <Linkedin />
              </ListItemIcon>
              <ListItemText primary="Simon on LinkedIn" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <Email />
              </ListItemIcon>
              <ListItemText primary="Send email" />
            </ListItem>
            <Divider />
          </List>

          <Typography variant="body1" gutterBottom>
            Crypto wallets
          </Typography>  
          <List component="nav" aria-label="main mailbox folders">
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <Ethereum />
              </ListItemIcon>
              <ListItemText primary="Ethereum" secondary="Ethereum" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <Bitcoin />
              </ListItemIcon>
              <ListItemText primary="Bitcoin" secondary="Bitcoin" />
            </ListItem>
            <Divider />
          </List>          

        </Grid>
    );
  }
}


export default withTranslation()(Contact);
