import React from "react";
import Sketch from "react-p5";

const Artwork = (props) => {
  // get seed from localstorage
  const seed = window.localStorage.getItem("signature");
  // set size to fullscreen
  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;

  const Y_AXIS = 1;
  const X_AXIS = 2;
  const NO_STARS = 50;
  const MOUNTAIN_ALTITUDE = 200;
  const MOUNTAIN_NOISE = 0.005;
  let sky = [];
  let b1, b2, m1, m2, m3;
  let mountain;
  /*
  let sh;
  let g;

  const vs = 
  'attribute vec3 aPosition;' +
  'attribute vec2 aTexCoord;' +
  'varying vec2 vTexCoord;' +
  'void main() {' +
    'vTexCoord = aTexCoord;' +
    'vec4 positionVec4 = vec4(aPosition, 1.0);' +
    'positionVec4.xy = positionVec4.xy * 2.0 - 1.0;' +
    'gl_Position = positionVec4;' +
  '}';

  const fs = 
  'precision mediump float;' +
  'varying vec2 vTexCoord;' +
  'uniform sampler2D smp; ' +
  'uniform float time; ' +
  'uniform vec2 mouse; ' +
  'uniform vec2 resolution;' + 
  'vec2 reverseY(vec2 v) {' +
    'return vec2(v.x, resolution.y-v.y);' +
  '}' +
  'vec2 ratioV(vec2 v) {' +
    'return vec2(v.x/resolution.x, v.y/resolution.y);' +
  '}' +
  'vec3 hsv(float h, float s, float v) {' +
    'vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);' +
    'vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));' +
    'return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);' +
  '}' +
  'void main() {' +
    'vec2 pos = ratioV(gl_FragCoord.xy * 2.0 - resolution);' +
    'vec2 mousePos = ratioV(reverseY(mouse) * 2.0 - resolution);' +
    'float h = abs(mod(time * 15.0, 360.0) / 360.0);' +
    'float f = 0.2 / length(pos - mousePos);' +
    'vec4 smpColor = texture2D(smp, ratioV(reverseY(gl_FragCoord.xy)));' +
    'if(length(smpColor) > 0.0){' +
      'vec3 tmp = mix(hsv(h, 1.0, 0.5) + f, smpColor.rgb, 0.975);' +
      'gl_FragColor = vec4(tmp, 1.0);' +
    '}else{' +
      'gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);' +
    '}' +
  '}';
*/

  function setGradient(p5, x, y, w, h, c1, c2, axis) {
    p5.noFill();
    if (axis === Y_AXIS) {
      // Top to bottom gradient
      for (let i = y; i <= y + h; i++) {
        let inter = p5.float(p5.map(i, y, y + h, 0, 1));
        let c = p5.lerpColor(c1, c2, inter);
        p5.stroke(c);
        p5.line(x, i, x + w, i);
      }
    } else if (axis === X_AXIS) {
      // Left to right gradient
      for (let i = x; i <= x + w; i++) {
        let inter = p5.float(p5.map(i, x, x + w, 0, 1));
        let c = p5.lerpColor(c1, c2, inter);
        p5.stroke(c);
        p5.line(i, y, i, y + h);
      }
    }
  }

  class Mountain {
    constructor(p5) {
      p5.strokeWeight(5);
    }
    display(p5, t, h) {
      let x = 0.0;
      while (x < p5.width) {
        p5.beginShape();
        p5.vertex(0, p5.height + 200);
        p5.vertex(x, h + p5.map(p5.noise(t), 0, 1, 0, MOUNTAIN_ALTITUDE));
        x++;
        t += MOUNTAIN_NOISE;
        p5.vertex(p5.width, p5.height + 200);
        p5.endShape();
      }
    }
  }

  class Star {
    constructor(p5) {
      p5.noStroke();
      this.x = 255;
      this.y = 255;
      this.c = 255;
      this.a = -1;
      this.dir = 0.0;
      this.sz = 0.0;
    }

    shine(p5) {
      if (this.a < 0) {
        this.x = p5.random(p5.width);
        this.y = p5.random(0, 270);
        this.sz = p5.random(3);
        this.dir = p5.random(1, 3);
        this.a = 0;
      }
      p5.fill(this.c, this.a);
      p5.ellipse(this.x, this.y, this.sz, this.sz);
      this.a = this.a + this.dir;
      if (this.a > 255) {
        this.a = 255;
        this.dir = p5.random(-5, -10);
      }
    }
  }

  const setup = (p5, canvasParentRef) => {
    // setup canvas
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);

    // noise setup
    p5.noiseSeed(seed !== null ? seed : Math.random() * 100);
    // setup WEBGL shader
    //g = p5.createGraphics(p5.width, p5.height, p5.WEBGL);
    //sh = p5.createShader(vs, fs);

    b2 = p5.color(194, 24, 91); // bottom background color
    b1 = p5.color(74, 20, 140); // top background color

    m1 = p5.color(80, 22, 152);
    m2 = p5.color(47, 13, 89);
    m3 = p5.color(0, 0, 0);

    for (let i = 0; i < NO_STARS; i++) {
      sky[i] = new Star(p5);
    }
    mountain = new Mountain(p5);
  };

  const draw = (p5) => {
    setGradient(p5, 0, 0, p5.width, 0.65 * p5.height, b1, b2, Y_AXIS);
    p5.stroke(m1);
    mountain.display(p5, 100, 350);
    p5.stroke(m2);
    mountain.display(p5, 200, 450);
    p5.stroke(m3);
    mountain.display(p5, 300, 550);
    p5.noStroke();
    for (let i = 0; i < NO_STARS; i++) {
      sky[i].shine(p5);
    }
    /*
    const p = p5.pixelDensity();
    sh.setUniform("smp", g);
    sh.setUniform("time", p5.millis() / 10000.0);
    sh.setUniform("mouse", [p5.mouseX * p, p5.mouseY * p]);
    sh.setUniform("resolution", [p5.width * p, p5.height * p]);
    g.shader(sh);
    g.rect(0, 0, p5.width, p5.height);
    p5.image(g, 0, 0);
    */
  };

  const keyPressed = (p5) => {
    //save the canvas when press "s" or space
    if (p5.keyCode === 83 || p5.keyCode === 32) {
      p5.saveCanvas("simons_artwork", "jpg");
    }
  };

  return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />;
};

export default Artwork;