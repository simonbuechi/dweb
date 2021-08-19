import React from "react";
import Sketch from "react-p5";

export const Artwork = (props) => {
  //global constants
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");
  const ITERATIONS_MINIMUM = 200;
  const ITERATIONS_MULTIPLIER = 800;
  const BRUSH_EXTENSION = 1.2; // make sure to fill in edges of canvas
  const BRUSH_THICKNESS = 90;
  const BRUSH_THICKNESS_MAX = 22;
  const COLOR_VARIANCE = 8;
  const BACKGROUND_SATURATION = 40;
  const BACKGROUND_BRIGHTNESS = 50;
  const BACKGROUND_BRIGHTNESS_LIGHTEN = 30;
  const STIPPLE_DISTANCE = 10;
  const STIPPLE_FREQUENCY = 12;
  const STIPPLE_OPACITY = 0.6;
  const SPLATTER_LEVELS = 6;
  const SPLATTER_FREQUENCY = 35;
  const SPLATTER_SIZE_MAX = 25;
  const SPLATTER_OPACITY = 0.4;
  //global variables
  let colors = [];
  let brush = { x: 0, y: 0, px: 0, py: 0 };
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

  /*
  function splatterOLD(p5, bx, by) {
    let color = colors[p5.floor(p5.random(colors.length))];
    bx += p5.random(-15, 15);
    by += p5.random(-15, 15);
    let mx = 25 * p5.abs(brush.px - brush.x);
    let my = 25 * p5.abs(brush.py - brush.y);
    for (let i = 0; i < SPLATTER_AMOUNT; i++) {
      xoff2 += 0.01;
      let x = bx + mx * (0.5 - p5.noise(xoff2 + i));
      let y = by + my * (0.5 - p5.noise(xoff2 + 2 * i));
      let s = SPLATTER_SIZE_MAX / p5.dist(bx, by, x, y);
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
  */

  function splatter(p5, x, y, radius, level) {
    p5.ellipse(x, y, radius * 2, radius * 2);
    if (level > 1) {
      level = level - 1;
      let num = p5.random(2, 5);
      for (let i = 0; i < num; i++) {
        let a = p5.random(0, p5.TWO_PI);
        let nx = x + (p5.cos(a) * level * SPLATTER_SIZE_MAX) / 6;
        let ny = y + (p5.sin(a) * level * SPLATTER_SIZE_MAX) / 6;
        splatter(p5, nx, ny, radius / 2, level);
      }
    }
  }

  function stipple(p5, x, y, color) {
    p5.noStroke();
    p5.fill(color, STIPPLE_OPACITY);
    let radius = p5.random(2, 12);
    p5.ellipse(x + p5.random(-STIPPLE_DISTANCE, STIPPLE_DISTANCE), y + p5.random(STIPPLE_DISTANCE, -STIPPLE_DISTANCE), radius);
    radius = p5.random(3, 12);
    p5.ellipse(x + p5.random(-STIPPLE_DISTANCE, STIPPLE_DISTANCE), y + p5.random(STIPPLE_DISTANCE, -STIPPLE_DISTANCE), radius);
  }

  const setup = (p5, canvasParentRef) => {
    // setup basics
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.noiseDetail(4, 0.5);
    p5.colorMode(p5.HSB, 100, 100, 100);
    // set symmetry mode
    symmetry = p5.random() > 0.5 ? true : false;
    //set background
    const backgroundHue = p5.floor(p5.random(0, 100));
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
    // setup color scheme
    colors = [
      p5.color(backgroundHue, p5.floor(p5.random() * (95 - 70) + 70), 50),
      p5.color(p5.abs(backgroundHue + 1 * COLOR_VARIANCE) % 100, p5.floor(p5.random() * (95 - 70) + 70), 50),
      p5.color(p5.abs(backgroundHue + 2 * COLOR_VARIANCE) % 100, p5.floor(p5.random() * (95 - 70) + 70), 50),
      p5.color(p5.abs(backgroundHue - 1 * COLOR_VARIANCE) % 100, p5.floor(p5.random() * (95 - 70) + 70), 50),
      p5.color(p5.abs(backgroundHue - 2 * COLOR_VARIANCE) % 100, p5.floor(p5.random() * (95 - 70) + 70), 50),
    ];

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
      p5.noStroke();
      let color = colors[p5.floor(p5.random(colors.length))];
      color.setAlpha(SPLATTER_OPACITY);
      p5.fill(color);
      if (p5.random() > 0.5) {
        splatter(p5, brush.x, brush.y, SPLATTER_SIZE_MAX, SPLATTER_LEVELS);
      } else {
        splatter(p5, p5.width - brush.x, p5.height - brush.y, SPLATTER_SIZE_MAX, SPLATTER_LEVELS);
      }
      if (symmetry) {
        if (p5.random() > 0.5) {
          splatter(p5, brush.x, p5.height - brush.y, SPLATTER_SIZE_MAX, SPLATTER_LEVELS);
        } else {
          splatter(p5, p5.width - brush.x, brush.y, SPLATTER_SIZE_MAX, SPLATTER_LEVELS);
        }
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
      let fileName = "SimonBuechi" + window.location.hash;
      fileName.replace(/[^a-zA-Z0-9]/g, "");
      p5.saveCanvas(fileName, "jpg");
    }
  };

  return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />;
};
