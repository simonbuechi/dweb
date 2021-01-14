import React from "react";
import Sketch from "react-p5";

// see https://openprocessing.org/sketch/1006142


export default (props) => {
  //const seed = "12j34h12j4khl2j3k";
  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;

  // noise space start point
PVector p;
// current position 
let x,y;
// current angle
let ang;
// angle step
let sang;
// number of points in the filament
let iter;
// scale of noise space
let sx,sy,sz;
// x,y change constant
let cx,cy;
// freq of z wobble amplitude 
let fr;
// rotational symmetry
let symm;

// in Java version it produces symmetrical rosettes... Probably noise functions differ.
const preset1 = () => {
  //background(0);
  noiseDetail(4,0.5);
  p = new PVector(random(-1,1),random(-1,1), 0);
  cx=0;
  cy=0;
  x=0;
  y=0;
  ang=0;
  iter = 300;
  sx=20;
  sy=20;
  fr=2;
  sz=5;
  sang=0.005;
  symm = 20;
}

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    p5.background(0);
    p5.smooth();
    p5.noStroke();
    p5.fill(35, 40);
    preset1();
  };

  const draw = (p5) => {
 // make full circle
 translate(width/2,height/2);
 fill(0);
 ellipse(0,0,165,165);
 if(ang<TWO_PI) {
 
   // set starting position and rotate
   translate(cos(ang)*80,sin(ang)*80);
   rotate(ang);
 
   // make filament
   for(int i = iter;i>0;i--) {
     float z = symm<0?p.z:p.z%symm;
     float n = 2*TWO_PI*noise(p.x+x/sx,p.y+y/sy,z) ;
     clr=map(noise(p.x+x/sx,p.y+y/sy),0,1,0,255)
     fill(color(i*0.1,i*0.6,i*0.7,clr))
     ellipse(x,y,0.55,0.55);
     // change drawing position
     x+=cos(n)+cx;
     y+=sin(n)+cy;
   }
   
   // change starting point in the noise space by moving throught z axis 
   PVector step;
   if(sz>0.9)
     // option 1: wobble
     step = new PVector(0,0,sin(fr*ang)/sz);
    else 
     // option 2: constant movment
     step = new PVector(0,0,sz);
   p.add(step);
   // reset drawing coords
   x=y=0;
   // change angle
   ang+=sang;


  };

  return <Sketch setup={setup} draw={draw} />;
};

