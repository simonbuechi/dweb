import React, { Component } from "react";
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
import Paper from "@material-ui/core/Paper";
// navigation
import Header from "./structure/Header";
import Footer from "./structure/Footer";
import Settings from "./structure/Settings";
//import Bg from './Bg';
// tabs
import Start from "./pages/Start";
import About from "./pages/About";
import Offering from "./pages/Offering";
import Projects from "./pages/Projects";
import Wall from "./pages/Wall";
// import SendMessage from "./pages/SendMessage";
import Blog from "./pages/Blog";

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
    const { value } = this.state;

    const handleChange = (event, value) => {
      this.setState({ value });
      this.props.history.push(value);
    };

    return (
      <Container maxWidth="lg">
        <Grid container direction="row" justify="center" alignItems="flex-start" spacing={0}>
          <Hidden smUp>
            <Settings />
          </Hidden>
          <Header />
          <Grid item xs={12} sm={3} lg={2}>
            <Hidden xsDown>
              <Tabs orientation="vertical" variant="scrollable" value={value} onChange={handleChange} aria-label="Vertical tabs example">
                <Tab label="Start" value="/" />
                <Tab label="About" value="/about" />
                <Tab label="Services" value="/services" />
                <Tab label="Projects" value="/projects" />
                <Tab label="Blog" value="/blog" />
                <Tab label="Wall" value="/wall" />
              </Tabs>
              <Settings />
            </Hidden>
            <Hidden smUp>
              <Paper>
                <Tabs value={value} onChange={handleChange} scrollButtons="auto" indicatorColor="primary" textColor="primary" variant="scrollable">
                  <Tab label="Start" value="/" />
                  <Tab label="About" value="/about" />
                  <Tab label="Services" value="/services" />
                  <Tab label="Projects" value="/projects" />
                  <Tab label="Blog" value="/blog" />
                  <Tab label="Wall" value="/wall" />
                </Tabs>
              </Paper>
            </Hidden>
          </Grid>
          <Grid item xs={12} sm={9} lg={10}>
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
          </Grid>
          <Footer />
        </Grid>
      </Container>
    );
  }
}

export default withTranslation()(withRouter(App));
