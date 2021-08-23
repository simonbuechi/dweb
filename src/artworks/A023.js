import React from "react";
import Sketch from "react-p5";

const Artwork = (props) => {
  //global constants
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");
  const STROKE_WEIGHT = 1;
  const BOTTOM_END = 0.48;
  const TOP_END = 0.52;
  const NUMBER_PARTICLES = 4000;
  let numSets;
  let particle_sets = [];

  class Particle {
    constructor(p5, x, y, phi) {
      this.pos = {
        x,
        y
      };
      this.angle = phi;
      this.val = 0;
    }
  
    update(p5, index) {
      this.pos.x += p5.cos(this.angle);
      this.pos.y += p5.sin(this.angle);
      let nx = 1.8 * (p5.width - this.pos.x / p5.width) * 2;
      let ny = 1.8 * (p5.height - this.pos.y / p5.height) * 2;
      let n = {
        x: nx,
        y: ny
      };
      let nval = (p5.noise(n.x + 10, n.y - 10) + 0.045 * (index - numSets / 2)) % 1;
      this.angle += 3 * (nval * 2 - 1);
      this.val = nval;
    }
  
    display(p5, index) {
      if (this.val > BOTTOM_END && this.val < TOP_END) {
        p5.rect(this.pos.x, this.pos.y, 1, 1);
      }
    }
  }

  const setup = (p5, canvasParentRef) => {
    //setup canvas & basics
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.noFill();
    p5.colorMode(p5.HSB, 255);
    p5.background(30, 40, 210, 100);
    p5.stroke(p5.random(255), 150, 100, 10);
    p5.strokeWeight(STROKE_WEIGHT);
    p5.smooth();
    //numSets = p5.max(p5.floor(p5.randomGaussian(7,4)),3);
    numSets = 5;
    for (var j = 0; j < numSets; j++) {
      let particlesArray = [];
      for (var i = 0; i < NUMBER_PARTICLES; i++) {
        particlesArray.push(
          new Particle(
            p5,
            p5.randomGaussian(p5.width / 2, 110),
            p5.randomGaussian(p5.height / 2, 110),
            p5.random() * 2 * p5.PI
          )
        );
      }
      particle_sets.push(particlesArray);
    }
  };

  const draw = (p5) => {
    p5.translate(0, -100);
    particle_sets.forEach(function(particles, index) {
      particles.forEach(function(particle) {
        particle.update(p5, index);
        particle.display(p5, index);
      });
    });
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