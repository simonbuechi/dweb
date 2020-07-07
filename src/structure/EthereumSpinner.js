import React, { Component } from "react";

class EthereumSpinner extends Component {
  render() {
    return (
      <div className="eth">
        <div className="bottom">
          <div className="left"></div>
          <div className="right"></div>
          <div className="up"></div>
          <div className="down"></div>
        </div>
        <div className="top">
          <div className="left"></div>
          <div className="right"></div>
          <div className="up"></div>
          <div className="down"></div>
        </div>
      </div>
    );
  }
}

export default EthereumSpinner;
