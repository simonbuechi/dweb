import React from "react";
import Sketch from "react-p5";

export default (props) => {
  //global constants
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");

  const THOLD = 20;
  const DRAG = 0.001;
  const spifac = 1.05;
  const XOFF_STEP = 0.006;
  const COLOROFF_STEP = 0.002;
  const MAX_ITERATIONS = 15;
  const SATURATION = 100;
  const BRIGHTNESS = 90;
  const ALPHA = 0.03;
  const BIG = 500;
  const BACKGROUND_SATURATION = 60;
  const BACKGROUND_BRIGHTNESS = 10;
  const BACKGROUND_BRIGHTNESS_LIGHTEN = 25;
  let bodies = [];
  let mX;
  let mY;
  let xoff = 0;
  let coloroff = 100;
  let baseHue;
  let hue1, hue2;

  class ball {
    constructor(p5, mX, mY) {
      this.X = p5.random(mX - 20, mX + 20);
      this.Y = p5.random(mY - 20, mY + 20);
      this.w = p5.random(1 / THOLD, THOLD);
      this.Xv = 0;
      this.Yv = 0;
      this.pX = this.X;
      this.pY = this.Y;
    }
    render(p5, mX, mY, hue) {
      this.Xv /= spifac;
      this.Yv /= spifac;
      this.Xv += DRAG * (mX - this.X) * this.w;
      this.Yv += DRAG * (mY - this.Y) * this.w;
      this.X += this.Xv;
      this.Y += this.Yv;
      p5.stroke(hue, SATURATION, BRIGHTNESS, ALPHA);
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
    p5.colorMode(p5.HSB, 100, 100, 100);
    p5.smooth();
    p5.strokeWeight(1);
    //set background
    baseHue = p5.floor(p5.noise(1000) * 100);
    p5.background(p5.color(baseHue, BACKGROUND_SATURATION, BACKGROUND_BRIGHTNESS));
    p5.noStroke();
    for (let i = Math.max(p5.width, p5.height); i > 0; i--) {
      const step = i / Math.max(p5.width, p5.height);
      const gradient = p5.lerpColor(
        p5.color(baseHue, BACKGROUND_SATURATION, BACKGROUND_BRIGHTNESS + BACKGROUND_BRIGHTNESS_LIGHTEN),
        p5.color(baseHue, BACKGROUND_SATURATION, BACKGROUND_BRIGHTNESS),
        step
      );
      p5.fill(gradient);
      p5.ellipse(p5.width / 2, p5.height / 2, step * p5.width, step * p5.height);
    }
    p5.noFill();
    // setup balls and position
    mX = p5.width * p5.noise(xoff);
    mY = p5.height * p5.noise(xoff + 5);
    for (let i = 0; i < BIG; i++) {
      bodies[i] = new ball(p5, mX, mY);
      bodies[i + BIG] = new ball(p5, p5.width - mX, p5.height - mY);
    }
  };

  const draw = (p5) => {
    mX = p5.width * p5.noise(xoff);
    mY = p5.height * p5.noise(xoff + 5);
    // p5.stroke(p5.map(p5.noise(coloroff), 0, 1, 0, 100), SATURATION, BRIGHTNESS, ALPHA);
    // p5.stroke(p5.constrain(baseHue + (p5.noise(coloroff) - 0.5) * 20, 0, 100), SATURATION, BRIGHTNESS, ALPHA);
    //hue1 = p5.constrain(baseHue + (p5.noise(coloroff) - 0.5) * 20, 0, 100);
    //hue2 = hue1 + 30 > 100 ? hue1 + 30 - 100 : hue1 + 30;
    hue1 = p5.abs(baseHue + 20 + (p5.noise(coloroff) - 0.5) * 20) % 100;
    hue2 = p5.abs(baseHue - 20 + (p5.noise(coloroff + 100) - 0.5) * 20) % 100;
    for (let i = 0; i < BIG; i++) {
      bodies[i].render(p5, mX, mY, hue1);
      bodies[i + BIG].render(p5, p5.width - mX, p5.height - mY, hue2);
    }
    xoff += XOFF_STEP;
    coloroff += COLOROFF_STEP;
    if (xoff >= MAX_ITERATIONS) {
      p5.noLoop();
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
