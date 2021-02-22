import React from "react";
import Sketch from "react-p5";

// inspired by https://openprocessing.org/sketch/179401

export default (props) => {
  // get seed from localstorage
  const seed = window.localStorage.getItem("signature");
  // set size to fullscreen
  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;

  let cClouds;
  let cFade;
  let cFurther;
  let cCloser;
  let cMist;

  const setup = (p5, canvasParentRef) => {
    // setup canvas
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);

    p5.size(800, 600);
    p5.smooth();
    //define the colors
    p5.colorMode(HSB, 360, 100, 100);
    cClouds = p5.color(330, 25, 100); //light rose for the clouds
    cFade = p5.color(220, 50, 50); // purplish saturated medium blue for the fade of the sky
    cFurther = p5.color(230, 25, 90); //purplish unsaturated light bluse for the further mountains
    cCloser = p5.color(210, 70, 10); //greeny saturated dark blue for the closer mountains
    cMist = p5.color(360); //white for the mist
  };

  const draw = (p5) => {
    p5.noLoop();
    p5.background(230, 25, 90);
    fade(p5);
    p5.clouds(p5);
    mountains(p5);
  };

  function fade(p5) {
    let i;
    for (i = 0; i < height / 3; i++) {
      let alfa = map(i, 0, height / 3, 360, 0);
      p5.strokeWeight(1);
      p5.stroke(fadeColor, alfa);
      p5.line(0, i, width, i);
    }
  }

  function clouds(p5) {
    let begin = p5.random(50); //changes the begin of noise each time
    let i = 0;

    for (let x = 0; x < width; x += 2) {
      let j = 0;

      for (let y = 0; y < height / 3; y += 2) {
        let alfaMax = p5.map(y, 0, height / 4, 520, 0); //the clouds become transparent as they become near to the mountains
        let alfa = p5.noise(begin + i, begin + j);
        alfa = p5.map(alfa, 0.4, 1, 0, alfaMax);

        p5.noStroke();
        p5.fill(cloudColor, alfa);
        p5.ellipse(x, y, 2, 2);

        j += 0.06; //increase j faster than i so the clouds look horizontal
      }

      i += 0.01;
    }
  }

  function mountains(p5) {
    //FIND THE REFERENCE Y OF EACH MOUNTAIN:
    let y0 = width - 500; //fist reference y
    let i0 = 30; //initial interval

    let cy = new Array[10](); //initialize the reference y array
    for (let j = 0; j < 10; j++) {
      cy[9 - j] = y0;
      y0 -= i0 / pow(1.2, j);
    }

    //DRAW THE MOUNTAINS/
    let dx = 0;

    for (let j = 1; j < 10; j++) {
      let a = random(-width / 2, width / 2); //random discrepancy between the sin waves
      let b = random(-width / 2, width / 2); //random discrepancy between the sin waves
      let c = random(2, 4); //random amplitude for the second sin wave
      let d = random(40, 50); //noise function amplitude
      let e = random(-width / 2, width / 2); //adds a discrepancy between the noise of each mountain

      for (let x = 0; x < width; x++) {
        let y = cy[j]; //y = reference y
        y += 10 * j * sin((2 * dx) / j + a); //first sin wave oscillates according to j (the closer the mountain, the bigger the amplitude and smaller the frequency)
        y += c * j * sin((5 * dx) / j + b); //second sin wave has a random medium amplitude (affects more the further mountains) and bigger frequenc
        y += d * j * p5.noise((1.2 * dx) / j + e); //first p5. function adds randomness to the mountains, amplitude depends on a random number and increases with j, frequency decrases with j
        y += 1.7 * j * p5.noise(10 * dx); //second noise function simulates the canopy, it has high frequency and small amplitude depending on j so it is smoother on the further mountains

        p5.strokeWeight(2); //mountains look smoother with stroke weight of 2
        p5.stroke(lerpColor(furtherColor, closerColor, j / 9));
        p5.line(x, y, x, p5.height);

        dx += 0.02;
      }

      //ADD MIST
      for (let i = p5.height; i > cy[j]; i -= 3) {
        let alfa = p5.map(i, cy[j], p5.height, 0, 360 / (j + 1)); //alfa is begins bigger for the further mountains
        p5.strokeWeight(3); //interval of 3 for faster rendering
        p5.stroke(cMist, alfa);
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
