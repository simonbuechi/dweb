import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//material-ui
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import Zoom from "@material-ui/core/Zoom";
import Dialog from "@material-ui/core/Dialog";
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
//icons
import { ChevronDown }  from 'mdi-material-ui';
//images
//import portrait from "../assets/simonbuechi-square-medium.jpg";
import portraitBw from "../assets/simonbuechi-landscape-bw.jpg";
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
    const { t } = this.props;

    return (
      <Grid
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
      spacing={4}
    >
      <Grid item xs={12} md={8}>
        <Typography variant="h2" gutterBottom>
          {t("start.title")}
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

        <Box my={1}>
          <ExpansionPanel variant="outlined" TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}>
            <ExpansionPanelSummary expandIcon={<ChevronDown />} >
              <Typography>Consulting</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Box>
              <Typography variant="body2">
                ...
              </Typography>
            </Box>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          </Box>


          <Box my={1}>
          <ExpansionPanel variant="outlined" TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}>
            <ExpansionPanelSummary expandIcon={<ChevronDown />} >
              <Typography>Consulting</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Box>
              <Typography variant="body2">
                ...
              </Typography>
            </Box>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          </Box>



      </Grid>
      <Grid item xs={12} md={4}>
      <Zoom in  style={{ transitionDelay: "100ms" }}>
        <Box  textAlign="center">
          <Card>
            <CardActionArea onClick={this.handleClickOpen}>
              <CardMedia
                component="img"
                image={portraitBw}
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
              <Button onClick={this.handleClose} color="secondary" autoFocus>
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
