import React from "react";
import Sketch from "react-p5";

//global constants
const canvasWidth = window.innerWidth;
// const canvasHeight = window.innerHeight;
const SEED = window.localStorage.getItem("signature");
const COLOR_BLOCK_SIZE = 40;
const SPACING = 10;

/*
function normDist(u = 0, v = 0) {
  while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while(v === 0) v = Math.random();
  return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}
*/

export default (props) => {
  const setup = (p5, canvasParentRef) => {
    //setup canvas
    p5.createCanvas(canvasWidth, 1000).parent(canvasParentRef);
    // set background color
    p5.background(255);
    // set perlin noise seed
    p5.noiseSeed(SEED !== null ? SEED : Math.random() * 100);
    //
    p5.colorMode(p5.HSB, 360, 100, 100);
    p5.strokeWeight(0);

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
    /*
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
    */

    // Base color
    const baseColor = [100, 50, 50];
    p5.fill(baseColor);
    p5.rect(SPACING, 20, COLOR_BLOCK_SIZE, COLOR_BLOCK_SIZE);
    p5.fill(baseColor[0] + 60, baseColor[1], baseColor[2]);
    p5.rect(2 * SPACING + 1 * COLOR_BLOCK_SIZE, 20, COLOR_BLOCK_SIZE, COLOR_BLOCK_SIZE);

    // perlin noise curve
    p5.noFill();
    p5.stroke(0);
    p5.strokeWeight(2);
    p5.beginShape();
    for (var x = 0; x < 500; x++) {
      var nx = p5.map(x, 0, 500, 0, 10);
      var y = 500 * p5.noise(nx);
      p5.vertex(x, y);
    }
    p5.endShape();
  };

  const draw = (p5) => {};

  return <Sketch setup={setup} draw={draw} />;
};
