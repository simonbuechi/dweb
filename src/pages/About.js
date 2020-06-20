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
//icons
import { Gamepad, Filmstrip, BookOpenVariant, Bitcoin, Ethereum, Github } from "mdi-material-ui";
//custom
import CopyButton from "../structure/CopyButton";

class About extends Component {
  render() {
    const { t } = this.props;

    const myCryptos = [
      { primary: "Ethereum", secondary: "0x254b358a6047a03243971B4814b1AAfdF312EC56", link: 2, icon: <Ethereum /> },
      { primary: "Bitcoin", secondary: "0x...", link: 2, icon: <Bitcoin /> },
    ];

    const myLinks = [
      { primary: "My code", secondary: "on Github", link: "https://github.com/simonbuechi", icon: <Github /> },
      { primary: "My books", secondary: "on Goodreads", link: "https://www.goodreads.com/user/show/32950234-simon-b-chi", icon: <BookOpenVariant /> },
      { primary: "My movies", secondary: "on IMDB", link: "http://www.imdb.com/user/ur27356928/", icon: <Filmstrip /> },
      { primary: "My games", secondary: "on IGDB", link: "https://www.igdb.com/users/simonbuechi", icon: <Gamepad /> },
    ];

    return (
      <Grid container direction="row" justify="center" alignItems="flex-start" spacing={4}>
        <Grid item xs={12} lg={6}>
          <Typography variant="h2" gutterBottom>
            {t("about.aboutMeTitle")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            This site is about me, Simon Büchi. <br />
            I live in Switzerland. <br />
            Alumnus of University of St. Gallen (M.A.HSG in Marketing, Services and Communication Management) <br />
            Worked at Synpulse, Bearingpoint, Zuercher Kantonalbank <br />
            Cerified in Avaloq, Financial Risk Manager (Part 1), Scrum, Six Sigma
            <br />
          </Typography>
          <Typography variant="h2" gutterBottom>
            About this site
          </Typography>
          <Typography variant="body2" gutterBottom>
            This site both serves as a place to find information about me as well as a showcase for decentralized technologies.
          </Typography>
          <Button variant="contained" color="primary" href="https://github.com/simonbuechi/dweb">
            This site on Github
          </Button>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h2" gutterBottom>
            Blockchain
          </Typography>
          <List dense>
            {myCryptos.map((item, index) => (
              <Zoom in style={{ transitionDelay: 150 + index * 100 + "ms" }} key={item.primary}>
                <div>
                  <ListItem>
                    <ListItemIcon color="secondary">{item.icon}</ListItemIcon>
                    <ListItemText
                      primary={item.primary}
                      secondary={
                        <Typography variant="body2" noWrap>
                          {item.secondary}
                        </Typography>
                      }
                    />
                    <CopyButton text={item.secondary} />
                  </ListItem>
                </div>
              </Zoom>
            ))}
          </List>
          <Typography variant="h2" gutterBottom>
            Some links
          </Typography>
          <Box>
            <List dense>
              {myLinks.map((item, index) => (
                <Zoom in style={{ transitionDelay: 850 + index * 100 + "ms" }} key={item.primary}>
                  <div>
                    <ListItem button component="a" href={item.link}>
                      <ListItemIcon color="secondary">{item.icon}</ListItemIcon>
                      <ListItemText primary={item.primary} secondary={item.secondary} />
                    </ListItem>
                  </div>
                </Zoom>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    );
  }
}

export default withTranslation()(About);
