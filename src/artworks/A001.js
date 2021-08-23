import React from "react";
import Sketch from "react-p5";

const Artwork = (props) => {
  //global constants
  const CANVAS_WIDTH = document.documentElement.clientWidth;
  const CAVNAS_HEIGHT = document.documentElement.clientHeight;
  const seed = window.localStorage.getItem("signature");
  const COLOR_VARIANCE = 40;
  const COLOR_BRIGHTNESS_MIN = 40;
  const COLOR_BRIGHTNESS_MAX = 90;
  const COLOR_SATURATION_MIN = 30;
  const COLOR_SATURATION_MAX = 90;
  const BAR_LENGTH_MIN = 5;
  const BAR_AMOUNT = 25;
  let offset = 0;
  let colors;
  /*
  function normDist(u = 0, v = 0) {
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }
*/
  const setup = (p5, canvasParentRef) => {
    //setup canvas
    p5.createCanvas(CANVAS_WIDTH, CAVNAS_HEIGHT).parent(canvasParentRef);
    p5.background(255);
    p5.colorMode(p5.HSB, 360, 100, 100);
    p5.strokeWeight(0);
    p5.stroke(0, 0, 100);
    p5.noiseSeed(seed !== null ? seed : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(seed !== null ? seed : p5.floor(p5.random(1, 10000)));
    //generate color scheme
    const baseHue = p5.floor(p5.noise(1) * 360);
    colors = [
      p5.color(
        baseHue,
        p5.floor(p5.random() * (COLOR_SATURATION_MAX - COLOR_SATURATION_MIN) + COLOR_SATURATION_MIN),
        p5.floor(p5.random() * (COLOR_BRIGHTNESS_MAX - COLOR_BRIGHTNESS_MIN) + COLOR_BRIGHTNESS_MIN)
      ),
      p5.color(
        baseHue + p5.floor(p5.random() * 1 * COLOR_VARIANCE),
        p5.floor(p5.random() * (COLOR_SATURATION_MAX - COLOR_SATURATION_MIN) + COLOR_SATURATION_MIN),
        p5.floor(p5.random() * (COLOR_BRIGHTNESS_MAX - COLOR_BRIGHTNESS_MIN) + COLOR_BRIGHTNESS_MIN)
      ),
      p5.color(
        baseHue + p5.floor(p5.random() * 2 * COLOR_VARIANCE),
        p5.floor(p5.random() * (COLOR_SATURATION_MAX - COLOR_SATURATION_MIN) + COLOR_SATURATION_MIN),
        p5.floor(p5.random() * (COLOR_BRIGHTNESS_MAX - COLOR_BRIGHTNESS_MIN) + COLOR_BRIGHTNESS_MIN)
      ),
      p5.color(
        baseHue + p5.floor(p5.random() * 3 * COLOR_VARIANCE),
        p5.floor(p5.random() * (COLOR_SATURATION_MAX - COLOR_SATURATION_MIN) + COLOR_SATURATION_MIN),
        p5.floor(p5.random() * (COLOR_BRIGHTNESS_MAX - COLOR_BRIGHTNESS_MIN) + COLOR_BRIGHTNESS_MIN)
      ),
      p5.color(
        baseHue + p5.floor(p5.random() * 4 * COLOR_VARIANCE),
        p5.floor(p5.random() * (COLOR_SATURATION_MAX - COLOR_SATURATION_MIN) + COLOR_SATURATION_MIN),
        p5.floor(p5.random() * (COLOR_BRIGHTNESS_MAX - COLOR_BRIGHTNESS_MIN) + COLOR_BRIGHTNESS_MIN)
      ),
    ];
    /*
    colors[0].hue = p5.floor(p5.noise(seed !== 0 ? 0.5 : Math.random() * 100) * 360);
    colors[0].saturation = p5.floor(p5.noise(0.2) * (95 - 70) + 70);
    colors[0].brightness = 50; // p5.floor(p5.noise(0.3) * (85-50) + 50);
    colors[1].hue = colors[0].hue;
    colors[1].saturation = p5.floor(colors[0].saturation * 0.7);
    colors[1].brightness = p5.floor(colors[0].brightness * 1.5);
    colors[2].hue = colors[0].hue + COLOR_DIFF > 360 ? colors[0].hue + COLOR_DIFF - 360 : colors[0].hue + COLOR_DIFF;
    colors[2].saturation = p5.floor(p5.noise(0.2) * (95 - 70) + 70);
    colors[2].brightness = 50; // p5.floor(p5.noise(0.3) * (85-50) + 50);
    colors[3].hue = colors[2].hue;
    colors[3].saturation = p5.floor(colors[2].saturation * 0.7);
    colors[3].brightness = p5.floor(colors[2].brightness * 1.5);
    colors[4].hue = colors[0].hue + 2 * COLOR_DIFF > 360 ? colors[0].hue + 2 * COLOR_DIFF - 360 : colors[0].hue + 2 * COLOR_DIFF;
    colors[4].saturation = p5.floor(p5.noise(0.2) * (95 - 70) + 70);
    colors[4].brightness = p5.floor(p5.noise(0.3) * (85 - 50) + 50);
    */
  };

  const draw = (p5) => {
    //loop to draw rectangles
    for (let i = 0; offset < p5.width; i++) {
      // let r = p5.floor(p5.noise(xoff) * 200);
      let r = p5.max(p5.random() * p5.width * (1 / BAR_AMOUNT), BAR_LENGTH_MIN);
      offset = offset + r;
      p5.fill(colors[i % colors.length]);
      p5.rect(offset - r, 0, offset, p5.height);
    }
    p5.noLoop();
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