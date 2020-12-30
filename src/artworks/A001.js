import React from "react";
import Sketch from "react-p5";

export default (props) => {
  let x = 50;
  const y = 50;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(1000, 1000).parent(canvasParentRef);
    p5.background(0);
    p5.strokeWeight(2);
    for (let i = 0; i < p5.width; i++) {
      let r = p5.random(255);
      p5.stroke(r);

      p5.line(i, 0, i, p5.height);
    }
  };

  const draw = (p5) => {};

  return <Sketch setup={setup} draw={draw} />;
};
