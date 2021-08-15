import React from "react";
import Sketch from "react-p5";

export default (props) => {
  //global constants
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");
 

  let slices;

  //color
  let h = 0.0;
  let h_range = 50;
  let h_num = 0.0;

  //mouse position
  let easeMouseX;
  let easeMouseY;
  let prevMouseX;
  let prevMouseY;
  let easing = 0.09;

  //weight
  let w_range;

  function drawLine(p5){
    for(let i = 0; i<5; i++){
      p5.stroke(h, 70, 50 + i*13);
      let weight = p5.dist(easeMouseX, easeMouseY, prevMouseX, prevMouseY);
      p5.strokeWeight(weight/w_range);
      if(i%2 === 0){
        p5.line(easeMouseX-(p5.width/2)- i, easeMouseY-(p5.height/2)- i, prevMouseX-(p5.width/2)- i, prevMouseY-(p5.height/2)- i);		
      }else{ 
        p5.line(easeMouseX-(p5.width/2) + i, easeMouseY-(p5.height/2) + i, prevMouseX-(p5.width/2) + i, prevMouseY-(p5.height/2) + i);				
      }
    }
  }

  const setup = (p5, canvasParentRef) => {
    //setup canvas & basics
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    
    p5.colorMode(p5.HSB, 100);
	  p5.background(100, 0, 100);
  	p5.mousePressed();
  };

  const draw = (p5) => {
    h = p5.abs(p5.sin(h_num)) * 30 + h_range;
    h_num += 0.1;
    easeMouseX += (p5.mouseX - easeMouseX) * easing;
    easeMouseY += (p5.mouseY - easeMouseY) * easing;
    for(let i = 0; i<slices; i++){
      p5.push();
      p5.translate(p5.width/2,p5.height/2);
      p5.rotate(p5.radians(i*360/slices));
      drawLine(p5);
      p5.pop();
    }
    prevMouseX = easeMouseX;
    prevMouseY = easeMouseY;
  };

  const keyPressed = (p5) => {
    //save the canvas when press "s" or space
    if (p5.keyCode === 83 || p5.keyCode === 32) {
      let fileName = "SimonBuechi" + window.location.hash;
      fileName.replace(/[^a-zA-Z0-9]/g, "");
      p5.saveCanvas(fileName, "jpg");
    }
    if (p5.key === 'r') {
      p5.refresh();
    }
  };

  const mousePressed = (p5) => {
    slices = p5.floor(p5.random(15) + 3);
    h_range = p5.random(0,80);
    w_range = p5.floor(p5.random(7) + 1);
    easeMouseX = prevMouseX = p5.mouseX;
    easeMouseY = prevMouseY = p5.mouseY;
    p5.background(100, 0, 100);
  }
  
  return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} mousePressed={mousePressed} />;
};