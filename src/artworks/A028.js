import React from "react";
import Sketch from "react-p5";

// see https://openprocessing.org/sketch/383911 for further optimization


export const Artwork = (props) => {
  //global constants
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");

let img,gmi;
let images;
let triangles;
let rr,theta,hw,hh;
let mx, my;
let a;
let n = 12;
let nimages;
let j;
let pressed;

class Triangle {
  let end1 = new p5.PVector();
  let end2 = new p5.PVector();
  Triangle(angle) {  
    let atheta = angle+theta; 
    this.end1.x = rr*cos(angle)+.5*width;
    this.end1.y = rr*sin(angle)+.5*height;
    this.end2.x = rr*cos(atheta)+.5*width;
    this.end2.y = rr*sin(atheta)+.5*height; 
  }
  
  function display( X1, Y1) {
    let a1,a2;
    if (pressed) {
        a1 = mouseX/width;
        a2 = (mouseY+hh)/height;
    }
    else {
        a1 = mx/width;
        a2 = (my+hh)/height;
    }
    beginShape();
    texture(img);
    vertex(X1,Y1,a1,0);
    vertex(end1.x,end1.y,0,1);
    vertex(end2.x,end2.y,a1,a2);
    endShape();
  }
  function display_f( X1, Y1) {
        let a1,a2; 
    if (pressed) {
        a1 = mouseX/width;
        a2 = (mouseY+hh)/height;
    }
    else {
        a1 = mx/width;
        a2 = (my+hh)/height;
    }
    beginShape();
    texture(img);
    vertex(X1,Y1,a1,0);
    vertex(end1.x,end1.y,a1,a2);
    vertex(end2.x,end2.y,0,1);
    endShape();
  }
}


  const setup = (p5, canvasParentRef) => {
    //setup canvas & basics
    //p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));

    p5.size(480,480,p5.P3D);
    p5.background(0);
    p5.noStroke();
    p5.colorMode(p5.HSB);
    p5.textureMode(p5.NORMAL);
    nimages = 2;
    images = new p5.PImage[nimages];
    hw = p5.width/2;
    hh = p5.height/2;
    mx = hw;
    my = hh;
    a = random(.1,1);
    rr = (sqrt(p5.width*p5.width+p5.height*p5.height));
    theta = 2*p5.PI/n;
    triangles = new ArrayList<Triangle>();
    for (let j=0;j<n;j++) {
      triangles.add(new Triangle(j*theta));
    }
    
    images[0] = loadImage("Marbles_01.JPG");
    images[1] = loadImage("800px-JM_marbles_01.jpg");
    img = images[1];
    //String url = "http://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/JM_marbles_01.jpg/800px-JM_marbles_01.jpg";
    //String url = "http://upload.wikimedia.org/wikipedia/commons/0/0f/Marbles_01.JPG";
    //Load image from a web server
    //img = loadImage(url, "jpg");
    gmi = img;

  };

  const draw = (p5) => {
    if (pressed) {
      mx = mouseX;
      my = mouseY;
    }
    for (let i=0;i<n;i+=2) {
        triangles.get(i).display(hw,hh);
        triangles.get(i+1).display_f(hw,hh);
    }
  };

  const keyPressed = (p5) => {
    switch(key) {
      case ' ': 
        j = (j+1)%nimages;
        img = images[j];
        gmi = img;
        break;
      case 's':
        let fileName = "SimonBuechi" + window.location.hash;
        fileName.replace(/[^a-zA-Z0-9]/g, "");
        p5.saveCanvas(fileName, "jpg");
        break;
      case 'r':
        p5.refresh();
        break;
      default:
        break;
    }
  };

  const mousePressed = () => { 
    pressed = !pressed;
  }
  
  return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} mousePressed={mousePressed} />;
};