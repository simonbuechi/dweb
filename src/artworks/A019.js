import React from "react";
import Sketch from "react-p5";

export default (props) => {
  //global constants
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");

  const THOLD = 5;
  const DRAG = 0.01;
  const spifac = 1.05;
  let BIG = 500;
  let bodies = [];
  let mX = 1;
  let mY = 1;
  let xoff = 0;

  class ball {
    constructor(p5) {
      this.X = p5.random(0, p5.width);
      this.Y = p5.random(0, p5.height);
      this.w = p5.random(1 / THOLD, THOLD);
      this.Xv = 0;
      this.Yv = 0;
      this.pX = 0;
      this.pY = 0;
    }
    render(p5) {
      /*
      if (!p5.mousePressed) {
        this.Xv /= spifac;
        this.Yv /= spifac;
      }
      */
      this.Xv /= spifac;
      this.Yv /= spifac;
      this.Xv += DRAG * (mX - this.X) * this.w;
      this.Yv += DRAG * (mY - this.Y) * this.w;
      this.X += this.Xv;
      this.Y += this.Yv;
      p5.line(this.X, this.Y, this.pX, this.pY);
      this.pX = this.X;
      this.pY = this.Y;
    }
  }

  const setup = (p5, canvasParentRef) => {
    //setup canvas & basics
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));

    p5.strokeWeight(1);
    p5.fill(255, 255, 255);
    p5.stroke(255, 255, 255, 5);
    p5.background(0, 0, 0);
    p5.smooth();
    for (let i = 0; i < BIG; i++) {
      bodies[i] = new ball(p5);
    }
    console.log(bodies);
  };

  const draw = (p5) => {
    mX = p5.width * p5.noise(xoff);
    mY = p5.height * p5.noise(xoff + 5);
    xoff += 0.01;
    for (let i = 0; i < BIG; i++) {
      bodies[i].render(p5);
    }
  };

  const keyPressed = (p5) => {
    //save the canvas when press "s" or space
    if (p5.keyCode === 83 || p5.keyCode === 32) {
      let fileName = "SimonBuechi" + window.location.hash;
      fileName.replace(/[^a-zA-Z0-9]/g, "");
      p5.saveCanvas(fileName, "jpg");
    }
  };

  return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />;
};
