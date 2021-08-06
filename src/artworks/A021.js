import React from "react";
import Sketch from "react-p5";

export default (props) => {
  //global constants
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");

  let particles_a = [];
  let particles_b = [];
  let particles_c = [];
  let nums = 600;
  let angle_scale = 2.9;
  let grid_resolution = 5;
  let points = [];
  let x_grid_step;
  let y_grid_step;

  function to_idx(x_idx, y_idx) {
    return x_idx + y_idx * grid_resolution;
  }

  function voronoi_noise(x, y) {
    let max_step = Math.max(x_grid_step, y_grid_step);
    let x_idx = Math.floor(x / x_grid_step);
    x_idx = Math.min(Math.max(0, x_idx), grid_resolution - 1);
    let y_idx = Math.floor(y / y_grid_step);
    y_idx = Math.min(Math.max(0, y_idx), grid_resolution - 1);
    let idx = to_idx(x_idx, y_idx);
    let min_dist = Math.hypot(points[idx][0] - x, points[idx][1] - y);
    //let min_dist_idx = 0;
    let x_extent = Math.ceil(x_grid_step / max_step);
    let y_extent = Math.ceil(y_grid_step / max_step);
    for (let i = -x_extent; i <= x_extent; i++) {
      for (let j = -y_extent; j <= y_extent; j++) {
        let x1_idx = x_idx + i;
        let y1_idx = y_idx + j;
        if (x1_idx < 0 || x1_idx >= grid_resolution || y1_idx < 0 || y1_idx >= grid_resolution) {
          continue;
        }
        idx = to_idx(x1_idx, y1_idx);
        let dist = Math.hypot(points[idx][0] - x, points[idx][1] - y);
        if (dist < min_dist) {
          min_dist = dist;
          //min_dist_idx = idx;
        }
      }
    }
    return min_dist;
  }

  function Particle(p5, x, y) {
    this.dir = p5.createVector(0, 0);
    this.vel = p5.createVector(0, 0);
    this.pos = p5.createVector(x, y);
    this.speed = 1;

    this.move = function () {
      let angle = (voronoi_noise(this.pos.x, this.pos.y) * p5.TWO_PI) / angle_scale;
      this.dir.x = p5.cos(angle);
      this.dir.y = p5.sin(angle);
      this.vel = this.dir.copy();
      this.vel.mult(this.speed);
      this.pos.add(this.vel);
    };

    this.display = function (r) {
      p5.ellipse(this.pos.x, this.pos.y, r, r);
    };
  }

  const setup = (p5, canvasParentRef) => {
    //setup canvas & basics
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));

    p5.background(21, 8, 50);
    p5.colorMode(p5.HSB, 255);
    for (let x = 0; x < nums; x++) {
      particles_a[x] = new Particle(p5, p5.random(0, p5.width), p5.random(0, p5.height));
      particles_b[x] = new Particle(p5, p5.random(0, p5.width), p5.random(0, p5.height));
      particles_c[x] = new Particle(p5, p5.random(0, p5.width), p5.random(0, p5.height));
    }
    x_grid_step = p5.width / grid_resolution;
    y_grid_step = p5.height / grid_resolution;
    for (let i = 0; i < grid_resolution; i++) {
      for (let j = 0; j < grid_resolution; j++) {
        let idx = to_idx(i, j);
        points[idx] = [x_grid_step * (i + p5.random(0, 1)), y_grid_step * (j + p5.random(0, 1))];
      }
    }
  };

  const draw = (p5) => {
    p5.noStroke();
    p5.smooth();
    for (let i = 0; i < nums; i++) {
      let radius = p5.map(i, 0, nums, 1, 3);
      let alpha = p5.map(i, 0, nums, 0, 250);
      p5.fill((i / nums) * 255, 200, 255, alpha);
      particles_a[i].move();
      particles_a[i].display(radius);
      p5.fill(255 - (i / nums) * 255, 200, 255, alpha);
      particles_b[i].move();
      particles_b[i].display(radius);
      p5.fill(180, 180, 180, alpha);
      particles_c[i].move();
      particles_c[i].display(radius);
    }
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
