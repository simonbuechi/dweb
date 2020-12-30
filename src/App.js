import React, { Component, Suspense, lazy } from "react";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "./style/index.css";
//material-ui components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
// navigation / app shell
import Header from "./structure/Header";
import Footer from "./structure/Footer";
import Settings from "./structure/Settings";
// pages (lazy loaded)
const Start = lazy(() => import("./pages/Start"));
const About = lazy(() => import("./pages/About"));
const Offering = lazy(() => import("./pages/Offering"));
const Projects = lazy(() => import("./pages/Projects"));
const Wall = lazy(() => import("./pages/Wall"));
const Blog = lazy(() => import("./pages/Blog"));
const Queries = lazy(() => import("./pages/Queries"));
const Arts = lazy(() => import("./pages/Arts"));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

class App extends Component {
  state = {
    value: "/",
  };

  componentDidMount() {
    this.setState({ value: this.props.history.location.pathname });
  }

  render() {
    const { t } = this.props;
    const { value } = this.state;

    const handleChange = (event, value) => {
      this.setState({ value });
      this.props.history.push(value);
    };

    return (
      <Container maxWidth="lg">
        <Grid container direction="row" justify="center" alignItems="flex-start" spacing={0}>
          <Header value={value} handleChange={handleChange} />
          <Grid item xs={12} sm={3} lg={2}>
            <Hidden xsDown>
              <Tabs orientation="vertical" variant="scrollable" value={value} onChange={handleChange} aria-label="Vertical tabs example">
                <Tab label={t("base.navStart")} value="/" />
                <Tab label={t("base.navAbout")} value="/about" />
                <Tab label={t("base.navOffering")} value="/services" />
                <Tab label={t("base.navProjects")} value="/projects" />
                <Tab label={t("base.navArts")} value="/arts" />
                <Tab label={t("base.navBlog")} value="/blog" />
                <Tab label={t("base.navWall")} value="/wall" />
              </Tabs>
              <Box textAlign="center" mr={4} mt={2}>
                <Settings />
              </Box>
            </Hidden>
          </Grid>
          <Grid item xs={12} sm={9} lg={10}>
            <Suspense fallback={<CircularProgress color="primary" />}>
              <TabPanel value={value} index="/">
                <Start />
              </TabPanel>
              <TabPanel value={value} index="/about">
                <About />
              </TabPanel>
              <TabPanel value={value} index="/services">
                <Offering />
              </TabPanel>
              <TabPanel value={value} index="/blog">
                <Blog />
              </TabPanel>
              <TabPanel value={value} index="/projects">
                <Projects />
              </TabPanel>
              <TabPanel value={value} index="/wall">
                <Wall />
              </TabPanel>
              <TabPanel value={value} index="/arts">
                <Arts />
              </TabPanel>
              <TabPanel value={value} index="/queries">
                <Queries />
              </TabPanel>
            </Suspense>
          </Grid>
          <Footer />
        </Grid>
      </Container>
    );
  }
}

export default withTranslation()(withRouter(App));
