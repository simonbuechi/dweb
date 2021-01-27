import React from "react";
import Sketch from "react-p5";

// inspired by https://openprocessing.org/sketch/1006142

export default (props) => {
  // get seed from localstorage
  const seed = window.localStorage.getItem("signature");
  // set size to fullscreen
  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;
  const MAX_CIRCLE_SIZE = 250;
  // number of points in the filament
  const iter = 600;
  const colorIter = 255/iter;
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

  // noise space start point
  let p = null;
  // current position
  let x = 0;
  let y = 0;
  // current angle
  let ang = 0;

  const setup = (p5, canvasParentRef) => {
    // setup canvas
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    p5.background(0);
    p5.smooth();
    p5.noStroke();
    p5.fill(35, 40);
    // setup noise
    p5.noiseSeed(seed !== null ? seed : p5.random(1, 1000));
    p5.noiseDetail(4, 0.5);
    p = p5.createVector(p5.noise(100) * 2 - 1, p5.noise(200) * 2 - 1, 0);
  };

  const draw = (p5) => {
    // make full circle
    p5.translate(p5.width / 2, p5.height / 2);
    p5.fill(0);
    p5.ellipse(0, 0, p5.floor(p5.noise(100) * MAX_CIRCLE_SIZE), p5.floor(p5.noise(200) * MAX_CIRCLE_SIZE));
    // p5.ellipse(0, 0, 165, 165);
    if (ang < p5.TWO_PI) {
      // set starting position and rotate
      p5.translate(p5.cos(ang) * 80, p5.sin(ang) * 80);
      p5.rotate(ang);
      // make filament
      for (let i = iter; i > 0; i--) {
        const z = symm < 0 ? p.z : p.z % symm;
        const n = 2 * p5.TWO_PI * p5.noise(p.x + x / sx, p.y + y / sy, z);
        const clr = p5.map(p5.noise(p.x + x / sx, p.y + y / sy), 0, 1, 0, 255);
        p5.fill(p5.color(i * colorIter, i * colorIter * 0.8, i * colorIter * 0.5, clr));
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
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};