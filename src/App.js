import React, { Component } from 'react';
import { withTranslation } from "react-i18next";
import "./index.css";
//material-ui components
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
//icons
//import Head from 'mdi-material-ui/Head';
//elements
//import Drawer from './Drawer';
import Header from './Header';
import Footer from './Footer';
import About from './About';
import CV from './CV';
import Projects from './Projects';
import Resources from './Resources';
import Contact from './Contact';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}


TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

class App extends Component {
  state = {
    menutoggle: true,
    isAppInstallable: false,
    isAppInstalled: false,
    value: 1,
    deferredPrompt: () => {}
  };

  handleDrawerToggle = () => {
    this.setState({ menutoggle: !this.state.menutoggle });
  };

  render() {
    const { value } = this.state;
  
    const handleChange = (event, newValue) => {
      this.setState({ value: newValue });
    };

  return (
    <Container maxWidth="lg">
       <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={2}
      >
        <Header />
        <Grid item sm={3}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
          >
            <Tab label="About" {...a11yProps(0)} />
            <Tab label="CV" {...a11yProps(1)} />
            <Tab label="Projects" {...a11yProps(2)} />
            <Tab label="Resources" {...a11yProps(3)} />
            <Tab label="Contact" {...a11yProps(4)} />
          </Tabs>
        </Grid>
        <Grid item sm={9}>
          <TabPanel value={value} index={0}>
            <About />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CV />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Projects />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Resources />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Contact />
          </TabPanel>
        </Grid>
        <Footer />
      </Grid>
    </Container>
  );
  }
}

export default withTranslation()(App);





