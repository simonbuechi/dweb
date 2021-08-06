import React from "react";
import Sketch from "react-p5";

export default (props) => {
  //global constants
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");

  let bottomEnd = 0.48;
  let topEnd = 0.52;
  let size = 1100;
  let numParticles = 4000;
  let numSets = 5;
  let particle_sets = [];
  let hu = 0;
  let perlinSeedX;
  let perlinSeedY;

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
      let nx = 1.8 * scaleFunction(this.pos.x);
      let ny = 1.8 * scaleFunction(this.pos.y);
      let n = {
        x: nx,
        y: ny
      };
      let nval = (p5.noise(n.x + perlinSeedX, n.y - perlinSeedY) + 0.045 * (index - numSets / 2)) % 1;
      this.angle += 3 * (nval * 2 - 1);
      this.val = nval;
    }
  
    display(p5, index) {
      if (this.val > bottomEnd && this.val < topEnd) {
        p5.rect(this.pos.x, this.pos.y, 1, 1);
      }
    }
  }
  
  function scaleFunction(n) {
    return (size - n / size) * 2 - 1;
  }

  const setup = (p5, canvasParentRef) => {
    //setup canvas & basics
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));

    perlinSeedX = p5.round(p5.random() * size);
    perlinSeedY = p5.round(p5.random() * size);

    p5.noFill();
    p5.background('#e7e7db');
    p5.colorMode(p5.HSB, 255);
    hu = p5.random(255);
    p5.stroke(hu, 150, 100, 10);
    p5.strokeWeight(0.7);
    p5.noFill();
    p5.smooth();
    for (var j = 0; j < numSets; j++) {
      let particlesArray = [];
      
      for (var i = 0; i < numParticles; i++) {
        particlesArray.push(
          new Particle(
            p5,
            p5.randomGaussian(size / 2, 110),
            p5.randomGaussian(size / 2, 110),
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
