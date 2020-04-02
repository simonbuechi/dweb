import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import i18n from "./i18n/i18n"; 
//material-ui
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
//import Brightness6 from 'mdi-material-ui/Brightness6';

class Settings extends Component {

  handleLangChange = name => event => {
    i18n.changeLanguage(name);
  };

  render() {
    const { t } = this.props;

    return (
      <Box mt={2} textAlign="center">
        <ButtonGroup color="secondary" size="small" >
          <Tooltip title={t("base.toEnglish")}>
            <Button onClick={this.handleLangChange("en")}>En</Button>
          </Tooltip>
          <Tooltip title={t("base.toGerman")}>
            <Button onClick={this.handleLangChange("de")}>De</Button>
          </Tooltip>
        </ButtonGroup>
        </Box>
    );
  }
}


export default withTranslation()(Settings);
