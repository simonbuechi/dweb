// @ts-nocheck
import React from "react";
import Sketch from "react-p5";

const Artwork = (props) => {
  const seed = window.localStorage.getItem("signature");
  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;
  const sizes = [25, 60, 100, 200, 300, 400];
  let colors;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    p5.noiseSeed(seed !== null ? seed : Math.random() * 100);
    p5.background(255);

    // only primary colors and white
    colors = [
      p5.color(255, 255, 255),
      p5.color(p5.floor(p5.random() * 255), 0, 0),
      p5.color(255, 255, 0),
      p5.color(0, 0, p5.floor(p5.random() * 255)),
      //color(0,0,0)
    ];

    p5.strokeWeight(4); // make lines really thick

    var y = 0;
    var x = 0;
    let xoff = 1;
    var currHeight = p5.random(sizes);
    var currWidth = p5.random(sizes);

    while (y < p5.height) {
      x = 0;
      while (x < p5.width) {
        p5.fill(colors[p5.floor(p5.noise(xoff) * colors.length)]);
        xoff = xoff + 10;
        p5.rect(x, y, currWidth, currHeight);
        x = x + currWidth;
        currWidth = p5.random(sizes);
      }
      y = y + currHeight;
      currHeight = p5.random(sizes);
    }
  };

  const draw = (p5) => {};

  const keyPressed = (p5) => {
    //save the canvas when press "s" or space
    if (p5.keyCode === 83 || p5.keyCode === 32) {
      p5.saveCanvas("simons_artwork", "jpg");
    }
  };

  return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />;
};

export default Artwork;
