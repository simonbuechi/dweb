import React from "react";
import Sketch from "react-p5";

export default (props) => {
  //global constants
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");
  const IDEAL_FRAME_RATE = 60;
  const DURATION = 1500;
  const COLOR_SATURATION = 80;
  const COLOR_BRIGHTNESS = 90;
  const COLOR_CHANGE_SPEED = 0.1;
  let colorMode = true;
  let darkBackgroundMode = true;
  let baseHue;
  let unitLength;
  let rorschachShape;
  let rorschachShapeColor;

  class RorschachShape {
    constructor(p5, params) {
      this.shapeSize = params.shapeSize;
      this.noiseMagnitudeFactor = params.noiseMagnitudeFactor;
      this.centerPosition = p5.createVector();
      this.rotationAngle = 0;
      this.vertexCount = params.vertexCount || Math.floor(0.75 * params.shapeSize);
      this.noiseDistanceScale = params.noiseDistanceScale || params.shapeSize / 320;
      this.noiseTimeScale = params.noiseTimeScale || 0.005;
      this.xNoiseParameterOffset
          = p5.createVector(Math.random(), Math.random()).mult(1024);
      this.yNoiseParameterOffset
          = p5.createVector(Math.random(), Math.random()).mult(1024);
      this.noiseTime = 0;
      this.reachedEndOfScreen = false;
      this.temporalVector = p5.createVector();
    }
    step() {
        this.noiseTime += this.noiseTimeScale;
    }
    draw(p5) {
        if (this.reachedEndOfScreen)
            return;
        p5.translate(this.centerPosition.x, this.centerPosition.y);
        p5.rotate(this.rotationAngle);
        this.drawVertices(p5, +1);
        this.drawVertices(p5, -1);
        p5.rotate(-this.rotationAngle);
        p5.translate(-this.centerPosition.x, -this.centerPosition.y);
    }
    drawVertices(p5, yScaleFactor) {
        const noiseMagnitude = this.noiseMagnitudeFactor * 0.5 * this.shapeSize;
        p5.beginShape();
        let currentBasePositionX = -0.5 * this.shapeSize;
        const basePositionIntervalDistance = this.shapeSize / this.vertexCount;
        const progressRatio = p5.constrain(p5.frameCount / DURATION, 0, 1);
        for (let i = 0; i < this.vertexCount; i += 1) {
            const distanceFactor = progressRatio * p5.sq(p5.sin((i / this.vertexCount) * p5.PI));
            const noiseX = (2 * p5.noise(this.xNoiseParameterOffset.x + this.noiseDistanceScale * currentBasePositionX, this.xNoiseParameterOffset.y + this.noiseTime) - 1) * noiseMagnitude;
            const noiseY = (2 * p5.noise(this.yNoiseParameterOffset.x + this.noiseDistanceScale * currentBasePositionX, this.yNoiseParameterOffset.y + this.noiseTime) - 1) * noiseMagnitude;
            const vertexPositionX = currentBasePositionX + distanceFactor * noiseX;
            const vertexPositionY = yScaleFactor * distanceFactor * (0.3 * this.shapeSize + noiseY);
            p5.vertex(vertexPositionX, vertexPositionY);
            const rotatedVertexPosition = this.temporalVector;
            rotatedVertexPosition.set(vertexPositionX, vertexPositionY);
            rotatedVertexPosition.rotate(this.rotationAngle);
            this.checkScreen(p5, this.centerPosition.x + rotatedVertexPosition.x, this.centerPosition.y + rotatedVertexPosition.y);
            currentBasePositionX += basePositionIntervalDistance;
        }
        p5.endShape();
    }
    checkScreen(p5, absolutePositionX, absolutePositionY) {
        const xMargin = 0.01 * p5.width;
        const yMargin = 0.05 * p5.height;
        if (absolutePositionX < xMargin || absolutePositionX > p5.width - xMargin ||
            absolutePositionY < yMargin || absolutePositionY > p5.height - yMargin) {
            this.reachedEndOfScreen = true;
        }
    }
  }

  class NoFillShapeColor {
    constructor(p5, strokeColor) {
      const array = [];
      for (let alphaValue = 0; alphaValue <= 255; alphaValue += 1) {
          array.push(p5.color(p5.red(strokeColor), p5.green(strokeColor), p5.blue(strokeColor), p5.alpha(strokeColor) * alphaValue / 255));
      }
      this.strokeColorArray = array;
    }
    apply(p5, alphaValue = 255) {
      if(colorMode) {
        p5.stroke((baseHue + COLOR_CHANGE_SPEED * p5.frameCount) % 360, COLOR_SATURATION, COLOR_BRIGHTNESS, 0.05);
      } else {
        const index = Math.floor(p5.constrain(alphaValue, 0, 255));
        p5.stroke(this.strokeColorArray[index]);
      }        
      p5.noFill();
    }
  }

  const setup = (p5, canvasParentRef) => {
    //setup canvas & basics
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.colorMode(p5.HSB,360, 100, 100);
    baseHue = p5.floor(p5.random(0,360));
    p5.disableFriendlyErrors = true;
    p5.frameRate(IDEAL_FRAME_RATE);
    unitLength = Math.min(p5.width, p5.height) / 640;
    p5.strokeWeight(Math.max(1, 1 * unitLength)); 
    if (darkBackgroundMode) {
      p5.background(0);
    } else {
      p5.background(255);
    }
    const rorschachShapeSize = 480 * unitLength;
    rorschachShape = new RorschachShape(p5, {
        shapeSize: rorschachShapeSize,
        vertexCount: Math.floor(1.5 * rorschachShapeSize),
        noiseDistanceScale: p5.random(0.005, 0.04),
        noiseMagnitudeFactor: p5.random(1, 4),
        noiseTimeScale: 0.0005,
    });
    rorschachShape.centerPosition.set(0.5 * p5.width, 0.48 * p5.height);
    rorschachShape.rotationAngle = p5.PI + p5.HALF_PI;
    rorschachShapeColor = new NoFillShapeColor(p5, p5.color(0, 0.05));
    p5.loop();
  };

  const draw = (p5) => {
    if(p5.frameCount > DURATION) {
      p5.noLoop();
    }
    rorschachShape.step();
    rorschachShapeColor.apply(p5);
    rorschachShape.draw(p5);
  };

  const keyPressed = (p5) => {
    //save the canvas when press "s" or space
    if (p5.keyCode === 83 || p5.keyCode === 32) {
      let fileName = "SimonBuechi" + window.location.hash;
      fileName.replace(/[^a-zA-Z0-9]/g, "");
      p5.saveCanvas(fileName, "jpg");
    }
    if(p5.key === 'p') {
      colorMode = !colorMode;
      p5.redraw();
    }
    if(p5.key === 'b') {
      darkBackgroundMode = !darkBackgroundMode;
      if (darkBackgroundMode) {
        p5.background(0);
      } else {
        p5.background(255);
      }
      
    }
  };

  return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />;
};
