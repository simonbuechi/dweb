import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

class About extends Component {
  render() {
    return (
        <Grid item xs={12} lg={12}>
          <Typography variant="h4" gutterBottom>
            About
          </Typography>
          <Typography variant="body2" gutterBottom>
            This site is about me, Simon Büchi. Swiss national, citizen of the canton of Zurich, resident of the city of Winterthur. Alumnus of Kantonsschule Buelrain and University of St. Gallen. I have been working as business analyst, programmer, business engineer, project manager. I am interested in trends in banking and web devolopment. More than technologies I am fascinated by disruptive business models. I enjoy reading about philosophy, economics, politics, history and technology. I enjoy classical music.
          </Typography>
        </Grid>
    );
  }
}

export default withTranslation()(About);
