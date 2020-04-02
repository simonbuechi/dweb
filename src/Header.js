import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

class Header extends Component {

  render() {
    const { t } = this.props;

    return (
      <>
      <Grid item xs={12} sm={3} lg={2}>
      &nbsp;
      </Grid>
      <Grid item xs={12} sm={9} lg={10}>
      <Box my={4}>
        <Typography variant="h1">
          {t("base.title")}
        </Typography>
      </Box>
    </Grid>
    </>
    );
  }
}


export default withTranslation()(Header);
