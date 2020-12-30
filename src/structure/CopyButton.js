import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { CopyToClipboard } from "react-copy-to-clipboard";
//material-ui
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
//icons
import { CheckboxMarkedCircle, ContentCopy } from "mdi-material-ui";

class CopyButton extends Component {
  state = {
    success: null,
  };

  handleCopyClick = () => {
    if (!this.state.success) {
      this.setState({ success: true }, () => {
        this.timer = setTimeout(() => {
          this.setState({ success: false });
        }, 1000);
      });
    }
  };

  render() {
    const { t, text } = this.props;

    return (
      <Tooltip title={t("base.copyClipboard")} aria-label={t("base.copyClipboard")}>
        <CopyToClipboard text={text} onCopy={this.handleCopyClick}>
          <IconButton color="secondary" aria-label="Copy">
            {this.state.success ? <CheckboxMarkedCircle fontSize="small" /> : <ContentCopy fontSize="small" />}
          </IconButton>
        </CopyToClipboard>
      </Tooltip>
    );
  }
}

export default withTranslation()(CopyButton);
