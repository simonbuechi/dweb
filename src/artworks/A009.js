import React from "react";
import Sketch from "react-p5";

// inspired by https://openprocessing.org/sketch/1006142

export default (props) => {
  // get seed from localstorage
  const seed = window.localStorage.getItem("signature");
  // set size to fullscreen
  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;
  const ITERATIONS_MINIMUM = 200;
  const ITERATIONS_MULTIPLIER = 800;
  const BRUSH_EXTENSION = 1.2; // make sure to fill in edges of canvas
  const BRUSH_THICKNESS = 50;
  const BRUSH_THICKNESS_MAX = 10;
  const COLOR_VARIANCE = 20;
  const BACKGROUND_SATURATION = 80;
  const BACKGROUND_BRIGHTNESS = 50;
  const BACKGROUND_BRIGHTNESS_LIGHTEN = 30;

  let colors = [];
  let brush = { x: 0, y: 0, px: 0, py: 0 };
  let xoff2 = 0;
  let xoff = 0;
  let i = 0;
  let iterations;

  function drizzle(p5) {
    let s = 1 + BRUSH_THICKNESS / p5.dist(brush.px, brush.py, brush.x, brush.y);
    s = p5.min(BRUSH_THICKNESS_MAX, s);
    p5.strokeWeight(s);
    p5.stroke(0);
    p5.line(brush.px, brush.py, brush.x, brush.y);
    p5.stroke(255);
    p5.line(p5.width - brush.px, p5.height - brush.py, p5.width - brush.x, p5.height - brush.y);
  }

  function splatter(p5, bx, by) {
    let c = colors[p5.floor(p5.random(colors.length))];
    bx += p5.random(-15, 15);
    by += p5.random(-15, 15);
    let mx = 10 * p5.movedX;
    let my = 10 * p5.movedY;
    for (let i = 0; i < 80; i++) {
      xoff2 += 0.01;
      let x = bx + mx * (0.5 - p5.noise(xoff2 + i));
      let y = by + my * (0.5 - p5.noise(xoff2 + 2 * i));
      let s = 150 / p5.dist(bx, by, x, y);
      if (s > 20) s = 20;
      let a = 255 - s * 5;
      p5.noStroke();
      c.setAlpha(a);
      p5.fill(c);
      p5.ellipse(x, y, s);
      xoff2 += 0.01;
    }
  }

  function stipple(p5, bx, by, c) {
    p5.noStroke();
    p5.fill(c);
    let radius = p5.random(3, 12);
    p5.ellipse(bx + p5.random(-30, 30), by + p5.random(30, -30), radius);
    radius = p5.random(3, 12);
    p5.ellipse(bx + p5.random(-30, 30), by + p5.random(30, -30), radius);
  }

  const setup = (p5, canvasParentRef) => {
    // setup canvas
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    // setup noise
    p5.noiseSeed(seed !== null ? seed : p5.random(1, 1000));
    p5.noiseDetail(4, 0.5);
    // setup color scheme
    p5.colorMode(p5.HSB, 360, 100, 100);
    const baseHue = p5.floor(p5.noise(1) * 360);
    colors = [
      p5.color(baseHue, p5.floor(p5.noise(0.2) * (95 - 70) + 70), 50),
      p5.color(baseHue + 1 * COLOR_VARIANCE, p5.floor(p5.noise(0.2) * (95 - 70) + 70), 50),
      p5.color(baseHue + 2 * COLOR_VARIANCE, p5.floor(p5.noise(0.2) * (95 - 70) + 70), 50),
      p5.color(baseHue + 3 * COLOR_VARIANCE, p5.floor(p5.noise(0.2) * (95 - 70) + 70), 50),
      p5.color(baseHue + 4 * COLOR_VARIANCE, p5.floor(p5.noise(0.2) * (95 - 70) + 70), 50),
      p5.color(baseHue + 5 * COLOR_VARIANCE, p5.floor(p5.noise(0.2) * (95 - 70) + 70), 50),
    ];

    // old color scheme
    /*
    colors = [
      p5.color(112, 112, 74), //green
      p5.color(245, 198, 110), //yellow
      p5.color(242, 229, 194), //cream
      p5.color(115, 106, 97), //light grey
      p5.color(215, 90, 34), //orange
      p5.color(235, 61, 0), // red-orange
    ]; 
    */

    //set background
    const backgroundHue = p5.floor(p5.noise(10) * 360);
    p5.background(p5.color(backgroundHue, BACKGROUND_SATURATION, BACKGROUND_BRIGHTNESS));
    p5.noStroke();
    /*
    // linear gradient
    p5.noFill();
    for (var y = 0; y < p5.height; y++) {
      var inter = p5.map(y, 0, p5.height, 0, 1);
      var c = p5.lerpColor(colors[base], colors[2], inter);
      p5.stroke(c);
      p5.line(0, y, p5.width, y);
    }
    */
    // radial gradient
    for (let i = Math.max(p5.width, p5.height); i > 0; i--) {
      const step = i / Math.max(p5.width, p5.height);
      const gradient = p5.lerpColor(
        p5.color(backgroundHue, BACKGROUND_SATURATION, BACKGROUND_BRIGHTNESS + BACKGROUND_BRIGHTNESS_LIGHTEN),
        p5.color(backgroundHue, BACKGROUND_SATURATION, BACKGROUND_BRIGHTNESS),
        step
      );
      p5.fill(gradient);
      p5.ellipse(p5.width / 2, p5.height / 2, step * p5.width, step * p5.height);
    }
    // set start point
    brush.x = 400;
    brush.y = 400;
    brush.px = brush.x;
    brush.py = brush.y;
    //set no of iterations
    iterations = p5.noise(100) * ITERATIONS_MULTIPLIER + ITERATIONS_MINIMUM;
  };

  const draw = (p5) => {
    // set brush location
    brush.x = p5.width * BRUSH_EXTENSION * p5.noise(xoff);
    brush.y = p5.height * BRUSH_EXTENSION * p5.noise(xoff + 5);
    if (p5.frameCount > 10) {
      drizzle(p5);
    }
    brush.px = brush.x;
    brush.py = brush.y;
    if (p5.frameCount % 30 === 0) {
      splatter(p5, brush.x, brush.y);
      splatter(p5, p5.width - brush.x, p5.height - brush.y);
      stipple(p5, brush.x, brush.y, 0);
      stipple(p5, p5.width - brush.x, p5.height - brush.y, 255);
    }
    xoff = xoff + 0.01;
    i = i + 1;
    if (i > iterations) {
      p5.noLoop();
    }
  };

  const keyPressed = (p5) => {
    //save the canvas when press "s" or space
    if (p5.keyCode === 83 || p5.keyCode === 32) {
      p5.saveCanvas("simons_artwork", "jpg");
    }
  };

  return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />;
};
