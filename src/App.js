import React, { Component, Suspense, lazy } from "react";
import { withTranslation } from "react-i18next";
import { withRouter, Switch, Route, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
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

class App extends Component {
  render() {
    const { t } = this.props;

    const handleChange = (event, value) => {
      this.setState({ value });
      this.props.history.push(value);
    };

    return (
      <Container maxWidth="lg">
        <Helmet>
          <title>Simon Buechi</title>
          <meta name="description" content="Website of Simon Buechi" />
        </Helmet>
        <Grid container direction="row" justify="center" alignItems="flex-start" spacing={0}>
          <Header handleChange={handleChange} />
          <Grid item xs={12} sm={3} lg={2}>
            <Hidden xsDown>
              <Box mt={0}>
                <Tabs orientation="vertical" variant="scrollable" value={false}>
                  <Tab label={t("base.navStart")} component={Link} to="/" />
                  <Tab label={t("base.navAbout")} component={Link} to="/about" />
                  <Tab label={t("base.navOffering")} component={Link} to="/services" />
                  <Tab label={t("base.navProjects")} component={Link} to="/projects" />
                  <Tab label={t("base.navArts")} component={Link} to="/arts" />
                  <Tab label={t("base.navBlog")} component={Link} to="/blog" />
                  <Tab label={t("base.navWall")} component={Link} to="/wall" />
                </Tabs>
                <Box textAlign="center" mr={4} mt={2}>
                  <Settings />
                </Box>
              </Box>
            </Hidden>
          </Grid>
          <Grid item xs={12} sm={9} lg={10}>
            <Suspense fallback={<CircularProgress color="primary" />}>
              <Switch>
                <Route exact path="/" component={Start} />
                <Route exact path="/about" component={About} />
                <Route exact path="/services" component={Offering} />
                <Route exact path="/projects" component={Projects} />
                <Route exact path="/blog" component={Blog} />
                <Route exact path="/wall" component={Wall} />
                <Route exact path="/queries" component={Queries} />
                <Route exact path="/arts/:id" component={Arts} />
                <Route exact path="/arts" component={Arts} />
              </Switch>
            </Suspense>
          </Grid>
          <Footer />
        </Grid>
      </Container>
    );
  }
}

export default withTranslation()(withRouter(App));
