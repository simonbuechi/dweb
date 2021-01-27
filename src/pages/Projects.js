import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//material-ui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
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
        title: t("projects.voveoTitle"),
        description: t("projects.voveoDescription"),
        link: "https://voveo.ch",
        linkTitle: t("projects.voveoLink"),
      },
      {
        title: t("projects.pactaTitle"),
        description: t("projects.pactaDescription"),
        link: "https://pacta.app",
        linkTitle: t("projects.pactaLink"),
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
                <Accordion>
                  <AccordionSummary expandIcon={<ChevronDown />}>
                    <Typography variant="body1">{item.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
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
                  </AccordionDetails>
                </Accordion>
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
