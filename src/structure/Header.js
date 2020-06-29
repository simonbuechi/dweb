import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";

class Header extends Component {
  render() {
    const { t } = this.props;

    return (
      <React.Fragment>
        <Hidden xsDown>
          <Grid item xs={12} sm={3} lg={2}>
            &nbsp;
          </Grid>
          <Grid item xs={12} sm={9} lg={10}>
            <Box my={6}>
              <Typography variant="h1">{t("base.title")}</Typography>
            </Box>
          </Grid>
        </Hidden>
        <Hidden smUp>
          <Grid item xs={12}>
            <Box my={1}>
              <Typography variant="h1">{t("base.title")}</Typography>
            </Box>
          </Grid>
        </Hidden>
      </React.Fragment>
    );
  }
}

export default withTranslation()(Header);
