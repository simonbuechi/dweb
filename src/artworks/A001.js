import React from "react";
import Sketch from "react-p5";

//global constants
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
const seed = window.localStorage.getItem("signature");
const NO_COLORS = 5;
const COLOR_DIFF = 70; 

function normDist(u = 0, v = 0) {
  while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while(v === 0) v = Math.random();
  return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

export default (props) => {
  
  const setup = (p5, canvasParentRef) => {
    //setup canvas
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    p5.background(255);

    let offset = 0;
    let xoff = 0.0;
    let colors = [
      {hue: 1, saturation: 1, brightness: 2},
      {hue: 1, saturation: 1, brightness: 2},
      {hue: 1, saturation: 1, brightness: 2},
      {hue: 1, saturation: 1, brightness: 2},
      {hue: 1, saturation: 1, brightness: 2},
      {hue: 1, saturation: 1, brightness: 2}
    ];

    p5.colorMode(p5.HSB, 360, 100, 100);
    p5.strokeWeight(0);
    p5.stroke(0, 0, 100);
    p5.noiseSeed(seed !== null ? seed : Math.random()*100);

    console.log(p5.noise(p5.floor(Math.random()*100)))
    //generate color scheme
    colors[0].hue = p5.floor(p5.noise(seed !== 0 ? 0.5 : Math.random()*100) * 360);
    colors[0].saturation = p5.floor(p5.noise(0.2) * (95-70) + 70); 
    colors[0].brightness = 50 // p5.floor(p5.noise(0.3) * (85-50) + 50);
    colors[1].hue = colors[0].hue;
    colors[1].saturation = p5.floor(colors[0].saturation * .7);
    colors[1].brightness = p5.floor(colors[0].brightness * 1.5);
    colors[2].hue = colors[0].hue + COLOR_DIFF > 360 ? colors[0].hue + COLOR_DIFF - 360 : colors[0].hue + COLOR_DIFF;
    colors[2].saturation = p5.floor(p5.noise(0.2) * (95-70) + 70); 
    colors[2].brightness = 50 // p5.floor(p5.noise(0.3) * (85-50) + 50);
    colors[3].hue = colors[2].hue;
    colors[3].saturation = p5.floor(colors[2].saturation * .7);
    colors[3].brightness = p5.floor(colors[2].brightness * 1.5);
    colors[4].hue = colors[0].hue + 2 * COLOR_DIFF > 360 ? colors[0].hue + 2 * COLOR_DIFF - 360 : colors[0].hue + 2 * COLOR_DIFF;
    colors[4].saturation = p5.floor(p5.noise(0.2) * (95-70) + 70); 
    colors[4].brightness = p5.floor(p5.noise(0.3) * (85-50) + 50);

    //loop to draw rectangles
    for (let i = 0; offset < p5.width; i++) {
      // let r = p5.floor(p5.noise(xoff) * 200);
      let r= p5.max(normDist(p5.noise(xoff)) * p5.width * (1/30), 3);
      offset = offset + r;
      xoff = xoff + 8;
      p5.fill(colors[i % NO_COLORS].hue, colors[i % NO_COLORS].saturation, colors[i % NO_COLORS].brightness);
      p5.rect(offset - r, 0, offset, p5.height);
    }
  };

  const draw = (p5) => {};

  return <Sketch setup={setup} draw={draw} />;
};
