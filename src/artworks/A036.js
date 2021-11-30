import React from "react";
import Sketch from "react-p5";

const Artwork = (props) => {
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");
  const numberElements = 200;
  const BLUR_FACTOR = 0.07;
  const elementFactor = 0.04;
  let g = [];
  const bgColor = "#355070";
  const palette = [
    "#6D597A", 
    "#C8AB83", //beige
    "#5CC8FF", 
    "#93867F", 
    "#26C485"
  ];

  function createPattern(p5) 
  {
    let g = p5.createGraphics(p5.width, p5.height);
    g.pixelDensity(1);
    g.colorMode(p5.HSB, 360, 100, 100, 100);
    g.angleMode(p5.DEGREES);
    g.blendMode(p5.BLEND);
    g.background(p5.color(bgColor));
    g.blendMode(p5.ADD);
    g.push();
    g.translate(-p5.width, -p5.height);
    for (let i = 0; i < numberElements; i++) 
    {
      let x = p5.random(p5.width);
      let y = p5.random(p5.height);
      let _w = p5.max(20, p5.randomGaussian(p5.width * elementFactor, p5.width * elementFactor * 0.5));
      let _h = p5.max(20, p5.randomGaussian(p5.height * elementFactor, p5.width * elementFactor * 0.5 ));
      if (x + _w > p5.width) _w = p5.width - x;
      if (y + _h > p5.height) _h = p5.height - y;
      if(i % 10 === 0) {
        g.drawingContext.shadowOffsetX = p5.width;
        g.drawingContext.shadowOffsetY = p5.height;
        g.drawingContext.shadowColor = p5.color(p5.random(palette) + p5.hex(100, 2));
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
      g.translate(x, y- p5.height);
      g.shearX(shearX);
      g.shearY(shearY);
      g.rotate(rotate);
      g.ellipse(0, 0, _w, _h);
      g.pop();

      g.push();
      g.translate(x, y + p5.height);
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
    p5.background(100, 0, 100, 100);
    g.push(createPattern(p5, p5.width, p5.height));
  }

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.colorMode(p5.HSB, 360, 100, 100, 100);
    p5.pixelDensity(1);
    reset(p5);
  };

  const draw = (p5) => {
    p5.background(100, 0, 100, 100);
    let offset = p5.width / 20;
    let x = 0;
    let y = 0;
    p5.push();
    p5.noStroke();
    p5.drawingContext.shadowColor = p5.color(0, 0, 100, 33);
    p5.drawingContext.shadowBlur = offset / 3;
    p5.rect(x, y, p5.width, p5.height);
    p5.drawingContext.clip();
    p5.image(g[0], 0, 0);
    p5.pop();
    p5.noLoop();
  };

  const keyPressed = (p5) => {
    if (p5.key === 'r') {
      p5.clear();
      g = [];
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