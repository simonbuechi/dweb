import React from "react";
import Sketch from "react-p5";

const Artwork = (props) => {
  //global constants
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");

  var particles_a = [];
  var particles_b = [];
  var particles_c = [];
  var nums = 200; //200
  var noiseScale = 800;

  class Particle {
    constructor(p5, x, y) {
      this.dir = p5.createVector(0, 0);
      this.vel = p5.createVector(0, 0);
      this.pos = p5.createVector(x, y);
      this.speed = 0.4;
    }

    move = function (p5) {
      var angle = p5.noise(this.pos.x / noiseScale, this.pos.y / noiseScale) * p5.TWO_PI * noiseScale;
      this.dir.x = p5.cos(angle);
      this.dir.y = p5.sin(angle);
      this.vel = this.dir.copy();
      this.vel.mult(this.speed);
      this.pos.add(this.vel);
    };

    checkEdge = function (p5) {
      if (this.pos.x > p5.width || this.pos.x < 0 || this.pos.y > p5.height || this.pos.y < 0) {
        this.pos.x = p5.random(50, p5.width);
        this.pos.y = p5.random(50, p5.height);
      }
    };

    display = function (p5, r) {
      p5.ellipse(this.pos.x, this.pos.y, r, r);
    };
  }

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.background(21, 8, 50);
    for (var i = 0; i < nums; i++) {
      particles_a[i] = new Particle(p5, p5.random(0, p5.width), p5.random(0, p5.height));
      particles_b[i] = new Particle(p5, p5.random(0, p5.width), p5.random(0, p5.height));
      particles_c[i] = new Particle(p5, p5.random(0, p5.width), p5.random(0, p5.height));
    }
  };

  const draw = (p5) => {
    p5.noStroke();
    p5.smooth();
    for (var i = 0; i < nums; i++) {
      var radius = p5.map(i, 0, nums, 1, 2);
      var alpha = p5.map(i, 0, nums, 0, 250);

      p5.fill(69, 33, 124, alpha);
      particles_a[i].move(p5);
      particles_a[i].display(p5, radius);
      particles_a[i].checkEdge(p5);

      p5.fill(7, 153, 242, alpha);
      particles_b[i].move(p5);
      particles_b[i].display(p5, radius);
      particles_b[i].checkEdge(p5);

      p5.fill(255, 255, 255, alpha);
      particles_c[i].move(p5);
      particles_c[i].display(p5, radius);
      particles_c[i].checkEdge(p5);
    }
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