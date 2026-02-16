import React from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
//material-ui
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Zoom from "@mui/material/Zoom";
//icons
import Icon from "../utils/Icon";
import { mdiChevronDown } from "@mdi/js";
// custom
import Contact from "../structure/Contact";

function Projects() {
  const { t } = useTranslation();
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
    <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={4}>
      <Grid item xs={12} md={8}>
        <Helmet>
          <title>Simon Buechi | Projects</title>
          <meta name="description" content="Simon Buechi Büchi projects" />
        </Helmet>
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
                <AccordionSummary expandIcon={<Icon path={mdiChevronDown} />}>
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

export default Projects;
