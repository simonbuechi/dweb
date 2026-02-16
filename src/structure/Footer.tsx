import React from "react";
//import { useTranslation } from "react-i18next";
//material-ui
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
//package.json
import pkg from "../../package.json";

function Footer() {
  //const { t } = useTranslation();
  return (
    <React.Fragment>
      <Grid item xs={12} sm={3} lg={3} xl={3}>
        &nbsp;
      </Grid>
      <Grid item xs={12} sm={9} lg={9} xl={9}>
        <Box mt={10} mb={2}>
          <Divider />
          <Typography variant="caption" color="textSecondary" gutterBottom>
            Copyright {new Date().getFullYear()} Simon Buechi | v{pkg.version}
          </Typography>
        </Box>
      </Grid>
    </React.Fragment>
  );
}

export default Footer;
