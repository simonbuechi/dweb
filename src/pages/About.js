import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//material-ui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Zoom from "@material-ui/core/Zoom";
import Button from "@material-ui/core/Button";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
//icons
import { Gamepad, Filmstrip, BookOpenVariant, Facebook, Twitter, Linkedin, Email, Bitcoin, Ethereum, ChevronDown }  from 'mdi-material-ui';

class About extends Component {

  render() {
    const {t} = this.props;

    const myContacts = [
      {primary: "Simon on LinkedIn", secondary: "external link", link: 2, icon: <Linkedin />},
      {primary: "Simon on Facebook", secondary: "external link", link: 2, icon: <Facebook />},
      {primary: "Simon on Twitter", secondary: "external link", link: 1, icon: <Twitter />},
      {primary: "Email", secondary: "mailto", link: 4, icon: <Email />},
    ];

    const myCryptos = [
      {primary: "Ethereum", secondary: "0x...", link: 2, icon: <Ethereum />},
      {primary: "Bitcoin", secondary: "0x...", link: 2, icon: <Bitcoin />},
    ];

    const myLinks = [
      {primary: "My books", secondary: "on Goodreads", link: "https://www.goodreads.com/user/show/32950234-simon-b-chi", icon: <BookOpenVariant />},
      {primary: "My movies", secondary: "on IMDB", link: "http://www.imdb.com/user/ur27356928/", icon: <Filmstrip />},
      {primary: "My games", secondary: "on IGDB", link: "https://www.igdb.com/users/simonbuechi", icon: <Gamepad />}
    ];

    const questions = [
      { 
        title: t("start.q1"), 
        description: t("start.a1")
      },
      { 
        title: t("start.q2"), 
        description: t("start.a2")
      },
      { 
        title: t("start.q3"), 
        description: t("start.a3"),
        link: "https://pacta.app",
        linkTitle: "Go to Pacta App"
      },
      { 
        title: t("start.q4"), 
        description: t("start.a4")
      }
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
          About
        </Typography>
        <Typography variant="body2" gutterBottom>
          This site is about me, Simon Büchi. Swiss national, citizen of the canton of Zurich, resident of the city of Winterthur. Alumnus of Kantonsschule Buelrain and University of St. Gallen. I have been working as business analyst, programmer, business engineer, project manager. I am interested in trends in banking and web devolopment. More than technologies I am fascinated by disruptive business models. I enjoy reading about philosophy, economics, politics, history and technology. I enjoy classical music.
        </Typography>
        <Typography variant="h2" gutterBottom>
        Crypto
      </Typography>  
      <List dense>
        {myCryptos.map((item, index) => (
          <Zoom in style={{ transitionDelay: 150 + index * 100 + "ms" }} key={item.primary}>
            <div>
            <ListItem button>
              <ListItemIcon color="secondary">
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.primary} secondary={item.secondary} />
            </ListItem>
            
            </div>
          </Zoom>
        ))}
        </List>
        <Typography variant="h2" gutterBottom>
          Contact
        </Typography>    
        <List dense>
          {myContacts.map((item, index) => (
            <Zoom in style={{ transitionDelay: 450 + index * 100 + "ms" }} key={item.primary}>
              <div>
              <ListItem button>
                <ListItemIcon color="secondary">
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.primary} secondary={item.secondary} />
              </ListItem>
              
              </div>
            </Zoom>
          ))}
        </List>
        <Typography variant="h2" gutterBottom>
          More
        </Typography>
        <Box>
          <List dense>
          {myLinks.map((item, index) => (
            <Zoom in style={{ transitionDelay: 850 + index * 100 + "ms" }} key={item.primary}>
              <div>
              <ListItem button component="a" href={item.link}>
                <ListItemIcon color="secondary">
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.primary} secondary={item.secondary} />
              </ListItem>
              </div>
            </Zoom>
          ))}
          </List>
        </Box>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Box my={2}>
          <Typography variant="h2" gutterBottom>
            {t("start.qaTitle")}
          </Typography>
          {questions.map((item, index) => (
              <Zoom in style={{ transitionDelay: 150 + index * 100 + "ms" }} key={item.title}>
                <Box my={1}>
                <ExpansionPanel variant="outlined">
                  <ExpansionPanelSummary
                    expandIcon={<ChevronDown />}
                  >
                    <Typography>{item.title}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Box>
                      <Typography variant="body2" gutterBottom>{item.description}</Typography>
                      {item.link && (
                      <Typography variant="body2" gutterBottom>
                        <Button variant="contained" color="primary" href={item.link}>{item.linkTitle}</Button>
                      </Typography>
                      )}
                    </Box>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                </Box>
              </Zoom>
            ))}
          </Box>
        </Grid>
      </Grid>
    );
  }
}

export default withTranslation()(About);
