import React from "react";
import Sketch from "react-p5";

//openprocessing.org/sketch/492405

https: export default (props) => {
  //global constants
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");

  //generation parameters
  let symmetrieNumber = 6; //how many arms the snowflake has (typically 6)
  let angleVarianzPIDivider = 1; //PI is divided by this number to define the variance in branching angles
  let radius = 200; //randius of the snowflake
  let endLength = 2; //length of the branch at which recursions stops

  //drawing parameters
  let thickness = 6; //thicknes of the lines
  let thicknesIsLengthDependent = false; //is the stroke thicknes dependent on the lenght of the branch?
  let thicknesFactor = 0.005; //if the stroke thicknes is dependent on the lenght of the branch, this is multiplied with the length which is multiplied with the thickness
  let strokeAlpha = 25; //alpha of the lines

  //menu
  let showMenu = false;

  let parentDiv;
  let radiusSlider;
  let angleVarianzSlider;
  let endLengthInput;

  let thicknessInput;
  let strokeAlphaSlider;
  let thicknesLengthToggle;
  let thicknessLengthSlider;

  let generateButton;

  function generateSnowflake() {
    background(0);

    radius = radiusSlider.value() / 2;
    angleVarianzPIDivider = angleVarianzSlider.value();
    endLength = endLengthInput.value();
    thickness = thicknessInput.value();
    strokeAlpha = strokeAlphaSlider.value();
    thicknesIsLengthDependent = thicknesLengthToggle.checked();
    thicknesFactor = thicknessLengthSlider.value();

    let seed = random(255);
    for (let i = 0; i < symmetrieNumber; ++i) {
      randomSeed(seed);
      generateBranch(createVector(width / 2, height / 2), radius, (TWO_PI / symmetrieNumber) * i);
    }
  }

  function generateBranch(origin, length, angle) {
    if (length < endLength) {
      return;
    }

    let randomAngle = random(0, PI / angleVarianzPIDivider);
    push();
    translate(origin.x, origin.y);
    rotate(angle);
    generateBranch(createVector(0, 0), length / 2, 0);
    generateBranch(createVector(length, 0), length / 2, 0);
    generateBranch(createVector(length / 2, 0), length / 2, -randomAngle);
    generateBranch(createVector(length / 2, 0), length / 2, randomAngle);

    stroke(255, strokeAlpha);
    strokeWeight(thicknesIsLengthDependent ? thickness * (length * thicknesFactor) : thickness);
    line(0, 0, length, 0);
    pop();
  }

  const setup = (p5, canvasParentRef) => {
    //setup canvas & basics
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));

    setUpMenu();
    generateSnowflake();
  };

  const draw = (p5) => {};

  const keyPressed = (p5) => {
    //save the canvas when press "s" or space
    if (p5.keyCode === 83 || p5.keyCode === 32) {
      let fileName = "SimonBuechi" + window.location.hash;
      fileName.replace(/[^a-zA-Z0-9]/g, "");
      p5.saveCanvas(fileName, "jpg");
    }
  };

  return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />;
};
