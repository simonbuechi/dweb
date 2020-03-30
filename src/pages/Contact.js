import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Zoom from "@material-ui/core/Zoom";
//icons
import { Facebook, Twitter, Linkedin, Email, Bitcoin, Ethereum }  from 'mdi-material-ui';

class Contact extends Component {

  render() {

    const myLinks = [
      {primary: "Simon on LinkedIn", secondary: "external link", link: 2, icon: <Linkedin />},
      {primary: "Simon on Facebook", secondary: "external link", link: 2, icon: <Facebook />},
      {primary: "Simon on Twitter", secondary: "external link", link: 1, icon: <Twitter />},
      {primary: "Email", secondary: "mailto", link: 4, icon: <Email />},
    ];

    const myCryptos = [
      {primary: "Ethereum", secondary: "0x...", link: 2, icon: <Ethereum />},
      {primary: "Bitcoin", secondary: "0x...", link: 2, icon: <Bitcoin />},
    ];

    return (
      <Grid
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
      spacing={4}
    >
      <Grid item xs={12} lg={6}>
      <Typography variant="h2" gutterBottom>
        Contact
      </Typography>    
      <List dense>
        <Paper variant="outlined">
        {myLinks.map((item, index) => (
          <Zoom in style={{ transitionDelay: 150 + index * 100 + "ms" }} key={item.primary}>
            <div>
            <ListItem button>
              <ListItemIcon color="secondary">
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.primary} secondary={item.secondary} />
            </ListItem>
            <Divider />
            </div>
          </Zoom>
        ))}
          </Paper>
        </List>
      </Grid>
      <Grid item xs={12} lg={6}>
      <Typography variant="h2" gutterBottom>
        Crypto
      </Typography>  
      <List dense>
        <Paper variant="outlined">
        {myCryptos.map((item, index) => (
          <Zoom in style={{ transitionDelay: 350 + index * 100 + "ms" }} key={item.primary}>
            <div>
            <ListItem button>
              <ListItemIcon color="secondary">
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.primary} secondary={item.secondary} />
            </ListItem>
            <Divider />
            </div>
          </Zoom>
        ))}
          </Paper>
        </List>
      </Grid>     
      </Grid>
    );
  }
}


export default withTranslation()(Contact);
