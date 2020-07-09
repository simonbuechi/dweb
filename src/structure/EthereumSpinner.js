import React, { Component } from "react";

class EthereumSpinner extends Component {
  state = {
    clicked: false,
  };

  handleClick = () => {
    console.log("click")
    if (!this.state.clicked) {
      this.setState({ clicked: true }, () => {
        this.timer = setTimeout(() => {
          this.setState({ clicked: false });
        }, 500);
      });
    }
  };

  render() {
    return (
      <div  onClick={this.handleClick}>

      <div className={this.state.clicked ? "eth click" : "eth"}>
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
      
      </div>
    );
  }
}

export default EthereumSpinner;
