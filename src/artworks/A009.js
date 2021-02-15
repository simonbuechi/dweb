import React from "react";
import Sketch from "react-p5";

// inspired by https://openprocessing.org/sketch/1006142

export default (props) => {
  // get seed from localstorage
  const seed = window.localStorage.getItem("signature");
  // set size to fullscreen
  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;
  const ITERATIONS_MINIMUM = 300;
  const ITERATIONS_MULTIPLIER = 1000;
  const BRUSH_EXTENSION = 1.25; // make sure to fill in edges of canvas

  let colors = [];
  let brush = { x: 0, y: 0, px: 0, py: 0 }
  let seed2;
  let xoff = 0;
  let i = 0;
  let iterations;

  function drizzle(p5) {
    let s = 1 + 30 / p5.dist(brush.px, brush.py, brush.x, brush.y);
    s = p5.min(15, s);
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
      seed2 += .01;
      let x = bx + mx * (0.5 - p5.noise(seed2 + i));
      let y = by + my * (0.5 - p5.noise(seed2 + 2 * i));
      let s = 150 / p5.dist(bx, by, x, y);
      if (s > 20) s = 20;
      let a = 255 - s * 5;
      p5.noStroke();
      c.setAlpha(a);
      p5.fill(c);
      p5.ellipse(x, y, s);
      seed2 += .01;
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
    p5.noStroke();
    seed2 = p5.random(1000);
    colors = [
      p5.color(112, 112, 74), //green
      p5.color(245, 198, 110), //yellow
      p5.color(242, 229, 194), //cream
      p5.color(115, 106, 97), //light grey
      p5.color(215, 90, 34), //orange
      p5.color(235, 61, 0)] // red-orange
    let base = p5.floor(p5.random(colors.length));
    p5.background(colors[base]);
    colors.splice(base, 1);
    // setup noise
    p5.noiseSeed(seed !== null ? seed : p5.random(1, 1000));
    p5.noiseDetail(4, 0.5);

    // set start point
    brush.x = 400;
    brush.y = 400;
    brush.px = brush.x;
    brush.py = brush.y;

    //set no of iterations
    iterations = p5.noise(10) * ITERATIONS_MULTIPLIER + ITERATIONS_MINIMUM;
  };

  const draw = (p5) => {
    // set brush location
    brush.x = p5.width * BRUSH_EXTENSION * p5.noise(xoff);
    brush.y = p5.height * BRUSH_EXTENSION * p5.noise(xoff+5);  

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

  return <Sketch setup={setup} draw={draw} />;
};