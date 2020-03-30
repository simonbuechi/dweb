import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//material-ui
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import CardActionArea from "@material-ui/core/CardActionArea";
import Grid from "@material-ui/core/Grid";
import Zoom from "@material-ui/core/Zoom";
import Dialog from "@material-ui/core/Dialog";
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
//images
//import portrait from "../assets/simonbuechi-square-medium.jpg";
//import portraitBw from "../assets/simonbuechi-landscape-bw.jpg";
import portraitBig from "../assets/simonbuechi-landscape-medium.jpg";

class Start extends Component {
  state = {
    dialogOpen: false
  }
  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  render() {
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
          Start
        </Typography>
        <Typography variant="body2" gutterBottom>
          This the personal website of Simon Büchi.
        </Typography>
        <Typography variant="body2" gutterBottom>
          I am a blockchain expert.
        </Typography>
        <Typography variant="body2" gutterBottom>
          This site is both hosted "traditionally" on the domain buechi.name and decentralized using IPFS on simonbuechi.eth.
        </Typography>
      </Grid>
      <Grid item xs={12} lg={6}>
      <Zoom in  style={{ transitionDelay: "100ms" }}>
        <Box width="60%" textAlign="center">
          <Card>
            <CardActionArea onClick={this.handleClickOpen}>
              <CardMedia
                component="img"
                image={portraitBig}
                title="Simon Büchi Portrait"
              />
            </CardActionArea>
          </Card>
          </Box>
          </Zoom>
          <Dialog 
            onClose={this.handleClose} 
            aria-labelledby="simple-dialog-title" 
            open={this.state.dialogOpen}
            maxWidth="xl"
          >
            <DialogContent>
              <img src={portraitBig} alt="simon buechi portrait" className="dialog" />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary" autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
      </Grid>
      </Grid>
    );
  }
}

export default withTranslation()(Start);
