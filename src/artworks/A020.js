import React from "react";
import Sketch from "react-p5";

const Artwork = (props) => {
  //global constants
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");

  let myShader;
  let vs = "precision mediump float;attribute vec3 aPosition;void main(){gl_Position = vec4(aPosition, 1.0);}";
  let fs =
    "precision mediump float;uniform vec2 u_resolution;uniform float u_time;void main(){vec2 p = (gl_FragCoord.xy * 0.5) / u_resolution;gl_FragColor = vec4(p.x, p.y, abs(sin(u_time * 0.5)), 1.0);}";
  let base;
  let xoff = 0;

  const setup = (p5, canvasParentRef) => {
    //setup canvas & basics
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    base = p5.createGraphics(p5.width, p5.height, p5.WEBGL);
    myShader = base.createShader(vs, fs);
    base.shader(myShader);
  };

  const draw = (p5) => {
    xoff = xoff + 0.001;
    myShader.setUniform("u_resolution", [p5.width, p5.height]);
    myShader.setUniform("u_time", p5.noise(xoff) * 10);
    base.quad(-1, -1, -1, 1, 1, 1, 1, -1);
    p5.image(base, 0, 0);
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