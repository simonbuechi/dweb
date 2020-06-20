import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//material-ui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import Rating from "@material-ui/lab/Rating";
import Zoom from "@material-ui/core/Zoom";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
//icons
import {
  ChevronDown,
  Ethereum,
  Bitcoin,
  AccountGroup,
  FeatureSearch,
  GoogleAnalytics,
  RulerSquare,
  SignatureFreehand,
  LanguageHtml5,
  Teach,
  Whatsapp,
  Email,
  Key,
} from "mdi-material-ui";
//icons & images
import drizzle from "../assets/techicons/drizzle.jpg";
// import ethereum from '../assets/techicons/ethereum.jpg';
import solidity from "../assets/techicons/solidity.jpg";
import redux from "../assets/techicons/redux.jpg";
import react from "../assets/techicons/react.jpg";
import truffle from "../assets/techicons/truffle.jpg";
import ipfs from "../assets/techicons/ipfs.jpg";
import web3js from "../assets/techicons/webjs.jpg";

const ratingLabels = {
  1: "Basics",
  2: "Advanced",
  3: "Expert",
};

class Offering extends Component {
  state = {
    progress: 0,
    ready: false,
  };

  componentDidMount() {
    this.setState({ ready: true });
  }

  render() {
    const { t } = this.props;
    const skillsConsulting = [
      { text: "Project management", img: <AccountGroup />, rating: 3 },
      { text: "Lecture & public speaking", img: <Teach />, rating: 2 },
      { text: "Analysis & Engineering", img: <GoogleAnalytics />, rating: 2 },
      { text: "Research", img: <FeatureSearch />, rating: 2 },
      { text: "Business model development", img: <RulerSquare />, rating: 2 },
    ];
    const skillsBlockchains = [
      { text: "Ethereum", img: <Ethereum />, rating: 3 },
      { text: "Bitcoin", img: <Bitcoin />, rating: 2 },
      { text: "Decentralized autonomous organizations (DAOs)", img: <AccountGroup />, rating: 3 },
      { text: "Multi-signature wallets", img: <SignatureFreehand />, rating: 2 },
    ];
    const skillsCoding = [
      { text: "React", img: react, rating: 3 },
      { text: "Web3js", img: web3js, rating: 3 },
      { text: "HTML, CSS, JS", icon: <LanguageHtml5 />, rating: 2 },
      { text: "Solidity", img: solidity, rating: 2 },
      { text: "Drizzle", img: drizzle, rating: 2 },
      { text: "Redux", img: redux, rating: 2 },
      { text: "Truffle", img: truffle, rating: 2 },
      { text: "IPFS", img: ipfs, rating: 1 },
    ];

    return (
      <Grid container direction="row" justify="center" alignItems="flex-start" spacing={4}>
        <Grid item xs={12} md={12} lg={8}>
          <Typography variant="h2" gutterBottom>
            {t("offering.title")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {t("base.clickToSeeMore")}
          </Typography>
          <Box my={2}>
            <ExpansionPanel TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}>
              <ExpansionPanelSummary expandIcon={<ChevronDown />}>
                <Typography>Consulting & Management</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Box>
                  <List>
                    <Divider />
                    {skillsConsulting.map((item, index) => (
                      <Zoom in={this.state.ready} style={{ transitionDelay: 150 + index * 100 + "ms" }} key={item.text}>
                        <div>
                          <ListItem>
                            <ListItemIcon>{item.img}</ListItemIcon>
                            <ListItemText primary={item.text} />
                            <Tooltip title={ratingLabels[item.rating]}>
                              <ListItemSecondaryAction>
                                <Rating name="read-only" value={item.rating} max={3} readOnly />
                              </ListItemSecondaryAction>
                            </Tooltip>
                          </ListItem>
                          <Divider />
                        </div>
                      </Zoom>
                    ))}
                  </List>
                </Box>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Box>
          <Box my={2}>
            <ExpansionPanel TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}>
              <ExpansionPanelSummary expandIcon={<ChevronDown />}>
                <Typography>Blockchains & Decentralization</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Box>
                  <List>
                    <Divider />
                    {skillsBlockchains.map((item, index) => (
                      <Zoom in={this.state.ready} style={{ transitionDelay: 150 + index * 100 + "ms" }} key={item.text}>
                        <div>
                          <ListItem>
                            <ListItemIcon>{item.img}</ListItemIcon>
                            <ListItemText primary={item.text} />
                            <Tooltip title={ratingLabels[item.rating]}>
                              <ListItemSecondaryAction>
                                <Rating name="read-only" value={item.rating} max={3} readOnly />
                              </ListItemSecondaryAction>
                            </Tooltip>
                          </ListItem>
                          <Divider />
                        </div>
                      </Zoom>
                    ))}
                  </List>
                </Box>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Box>

          <Box my={2}>
            <ExpansionPanel TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}>
              <ExpansionPanelSummary expandIcon={<ChevronDown />}>
                <Typography>Technologies</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Box>
                  <List>
                    <Divider />
                    {skillsCoding.map((item, index) => (
                      <Zoom in={this.state.ready} style={{ transitionDelay: 150 + index * 100 + "ms" }} key={item.text}>
                        <div>
                          <ListItem>
                            {item.img && (
                              <ListItemAvatar>
                                <Avatar src={item.img} variant="rounded" />
                              </ListItemAvatar>
                            )}
                            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                            <ListItemText primary={item.text} />
                            <Tooltip title={ratingLabels[item.rating]}>
                              <ListItemSecondaryAction>
                                <Rating name="read-only" value={item.rating} max={3} readOnly />
                              </ListItemSecondaryAction>
                            </Tooltip>
                          </ListItem>
                          <Divider />
                        </div>
                      </Zoom>
                    ))}
                  </List>
                </Box>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Typography variant="h2" gutterBottom>
            {t("offering.reachoutTitle")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {t("offering.reachoutDescription")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <Button variant="contained" color="primary" href="mailto:simon.buechi@gmail.com" startIcon={<Email />}>
              Email
            </Button>
          </Typography>
          <Typography variant="body2" gutterBottom>
            <Button variant="contained" color="primary" href="https://wa.me/41787401627" startIcon={<Whatsapp />}>
              Whatsapp
            </Button>
          </Typography>
          <Typography variant="body2" gutterBottom>
            <Button variant="contained" color="primary" startIcon={<Key />}>
              Keybase
            </Button>
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default withTranslation()(Offering);
