// @ts-nocheck
import React from "react";
import Sketch from "react-p5";

const Artwork = (props) => {
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");
  const ITERATIONS_AVG = 200;
  const ITERATIONS_VARIANCE = 100;
  const SATURATION = 60;
  const BRIGHTNESS = 80;
  const TRANSPARENCY = 20;
  const COLOR_VARIANCE = 90;
  const BRUSH_WIDTH_AVG = 5;
  const BRUSH_HEIGHT_AVG = 5;
  const BRUSH_SIZE_VARIANCE = 4;
  let x, y, r, a, av, iterations, baseColor;

  function reset(p5) {
    x = Array(4);
    y = Array(4);
    r = Array(4);
    a = Array(4);
    av = Array(4);
    for(var i = 1; i < 3; i++) {
      r[i] = p5.height/(i+1);
      av[i] = p5.random(-1.0,1.0);
      a[i] = p5.random(0,6.283);  
    }
    p5.background(0);
    iterations = p5.int(p5.max(p5.randomGaussian(ITERATIONS_AVG, ITERATIONS_VARIANCE), 50));
    baseColor = p5.int(p5.random(0, 100));
  }

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.colorMode(p5.HSB, 100, 100, 100, 100);
    p5.blendMode(p5.ADD);
    reset(p5);
  };

  const draw = (p5) => {
    for(let i = 1; i < 3; i++) {
      x[i] = r[i]*p5.cos(a[i]) + p5.width/2;
      y[i] = r[i]*p5.sin(a[i]) + p5.height/2;
      a[i] += av[i];
      if(a[i] > 6.283) a[i] -= 6.283;
      else if(a[i] < 0) a[i] += 6.283;
    }
    x[0] = p5.random(p5.width);
    y[0] = p5.random(p5.height);
    x[3] = p5.random(p5.width);
    y[3] = p5.random(p5.height);
    const brushWidth = p5.randomGaussian(BRUSH_WIDTH_AVG, BRUSH_SIZE_VARIANCE);
    const brushHeight = p5.randomGaussian(BRUSH_HEIGHT_AVG, BRUSH_SIZE_VARIANCE);
    for(let t = 0; t < 1.0; t += 0.001) {
      const tx = p5.bezierPoint(x[0],x[1],x[2],x[3],t);  
      const ty = p5.bezierPoint(y[0],y[1],y[2],y[3],t);  
      let d = p5.sqrt((tx - p5.width/2)*(tx - p5.width/2)+(ty-p5.height/2)*(ty-p5.height/2));
      d = p5.sqrt(p5.width/2*p5.width/2+p5.height/2*p5.height/2)-d;
      if( 20.0 * d / p5.width < 2) {
        d =  p5.width / 10;
      } 
      p5.fill((baseColor + t * COLOR_VARIANCE) % 100, SATURATION, BRIGHTNESS, TRANSPARENCY * d/p5.width);
      p5.ellipse(tx, ty, brushWidth * (p5.sin(t*6.28)+1), brushHeight * (p5.sin(t*6.28)+1));
    }
    if(p5.frameCount % iterations === 0) {
      p5.noLoop();
    }
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
