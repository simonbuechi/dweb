import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import i18n from "../i18n/i18n";
//material-ui
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
//import Brightness6 from 'mdi-material-ui/Brightness6';

class Settings extends Component {
  handleLangChange = (name) => (event) => {
    i18n.changeLanguage(name);
  };

  render() {
    const { t } = this.props;

    return (
        <ButtonGroup color="secondary" size="small">
          <Tooltip title={i18n.language === "en" ? "" : t("base.toEnglish")}>
            <Button onClick={this.handleLangChange("en")} disabled={i18n.language === "en" ? true : false}>
              En
            </Button>
          </Tooltip>
          <Tooltip title={i18n.language === "de" ? "" : t("base.toGerman")}>
            <Button onClick={this.handleLangChange("de")} disabled={i18n.language === "de" ? true : false}>
              De
            </Button>
          </Tooltip>
        </ButtonGroup>
    );
  }
}

export default withTranslation()(Settings);
