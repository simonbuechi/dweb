import React from "react";
import Sketch from "react-p5";

const Artwork = (props) => {
  //global constants
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");
  const LINES = 9;
  const STRIPES = 250;
  const OPACITY = 0.1;
  const BACKGROUND_HUE = 360;
  const BACKGROUND_SATURATION = 50;
  const BACKGROUND_BRIGHTNESS = 5;
  const BACKGROUND_BRIGHTNESS_LIGHTEN = 15;
  const COLOR_VARIANCE = 40;
  const COLOR_BRIGHTNESS_MIN = 95;
  const COLOR_BRIGHTNESS_MAX = 99;
  const COLOR_SATURATION_MIN = 30;
  const COLOR_SATURATION_MAX = 50;
  //global variables
  let colors = [];
  let i = 0;

  function noiseCurve(p5, x, y) {
    p5.noFill();
    p5.beginShape();
    for (let i = 0; i < STRIPES; i++) {
      let scl = 0.0003;
      let angle = p5.noise(x * scl, y * scl, i * 0.0002) * 160;
      p5.vertex(x, y);
      x += p5.cos(angle) * 3;
      y += p5.sin(angle) * 3;
    }
    p5.endShape();
  }

  const setup = (p5, canvasParentRef) => {
    //setup canvas & basics
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.colorMode(p5.HSB, 360, 100, 100);
    //set background
    p5.background(p5.color(BACKGROUND_HUE, BACKGROUND_SATURATION, BACKGROUND_BRIGHTNESS));
    p5.noStroke();
    for (let i = Math.max(p5.width, p5.height); i > 0; i--) {
      const step = i / Math.max(p5.width, p5.height);
      const gradient = p5.lerpColor(
        p5.color(BACKGROUND_HUE, BACKGROUND_SATURATION, BACKGROUND_BRIGHTNESS + BACKGROUND_BRIGHTNESS_LIGHTEN),
        p5.color(BACKGROUND_HUE, BACKGROUND_SATURATION, BACKGROUND_BRIGHTNESS),
        step
      );
      p5.fill(gradient);
      p5.ellipse(p5.width / 2, p5.height / 2, step * p5.width, step * p5.height);
    }
    //setup color scheme
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
    ];
  };

  const draw = (p5) => {
    p5.translate(p5.width / 2, p5.height / 2);
    p5.scale(0.55);
    p5.translate(-p5.width / 2, -p5.height / 2);
    let y = p5.map(i, 0, LINES, 0, p5.height);
    //let col = p5.color(colors[i % colors.length]);
    let col = p5.color(colors[p5.floor(p5.random(0, colors.length))]);
    p5.stroke(col);
    p5.line(0, y, p5.width, y);
    col.setAlpha(OPACITY);
    p5.stroke(col);
    for (let x = 0; x < p5.width; x++) {
      noiseCurve(p5, x, y);
    }
    i += 1;
    if (i >= LINES) {
      p5.noLoop();
    }
  };

  const keyPressed = (p5) => {
    //save the canvas when press "s" or space
    if (p5.keyCode === 83 || p5.keyCode === 32) {
      p5.saveCanvas("simons_artwork", "jpg");
    }
  };

  return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />;
};

export default Artwork;