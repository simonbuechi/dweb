import React from "react";
import Sketch from "react-p5";

export default (props) => {
  //global constants
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");
  // shape and form
  const NUMBER_OF_LINES = 300;
  const DURATION = 1500;
  const THOLD = 20; //100;
  const DRAG = 0.01; //0.001;
  const SPIFAC = 1.05;
  const SPLIT_FACTOR = 0.25;
  const XOFF_STEP = 0.006;
  // colors
  //const COLOR_VARIANCE = 15;
  const SATURATION_BRIGHT = 30;
  const BRIGHTNESS_BRIGHT = 100;
  const SATURATION_DARK = 90;
  const BRIGHTNESS_DARK = 20;
  const ALPHA = .1; //0.15;
  const BACKGROUND_SATURATION = 30;
  const BACKGROUND_BRIGHTNESS = 40;
  const BACKGROUND_BRIGHTNESS_LIGHTEN = 25;
  // variables
  let bodies = [];
  let mX;
  let mY;
  let xoff = 0;
  let baseHue;
  //let hue1, hue2;

  class ball {
    constructor(p5, mX, mY) {
      this.X = mX;
      this.Y = mY;
      this.w = p5.random(1 / THOLD, THOLD);
      this.Xv = 0;
      this.Yv = 0;
      this.pX = this.X;
      this.pY = this.Y;
    }
    render(p5, mX, mY, hue, saturation, brightness) {
      this.Xv /= SPIFAC;
      this.Yv /= SPIFAC;
      this.Xv += DRAG * (mX - this.X) * this.w;
      this.Yv += DRAG * (mY - this.Y) * this.w;
      this.X += this.Xv;
      this.Y += this.Yv;
      p5.stroke(hue, saturation, brightness, ALPHA);
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
    //set colors
    baseHue = p5.floor(p5.random(0,100));
    //hue1 = baseHue + COLOR_VARIANCE % 100; 
    //hue2 = baseHue - COLOR_VARIANCE % 100;
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
    mX = p5.width * p5.noise(xoff) * (1 - SPLIT_FACTOR) + SPLIT_FACTOR * p5.width;
    mY = p5.height * p5.noise(xoff + 5) * (1 - SPLIT_FACTOR)  + SPLIT_FACTOR * p5.height;
    for (let i = 0; i < NUMBER_OF_LINES; i++) {
      bodies[i] = new ball(p5, mX, mY);
      bodies[i + NUMBER_OF_LINES] = new ball(p5, p5.width - mX, p5.height - mY);
    }
  };

  const draw = (p5) => {
    //p5.strokeWeight(4);
    mX = p5.width * p5.noise(xoff)* (1-SPLIT_FACTOR) + SPLIT_FACTOR * p5.width;
    mY = p5.height * p5.noise(xoff + 5)* (1-SPLIT_FACTOR)  + SPLIT_FACTOR * p5.height;
    for (let i = 0; i < NUMBER_OF_LINES; i++) {
      bodies[i].render(p5, mX, mY, baseHue, SATURATION_DARK, BRIGHTNESS_DARK);
      bodies[i + NUMBER_OF_LINES].render(p5, p5.width - mX, p5.height - mY, baseHue, SATURATION_BRIGHT, BRIGHTNESS_BRIGHT);
    }
    xoff += XOFF_STEP;
    if (p5.frameCount > DURATION) {
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
