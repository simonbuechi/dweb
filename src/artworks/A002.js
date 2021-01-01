import React from "react";
import Sketch from "react-p5";

export default (props) => {
  //const seed = "12j34h12j4khl2j3k";
  var sizes = [50, 100, 150, 200];
  var colors;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
    p5.background(255);

    // only primary colors and white
    colors = [
      p5.color(255, 255, 255),
      p5.color(255, 0, 0),
      p5.color(255, 255, 0),
      p5.color(0, 0, 255),
      //color(0,0,0)
    ];

    p5.strokeWeight(10); // make lines really thick

    var y = 0;
    var x = 0;

    var currHeight = p5.random(sizes);
    var currWidth = p5.random(sizes);

    while (y < p5.height) {
      x = 0;
      while (x < p5.width) {
        p5.fill(p5.random(colors));
        p5.rect(x, y, currWidth, currHeight);
        x = x + currWidth;
        currWidth = p5.random(sizes);
      }
      y = y + currHeight;
      currHeight = p5.random(sizes);
    }
  };

  const draw = (p5) => {};

  return <Sketch setup={setup} draw={draw} />;
};
