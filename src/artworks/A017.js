import React from "react";
import Sketch from "react-p5";
import { uniqueNamesGenerator, adjectives, colors, names } from "unique-names-generator";

export const Artwork = (props) => {
  //global constants
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");
  const PAPER_DENSITY = 5;
  let symmetrieNumber; //how many arms
  let angleVarianzPIDivider = 1; //PI is divided by this number to define the variance in branching angles
  let endLength = 2; //length of the branch at which recursions stops
  let thickness = 1; //thicknes of the lines
  let thicknesIsLengthDependent = false; //is the stroke thicknes dependent on the lenght of the branch?
  let thicknesFactor = 0.008; //if the stroke thicknes is dependent on the lenght of the branch, this is multiplied with the length which is multiplied with the thickness
  let strokeAlpha = 0.25; //alpha of the lines
  let name = "generating...";
  //let fontRegular;

  async function generateName(seed) {
    name = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, names],
      style: "capital",
      length: 3,
      seed: seed,
      separator: " ",
    });
    console.log(name);
  }

  function generateBranch(p5, origin, length, angle) {
    if (length < endLength) {
      return;
    }
    let randomAngle = p5.random(0, p5.PI / angleVarianzPIDivider);
    p5.push();
    p5.translate(origin.x, origin.y);
    p5.rotate(angle);
    generateBranch(p5, p5.createVector(0, 0), length / 2, 0);
    generateBranch(p5, p5.createVector(length, 0), length / 2, 0);
    generateBranch(p5, p5.createVector(length / 2, 0), length / 2, -randomAngle);
    generateBranch(p5, p5.createVector(length / 2, 0), length / 2, randomAngle);
    p5.stroke(255, strokeAlpha);
    p5.strokeWeight(thicknesIsLengthDependent ? thickness * (length * thicknesFactor) : thickness);
    p5.line(0, 0, length, 0);
    p5.pop();
  }

  const setup = (p5, canvasParentRef) => {
    //setup canvas & basics
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.colorMode(p5.HSB, 360, 100, 100);
    symmetrieNumber = p5.floor(p5.random(4, 13));

    //set background
    p5.background(p5.color(40, 40, 40));

    //make background paper-like
    const iterations = ((p5.width * p5.height) / 100) * PAPER_DENSITY;
    p5.noFill();
    for (let i = 0; i < iterations; i++) {
      p5.stroke(40, 40 + p5.random() * 10, 40 + p5.random() * 5);

      let x1 = p5.random() * p5.width;
      let y1 = p5.random() * p5.height;
      let theta = p5.random() * 2 * p5.PI;
      let segmentLength = p5.random() * 5 + 2;
      let x2 = p5.cos(theta) * segmentLength + x1;
      let y2 = p5.sin(theta) * segmentLength + y1;
      p5.line(x1, y1, x2, y2);

      let x = p5.random() * p5.width;
      let y = p5.random() * p5.height;
      let r = p5.floor(p5.random() * 4);
      p5.ellipse(x, y, r, r);
    }
    /*
    //set background gradient
    p5.noStroke();
    for (let i = Math.max(p5.width, p5.height); i > 0; i--) {
      const step = i / Math.max(p5.width, p5.height);
      const gradient = p5.lerpColor(p5.color(40, 40, 20), p5.color(40, 40, 40), step);
      p5.fill(gradient);
      p5.ellipse(p5.width / 2, p5.height / 2, step * p5.width, step * p5.height);
    }
    */
  };

  const draw = (p5) => {
    const radius = p5.floor(p5.min(p5.width, p5.height) / 5);
    for (let i = 0; i < symmetrieNumber; ++i) {
      generateBranch(p5, p5.createVector(p5.width / 2, p5.height / 2), radius, (p5.TWO_PI / symmetrieNumber) * i);
    }
    p5.textSize(32);
    p5.fill(255);
    //  p5.stroke(255);
    //p5.textFont(fontRegular);
    p5.textAlign(p5.CENTER, p5.TOP);
    generateName(p5.random(1, 100000));
    p5.text(name, p5.width / 2, p5.height - 70);
    p5.noLoop();
  };

  const keyPressed = (p5) => {
    //save the canvas when press "s" or space
    if (p5.keyCode === 83 || p5.keyCode === 32) {
      let fileName = "SimonBuechi" + window.location.hash;
      fileName.replace(/[^a-zA-Z0-9]/g, "");
      p5.saveCanvas(fileName, "jpg");
    }
  };

  const preload = (p5) => {
    //  fontRegular = p5.loadFont("Kalam-Regular.ttf");
  };

  return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} preload={preload} />;
};
