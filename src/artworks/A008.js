import React from "react";
import Sketch from "react-p5";

// inspired by https://openprocessing.org/sketch/1006142

const Artwork = (props) => {
  // get seed from localstorage
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");
  // number of points in the filament
  const iter = 600;
  // angle step
  const sang = 0.005;
  // scale of noise space
  const sx = 20;
  const sy = 20;
  const sz = 5;
  // x,y change constant
  const cx = 0;
  const cy = 0;
  // freq of z wobble amplitude
  const fr = 2;
  // rotational symmetry
  const symm = 20;
  let p, x, y, ang, baseHue;

  const reset = (p5) => {
    // reset space start point, position, angle
    p = null;
    x = 0;
    y = 0;
    ang = 0;
    p5.background(0);
    p5.smooth();
    p5.noStroke();
    p5.fill(35, 40);
    baseHue = p5.int(p5.random(0,360));
    p = p5.createVector(p5.noise(100) * 2 - 1, p5.noise(200) * 2 - 1, 0);
  }

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.noiseDetail(4, 0.5);
    p5.colorMode(p5.HSB, 360, 100, 100, 1);
    reset(p5);
  };

  const draw = (p5) => {
    // make full circle
    p5.translate(p5.width / 2, p5.height / 2);    
    // set starting position and rotate
    p5.translate(p5.cos(ang) * 80, p5.sin(ang) * 80);
    p5.rotate(ang);
    // make filament
    for (let i = iter; i > 0; i--) {
      const z = symm < 0 ? p.z : p.z % symm;
      const n = 2 * p5.TWO_PI * p5.noise(p.x + x / sx, p.y + y / sy, z);
      //const alpha = p5.map(p5.noise(p.x + x / sx, p.y + y / sy), 0, 1, 0, 1);
      //p5.fill(p5.color(i * colorIter, i * colorIter * 0.8, i * colorIter * 0.5, alpha));
      p5.fill(p5.color(baseHue + i*100/iter % 360, 70, p5.int(i * 100 / iter), 0.8));
      p5.ellipse(x, y, 0.55, 0.55);
      // change drawing position
      x += p5.cos(n) + cx;
      y += p5.sin(n) + cy;
    }
    // change starting point in the noise space by moving throught z axis
    let step;
    if (sz > 0.9) {
      // option 1: wobble
      step = p5.createVector(0, 0, p5.sin(fr * ang) / sz);
    } else {
      // option 2: constant movment
      step = p5.createVector(0, 0, sz);
    }
    p.add(step);
    // reset drawing coords
    x = y = 0;
    // change angle
    ang += sang;
    if (ang >= p5.TWO_PI) {
      //p5.fill(0);
      //p5.ellipse(0, 0, p5.floor(p5.noise(100) * MAX_CIRCLE_SIZE), p5.floor(p5.noise(200) * MAX_CIRCLE_SIZE));
      p5.noLoop();
    }
  };

  const keyPressed = (p5) => {
    if (p5.key === 'r') {
      p5.clear();
      reset(p5);
      p5.redraw();
    }
    if (p5.key === 's') {
      let fileName = "SimonBuechi" + window.location.hash;
      fileName.replace(/[^a-zA-Z0-9]/g, "");
      p5.saveCanvas(fileName, "jpg");
    }
  };

  return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />;
};

export default Artwork;