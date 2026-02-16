// @ts-nocheck
import React from "react";
import Sketch from "react-p5";

const Artwork = (props) => {
  //global constants
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");
  //const COLORS = ["#ff0000", "#feb30f", "#0aa4f7", "#000000", "#ffffff"];
  const NUMBER_OF_AGENTS = 300;
  const BORDER =-50;
  const NUMBER_OF_COLORS = 8;
  const COLOR_VARIANCE = 50;
  let agent = [];
  let colors =  [];
  
  class Agent {
    constructor(p5) {
      this.p = p5.createVector(p5.random(BORDER,p5.width - BORDER), p5.random(BORDER, p5.height - BORDER));
      //this.p = p5.createVector(floor(p5.random(width)),floor(p5.random(height)));
      this.pOld = p5.createVector(this.p.x, this.p.y);
      this.step = 0.5;
      this.scale = 5;
      let temp = p5.random(colors);
      this.color = temp;
      /*
      this.color = p5.color(
        p5.hue(temp) + p5.randomGaussian()*10,
        p5.saturation(temp) + p5.randomGaussian()*10,
        p5.brightness(temp) * 0.75, 
        p5.random(0,50)
        );
        */
      if(p5.random(0,1) > 0.5)
      {
        this.direction = 1;
      } else
      {
        this.direction = -1;
      }
      this.strokeWidth = 2; //p5.random(1,2);
    }
    update(p5) {
      /*
      if (p5.random(0,1) < 1.0e-4)
      {
        this.direction *= -1;
      }
      */
      this.p.x += this.direction * vector_field(p5, this.p.x, this.p.y,this.scale).x * this.step;
      this.p.y += this.direction * vector_field(p5, this.p.x, this.p.y,this.scale).y * this.step;
      p5.strokeWeight(this.strokeWidth);
      p5.stroke(this.color);
      p5.line(this.pOld.x, this.pOld.y, this.p.x, this.p.y);
      //this.pOld.set(this.p);
    }
  }

  // vector field function 
  // the painting agents follow the flow defined 
  // by this function 
  function vector_field(p5, x, y,myScale) {
    x = p5.map(x, 0, p5.width, -myScale, myScale);
    y = p5.map(y, 0, p5.height, -myScale, myScale);
    let k1 = 5;
    let k2 = 3;
    //let u = p5.sin(k1 * y) + p5.cos(k2 * y) + p5.map(p5.noise(x,y),0,1,-1,1);
    //let v = p5.sin(k2 * x) - p5.cos(k1 * x) + p5.map(p5.noise(x,y),0,1,-1,1);
    let u = p5.sin(k1 * y) + p5.cos(k2 * y);
    let v = p5.sin(k2 * x) - p5.cos(k1 * x);
    return p5.createVector(u,v);
  }

  const setup = (p5, canvasParentRef) => {
    //setup canvas & basics
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.colorMode(p5.HSB, 360, 100, 100, 100);

    //set colors
    let baseHue = p5.floor(p5.random(0,360));
    colors.push(p5.color(1,0,0, 50)); // add black
    colors.push(p5.color(1,0,100, 50)); // add white
    for (let i = 0; i < NUMBER_OF_COLORS -2; i++) {
      colors.push(p5.color((baseHue + i*COLOR_VARIANCE) % 360, 80, 80, 20));
    }
    p5.background(0,0,0);
    //p5.blendMode(p5.DIFFERENCE);
    //p5.rectMode(p5.CENTER);
    p5.strokeCap(p5.SQUARE);
    for (let i = 0; i < NUMBER_OF_AGENTS; i++) {
      agent.push(new Agent(p5));
    }
  };

  const draw = (p5) => {
    if(p5.frameCount >1500) {
      p5.noLoop();
    }
    for (let i = 0; i < agent.length; i++) {
        agent[i].update(p5);
    }	
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

export default Artwork;
