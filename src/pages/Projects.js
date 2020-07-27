import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//material-ui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Zoom from "@material-ui/core/Zoom";
//icons
import { ChevronDown } from "mdi-material-ui";
// custom
import Contact from "../structure/Contact";

class Projects extends Component {
  render() {
    const { t } = this.props;
    const projects = [
      {
        title: t("projects.pactaTitle"),
        description: t("projects.pactaDescription"),
        link: "https://pacta.app",
        linkTitle: t("projects.pactaLink"),
      },
      {
        title: t("projects.pactaVoteTitle"),
        description: t("projects.pactaVoteDescription"),
        link: "https://pacta.vote",
        linkTitle: t("projects.pactaVoteLink"),
      },
      {
        title: t("projects.raisinpickerTitle"),
        description: t("projects.raisinpickerDescription"),
        link: "https://raisinpicker.github.io",
        linkTitle: t("projects.raisinpickerLink"),
      },
      {
        title: t("projects.simonbuechiTitle"),
        description: t("projects.simonbuechiDescription"),
        link: "https://github.com/simonbuechi/dweb",
        linkTitle: t("projects.simonbuechiLink"),
      },
    ];

    return (
      <Grid container direction="row" justify="center" alignItems="flex-start" spacing={4}>
      <Grid item xs={12} md={8}>
        <Typography variant="h2" gutterBottom>
          {t("projects.title")}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {t("projects.paragraph1")}
        </Typography>
        {projects.map((item, index) => (
          <Zoom in style={{ transitionDelay: 150 + index * 100 + "ms" }} key={item.title}>
            <Box my={2}>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ChevronDown />}>
                  <Typography>{item.title}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      {item.description}
                    </Typography>
                    {item.link && (
                      <Typography variant="body2" gutterBottom>
                        <Button variant="contained" color="primary" href={item.link}>
                          {item.linkTitle}
                        </Button>
                      </Typography>
                    )}
                  </Box>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Box>
          </Zoom>
        ))}
      </Grid>
      <Grid item xs={12} md={4}>
        <Contact />
      </Grid>
      </Grid>
    );
  }
}

export default withTranslation()(Projects);
