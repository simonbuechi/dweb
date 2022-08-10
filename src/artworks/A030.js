import React from "react";
import Sketch from "react-p5";

const Artwork = (props) => {
  //global constants
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");
  const STROKE_WEIGHT = 30;
  const STROKE_WEIGHT_MAX = 10;
  const easing = 0.09;
  let slices;
  //color
  let h = 0.0;
  let h_range = 50;
  let h_num = 0.0;
  //mouse position
  let easeMouseX = 0;
  let easeMouseY = 0;
  let prevMouseX = 0;
  let prevMouseY = 0;
  //weight
  let x,y;
  let xOff = 0;
  let xOffStep = 0.007;
  //kaleidoscope config
  let positionX, positionY;
  let scale;

  function drawLine(p5){
    for(let i = 0; i<5; i++){
      p5.stroke(h, 70, 50 + i*13);
      let weight = p5.dist(easeMouseX, easeMouseY, prevMouseX, prevMouseY);
      p5.strokeWeight(p5.constrain(STROKE_WEIGHT/weight,1,STROKE_WEIGHT_MAX));
      if(i%2 === 0){
        p5.line(easeMouseX-(p5.width/2)- i, easeMouseY-(p5.height/2)- i, prevMouseX-(p5.width/2)- i, prevMouseY-(p5.height/2)- i);		
      }else{ 
        p5.line(easeMouseX-(p5.width/2) + i, easeMouseY-(p5.height/2) + i, prevMouseX-(p5.width/2) + i, prevMouseY-(p5.height/2) + i);				
      }
    }
  }

  function reset(p5, fullReset = false) {
    if(fullReset) {
      p5.background(100, 0, 100);
    }
    slices = p5.floor(p5.random(15) + 3);
    h_range = p5.random(0,80);
    positionX = p5.random(p5.width*0.1, p5.width*0.9);
    positionY = p5.random(p5.height*0.1, p5.height*0.9);
    easeMouseX = prevMouseX = p5.width/2;
    easeMouseY = prevMouseY = p5.height/2;
    scale = 1; // p5.random(0.3,0.7);
  }

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.colorMode(p5.HSB, 100, 100, 100, 100);
    reset(p5, true);
  };

  const draw = (p5) => {
    x = p5.noise(xOff);
    y = p5.noise(xOff + 10);
    xOff += xOffStep;
    easeMouseX = prevMouseX + x * 150;
    easeMouseY = prevMouseY + y * 150;

    h = p5.abs(p5.sin(h_num)) * 30 + h_range;
    h_num += 0.008;
    easeMouseX += (x - easeMouseX) * easing;
    easeMouseY += (y - easeMouseY) * easing;
    for(let i = 0; i<slices; i++){
      p5.push();
      p5.translate(positionX,positionY);
      p5.scale(scale);
      p5.rotate(p5.radians(i*360/slices));
      drawLine(p5);
      p5.pop();
    }
    prevMouseX = easeMouseX;
    prevMouseY = easeMouseY;
    if(p5.frameCount % 200 === 0) {
      reset(p5);
    }
    if(p5.frameCount % 2000 === 0) {
      p5.noLoop();
      console.log("stop")
    }
  };

  const keyPressed = (p5) => {
    switch (p5.key) {
      case "s":
        let fileName = "SimonBuechi" + window.location.hash;
        fileName.replace(/[^a-zA-Z0-9]/g, "");
        p5.saveCanvas(fileName, "jpg");
        break;
      case "r":
        p5.clear();
        reset(p5, true);
        p5.loop();
        break;
      default:
        break;
    }
  };
  
  return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />;
};

export default Artwork;