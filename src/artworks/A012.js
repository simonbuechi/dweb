import React from "react";
import Sketch from "react-p5";

const Artwork = (props) => {
  //global constants
  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;
  const seed = window.localStorage.getItem("signature");
  const SIZE_FACTOR = 1.2;
  const XOFF_STEP = 0.001;
  const COLOROFF_STEP = 0.002;
  const MAX_ITERATIONS = XOFF_STEP * 1000;
  const BACKGROUND_SATURATION = 30;
  const BACKGROUND_BRIGHTNESS = 65;
  const BACKGROUND_BRIGHTNESS_LIGHTEN = 25;
  const BEZIER_SATURATION = 100;
  const BEZIER_BRIGHTNESS = 50;
  const BEZIER_ALPHA = 50;
  let xoff = 0;
  let coloroff = 100;

  const setup = (p5, canvasParentRef) => {
    //setup canvas
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    p5.noiseSeed(seed !== null ? seed : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(seed !== null ? seed : p5.floor(p5.random(1, 10000)));
    p5.colorMode(p5.HSB, 360, 100, 100, 100);
    //set background
    const backgroundHue = p5.floor(p5.noise(1000) * 360);
    p5.background(p5.color(backgroundHue, BACKGROUND_SATURATION, BACKGROUND_BRIGHTNESS));
    p5.noStroke();
    for (let i = Math.max(p5.width, p5.height); i > 0; i--) {
      const step = i / Math.max(p5.width, p5.height);
      const gradient = p5.lerpColor(
        p5.color(backgroundHue, BACKGROUND_SATURATION, BACKGROUND_BRIGHTNESS + BACKGROUND_BRIGHTNESS_LIGHTEN),
        p5.color(backgroundHue, BACKGROUND_SATURATION, BACKGROUND_BRIGHTNESS),
        step
      );
      p5.fill(gradient);
      p5.ellipse(p5.width / 2, p5.height / 2, step * p5.width, step * p5.height);
    }
    p5.noFill();
    p5.strokeWeight = 3;
  };

  const draw = (p5) => {
    // bezier noise curve
    var x1 = p5.width * SIZE_FACTOR * p5.noise(xoff + 15);
    var x2 = p5.width * SIZE_FACTOR * p5.noise(xoff + 25);
    var x3 = p5.width * SIZE_FACTOR * p5.noise(xoff + 35);
    var x4 = p5.width * SIZE_FACTOR * p5.noise(xoff + 45);
    var y1 = p5.height * SIZE_FACTOR * p5.noise(xoff + 55);
    var y2 = p5.height * SIZE_FACTOR * p5.noise(xoff + 65);
    var y3 = p5.height * SIZE_FACTOR * p5.noise(xoff + 75);
    var y4 = p5.height * SIZE_FACTOR * p5.noise(xoff + 85);
    //p5.stroke(p5.color(0,0,100, BEZIER_ALPHA));
    //p5.bezier(x1, y1, x2, y2, x3, y3, x4, y4);
    //p5.bezier(p5.width-x1, p5.height-y1, p5.width-x2, p5.height-y2, p5.width-x3, p5.height-y3, p5.width-x4, p5.height-y4);
    p5.stroke(p5.map(p5.noise(coloroff), 0, 1, 0, 360), BEZIER_SATURATION, BEZIER_BRIGHTNESS, BEZIER_ALPHA);
    p5.bezier(x1, y1, x2, y2, x3, y3, x4, y4);
    xoff += XOFF_STEP;
    coloroff += COLOROFF_STEP;
    if (xoff >= MAX_ITERATIONS) {
      p5.noLoop();
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

/*
ArrayList particles = new ArrayList();

void setup(){
  fullScreen();
  stroke(255, 0, 0, 2);
  background(0);
  for(int i = 0; i < 50; i++){
    particles.add(new Particle(new PVector(random(width), random(height)))); 
  }
}

void draw(){
  for(int i = 0; i < particles.size(); i++){
    Particle p = (Particle) particles.get(i);
    p.move(); 
    p.boundary();
    for(int q = 0; q < particles.size(); q++){
      Particle p2 = (Particle) particles.get(q);
      if(PVector.dist(p.loc, p2.loc) < 150){
        noFill();
        float dx = map(dist(p.loc.x, p2.loc.x, width/2, height/2), 0, width, -50, 50);
        float dy = map(dist(p.loc.y, p2.loc.y, width/2, height/2), 0, width, -50, 50);
        float d2x = map(dist(-p.loc.x, p2.loc.x, width/2, height/2), 0, width, -50, 50);
        float d2y = map(dist(-p.loc.y, p2.loc.y, width/2, height/2), 0, width, -50, 50);
        bezier(p.loc.x, p.loc.y, p.loc.x+dx, p.loc.y+dy, p2.loc.x+d2x, p2.loc.y+d2y, p2.loc.x, p2.loc.y);
      }
    }
  }
}

class Particle {
  PVector loc, vel;
  
  Particle(PVector loc){
    this.loc = loc;
    vel = new PVector(random(-2, 2), random(-2, 2));
  }
  
  void move(){
    loc.add(vel); 
  }
  
  void boundary(){
    if(loc.x < 0) vel.x *= -1;
    if(loc.x > width) vel.x *= -1;
    if(loc.y < 0) vel.y *= -1;
    if(loc.y > height) vel.y *= -1;
  }
}

*/
