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
//import CircularProgress from '@material-ui/core/CircularProgress';
import Rating from '@material-ui/lab/Rating';
import Zoom from '@material-ui/core/Zoom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
//icons
import {ChevronDown, Ethereum, Bitcoin, AccountGroup, FeatureSearch, GoogleAnalytics, RulerSquare}  from 'mdi-material-ui';
//icons & images
import drizzle from '../assets/techicons/drizzle.jpg';
// import ethereum from '../assets/techicons/ethereum.jpg';
import solidity from '../assets/techicons/solidity.jpg';
import redux from '../assets/techicons/redux.jpg';
import react from '../assets/techicons/react.jpg';
import truffle from '../assets/techicons/truffle.jpg';
import ipfs from '../assets/techicons/ipfs.jpg';
import web3js from '../assets/techicons/webjs.jpg';

const ratingLabels = {
  1: 'Beginner',
  2: 'Average',
  3: 'Advanced',
  4: 'Expert',
};

class Offering extends Component {
  state = {
    progress: 0,
    ready: false
  }

  componentDidMount() {
    /*
    this.tick();
    const timer = setInterval(this.tick, 20);
    clearInterval(timer);
    */
    this.setState({ ready: true});
  }

  render() {
  //  const {progress} = this.state;

    const skillsConsulting = [
      {text: "Project management", img: <AccountGroup />, rating: 4},
      {text: "Analysis & Engineering", img: <GoogleAnalytics />, rating: 3},
      {text: "Research", img: <FeatureSearch />, rating: 2},
      {text: "Business model development", img: <RulerSquare />, rating: 2},
    ];
    const skillsBlockchains = [
      {text: "Ethereum", img: <Ethereum />, rating: 4},
      {text: "Bitcoin", img: <Bitcoin />, rating: 3},
    ];
    const skillsCoding = [
      {text: "Solidity", img: solidity, rating: 2},
      {text: "Drizzle", img: drizzle, rating: 2},
      {text: "Redux", img: redux, rating: 1},     
      {text: "React", img: react, rating: 4},
      {text: "web3js", img: web3js, rating: 4},
      {text: "ipfs", img: ipfs, rating: 1},
      {text: "truffle", img: truffle, rating: 4},
    ];

    return (
        <Grid item xs={12} lg={12}>
          <Typography variant="h2" gutterBottom>
            My offering
          </Typography>


          <ExpansionPanel variant="outlined" TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}>
            <ExpansionPanelSummary expandIcon={<ChevronDown />} >
              <Typography>Blockchains</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Box>
                <Typography variant="body2" gutterBottom>
                ...
                </Typography>
                <List>
                <Divider />
                {skillsBlockchains.map((item, index) => (
                  <Zoom in={this.state.ready} style={{ transitionDelay: 150 + index * 100 + "ms" }} key={item.text}>
                    <div>
                      <ListItem button>
                        <ListItemIcon>
                          {item.img} 
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                        <ListItemSecondaryAction>
                          <Rating name="read-only" value={item.rating} max={4} readOnly />
                          {item.rating !== null && <Box ml={2}>{ratingLabels[item.rating]}</Box>}
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                    </div>
                  </Zoom>
                ))}
              </List>
              </Box>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel variant="outlined" TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}>
            <ExpansionPanelSummary expandIcon={<ChevronDown />} >
              <Typography>Consulting</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Box>
              <Typography variant="body2">
                ...
              </Typography>
              <List>
                <Divider />
                {skillsConsulting.map((item, index) => (
                  <Zoom in={this.state.ready} style={{ transitionDelay: 150 + index * 100 + "ms" }} key={item.text}>
                    <div>
                      <ListItem button>
                        <ListItemIcon>
                          {item.img} 
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                        <ListItemSecondaryAction>
                          <Rating name="read-only" value={item.rating} max={4} readOnly />
                          {item.rating !== null && <Box ml={2}>{ratingLabels[item.rating]}</Box>}
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                    </div>
                  </Zoom>
                ))}
              </List>
              </Box>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel variant="outlined" TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}>
            <ExpansionPanelSummary expandIcon={<ChevronDown />} >
              <Typography>Coding</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Box>
              <Typography variant="body2">
                ...
              </Typography>
              <List>
                <Divider />
                {skillsCoding.map((item, index) => (
                  <Zoom in={this.state.ready} style={{ transitionDelay: 150 + index * 100 + "ms" }} key={item.text}>
                    <div>
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar src={item.img} />
                        </ListItemAvatar>
                        <ListItemText primary={item.text} />
                        <ListItemSecondaryAction>
                          <Rating name="read-only" value={item.rating} max={4} readOnly />
                          {item.rating !== null && <Box ml={2}>{ratingLabels[item.rating]}</Box>}
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                    </div>
                  </Zoom>
                ))}
              </List>
              </Box>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
    );
  }
}

export default withTranslation()(Offering);
