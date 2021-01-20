import React from "react";
import Sketch from "react-p5";

// see https://openprocessing.org/sketch/1006142


export default (props) => {
  //const seed = "12j34h12j4khl2j3k";
  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;


// noise space start point
var p;

// current position
var x, y;

// current angle
var ang;

// angle step
var sang;

// number of points in the filament
var iter;

// scale of noise space
var sx, sy, sz;

// x,y change constant
var cx, cy;

// freq of z wobble amplitude
var fr;

// rotational symmetry
var symm;

// in Java version it produces symmetrical rosettes... Probably noise functions differ.
function preset1(p5) {
    // background(0);
    p5.noiseDetail(4, 0.5);
    p = p5.createVector(p5.random(-1, 1), p5.random(-1, 1), 0);
    cx = 0;
    cy = 0;
    x = 0;
    y = 0;
    ang = 0;
    iter = 300;
    sx = 20;
    sy = 20;
    fr = 2;
    sz = 5;
    sang = 0.005;
    symm = 20;
}



function initializeFields() {
    p = null;
    x = 0;
    y = 0;
    ang = 0;
    sang = 0;
    iter = 0;
    sx = 0;
    sy = 0;
    sz = 0;
    cx = 0;
    cy = 0;
    fr = 0;
    symm = 0;
}



  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    initializeFields();
    p5.background(0);
    p5.smooth();
    p5.noStroke();
    p5.fill(35, 40);
    preset1(p5);


   
  
  };

  const draw = (p5) => {
       // make full circle
       p5.translate(p5.width / 2, p5.height / 2);
       p5.fill(0);
       p5.ellipse(0, 0, 165, 165);
       if (ang < p5.TWO_PI) {
           // set starting position and rotate
           p5.translate(p5.cos(ang) * 80, p5.sin(ang) * 80);
           p5.rotate(ang);
           // make filament
           for (var i = iter; i > 0; i--) {
               var z = symm < 0 ? p.z : p.z % symm;
               var n = 2 * p5.TWO_PI * p5.noise(p.x + x / sx, p.y + y / sy, z);
               var clr = p5.map(p5.noise(p.x + x / sx, p.y + y / sy), 0, 1, 0, 255);
               p5.fill(p5.color(i * 0.1, i * 0.6, i * 0.7, clr));
               p5.ellipse(x, y, 0.55, 0.55);
               // change drawing position
               x += p5.cos(n) + cx;
               y += p5.sin(n) + cy;
           }
           // change starting point in the noise space by moving throught z axis
           var step;
           if (sz > 0.9)
               // option 1: wobble
               step = p5.createVector(0, 0, p5.sin(fr * ang) / sz);
           else
               // option 2: constant movment
               step = p5.createVector(0, 0, sz);
           p.add(step);
           // reset drawing coords
           x = y = 0;
           // change angle
           ang += sang;
       }

    };

    return <Sketch setup={setup} draw={draw} />;
  };

