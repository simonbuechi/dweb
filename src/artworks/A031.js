import React from "react";
import Sketch from "react-p5";

const Artwork = (props) => {
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");
  const COLOR_VARIANCE = 50;
  const COLOR_NUMBER = 7;
  const SATURATION_LOW = 70;
  const SATURATION_HIGH = 100;
  const BRIGHTNESS_LOW = 60;
  const BRIGHTNESS_HIGH = 100;
  let colors =[];

  function tri(p5, x, y, w) {
    let h = w / 2 * p5.sqrt(2);
    //let dis = p5.dist(p5.width/2, p5.height/2, x, y);
    //let c = p5.map(dis, 0, p5.width/2 * p5.sqrt(2), 325, 175);
    for(let i = 0; i < 4; i++){
      let c = p5.random(colors);
      c.setAlpha(30);
      p5.fill(c);
      p5.stroke(c);
      p5.noStroke();
      p5.beginShape();
      p5.vertex(x, y);
      p5.vertex(x + h * p5.cos(45 + i * 90), y + h * p5.sin(45 + i * 90));
      p5.vertex(x + h * p5.cos(45 + (i+1) * 90), y + h * p5.sin(45 + (i+1) * 90));
      p5.endShape(p5.CLOSE);
    }
    for(let i = 0; i < 4; i++){
      let c = p5.random(colors);
      c.setAlpha(30);
      p5.fill(c);
      p5.stroke(c);
      p5.beginShape();
      p5.vertex(x, y);
      p5.vertex(x + w/2 * p5.cos(i * 90), y + w/2 * p5.sin(i * 90));
      p5.vertex(x + h * p5.cos(i * 90 + 45), y + h * p5.sin(i * 90 + 45));
      p5.vertex(x + w/2 * p5.cos((i+1) * 90), y + w/2 * p5.sin((i+1) * 90));
      p5.endShape(p5.CLOSE);
    }
  }

  function separateGrid(p5, x, y, d) {
    let sepNum = p5.int(p5.random(1, 4));
    let w = d / sepNum;
    for (let i = x; i < x + d - 1; i += w) {
      for (let j = y; j < y + d - 1; j += w) {
        if (p5.random(100) > 10 && d > 70) {
          separateGrid(p5, i, j, w);
        } else {
          let xx = i + w / 2;
          let yy = j + w / 2;
          tri(p5, xx, yy, w);
        }
      }
    }
  }

  function reset(p5) {
    p5.background(0, 0, 0);
    colors = [];
    const baseHue = p5.int(p5.random(0, 360));
    for(let i = 0; i< COLOR_NUMBER; i++){
      colors.push(p5.color(
        (baseHue + i * COLOR_VARIANCE) % 360,
        p5.int(p5.random(SATURATION_LOW, SATURATION_HIGH)),
        p5.int(p5.random(BRIGHTNESS_LOW, BRIGHTNESS_HIGH))
        ));
    }
  }

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.colorMode(p5.HSB, 360, 100, 100, 100);
    p5.angleMode(p5.DEGREES);
    reset(p5);
    p5.noLoop();
  };

  const draw = (p5) => {
    let ww = p5.sqrt(p5.width * p5.width + p5.height * p5.height);
    p5.push();
    p5.translate(p5.width / 2, p5.height / 2);
    p5.rotate(45);
    p5.translate(-ww / 2, -ww/2);
    separateGrid(p5, 0, 0, ww);
    separateGrid(p5, 0, 0, ww);
    separateGrid(p5, 0, 0, ww);
    separateGrid(p5, 0, 0, ww);
    p5.pop();
  };

  const keyPressed = (p5) => {
    if (p5.key === 'r') {
      p5.clear();
      reset(p5);
      p5.redraw();
    }
    if (p5.key === 's') {
      let fileName = "SimonBuechi" + window.location.hash;
      fileName.replace(/[^a-zA-Z0-9]/g, "");
      p5.saveCanvas(fileName, "jpg");
    }
  };

  return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />;
};

export default Artwork;