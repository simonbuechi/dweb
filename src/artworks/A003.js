import React from "react";
import Sketch from "react-p5";

const Artwork = (props) => {
  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;
  const N = 3; //number of recursive steps

  function mondrian(p5, x, y, x2, y2, N) {
    if (N === 0) {
      //base case
      var borderWeight = 2; //stroke weight
      var col = ["#ffcb21", "#ffffff", "#537bbe", "#e44240"]; //yellow, white, blue, red

      p5.fill(col[p5.floor(p5.random(col.length))]); //randomly choose color
      p5.strokeWeight(borderWeight);
      p5.rect(x, y, x2 - x - borderWeight, y2 - y - borderWeight);
    } else {
      //recursive step -- break current rect() into 4 new random rectangles
      var i = p5.floor(p5.random(x, x2)); //random x within current rect()
      var j = p5.floor(p5.random(y, y2)); //random y within current rect()

      //recurse all rectangles
      mondrian(p5, x, y, i, j, N - 1); //upper left rect()
      mondrian(p5, i, y, x2, j, N - 1); //upper right rect()
      mondrian(p5, x, j, i, y2, N - 1); //lower left rect()
      mondrian(p5, i, j, x2, y2, N - 1); //lower right ()
    }
  }

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    mondrian(p5, 1, 1, canvasWidth, canvasHeight, N);
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