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
  const BRUSH_THICKNESS = 30;
  const BRUSH_THICKNESS_MAX = 10;
  const COLOR_VARIANCE = 20;
  const BACKGROUND_SATURATION = 60;
  const BACKGROUND_BRIGHTNESS = 50;
  const BACKGROUND_BRIGHTNESS_LIGHTEN = 30;
  const STIPPLE_DISTANCE = 10;
  const STIPPLE_FREQUENCY = 20;
  const STIPPLE_OPACITY = 0.4;
  const SPLATTER_AMOUNT = 50;
  const SPLATTER_FREQUENCY = 55;
  const SPLATTER_SIZE_MAX = 25;
  const SPLATTER_OPACITY = 0.75;

  let colors = [];
  let brush = { x: 0, y: 0, px: 0, py: 0 };
  let xoff2 = 0;
  let xoff = 0;
  let i = 0;
  let iterations;
  let symmetry = false;

  function drizzle(p5) {
    let s = 1 + BRUSH_THICKNESS / p5.dist(brush.px, brush.py, brush.x, brush.y);
    s = p5.min(BRUSH_THICKNESS_MAX, s);
    p5.strokeWeight(s);
    if (symmetry) {
      p5.stroke(0);
      p5.line(brush.px, brush.py, brush.x, brush.y);
      p5.stroke(0);
      p5.line(p5.width - brush.px, p5.height - brush.py, p5.width - brush.x, p5.height - brush.y);
      p5.stroke(255);
      p5.line(p5.width - brush.px, brush.py, p5.width - brush.x, brush.y);
      p5.stroke(255);
      p5.line(brush.px, p5.height - brush.py, brush.x, p5.height - brush.y);
    } else {
      p5.stroke(0);
      p5.line(brush.px, brush.py, brush.x, brush.y);
      p5.stroke(255);
      p5.line(p5.width - brush.px, p5.height - brush.py, p5.width - brush.x, p5.height - brush.y);
    }
  }

  function splatter(p5, bx, by) {
    let color = colors[p5.floor(p5.random(colors.length))];
    bx += p5.random(-15, 15);
    by += p5.random(-15, 15);
    let mx = 25 * p5.abs(brush.px - brush.x);
    let my = 25 * p5.abs(brush.py - brush.y);
    for (let i = 0; i < SPLATTER_AMOUNT; i++) {
      xoff2 += 0.01;
      let x = bx + mx * (0.5 - p5.noise(xoff2 + i));
      let y = by + my * (0.5 - p5.noise(xoff2 + 2 * i));
      let s = 70 / p5.dist(bx, by, x, y);
      if (s > SPLATTER_SIZE_MAX) s = SPLATTER_SIZE_MAX;
      p5.noStroke();
      //let a = 255 - s * 5;
      //color.setAlpha(a);
      color.setAlpha(SPLATTER_OPACITY);
      p5.fill(color);
      p5.ellipse(x, y, s);
      xoff2 += 0.01;
    }
  }

  /*
  function splatter(p5, x, y, radius, level) {
    p5.noStroke();
    let tt = 126 * level / 6.0; 
    p5.fill(tt, 0, 116);
    ellipse(x, y, radius*2, radius*2);
    if (level > 1) {
      level = level - 1;
      let num = let (p5.random(2, 5));
      for(let i=0; i<num; i++) { 
        let a = p5.random(0, p5.TWO_PI);
        let nx = x + cos(a) * 6.0 * level; 
        let ny = y + sin(a) * 6.0 * level; 
        splatter(nx, ny, radius/2, level); 
      }
    }
  }
  */

  function stipple(p5, x, y, color) {
    p5.noStroke();
    p5.fill(color, STIPPLE_OPACITY);
    let radius = p5.random(2, 12);
    p5.ellipse(x + p5.random(-STIPPLE_DISTANCE, STIPPLE_DISTANCE), y + p5.random(STIPPLE_DISTANCE, -STIPPLE_DISTANCE), radius);
    radius = p5.random(3, 12);
    p5.ellipse(x + p5.random(-STIPPLE_DISTANCE, STIPPLE_DISTANCE), y + p5.random(STIPPLE_DISTANCE, -STIPPLE_DISTANCE), radius);
  }

  const setup = (p5, canvasParentRef) => {
    // setup canvas
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    // setup noise
    p5.noiseSeed(seed !== null ? seed : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(seed !== null ? seed : p5.floor(p5.random(1, 10000)));
    p5.noiseDetail(4, 0.5);
    // set symmetry mode
    symmetry = p5.random() > 0.5 ? true : false;
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
    if (p5.frameCount % STIPPLE_FREQUENCY === 0) {
      if (symmetry) {
        stipple(p5, brush.x, brush.y, 0);
        stipple(p5, p5.width - brush.x, p5.height - brush.y, 0);
        stipple(p5, brush.x, p5.height - brush.y, 255);
        stipple(p5, p5.width - brush.x, brush.y, 255);
      } else {
        stipple(p5, brush.x, brush.y, 0);
        stipple(p5, p5.width - brush.x, p5.height - brush.y, 255);
      }
    }
    if (p5.frameCount % SPLATTER_FREQUENCY === 0) {
      splatter(p5, brush.x, brush.y);
      splatter(p5, p5.width - brush.x, p5.height - brush.y);
      if (symmetry) {
        splatter(p5, brush.x, p5.height - brush.y);
        splatter(p5, p5.width - brush.x, brush.y);
      }
    }
    brush.px = brush.x;
    brush.py = brush.y;
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
