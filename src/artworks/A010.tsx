// @ts-nocheck
import React from "react";
import Sketch from "react-p5";

const Artwork = (props) => {
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");
  const MOUNTAIN_ROWS = 8;
  const MOUNTAIN_INTERVAL = 40;
  const MOUNTAIN_POSITIONING = 0.6;
  const CLOUDINESS = 0.6;
  let cClouds;
  let cSky;
  let cFurther;
  let cCloser;
  let cMist, cSun;
  let xoff;

  const setup = (p5, canvasParentRef) => {
    // setup canvas
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.smooth();
    //define the colors
    p5.colorMode(p5.HSB, 360, 100, 100);
    cClouds = p5.color(203, 0, 80); //light rose for the clouds
    cSky = p5.color(203, 50, 60); // purplish saturated medium blue for the fade of the sky
    cFurther = p5.color(336, 78, 43); //purplish unsaturated light bluse for the further mountains
    cCloser = p5.color(267, 75, 20); //greeny saturated dark blue for the closer mountains
    cMist = p5.color(360, 0, 100); //white for the mist
    cSun = p5.color(50, 50, 95);
    p5.background(cSky);
  };

  const draw = (p5) => {
    fade(p5, cSky, cSun);
    clouds(p5, cClouds);
    mountains(p5, cCloser, cFurther, cMist);
    p5.noLoop();
  };

  function fade(p5, skyColor, sunColor) {
    p5.noStroke();
    p5.colorMode(p5.RGB);
    for (let i = Math.max(p5.width, p5.height); i > 0; i--) {
      const step = i / Math.max(p5.width, p5.height);
      const gradient = p5.lerpColor(sunColor, skyColor, step);
      p5.fill(gradient);
      p5.ellipse(p5.width / 2, p5.height / 2, step * p5.width, step * p5.height);
    }
    p5.colorMode(p5.HSB, 360, 100, 100);
  }

  function clouds(p5, cloudColor) {
    xoff = 0;
    for (let x = 0; x < p5.width; x += 1) {
      let j = 10;
      for (let y = 0; y < p5.height / 2; y += 1) {
        let alfa = p5.noise(xoff, j);
        alfa = p5.map(alfa, CLOUDINESS, 1, 0, 1);
        p5.noStroke();
        cloudColor.setAlpha(alfa);
        p5.fill(cloudColor);
        p5.ellipse(x, y, 2, 2);
        j += 0.02; //increase j faster than i so the clouds look horizontal
      }
      xoff += 0.005;
    }
  }

  function mountains(p5, closerColor, furtherColor, mistColor) {
    //FIND THE REFERENCE Y OF EACH MOUNTAIN:
    let y0 = p5.height * MOUNTAIN_POSITIONING; //fist reference y
    let cy = []; //initialize the reference y array
    for (let j = 0; j < MOUNTAIN_ROWS; j++) {
      cy[9 - j] = y0;
      y0 -= MOUNTAIN_INTERVAL / p5.pow(1.1, j);
    }
    //DRAW THE MOUNTAINS/
    let dx = 0;
    for (let j = 1; j < MOUNTAIN_ROWS; j++) {
      let a = p5.random(-p5.width / 2, p5.width / 2); //random discrepancy between the sin waves
      let b = p5.random(-p5.width / 2, p5.width / 2); //random discrepancy between the sin waves
      let c = p5.random(2, 4); //random amplitude for the second sin wave
      let d = p5.random(40, 50); //noise function amplitude
      let e = p5.random(-p5.width / 2, p5.width / 2); //adds a discrepancy between the noise of each mountain
      for (let x = 0; x < p5.width; x++) {
        let y = cy[j]; //y = reference y
        y += 10 * j * p5.sin((2 * dx) / j + a); //first sin wave oscillates according to j (the closer the mountain, the bigger the amplitude and smaller the frequency)
        y += c * j * p5.sin((5 * dx) / j + b); //second sin wave has a random medium amplitude (affects more the further mountains) and bigger frequenc
        y += d * j * p5.noise((1.2 * dx) / j + e); //first p5. function adds randomness to the mountains, amplitude depends on a random number and increases with j, frequency decrases with j
        y += 1.7 * j * p5.noise(10 * dx); //second noise function simulates the canopy, it has high frequency and small amplitude depending on j so it is smoother on the further mountains
        p5.strokeWeight(2); //mountains look smoother with stroke weight of 2
        p5.stroke(p5.lerpColor(furtherColor, closerColor, j / 9));
        p5.line(x, y, x, p5.height);
        dx += 0.02;
      }
      //ADD MIST
      p5.strokeWeight(1);
      for (let i = p5.height; i > cy[j]; i -= 1) {
        let alfa = p5.map(i, cy[j], p5.height, 0, 1 / (j + 1)); //alfa is begins bigger for the further mountains
        mistColor.setAlpha(alfa);
        p5.stroke(mistColor);
        //p5.stroke(p5.lerpColor(mistColor, mistColor, 0.2));
        p5.line(0, i, p5.width, i);
      }
    }
  }

  const keyPressed = (p5) => {
    //save the canvas when press "s" or space
    if (p5.keyCode === 83 || p5.keyCode === 32) {
      p5.saveCanvas("simons_artwork", "jpg");
    }
  };

  return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />;
};

export default Artwork;
