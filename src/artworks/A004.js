import React from "react";
import Sketch from "react-p5";
import { Vector } from "p5";

export default (props) => {
  //const canvasWidth = window.innerWidth;
  //const canvasHeight = window.innerHeight;
  //const seed = "adsfasdf234234";

  var inc = 0.1;
  var scl = 10;
  var cols, rows;
  var zoff = 0;
  var particles = [];
  var flowfield;

  function Particle(p5) {
    this.pos = p5.createVector(p5.random(p5.width), p5.random(p5.height));
    this.vel = p5.createVector(0, 0);
    this.acc = p5.createVector(0, 0);
    this.maxspeed = 2;

    this.prevPos = this.pos.copy();

    this.update = function () {
      this.vel.add(this.acc);
      this.vel.limit(this.maxspeed);
      this.pos.add(this.vel);
      this.acc.mult(0);
    };

    this.follow = function (vectors) {
      var x = p5.floor(this.pos.x / scl);
      var y = p5.floor(this.pos.y / scl);
      var index = x + y * cols;
      var force = vectors[index];
      this.applyForce(force);
    };

    this.applyForce = function (force) {
      this.acc.add(force);
    };

    this.show = function () {
      p5.stroke(0, 5);
      p5.strokeWeight(1);
      p5.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
      this.updatePrev();
    };

    this.updatePrev = function () {
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
    };
    this.edges = function () {
      if (this.pos.x > p5.width) {
        this.pos.x = 0;
        this.updatePrev();
      }
      if (this.pos.x < 0) {
        this.pos.x = p5.width;
        this.updatePrev();
      }
      if (this.pos.y > p5.height) {
        this.pos.y = 0;
        this.updatePrev();
      }
      if (this.pos.y < 0) {
        this.pos.y = p5.height;
        this.updatePrev();
      }
    };
  }

  const setup = (p5, canvasParentRef) => {
    // p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    // p5.noiseSeed(seed);

    p5.createCanvas(800, 600).parent(canvasParentRef);
    cols = p5.floor(p5.width / scl);
    rows = p5.floor(p5.height / scl);

    flowfield = new Array(cols * rows);

    for (var i = 0; i < 2500; i++) {
      particles[i] = new Particle();
    }
    p5.background(240);


    for (var j = 0; j < 100; j++) {
    var yoff = 0;
    for (var y = 0; y < rows; y++) {
      var xoff = 0;
      for (var x = 0; x < cols; x++) {
        var index = x + y * cols;
        var angle = p5.noise(xoff, yoff, zoff) * p5.TWO_PI * 4;
        var v = Vector.fromAngle(angle);
        v.setMag(1);
        flowfield[index] = v;
        xoff += inc;
        p5.stroke(0, 50);
      }
      yoff += inc;

      zoff += 0.0003;
    }

    for (var ji = 0; ji < particles.length; ji++) {
      particles[ji].follow(flowfield);
      particles[ji].update();
      particles[ji].edges();
      particles[ji].show();
    }
    
  }




  };

  const draw = (p5) => {
    /*
    var yoff = 0;
    for (var y = 0; y < rows; y++) {
      var xoff = 0;
      for (var x = 0; x < cols; x++) {
        var index = x + y * cols;
        var angle = p5.noise(xoff, yoff, zoff) * p5.TWO_PI * 4;
        var v = Vector.fromAngle(angle);
        v.setMag(1);
        flowfield[index] = v;
        xoff += inc;
        p5.stroke(0, 50);
        // push();
        // translate(x * scl, y * scl);
        // rotate(v.heading());
        // p5.strokeWeight(1);
        // p5.line(0, 0, scl, 0);
        // pop();
      }
      yoff += inc;

      zoff += 0.0003;
    }

    for (var i = 0; i < particles.length; i++) {
      particles[i].follow(flowfield);
      particles[i].update();
      particles[i].edges();
      particles[i].show();
    }
*/
  };

  return <Sketch setup={setup} draw={draw} />;
};
