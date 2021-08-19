import React from "react";
import Sketch from "react-p5";

export const Artwork = (props) => {
  //global constants
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");
  const COLOR_VARIANCE = 30;
  const COLOR_BRIGHTNESS_MIN = 80;
  const COLOR_BRIGHTNESS_MAX = 90;
  const COLOR_SATURATION_MIN = 30;
  const COLOR_SATURATION_MAX = 50;
  //global variables
  let colors = [];

  const setup = (p5, canvasParentRef) => {
    //setup canvas & basics
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.colorMode(p5.HSB, 360, 100, 100);
    p5.blendMode(p5.ADD);
    p5.background(0);
    // set color scheme
    const baseHue = p5.floor(p5.noise(1) * 360);
    colors = [
      p5.color(
        baseHue,
        p5.floor(p5.random() * (COLOR_SATURATION_MAX - COLOR_SATURATION_MIN) + COLOR_SATURATION_MIN),
        p5.floor(p5.random() * (COLOR_BRIGHTNESS_MAX - COLOR_BRIGHTNESS_MIN) + COLOR_BRIGHTNESS_MIN)
      ),
      p5.color(
        baseHue + p5.floor(1 * COLOR_VARIANCE),
        p5.floor(p5.random() * (COLOR_SATURATION_MAX - COLOR_SATURATION_MIN) + COLOR_SATURATION_MIN),
        p5.floor(p5.random() * (COLOR_BRIGHTNESS_MAX - COLOR_BRIGHTNESS_MIN) + COLOR_BRIGHTNESS_MIN)
      ),
      p5.color(
        baseHue + p5.floor(2 * COLOR_VARIANCE),
        p5.floor(p5.random() * (COLOR_SATURATION_MAX - COLOR_SATURATION_MIN) + COLOR_SATURATION_MIN),
        p5.floor(p5.random() * (COLOR_BRIGHTNESS_MAX - COLOR_BRIGHTNESS_MIN) + COLOR_BRIGHTNESS_MIN)
      ),
      p5.color(
        baseHue + p5.floor(3 * COLOR_VARIANCE),
        p5.floor(p5.random() * (COLOR_SATURATION_MAX - COLOR_SATURATION_MIN) + COLOR_SATURATION_MIN),
        p5.floor(p5.random() * (COLOR_BRIGHTNESS_MAX - COLOR_BRIGHTNESS_MIN) + COLOR_BRIGHTNESS_MIN)
      ),
      p5.color(
        baseHue + p5.floor(4 * COLOR_VARIANCE),
        p5.floor(p5.random() * (COLOR_SATURATION_MAX - COLOR_SATURATION_MIN) + COLOR_SATURATION_MIN),
        p5.floor(p5.random() * (COLOR_BRIGHTNESS_MAX - COLOR_BRIGHTNESS_MIN) + COLOR_BRIGHTNESS_MIN)
      ),
      p5.color(
        baseHue + p5.floor(5 * COLOR_VARIANCE),
        p5.floor(p5.random() * (COLOR_SATURATION_MAX - COLOR_SATURATION_MIN) + COLOR_SATURATION_MIN),
        p5.floor(p5.random() * (COLOR_BRIGHTNESS_MAX - COLOR_BRIGHTNESS_MIN) + COLOR_BRIGHTNESS_MIN)
      ),
      p5.color(
        baseHue + p5.floor(6 * COLOR_VARIANCE),
        p5.floor(p5.random() * (COLOR_SATURATION_MAX - COLOR_SATURATION_MIN) + COLOR_SATURATION_MIN),
        p5.floor(p5.random() * (COLOR_BRIGHTNESS_MAX - COLOR_BRIGHTNESS_MIN) + COLOR_BRIGHTNESS_MIN)
      ),
    ];
  };

  const draw = (p5) => {
    p5.translate(p5.width / 2, p5.height / 2);
    p5.scale(0.66);
    p5.translate(-p5.width / 2, -p5.height / 2);

    let seg = p5.floor(p5.random(4, 8));
    let w = p5.height / seg;
    let v = p5.width / seg;
    for (let i = 0; i <= seg; i++) {
      for (let j = 0; j <= seg; j++) {
        let x = i * v;
        let y = j * w;
        p5.noFill();
        p5.stroke(255, 1);
        if ((i + j) % 2 === 0) {
          let t = p5.random(100000);
          let a = p5.random(1234567);
          let col1 = p5.color(colors[0]);
          col1.setAlpha(0.1);
          p5.shuffle(colors, true);
          p5.push();
          p5.translate(x, y);
          p5.rotate(a);
          p5.stroke(col1);
          p5.noFill();
          for (let i = 0; i < 1000; i++) {
            p5.rotate(p5.noise(i * 0.01) * 0.03);
            p5.rect(0, 0, w * p5.noise(i * 0.007, t), w * p5.noise(i * 0.01, t));
            t += 0.001;
          }
          p5.pop();
        }
      }
    }
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

  return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />;
};
