// @ts-nocheck
import React from "react";
import Sketch from "react-p5";

const Artwork = (props) => {
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");
  const ELEMENTS_NUMBER = 200;
  const BLUR_FACTOR = 0.07;
  const ELEMENT_SIZE = 0.04;
  const IMAGE_OVERLOAD = 200;
  const COLOR_BACKGROUND = "#355070";
  const COLOR_PALETTE = [
    "#6D597A", 
    "#C8AB83", //beige
    "#5CC8FF", 
    "#93867F", 
    "#26C485"
  ];
  let g;

  function createPattern(p5) 
  {
   // const w = p5.width;
    const h = p5.height - IMAGE_OVERLOAD;
    g = p5.createGraphics(p5.width, h);
    g.pixelDensity(1);
    g.colorMode(p5.HSB, 360, 100, 100, 100);
    g.angleMode(p5.DEGREES);
    g.blendMode(p5.BLEND);
    g.background(p5.color(COLOR_BACKGROUND));
    g.blendMode(p5.ADD);
    g.push();
    g.translate(-p5.width, -h);
    for (let i = 0; i < ELEMENTS_NUMBER; i++) 
    {
      let x = p5.random(p5.width);
      let y = p5.random(h);
      let _w = p5.max(20, p5.randomGaussian(p5.width * ELEMENT_SIZE, p5.width * ELEMENT_SIZE * 0.5));
      let _h = p5.max(20, p5.randomGaussian(h * ELEMENT_SIZE, p5.width * ELEMENT_SIZE * 0.5 ));
      if (x + _w > p5.width) _w = p5.width - x;
      if (y + _h > h) _h = h - y;
      if(i % 10 === 0) {
        g.drawingContext.shadowOffsetX = p5.width;
        g.drawingContext.shadowOffsetY = h;
        g.drawingContext.shadowColor = p5.color(p5.random(COLOR_PALETTE) + p5.hex(100, 2));
        g.drawingContext.shadowBlur = p5.random(p5.width * BLUR_FACTOR);
      }
      g.noStroke();
      const shearX = p5.random(30);
      const shearY = p5.random(30);
      const rotate = p5.random(360);
      g.push();
      g.translate(x, y);
      g.shearX(shearX);
      g.shearY(shearY);
      g.rotate(rotate);
      g.ellipse(0, 0, _w, _h);
      g.pop();

      g.push();
      g.translate(x, y- h);
      g.shearX(shearX);
      g.shearY(shearY);
      g.rotate(rotate);
      g.ellipse(0, 0, _w, _h);
      g.pop();

      g.push();
      g.translate(x, y + h);
      g.shearX(shearX);
      g.shearY(shearY);
      g.rotate(rotate);
      g.ellipse(0, 0, _w, _h);
      g.pop();

      /*
      g.push();
      g.ellipse(0, -h, _w, _h); // replicate to make seamless top/bottom and left/right repetition
      g.push();
      g.ellipse(0, h, _w, _h); // replicate to make seamless top/bottom and left/right repetition
      g.pop();
      g.pop();
      */
    //  g.ellipse(-w, 0, _w, _h);  // replicate to make seamless top/bottom and left/right repetition
      //g.rect(0,0,_w,_h);
      //g.triangle(-_w/2, -_h/2, 0, 0, _w, _h);
    }
    g.pop();
    return g;
  }

  function reset(p5) {
    g = createPattern(p5);
  }

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(Number(CANVAS_WIDTH), Number(CANVAS_HEIGHT) + IMAGE_OVERLOAD).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.colorMode(p5.HSB, 360, 100, 100, 100);
    p5.pixelDensity(1);
    reset(p5);
  };

  const draw = (p5) => {
    let offset = p5.width / 20;
    let x = 0;
    let y = 0;
    p5.push();
    p5.noStroke();
    p5.drawingContext.shadowColor = p5.color(0, 0, 100, 33);
    p5.drawingContext.shadowBlur = offset / 3;
    p5.rect(x, y, p5.width, p5.height);
    p5.drawingContext.clip();
    p5.image(g, 0, 0);
    p5.pop();
    //p5.resizeCanvas(CANVAS_WIDTH, CANVAS_HEIGHT - IMAGE_OVERLOAD);
    p5.noLoop();
  };

  const keyPressed = (p5) => {
    if (p5.key === 'r') {
      p5.clear();
      reset(p5);
      p5.loop();
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
