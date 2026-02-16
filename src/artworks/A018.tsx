// @ts-nocheck
import React from "react";
import Sketch from "react-p5";

//openprocessing.org/sketch/492405

const Artwork = (props) => {
  //global constants
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");

  let MyObject;
  let _aryInitRot = [];

  function drawPart(p5, startX, startY, startZ, endX, endY, endZ, w, col) {
    let angAxisZ = p5.atan2(endY - startY, endX - startX);
    let distXY = p5.dist(startX, startY, endX, endY);
    let angAxisY = -p5.atan2(endZ - startZ, distXY);
    let distXYZ = p5.dist(0, startZ, distXY, endZ);
    p5.push();
    p5.translate(startX, startY, startZ);
    p5.rotateZ(angAxisZ);
    p5.rotateY(angAxisY);
    p5.translate(distXYZ / 2, 0, 0);
    p5.ambientMaterial(col);
    p5.box(distXYZ + w, w, w); //length + w
    p5.pop();
  }

  class Part {
    constructor(p5, startX, startY, startZ, endX, endY, endZ, w, totalTime, partCount, maxW) {
      this.startX = startX;
      this.startY = startY;
      this.startZ = startZ;
      this.endX = endX;
      this.endY = endY;
      this.endZ = endZ;
      this.w = w;
      this.totalTime = totalTime;
      this.currentTime = 0;
      this.direction = true; //true -> extend, false -> shrink
      this.erase = false;
      this.col = p5.color((255 * w) / maxW);
    }
    update(p5) {
      let currentX;
      let currentY;
      let currentZ;
      if (this.direction === true) {
        //extend
        let ratio = (this.currentTime / this.totalTime) ** 0.5;
        currentX = this.startX + (this.endX - this.startX) * ratio;
        currentY = this.startY + (this.endY - this.startY) * ratio;
        currentZ = this.startZ + (this.endZ - this.startZ) * ratio;
        if (this.currentTime < this.totalTime) {
          this.currentTime++;
        }
        drawPart(p5, this.startX, this.startY, this.startZ, currentX, currentY, currentZ, this.w, this.col);
      } else {
        //shrink
        let ratio = (1 - (this.currentTime - this.totalTime) / this.totalTime) ** 0.5;
        currentX = this.endX + (this.startX - this.endX) * ratio;
        currentY = this.endY + (this.startY - this.endY) * ratio;
        currentZ = this.endZ + (this.startZ - this.endZ) * ratio;
        this.currentTime++;
        if (this.currentTime > this.totalTime * 2) {
          this.erase = true;
        }
        drawPart(p5, this.endX, this.endY, this.endZ, currentX, currentY, currentZ, this.w, this.col);
      }
    }
  }

  class Parts {
    constructor(p5, numPart) {
      this.maxArea = p5.width / 3.4;
      this.maxW = p5.width / 10;
      this.t = 3;
      this.maxL = this.maxArea;
      this.parts = [];
      let w = p5.max(p5.width / 300, this.maxW * p5.random() ** 12);
      let startX = -this.maxArea / 2;
      let startY = -this.maxArea / 2;
      let startZ = -this.maxArea / 2;
      let aryEndXYZ = this.randomDirection(p5, startX, startY, startZ);
      while (p5.abs(aryEndXYZ[0]) > this.maxArea || p5.abs(aryEndXYZ[1]) > this.maxArea || p5.abs(aryEndXYZ[2]) > this.maxArea) {
        aryEndXYZ = this.randomDirection(p5, startX, startY, startZ);
      }
      let endX = aryEndXYZ[0];
      let endY = aryEndXYZ[1];
      let endZ = aryEndXYZ[2];
      this.partCount = p5.int(p5.random(1000));
      this.parts.push(new Part(p5, startX, startY, startZ, endX, endY, endZ, w, this.t, this.partCount, this.maxW));
      this.numPart = numPart;
      this.isGenerate = false;
    }
    update(p5) {
      for (let i = 0; i < this.parts.length; i++) {
        this.parts[i].update(p5);
      }
      if (this.parts[this.parts.length - 1].currentTime >= this.parts[this.parts.length - 1].totalTime) {
        this.isGenerate = true;
      }

      if (this.isGenerate === true && this.parts.length < this.numPart) {
        let w = p5.max(p5.width / 300, this.maxW * p5.random() ** 12);
        let startX = this.parts[this.parts.length - 1].endX;
        let startY = this.parts[this.parts.length - 1].endY;
        let startZ = this.parts[this.parts.length - 1].endZ;
        let aryEndXYZ = this.randomDirection(p5, startX, startY, startZ);
        while (p5.abs(aryEndXYZ[0]) > this.maxArea || p5.abs(aryEndXYZ[1]) > this.maxArea || p5.abs(aryEndXYZ[2]) > this.maxArea) {
          aryEndXYZ = this.randomDirection(p5, startX, startY, startZ);
        }
        let endX = aryEndXYZ[0];
        let endY = aryEndXYZ[1];
        let endZ = aryEndXYZ[2];
        this.partCount++;
        this.parts.push(new Part(p5, startX, startY, startZ, endX, endY, endZ, w, this.t, this.partCount, this.maxW));
        this.isGenerate = false;
      }

      if (this.parts.length >= this.numPart) {
        this.parts[0].direction = false;
      }

      if (this.parts[0].erase === true) {
        this.parts.shift();
      }
    }
    randomDirection(p5, startX, startY, startZ) {
      let endX = startX;
      let endY = startY;
      let endZ = startZ;
      let direction = p5.random(["-x", "x", "-y", "y", "-z", "z"]);
      switch (direction) {
        case "-x":
          endX = startX + this.maxL * p5.random(-1, 0);
          break;
        case "x":
          endX = startX + this.maxL * p5.random(0, 1);
          break;
        case "-y":
          endY = startY + this.maxL * p5.random(-1, 0);
          break;
        case "y":
          endY = startY + this.maxL * p5.random(0, 1);
          break;
        case "-z":
          endZ = startZ + this.maxL * p5.random(-1, 0);
          break;
        case "z":
          endZ = startZ + this.maxL * p5.random(0, 1);
          break;
        default:
          break;
      }
      return [endX, endY, endZ];
    }
  }

  const setup = (p5, canvasParentRef) => {
    //setup canvas & basics
    let canvasSize;
    if (CANVAS_WIDTH <= CANVAS_HEIGHT) {
      canvasSize = CANVAS_WIDTH;
    } else {
      canvasSize = CANVAS_HEIGHT;
    }
    p5.createCanvas(canvasSize, canvasSize, p5.WEBGL).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    // p5.setAttributes("premultipliedAlpha", true);
    p5.frameRate(30);
    p5.noStroke();
    for (let i = 0; i < 3; i++) {
      _aryInitRot[i] = [p5.random(2 * p5.PI), p5.random([-1, 1])];
    }
    MyObject = new Parts(p5, 350);
  };

  const draw = (p5) => {
    p5.ortho(-p5.width / 2, p5.width / 2, -p5.width / 2, p5.width / 2, 0, p5.width * 2);
    p5.background(200);
    p5.ambientLight(60);
    let ang = _aryInitRot[1][0] + p5.frameCount / 100;
    p5.directionalLight(255, 255, 255, -p5.sin(ang), 1, -p5.cos(ang));
    let c = p5.height / 2 / p5.tan(p5.PI / 6);
    p5.camera(c * p5.sin(ang), 0, c * p5.cos(ang), 0, 0, 0, 0, 1, 0);
    p5.rotateZ(p5.PI / 4);
    MyObject.update(p5);
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
