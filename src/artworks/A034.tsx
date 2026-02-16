// @ts-nocheck
import React from "react";
import Sketch from "react-p5";

const Artwork = (props) => {
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");
  let p0x, p1x, p2x, p3x, p4x, p0y, p1y, p2y, p3y, p4y;

  function reset(p5) {
    p5.background(0);
    p0x = 0;
    p1x = p5.random(p5.width);
    p2x = p5.random(p5.width);
    p3x = p5.random(p5.width);
    p4x = p5.width;
    p0y = p5.random(p5.height);
    p1y = p5.random(p5.height);
    p2y = p5.random(p5.height);
    p3y = p5.random(p5.height);
    p4y = p5.random(p5.height);
  }

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.blendMode(p5.ADD); 
    reset(p5);
  };

  const draw = (p5) => {
    let ts, r, g, b;
    for(var t = 0.0; t < 1.0; t += 0.001) {
      var x =  (1-t)*(1-t)*(1-t)*(1-t)*p0x + 4*(1-t)*(1-t)*(1-t)*t*p1x + 6*(1-t)*(1-t)*t*t*p2x + 4*(1-t)*t*t*t*p3x+t*t*t*t*p4x;
      var y =  (1-t)*(1-t)*(1-t)*(1-t)*p0y + 4*(1-t)*(1-t)*(1-t)*t*p1y + 6*(1-t)*(1-t)*t*t*p2y + 4*(1-t)*t*t*t*p3y+t*t*t*t*p4y;
      t -= 0.001;
      var ox = (1-t)*(1-t)*(1-t)*(1-t)*p0x + 4*(1-t)*(1-t)*(1-t)*t*p1x + 6*(1-t)*(1-t)*t*t*p2x + 4*(1-t)*t*t*t*p3x+t*t*t*t*p4x;
      var oy = (1-t)*(1-t)*(1-t)*(1-t)*p0y + 4*(1-t)*(1-t)*(1-t)*t*p1y + 6*(1-t)*(1-t)*t*t*p2y + 4*(1-t)*t*t*t*p3y+t*t*t*t*p4y;
      t += 0.001;
      var d = p5.sqrt((x-ox) * (x-ox)  + (y-oy) * (y-oy)) * 10.0;
      var dx = x - ox;
      var dy = y - oy;
      var fx = x - p5.width/2;
      var fy = y - p5.height/2;
      var dd = p5.sqrt(dx*dx  + dy*dy);
      var fd = p5.sqrt(fx*fx  + fy*fy);
      if(dd < 0.0001 || fd < 0.0001) p5.fill(0.3*255,0.6*255,0.6*255);
      else {
        ts = (dx*fx + dy*dy) / (dd * fd);
        ts += 1;
        ts /= 2.0;
        r = ts*ts*ts*0.3+3*ts*ts*(1-ts)*1.5+3*ts*(1-ts)*(1-ts)*1.2+(1-ts)*(1-ts)*(1-ts)*0.3;
        g = ts*ts*ts*0.3+3*ts*ts*(1-ts)*1.2+3*ts*(1-ts)*(1-ts)*0.0+(1-ts)*(1-ts)*(1-ts)*0.6;
        b = ts*ts*ts*0.6+3*ts*ts*(1-ts)*1.2+3*ts*(1-ts)*(1-ts)*1.2+(1-ts)*(1-ts)*(1-ts)*0.6;
        p5.fill(p5.floor(r*5.0), p5.floor(g*5.0), p5.floor(b*5.0));
      }
      p5.ellipse(x,y,d,d);
    }    
    p0x = 0;
    p1x = p5.random(p5.width);
    p2x = p5.random(p5.width);
    p3x = p5.random(p5.width);
    p4x = p5.width;
    p0y = p5.random(p5.height);
    p1y = p5.random(p5.height);
    p2y = p5.random(p5.height);
    p3y = p5.random(p5.height);
    p4y = p5.random(p5.height);
    if(p5.frameCount > 100) {
      p5.noLoop();
    }
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
  };

  return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />;
};

export default Artwork;
