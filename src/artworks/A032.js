import React from "react";
import Sketch from "react-p5";

// see https://openprocessing.org/sketch/172143 

const Artwork = (props) => {
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");
  let scope; 
  let state;
  let count = 0;
 
  class Kaleidoscope {
    constructor(p5) {
      this.x=0;
      this.y=0;
      this.l=0;
      this.c=0; 
      this.theta=0;
      this.num=30;
      this.pos=p5.dist(0, 0, p5.mouseX, p5.mouseY)/p5.dist(0, 0, 800, 800);
      this.posTwo=p5.dist(p5.mouseX, p5.mouseY, 800, 800)/p5.dist(800, 800, 0, 0);
      this.posThree=p5.dist(p5.mouseX, p5.mouseY, 0, 800)/p5.dist(800, 800, 0, 0);
    }

    drawShape(p5, x, y, l, c, hexNum, rad, s) {
      p5.noStroke();
      p5.push();
      p5.translate(p5.width/2, p5.height/2);  
      p5.rotate(this.theta+rad); 
      p5.fill(c, l*.34);
      let num;
      if (s===0) {
        //Draw Hexagon at origin//    
        num=80;
        p5.triangle(x, y, x-l/2, y+(l*p5.sqrt(3)/2), x-l, y);
        p5.fill(c, l*.7);
        p5.triangle(x, y, x+l/2, y-(l*p5.sqrt(3)/2), x+l, y);
        p5.fill(c, l*.55);
        p5.triangle(x, y, x-l/2, y-(l*p5.sqrt(3)/2), x-l, y);
        p5.fill(c, l*.4);
        p5.triangle(x, y, x+l/2, y+(l*p5.sqrt(3)/2), x+l, y);
        p5.fill(c, l/3);
        p5.triangle(x, y, x+l/2, y+(l*p5.sqrt(3)/2), x-l/2, y+(l*p5.sqrt(3)/2));
        p5.fill(c, l*.67);
        p5.triangle(x, y, x-l/2, y-(l*p5.sqrt(3)/2), x+l/2, y-(l*p5.sqrt(3)/2));
      }
      if (s===1) {
        num=100;
        //Ellipses//
        for (let j=0; j<5; j++) {
          p5.ellipse(x+l/j, y, l/j, l/j);
          p5.ellipse(x-l/j, y, l/j, l/j);
          p5.ellipse(x, y-l/j, l/j, l/j);
          p5.ellipse(x, y+l/j, l/j, l/j);
        }
      }
      if (s===2) {
        num=50;
        //Rectanlges//
        p5.rect(x, y, x-l/2, y-l/2);
        p5.rect(x, y, x+l/2, y-l/2);
        p5.rect(x, y, x-l/4, y+l/4);
        p5.rect(x, y, x+l/8, y-l/8);
        p5.rect(x, y, x-l/8, +l/8);
      }
      if (s===3) {
        num=60;
        //Cool lines//
        p5.strokeWeight(l/10);
        p5.stroke(c, 800/l);
        p5.line(x, 0, 0, y);
        p5.line(0, x, y, 0);
      }
      if (s===4) {
        num=60;
        p5.rect(x, l/4, y, l/4);
        p5.rect(y, l/4, x, l/4);
        p5.rect(l/2, y, y, l/2); 
        p5.rect(l/2, x, x, l/2); 
        p5.rect(p5.sqrt(l/2), x, p5.sqrt(l), l/2); 
        p5.rect(x, y, l/5, l/2+x);
      }
      p5.pop(); 
      if (l>num) {
        for (let n=0; n<hexNum; n++) {
          this.drawShape(p5, (l*3/4)*p5.cos(n*2*p5.PI/hexNum), l*3/4*p5.sin(n*2*p5.PI/hexNum), l/4, p5.color(p5.mouseX*255/p5.width, p5.mouseY*255/p5.height, this.pos*255), 1, 0, s);
          this.drawShape(p5, (l*(p5.sqrt(3)/4))*p5.cos(n*2*p5.PI/hexNum+p5.PI/6), l*(p5.sqrt(3)/4)*p5.sin(n*2*p5.PI/hexNum+p5.PI/6), l/4, p5.color(this.posThree*255, p5.mouseX*255/p5.width, p5.mouseY*255/p5.height), 3, 0, s);
          this.drawShape(p5, (l*(p5.sqrt(3)/2))*p5.cos(n*2*p5.PI/hexNum+p5.PI/6), l*(p5.sqrt(3)/2)*p5.sin(n*2*p5.PI/hexNum+p5.PI/6), l/4, p5.color(p5.mouseY*255/p5.height, this.posTwo*255, p5.mouseX*255/p5.width), 3, 0, s);
        }
        this.drawShape(p5, x+l, y, l/2, p5.color(p5.mouseX*255/p5.width, this.posThree*255, p5.mouseY*255/p5.height), 6, 0, s);
        this.drawShape(p5, x-l, y, l/2, p5.color(255*this.posTwo, p5.mouseY*255/p5.height, p5.mouseX*255/p5.width), 6, 0, s);
      }
    }
    update() {
      this.theta = this.theta + count;
    }
  }

  function reset(p5) {
  }

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    scope = new Kaleidoscope(p5);
  };

  const draw = (p5) => {
    p5.background(0);
    scope.update();
  
    scope.drawShape(p5, 0, 0, p5.width/2, p5.color(20), 6, 0, state);
    p5.fill(255);
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
    if (p5.key === '1') {
      count=-.01;
    }
    if (p5.key === '2') {
      count=.01;
    }    
    if (p5.key === ' ') {
      if (state<4) {
        state++;
      } else {
        state=0;
      }
    }   
  };

  return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />;
};

export default Artwork;