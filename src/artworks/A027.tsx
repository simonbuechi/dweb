// @ts-nocheck
import React from "react";
import Sketch from "react-p5";

// see https://openprocessing.org/sketch/383911 for further optimization

const Artwork = (props) => {
  //global constants
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");
  const BRANCH_DEPTH = 15;
  const COLOR_RANGE = 60;
  const COLOR_ALPHA = 0.2;
  let color1, color2, color3, treeColor;

  function branch(p5, x, y, ang, len, d) {
    let x2 = x;
    let y2 = y;
    x += p5.cos(ang) * len;
    y += p5.sin(ang) * len;
  
    if (d === 1) {
      p5.noStroke();
      if (len > 7) {
        p5.fill(color1);
      } else if ( len > 4) {
        p5.fill(color2);
      } else {
        p5.fill(color3);
      }
      p5.ellipse(x2, y2, p5.height/150, p5.height/150);
    } else {
      drawLine(p5, x2, y2, x, y, len);
    }
  
    len *= p5.random(0.7, 0.94);
    d--;
    if (d > 0) {
      branch(p5, x, y, ang - p5.random(0.2, 0.6), len, d);
      branch(p5, x, y, ang + p5.random(0.2, 0.6), len, d);
    }
  }
  
  
  function drawLine(p5, strtx, strty, finx, finy, sw) { 
    let numSegs = 15;
    let fraction = 0;
    let  divBy = numSegs;
    let x1 = strtx;
    let y1 = strty;
    p5.stroke(treeColor);
    p5.noFill();
    p5.strokeWeight(sw * 0.05); 
    p5.beginShape();
    for (let j = 0; j <= numSegs; j++) {
      let x = (p5.randomGaussian()*.3) + x1 + (fraction * (finx-x1));
      let y = (p5.randomGaussian()*.3) + y1 + (fraction * (finy-y1));
      p5.vertex(x, y);
      x1 = x;
      y1 = y;
      fraction = 1.0/divBy--;
    }
    p5.endShape();
  }
  
  function drawBackground(p5) {
    p5.noStroke();
    for (let i = 0; i<p5.width; i+=2) {
      for (let j = 0; j<p5.height; j+=2) {
        p5.fill(p5.random(95,100));
        p5.rect(i, j, 2, 2);
      }
    }
    for (let i = 0; i<100; i++) {
      p5.fill(p5.random(70,90));
      p5.ellipse(p5.random(0, p5.width), p5.random(0, p5.height), p5.random(1, 3), p5.random(1, 3));
    }
  }

  const setup = (p5, canvasParentRef) => {
    //setup canvas & basics
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.noLoop();
    p5.colorMode(p5.HSB,360, 100, 100);
    const baseHue = p5.floor(p5.random(0,360));
    color1 = p5.color(baseHue, p5.floor(p5.random(70,100)), p5.floor(p5.random(70,100)));
    color1.setAlpha(COLOR_ALPHA);
    color2 = p5.color((baseHue + COLOR_RANGE) % 360, p5.floor(p5.random(70,100)), p5.floor(p5.random(70,100)));
    color2.setAlpha(COLOR_ALPHA);
    color3 = p5.color((baseHue + COLOR_RANGE * 2) % 360, p5.floor(p5.random(70,100)), p5.floor(p5.random(70,100)));
    color2.setAlpha(COLOR_ALPHA);
    treeColor = p5.color(p5.floor(p5.random(10,40)), p5.floor(p5.random(10,100)), p5.floor(p5.random(30,60)));
  };

  const draw = (p5) => {
    p5.background(255);
    drawBackground(p5);
    // startX, startY, initial angle, initial branch (trunk) length, recursion control
    branch(p5, p5.width/2, p5.height-100, -p5.random(1.4, 1.74), p5.min(p5.height, p5.width) * 0.12 , BRANCH_DEPTH);
    p5.noFill();
    p5.stroke(180);
    p5.strokeWeight(1);
    p5.rect(0, 0, p5.width-1, p5.height-1);
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

/*
      PVector source = new PVector(mouseX, mouseY);
      
      let branchDistThreshold = 300*300;
      
      for (Branch branch : branches) {
        let distance = distSquared(mouseX, mouseY, branch.end.x, branch.end.y);
        if (distance > branchDistThreshold) {
          continue;
        }
        
        PVector explosion = new PVector(branch.end.x, branch.end.y);
        explosion.sub(source);
        explosion.normalize();
        //let mult = map(distance, 0, branchDistThreshold, 10.0, 1.0); // java mode
        let mult = map(distance, 0, branchDistThreshold, 6.0, 1.0); // js mode
        explosion.mult(mult);
        branch.applyForce(explosion);
      }
      
      let leafDistThreshold = 50*50;
      
      for (Leaf leaf : leaves) {
        let distance = distSquared(mouseX, mouseY, leaf.pos.x, leaf.pos.y);
        if (distance > leafDistThreshold) {
          continue;
        }
        
        PVector explosion = new PVector(leaf.pos.x, leaf.pos.y);
        explosion.sub(source);
        explosion.normalize();
        let mult = map(distance, 0, leafDistThreshold, 2.0, 0.1);
        mult *= random(0.8, 1.2); // Explosion looks too spherical otherwise, this helps give it variation
        explosion.mult(mult);
        leaf.applyForce(explosion);
        
        leaf.dynamic = true;
      }
    */


  return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />;
};

export default Artwork;
