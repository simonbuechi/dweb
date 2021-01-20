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
    p5.noiseSeed(SEED !== null ? SEED : Math.random()*100);
    // 
    p5.colorMode(p5.HSB, 360, 100, 100);
    p5.strokeWeight(0);
  
    // Base color 
    const baseColor =[100, 50, 50];
    p5.fill(baseColor);
    p5.rect(SPACING, 20, COLOR_BLOCK_SIZE, COLOR_BLOCK_SIZE);
    p5.fill(baseColor[0] + 60, baseColor[1], baseColor[2]);
    p5.rect(2* SPACING + 1 * COLOR_BLOCK_SIZE, 20, COLOR_BLOCK_SIZE, COLOR_BLOCK_SIZE);

  };

  const draw = (p5) => {};

  return <Sketch setup={setup} draw={draw} />;
};
