// @ts-nocheck
import React from "react";
import Sketch from "react-p5";

const Artwork = (props) => {
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");

  var palette = [
    "#281A16", 
    "#434F35", 
    "#7C643C", 
    "#623012", 
    "#B96828", 
    "#9D3E16", 
    "#D78F37", 
    "#A58E60", 
    "#E0CA4E", 
    "#D9C693"
  ];
  
  var x, y, nextX, nextY, xAdj = 100, yAdj = 100;
  var odd = true, firstTime = true;

  function drawBezierVine(p5, xIn,  yIn) {
    if (firstTime) {
      x = xIn;
      y = yIn;
      firstTime = false;
    }
  
    nextX = p5.random(x-xAdj, x+xAdj);
    nextY = p5.random(y-yAdj, y-yAdj/3);
  
    if (odd && p5.random(1) < .5) {
      p5.noFill();
      p5.stroke(palette[p5.int(p5.random(10))]);
    } else {
      p5.fill(palette[p5.int(p5.random(10))]);
      p5.stroke(palette[p5.int(p5.random(10))]);
    }
  
    p5.bezier(x, y, 
    p5.random(x-xAdj, nextX+xAdj), 
    p5.random(y-yAdj, nextY+yAdj), 
    p5.random(x-xAdj, nextX+xAdj), 
    p5.random(y-yAdj, nextY+yAdj), 
    nextX, nextY);
    if (!odd) {
      p5.line(x, y, nextX, nextY);
    }
    if (p5.random(1) < .5) {
      var x2 = p5.random(x-xAdj, nextX+xAdj);
      var y2 = p5.random(y-yAdj, nextY+yAdj);
      p5.line(x, y, x2, y2);
      p5.fill(palette[p5.int(p5.random(10))]);
      var sze = p5.random(5, 15);
      p5.ellipse(x2, y2, sze, sze);
    }
  
    x = nextX;
    y = nextY;
  
    odd = !odd; // not odd == even
  
    if (y < 0) {
      firstTime = true;
    }
  }

  function reset(p5) {
    p5.background("#FFFFFF");
  }

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.strokeWeight(1);
    //frameRate(20);
    reset(p5);
  };

  const draw = (p5) => {
    drawBezierVine(p5, p5.random(-50, p5.width+50), p5.height + p5.random(10, 100));
    p5.stroke(150);
    p5.noFill();
    p5.rect(0, 0, p5.width-1, p5.height-1);
    if(p5.frameCount % 600 === 0) {
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
