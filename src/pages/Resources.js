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
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
//import CircularProgress from '@material-ui/core/CircularProgress';
import Rating from '@material-ui/lab/Rating';
import Fade from '@material-ui/core/Fade';
//icons & images
import drizzle from '../assets/techicons/drizzle.jpg';
import ethereum from '../assets/techicons/ethereum.jpg';
import solidity from '../assets/techicons/solidity.jpg';
import redux from '../assets/techicons/redux.jpg';
import reduxsaga from '../assets/techicons/reduxsaga.jpg';
import react from '../assets/techicons/react.jpg';

const ratingLabels = {
  1: 'Beginner',
  2: 'Average',
  3: 'Advanced',
  4: 'Expert',
};

class Resources extends Component {
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
    console.log(this.state.ready)
  }
  
  tick() {
    // reset when reaching 100%
    //setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
    if(this.state.progress < 100) {
      this.setState({ progress: this.state.progress + 2 });
    }
  
  }


  render() {
  //  const {progress} = this.state;

    const stack = [
      {text: "Solidity", img: solidity, rating: 2},
      {text: "Drizzle", img: drizzle, rating: 2},
      {text: "Redux", img: redux, rating: 1},
      {text: "React", img: react, rating: 4},
    ];

    return (
        <Grid item xs={12} lg={12}>
          <Typography variant="h2" gutterBottom>
            Skills
          </Typography>

          <Box my={2}>
          <Typography variant="body1" gutterBottom>
            Blockchains
          </Typography>
            <List>
              <Divider />
              {stack.map((item, index) => (
                <Fade in={this.state.ready} style={{ transitionDelay: index * 250 + "ms" }} key={item.text}>
                  <div>
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar src={item.img} />
                      </ListItemAvatar>
                      <ListItemText primary={item.text} />
                      <ListItemSecondaryAction>
                        <Rating name="read-only" value={item.rating} max={4} readOnly />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </div>
                </Fade>
              ))}
            </List>
          </Box>
        </Grid>
    );
  }
}

export default withTranslation()(Resources);
