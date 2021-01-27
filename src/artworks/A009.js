import React from "react";
import Sketch from "react-p5";

// inspired by https://openprocessing.org/sketch/1006142

export default (props) => {
  // get seed from localstorage
  const seed = window.localStorage.getItem("signature");
  // set size to fullscreen
  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;

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
  };

  const draw = (p5) => {
  
  };

  return <Sketch setup={setup} draw={draw} />;
};