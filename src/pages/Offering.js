import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
//material-ui
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Rating from "@mui/material/Rating";
import Zoom from "@mui/material/Zoom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Hidden from "@mui/material/Hidden";
//icons
import Icon from "../utils/Icon";
import {
  mdiChevronDown,
  mdiEthereum,
  mdiBitcoin,
  mdiAccountGroup,
  mdiFeatureSearch,
  mdiGoogleAnalytics,
  mdiRulerSquare,
  mdiSignatureFreehand,
  mdiLanguageHtml5,
  mdiAccountVoice,
} from "@mdi/js";
//icons & images
import drizzle from "../assets/techicons/drizzle.jpg";
// import ethereum from '../assets/techicons/ethereum.jpg';
import solidity from "../assets/techicons/solidity.jpg";
import redux from "../assets/techicons/redux.jpg";
import react from "../assets/techicons/react.jpg";
import truffle from "../assets/techicons/truffle.jpg";
import ipfs from "../assets/techicons/ipfs.jpg";
import web3js from "../assets/techicons/webjs.jpg";
// custom
import Contact from "../structure/Contact";

function Offering() {
  const { t } = useTranslation();
  const [ready, setReady] = useState(false);

  const ratingLabels = {
    1: "Basics",
    2: "Advanced",
    3: "Expert",
  };
  const skillsConsulting = [
    { text: "Project management", img: <Icon path={mdiAccountGroup} />, rating: 3 },
    { text: "Lecture & public speaking", img: <Icon path={mdiAccountVoice} />, rating: 2 },
    { text: "Analysis & Engineering", img: <Icon path={mdiGoogleAnalytics} />, rating: 2 },
    { text: "Research", img: <Icon path={mdiFeatureSearch} />, rating: 2 },
    { text: "Business model development", img: <Icon path={mdiRulerSquare} />, rating: 2 },
  ];
  const skillsBlockchains = [
    { text: "Ethereum", img: <Icon path={mdiEthereum} />, rating: 3 },
    { text: "Bitcoin", img: <Icon path={mdiBitcoin} />, rating: 2 },
    { text: "Decentralized autonomous organizations (DAOs)", img: <Icon path={mdiAccountGroup} />, rating: 3 },
    { text: "Multi-signature wallets", img: <Icon path={mdiSignatureFreehand} />, rating: 2 },
  ];
  const skillsCoding = [
    { text: "React", img: react, rating: 3 },
    { text: "Web3js", img: web3js, rating: 3 },
    { text: "HTML, CSS, JS", icon: <Icon path={mdiLanguageHtml5} />, rating: 2 },
    { text: "Solidity", img: solidity, rating: 2 },
    { text: "Drizzle", img: drizzle, rating: 2 },
    { text: "Redux", img: redux, rating: 2 },
    { text: "Truffle", img: truffle, rating: 2 },
    { text: "IPFS", img: ipfs, rating: 1 },
  ];

  return (
    <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={4}>
      <Grid item xs={12} md={8}>
        <Helmet>
          <title>Simon Buechi | Services</title>
          <meta name="description" content="Simon Buechi Büchi services skills" />
        </Helmet>
        <Typography variant="h2" gutterBottom>
          {t("offering.title")}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {t("offering.description")}
        </Typography>
        <Box my={2}>
          <Accordion TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}>
            <AccordionSummary expandIcon={<Icon path={mdiChevronDown} />}>
              <Typography>{t("offering.categoryManagement")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box width="100%">
                <List>
                  <Divider />
                  {skillsConsulting.map((item, index) => (
                    <Zoom in={ready} style={{ transitionDelay: 150 + index * 100 + "ms" }} key={item.text}>
                      <div>
                        <ListItem>
                          <ListItemIcon>{item.img}</ListItemIcon>
                          <ListItemText
                            primary={item.text}
                            secondary={
                              <Hidden smUp>
                                <Rating name="read-only" value={item.rating} max={3} readOnly />
                              </Hidden>
                            }
                          />
                          <Hidden xsDown>
                            <Tooltip title={ratingLabels[item.rating]}>
                              <ListItemSecondaryAction>
                                <Rating name="read-only" value={item.rating} max={3} readOnly />
                              </ListItemSecondaryAction>
                            </Tooltip>
                          </Hidden>
                        </ListItem>
                        <Divider />
                      </div>
                    </Zoom>
                  ))}
                </List>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box my={2}>
          <Accordion TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}>
            <AccordionSummary expandIcon={<Icon path={mdiChevronDown} />}>
              <Typography>{t("offering.categoryBlockchain")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box width="100%">
                <List>
                  <Divider />
                  {skillsBlockchains.map((item, index) => (
                    <Zoom in={ready} style={{ transitionDelay: 150 + index * 100 + "ms" }} key={item.text}>
                      <div>
                        <ListItem>
                          <ListItemIcon>{item.img}</ListItemIcon>
                          <ListItemText
                            primary={item.text}
                            secondary={
                              <Hidden smUp>
                                <Rating name="read-only" value={item.rating} max={3} readOnly />
                              </Hidden>
                            }
                          />
                          <Hidden xsDown>
                            <Tooltip title={ratingLabels[item.rating]}>
                              <ListItemSecondaryAction>
                                <Rating name="read-only" value={item.rating} max={3} readOnly />
                              </ListItemSecondaryAction>
                            </Tooltip>
                          </Hidden>
                        </ListItem>
                        <Divider />
                      </div>
                    </Zoom>
                  ))}
                </List>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Box my={2}>
          <Accordion TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}>
            <AccordionSummary expandIcon={<Icon path={mdiChevronDown} />}>
              <Typography>{t("offering.categoryTechnologies")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box width="100%">
                <List>
                  <Divider />
                  {skillsCoding.map((item, index) => (
                    <Zoom in={ready} style={{ transitionDelay: 150 + index * 100 + "ms" }} key={item.text}>
                      <div>
                        <ListItem>
                          {item.img && (
                            <ListItemAvatar>
                              <Avatar src={item.img} variant="rounded" />
                            </ListItemAvatar>
                          )}
                          {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                          <ListItemText
                            primary={item.text}
                            secondary={
                              <Hidden smUp>
                                <Rating name="read-only" value={item.rating} max={3} readOnly />
                              </Hidden>
                            }
                          />
                          <Hidden xsDown>
                            <Tooltip title={ratingLabels[item.rating]}>
                              <ListItemSecondaryAction>
                                <Rating name="read-only" value={item.rating} max={3} readOnly />
                              </ListItemSecondaryAction>
                            </Tooltip>
                          </Hidden>
                        </ListItem>
                        <Divider />
                      </div>
                    </Zoom>
                  ))}
                </List>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Contact />
      </Grid>
    </Grid>
  );
}

export default Offering;
