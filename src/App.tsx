import React, { useState, Suspense, lazy } from "react";
import { useTranslation } from "react-i18next";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./style/index.css";
//material-ui components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Hidden from "@mui/material/Hidden";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
// navigation / app shell
import Header from "./structure/Header";
import Footer from "./structure/Footer";
import Settings from "./structure/Settings";
// pages (lazy loaded)
const Start = lazy(() => import("./pages/Start"));
const About = lazy(() => import("./pages/About"));
const Offering = lazy(() => import("./pages/Offering"));
const Projects = lazy(() => import("./pages/Projects"));
//const Wall = lazy(() => import("./pages/Wall"));
//const Blog = lazy(() => import("./pages/Blog"));
//const Queries = lazy(() => import("./pages/Queries"));
const Arts = lazy(() => import("./pages/Arts"));

function App() {
  const [value, setValue] = useState(0);
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg">
      <Helmet>
        <title>Simon Buechi</title>
        <meta name="description" content="Website of Simon Buechi" />
      </Helmet>
      <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={0}>
        <Header />
        <Grid item xs={12} sm={3} lg={3} xl={3}>
          <Hidden xsDown>
            <Box mt={0}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={(event, value) => {
                  setValue(value);
                }}>
                <Tab label={t("base.navStart")} component={Link} to="/" />
                <Tab label={t("base.navAbout")} component={Link} to="/about" />
                <Tab label={t("base.navOffering")} component={Link} to="/services" />
                <Tab label={t("base.navProjects")} component={Link} to="/projects" />
                <Tab label={t("base.navArts")} component={Link} to="/arts" />
              </Tabs>
              <Box textAlign="center" mr={4} mt={2}>
                <Settings />
              </Box>
            </Box>
          </Hidden>
        </Grid>
        <Grid item xs={12} sm={9} lg={9} xl={9}>
          <Suspense fallback={<CircularProgress color="primary" />}>
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Offering />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/arts/:id" element={<Arts />} />
              <Route path="/arts" element={<Arts />} />
            </Routes>
            <Outlet />
          </Suspense>
        </Grid>
        <Footer />
      </Grid>
    </Container>
  );
}

export default App;
