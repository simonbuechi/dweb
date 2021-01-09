import React from "react";
import Sketch from "react-p5";

export default (props) => {
  //global constants
  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;
  const seed = window.localStorage.getItem("seedX") ? window.localStorage.getItem("seedX") : Math.random() * 1000;
  const NO_COLORS = 3;

  
  function normDist(u = 0, v = 0) {
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
  }

  const setup = (p5, canvasParentRef) => {
    //setup canvas
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    p5.background(255);

    let offset = 0;
    let xoff = 0.0;
    let colors = [];

    p5.colorMode(p5.HSB, 360, 100, 100);
    p5.strokeWeight(0);
    p5.stroke(0, 0, 100);
    p5.noiseSeed(seed);

    //generate color scheme
    const saturation = p5.floor(p5.noise(20) * (95-70) + 70); 
    const brightness = p5.floor(p5.noise(30) * (85-50) + 50);
    const baseColor = p5.floor(p5.noise(40) * 360);
    for (let i = 0; i < NO_COLORS; i++) {
      colors[i] = baseColor + i * (360 / NO_COLORS) > 360 ? baseColor + i * (360 / NO_COLORS) - 360 : baseColor + i * (360 / NO_COLORS);
    }

    //loop to draw rectangles
    for (let i = 0; offset < p5.width; i++) {
      // let r = p5.floor(p5.noise(xoff) * 200);
      let r= p5.max(normDist(p5.noise(xoff)) * 50, 3);
      offset = offset + r;
      xoff = xoff + 8;
      p5.fill(colors[i % NO_COLORS], saturation, brightness);
      p5.rect(offset - r, 0, offset, p5.height);
    }
  };

  const draw = (p5) => {};

  return <Sketch setup={setup} draw={draw} />;
};
