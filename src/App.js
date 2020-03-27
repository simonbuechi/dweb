import React, { Component } from 'react';
import { withTranslation } from "react-i18next";
import PropTypes from 'prop-types';
import "./style/index.css";
//material-ui components
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// navigation
import Header from './Header';
import Footer from './Footer';
//import Settings from './Settings';
// tabs
import Start from './pages/Start';
import About from './pages/About';
import Blog from './pages/Blog';
import Projects from './pages/Projects';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import SendMessage from './pages/SendMessage';

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
    value: 0,
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
          <Box mt={5}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
          >
            <Tab label="Start" {...a11yProps(0)} />
            <Tab label="About" {...a11yProps(1)} />
            <Tab label="Blog" {...a11yProps(2)} />
            <Tab label="Projects" {...a11yProps(3)} />
            <Tab label="Resources" {...a11yProps(4)} />
            <Tab label="Contact" {...a11yProps(5)} />
            <Tab label="Send Message" {...a11yProps(6)} />
          </Tabs>
          </Box>
        </Grid>
        <Grid item sm={9}>
          <TabPanel value={value} index={0}><Start /></TabPanel>
          <TabPanel value={value} index={1}><About /></TabPanel>
          <TabPanel value={value} index={2}><Blog /></TabPanel>
          <TabPanel value={value} index={3}><Projects /></TabPanel>
          <TabPanel value={value} index={4}><Resources /></TabPanel>
          <TabPanel value={value} index={5}><Contact /></TabPanel>
          <TabPanel value={value} index={6}><SendMessage /></TabPanel>
        </Grid>
        <Footer />
      </Grid>
    </Container>
  );
  }
}

export default withTranslation()(App);





