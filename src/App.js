import React, { Component } from 'react';
import { withTranslation } from "react-i18next";
import PropTypes from 'prop-types';
import "./style/index.css";
//material-ui components
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// navigation
import Header from './Header';
import Footer from './Footer';
import Settings from './Settings';
//import Bg from './Bg';
// tabs
import Start from './pages/Start';
import About from './pages/About';
import Offering from './pages/Offering';
import Projects from './pages/Projects';
//import Contact from './pages/Contact';
import SendMessage from './pages/SendMessage';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
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
        spacing={3}
      >
        <Header />
        <Grid item xs={12} sm={3} lg={2}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
          >
            <Tab label="Start" {...a11yProps(0)} />
            <Tab label="About" {...a11yProps(1)} />
            <Tab label="Offering" {...a11yProps(2)} />
            <Tab label="Projects" {...a11yProps(3)} />
            <Tab label="Send Message" {...a11yProps(4)} />
          </Tabs>
          <Settings />
        </Grid>
        <Grid item xs={12} sm={9} lg={10}>
          <TabPanel value={value} index={0}><Start /></TabPanel>
          <TabPanel value={value} index={1}><About /></TabPanel>
          <TabPanel value={value} index={2}><Offering /></TabPanel>
          <TabPanel value={value} index={3}><Projects /></TabPanel>
          <TabPanel value={value} index={4}><SendMessage /></TabPanel>
        </Grid>
        <Footer />
      </Grid>
    </Container>
  );
  }
}

export default withTranslation()(App);





