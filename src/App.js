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
// navigation
import Header from "./Header";
import Footer from "./Footer";
import Settings from "./Settings";
//import Bg from './Bg';
// tabs
import Start from "./pages/Start";
import About from "./pages/About";
import Offering from "./pages/Offering";
import Projects from "./pages/Projects";
import Wall from "./pages/Wall";
import SendMessage from "./pages/SendMessage";

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
        <Grid container direction="row" justify="center" alignItems="flex-start" spacing={3}>
          <Header />
          <Grid item xs={12} sm={3} lg={2}>
            <Tabs orientation="vertical" variant="scrollable" value={value} onChange={handleChange} aria-label="Vertical tabs example">
              <Tab label="Start" value="/" />
              <Tab label="About" value="/about" />
              <Tab label="Offering" value="/services" />
              <Tab label="Wall" value="/wall" />
              <Tab label="Projects" value="/projects" />
              <Tab label="Send Message" value="/message" />
            </Tabs>
            <Settings />
          </Grid>
          <Grid item xs={12} sm={9} lg={10}>
            <TabPanel value={value} index="/">
              <Start />
            </TabPanel>
            <TabPanel value={value} index="/about">
              <About />
            </TabPanel>
            <TabPanel value={value} index="/sevices">
              <Offering />
            </TabPanel>
            <TabPanel value={value} index="/projects">
              <Projects />
            </TabPanel>
            <TabPanel value={value} index="/message">
              <SendMessage />
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
