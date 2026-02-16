// @ts-nocheck
import React from "react";
import Sketch from "react-p5";

// see https://openprocessing.org/sketch/383911 for further optimization


const Artwork = (props) => {
  //global constants
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");
  let toggle; 
  const customColour =[
    "#ff0054",
    "#cc2936",
    "#ffb7c4",
    "#44e5e7",
    "#028090",
    "#9cedeb",
    "#ffbc42",
    "#ff9505",
    "#fff3b0",
    "#E87D1E",
  ];

  function form1(p5, x, y, d, c, s) {
    var r = d*0.5;
    var da = p5.TWO_PI/c;
    p5.beginShape();
    for (var i = 0; i < c; i++) {
      for (var j = -s; j <= s; j++) {
        var a = da*(i+j*1./s);
        var rr = (r/s)*(p5.abs(j)+1);
        p5.vertex(x+p5.cos(a)*rr, y+p5.sin(a)*rr);
      }
    }
    p5.endShape(p5.CLOSE);
  }
  function rcolf(p5){
    toggle = p5.floor((p5.random(0,9)));
    p5.fill(customColour[toggle]);
  }
  function rcols(p5){
    toggle = p5.floor((p5.random(0,9)));
    p5.stroke(customColour[toggle]);
  }
  function reset(p5) {
    p5.background(p5.random(customColour));
  }
  const setup = (p5, canvasParentRef) => {
    //setup canvas & basics
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    reset(p5);
  };

  const draw = (p5) => {
   // for (let i = 0; i < 20; i++) {
      //p5.filter(p5.BLUR, 1);
      let x = p5.width / 2;
      let y = p5.height / 2;
      let d = p5.max(p5.height / 2, p5.width / 2);
      let c = p5.floor((p5.random(3, 22)));
      let s = p5.floor((p5.random(1, 7)));
      let cc = p5.floor((p5.random(1, 20)));
      p5.fill(p5.random(customColour));
      p5.circle(x,y,d*1.5);
      for (let j = 0; j < cc; j++) {
        let dd = d/(j+1);
        p5.noFill();
        rcolf(p5);
        for (let k = 5; k >= 1; k--) {
          rcols(p5);
          p5.strokeWeight(k);
          form1(p5, x, y, dd, c, s);
        }
        p5.noStroke();
        rcolf(p5);
        if (p5.random(1) < 0.2)
          rcolf(p5);
        form1(p5, x, y, dd, c, s);
      }
   // }
    p5.noLoop();
  };

  const keyPressed = (p5) => {
    //save the canvas when press "s" or space
    if (p5.keyCode === 83 || p5.keyCode === 32) {
      let fileName = "SimonBuechi" + window.location.hash;
      fileName.replace(/[^a-zA-Z0-9]/g, "");
      p5.saveCanvas(fileName, "jpg");
    }
    if (p5.key === 'r') {
      p5.clear();
      reset(p5);
      p5.loop();
    }
  };

  
  return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />;
};

export default Artwork;
