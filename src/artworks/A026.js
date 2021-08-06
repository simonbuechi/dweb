import React from "react";
import Sketch from "react-p5";

export default (props) => {
  //global constants
  const CANVAS_WIDTH = window.localStorage.getItem("customWidth") ? window.localStorage.getItem("customWidth") : window.innerWidth;
  const CANVAS_HEIGHT = window.localStorage.getItem("customHeight") ? window.localStorage.getItem("customHeight") : window.innerHeight;
  const SEED = window.localStorage.getItem("signature");

  let nBalls;
  let nSteps;
  let thresh;
  let vMax;
  //i, x,y,vx,vy
  let balls = [];
  let ballShapeMode;
//  let numBallShapes = 4;
  let movementMode;
  let applyThreshold;
  let renderDiscretely;
  let rorschach;
  let pause;
  let invertAlpha;
  let blackBackground;
  let backgroundColor;
  let ballColor;
 // let randomColor;
  let ballImage;
  let radius;


  function resetParams(p5){
    movementMode = 0;
    ballShapeMode = 0;
    applyThreshold = true;
    renderDiscretely = false;
    rorschach = true;
    pause = false;
    invertAlpha = false;
    blackBackground = false;
  //  randomColor = false;
    
    nBalls = 30;
    nSteps = 6;
    thresh = .1;
    vMax = 3;
    //balls = [nBalls][4];
    for(let i=0; i<nBalls; i++) {
      balls.push([0,0,0,0]);
    }
    backgroundColor = p5.color(255);
    ballColor = p5.color(0);
    radius = 50;
  }

  function generateBalls(p5){
    for(let i=0; i<nBalls; i++)
      generateBall(p5, i);
  }

  function generateBall(p5, i){
    balls[i][0] = p5.random(radius,p5.width-radius);
    balls[i][1] = p5.random(radius,p5.height-radius);
    balls[i][2] = p5.random(-vMax,vMax);
    balls[i][3] = p5.random(-vMax,vMax);
  }


  function generateImage(p5){
    if(ballShapeMode === 0)
      generateCircleImage(p5);
    if(ballShapeMode === 1)
      generateRingImage(p5);
    if(ballShapeMode === 2)
      generateSquareImage(p5);
    if(ballShapeMode === 3)    
      generateHyperbolicImage(p5);
  }
    
  function generateSquareImage(p5){
    ballImage = p5.createImage(radius*2,radius*2,p5.ARGB);
    let thisColor = p5.color(0,0,0,0);
    let delta = 0;
      for(let x= 0; x<=radius; x++)
        for(let y= x; y<=radius; y++){
          delta = x;
          if(renderDiscretely){
            if(invertAlpha)
              thisColor = p5.color(0,0,0,
                                255*(nSteps-1-(delta/(radius)*(nSteps)))/(nSteps-1));
            else
              thisColor = p5.color(0,0,0,
                                255*((delta/(radius)*(nSteps))+1)/(nSteps));
          }
          else{
            if(invertAlpha)
              thisColor = p5.color(0,0,0,
                          255*(1.0-delta/(radius)));
            else
              thisColor = p5.color(0,0,0,255*(delta/(radius)));
          }
          ballImage.set(x,y,thisColor);
          ballImage.set(y,x,thisColor);
          ballImage.set(2*radius-x,y,thisColor);
          ballImage.set(y,2*radius-x,thisColor);
          ballImage.set(2*radius-x,2*radius-y,thisColor);
          ballImage.set(2*radius-y,2*radius-x,thisColor);
          ballImage.set(x,2*radius-y,thisColor);
          ballImage.set(2*radius-y,x,thisColor);
        }
  }
  
  function generateRingImage(p5){
    ballImage = p5.createImage(radius*2,radius*2,p5.ARGB);
    let thisColor = p5.color(0,0,0,0);
    let delta = 0;
      for(let x= 0; x<=radius*2; x++)
        for(let y= 0; y<=radius*2; y++){
          delta = p5.sqrt(p5.pow(x-radius,2)+p5.pow(y-radius,2));
          if(delta<radius){
            if(renderDiscretely){
              if(invertAlpha)
                thisColor = p5.color(0,0,0,
                            255.0*((2*p5.abs(delta/radius-.5)*nSteps)/(nSteps-1.0) ));
              else
                thisColor = p5.color(0,0,0,
                            255.0*((nSteps+1-2*p5.abs(delta/radius-.5)*nSteps)/(nSteps+0.0) ));
            }
            else{
              if(invertAlpha)
                thisColor = p5.color(0,0,0,
                            255*(2*p5.abs(delta/radius-.5)));
              else
                thisColor = p5.color(0,0,0,
                            255*(1-2*p5.abs(delta/radius-.5)));
            }
            ballImage.set(x,y,thisColor);
          }
          else{
            ballImage.set(x,y,p5.color(0,0,0,0));
          }
        }
  }  
    
  function generateCircleImage(p5){
    ballImage = p5.createImage(radius*2,radius*2,p5.ARGB);
    let thisColor = p5.color(0,0,0,0);
    let rSquared = 0;
    for(let x= 0; x<=radius; x++)
      for(let y= 0; y<=radius; y++){
        rSquared = p5.pow(x-radius,2)+p5.pow(y-radius,2);
        if(rSquared<radius*radius){
          if(renderDiscretely){
            if(invertAlpha)
              thisColor = p5.color(0,0,0,
                          255*((p5.sqrt(rSquared)/radius*nSteps)+1)/nSteps);
            else
              thisColor = p5.color(0,0,0,
                          255*(nSteps-(p5.sqrt(rSquared)/radius*nSteps))/nSteps);
          }
          else{
            if(invertAlpha)
              thisColor = p5.color(0,0,0,
                          255*(rSquared/(radius*radius)));
            else
              thisColor = p5.color(0,0,0,
                          255*(1-rSquared/(radius*radius)));
          }
          ballImage.set(x,y,thisColor);
          ballImage.set(2*radius-x,y,thisColor);
          ballImage.set(2*radius-x,2*radius-y,thisColor);
          ballImage.set(x,2*radius-y,thisColor);
        }
        else
          ballImage.set(x,y,p5.color(0,0,0,0));
      }
  }
  
  function generateHyperbolicImage(p5){
    ballImage = p5.createImage(radius*2,radius*2,p5.ARGB);
    let thisColor = p5.color(0,0,0,0);
    let delta = 0;
      for(let x= 0; x<=radius; x++)
        for(let y= 0; y<=radius; y++){
          delta = 2*radius/(2*radius-x)-1;
          delta+= 2*radius/(2*radius-y)-1;
          delta = delta/2.0;
          if(renderDiscretely){
            if(invertAlpha)
              thisColor = p5.color(0,0,0,
                                255*(nSteps-1-(delta*nSteps))/(nSteps-1));
            else
              thisColor = p5.color(0,0,0,
                                255*((delta*nSteps)+1)/(nSteps));
          }
          else{
            if(invertAlpha)
              thisColor = p5.color(0,0,0,
                          255*(1.0-delta));
            else
              thisColor = p5.color(0,0,0,255*(delta));
          }
          ballImage.set(x,y,thisColor);
          ballImage.set(y,x,thisColor);
          ballImage.set(2*radius-x,y,thisColor);
          ballImage.set(y,2*radius-x,thisColor);
          ballImage.set(2*radius-x,2*radius-y,thisColor);
          ballImage.set(2*radius-y,2*radius-x,thisColor);
          ballImage.set(x,2*radius-y,thisColor);
          ballImage.set(2*radius-y,x,thisColor);
        }
  }

  function moveBalls(p5){
    //bouncing off edges!
    if(movementMode === 0){
      for(let i=0; i<nBalls; i++){
        if(balls[i][0]-radius <= 0 || balls[i][0]+radius >= p5.width)
          balls[i][2] = -balls[i][2];
    
        if(balls[i][1]-radius <= 0 || balls[i][1]+radius >= p5.height)
          balls[i][3] = -balls[i][3];
        
        balls[i][2]+=p5.random(-.1,.1);
        balls[i][3]+=p5.random(-.1,.1);
        balls[i][2] = p5.constrain(balls[i][2],-vMax,vMax);
        balls[i][3] = p5.constrain(balls[i][3],-vMax,vMax);
        
        balls[i][0] +=balls[i][2];
        balls[i][1] +=balls[i][3];
      }
    }
    //a fountain!
    if(movementMode === 1){
      let v = -(p5.height+radius)/50;
      let theta = 0;
      for(let i=0; i<nBalls; i++){
        if(balls[i][0] < -2*radius || balls[i][0] > p5.width+radius ||
           balls[i][1] > p5.height+radius){
          v += p5.random(-2,2);
          theta = p5.random(-.2,.2);
          balls[i][0] = p5.width/2;
          balls[i][1] = p5.height-radius;
          balls[i][2] = v*p5.sin(theta);
          balls[i][3] = v*p5.cos(theta);
        }
        
        balls[i][3]-= v/50;
        
        balls[i][0] +=balls[i][2];
        balls[i][1] +=balls[i][3];
      }
    }
    //swirling around
    if(movementMode === 2){
      for(let i=0; i<nBalls; i++){
        if(balls[i][0] >=radius && balls[i][0] <= p5.width-radius &&
           balls[i][1] >=radius && balls[i][1] <= p5.height-radius){
          balls[i][2]+= (p5.width/2-balls[i][0])/(p5.width/2)*p5.random(.9,1.1);
          balls[i][3]+= (p5.height/2-balls[i][1])/(p5.height/2)*p5.random(.9,1.1);
          balls[i][0]+= balls[i][2];
          balls[i][1]+= balls[i][3];
        }
        else{
          balls[i][0] = p5.random(radius,p5.width-radius);
          balls[i][1] = p5.random(radius,p5.height-radius);
          balls[i][2] = 0;
          balls[i][3] = 0;
        }
        balls[i][0] +=balls[i][2];
        balls[i][1] +=balls[i][3];
      }
    }
    //orbits!
    if(movementMode === 3){
      let rSquared = 0;
      let theta = 0;
      let vel0 = p5.max(p5.width,p5.height)/150;
      let vel = vel0+0;
      for(let i=0; i<nBalls; i++){
        rSquared = (balls[i][0]-p5.width/2)*(balls[i][0]-p5.width/2)+
                   (balls[i][1]-p5.height/2)*(balls[i][1]-p5.height/2);
        theta = p5.atan2(balls[i][1]-p5.height/2,balls[i][0]-p5.width/2);
        if(rSquared > p5.max(p5.width+radius,p5.height+radius)*p5.max(p5.width+radius,p5.height+radius)*.25){
            balls[i][0] = p5.random(radius,p5.width-radius);
            balls[i][1] = p5.random(radius,p5.height-radius);
            balls[i][2] = 0;
            balls[i][3] = 0;
           }
        vel = vel0*(1-rSquared/(p5.width*p5.width/(3*3)));
        balls[i][0]+= vel*p5.cos(theta+p5.PI/2);
        balls[i][1]+= vel*p5.sin(theta+p5.PI/2);
      }
    }
    //swirl in!
    if(movementMode === 4){
      let rSquared = 0;
      let theta = 0;
      let rSquaredMax = (p5.width/2+radius)*(p5.width/2+radius);
      for(let i=0; i<nBalls; i++){
        rSquared = (balls[i][0]-p5.width/2)*(balls[i][0]-p5.width/2)+
                   (balls[i][1]-p5.height/2)*(balls[i][1]-p5.height/2);
        theta = p5.atan2(balls[i][1]-p5.height/2,balls[i][0]-p5.width/2);
        
        if(rSquared > rSquaredMax || rSquared < 200.0){
          rSquared = (p5.width/2+radius/2)*(p5.width/2+radius/2);//rSquaredMax*.9;
          theta = p5.random(p5.TWO_PI);
          balls[i][0] = p5.width/2+p5.sqrt(rSquared)*p5.cos(theta);
          balls[i][1] = p5.height/2+p5.sqrt(rSquared)*p5.sin(theta);
          balls[i][2] = 0;
          balls[i][3] = 0;
         }
  
        balls[i][0]-= (4*p5.cos(theta+p5.PI/2)+p5.cos(theta)*(1+rSquared/rSquaredMax));
        balls[i][1]-= (4*p5.sin(theta+p5.PI/2)+p5.sin(theta)*(1+rSquared/rSquaredMax));
      }
    }
    //They're all repulsive!
    if(movementMode === 5){
      let rSquared = 0;
      let theta = 0;
      for(let i=0; i<nBalls; i++){
        for(let j=0; j<nBalls; j++)
          if(i !== j){
            rSquared = (balls[i][0]-balls[j][0])*(balls[i][0]-balls[j][0])+
                       (balls[i][1]-balls[j][1])*(balls[i][1]-balls[j][1]);
            theta = p5.atan2(balls[j][1]-balls[i][1],balls[j][0]-balls[i][0]);
            balls[i][2]+= -1/rSquared*p5.cos(theta)*2E2;
            balls[i][3]+= -1/rSquared*p5.sin(theta)*2E2;
        }
        balls[i][2] += (1/balls[i][0]+1/((balls[i][0]-p5.width )))*nBalls/10;
        balls[i][3] += (1/balls[i][1]+1/((balls[i][1]-p5.height)))*nBalls/10;
        
        balls[i][2] = balls[i][2]*.95;
        balls[i][3] = balls[i][3]*.95;
        
        balls[i][0] += balls[i][2];
        balls[i][1] += balls[i][3];
      }
    }
    //They're repulsive, attractive!
    if(movementMode === 6){
      let rSquared = 0;
      let theta = 0;
      for(let i=0; i<nBalls; i++){
        for(let j=0; j<nBalls; j++)
          if(i !== j){
            rSquared = (balls[i][0]-balls[j][0])*(balls[i][0]-balls[j][0])+
                       (balls[i][1]-balls[j][1])*(balls[i][1]-balls[j][1]);
            theta = p5.atan2(balls[j][1]-balls[i][1],balls[j][0]-balls[i][0]);
      
            balls[i][2]+= -(3*radius/rSquared-1/p5.sqrt(rSquared))*p5.cos(theta)*20.0/nBalls;
            balls[i][3]+= -(3*radius/rSquared-1/p5.sqrt(rSquared))*p5.sin(theta)*20.0/nBalls;
        }
        balls[i][2] += (1/balls[i][0]+1/((balls[i][0]-p5.width )))*nBalls/10;
        balls[i][3] += (1/balls[i][1]+1/((balls[i][1]-p5.height)))*nBalls/10;
        balls[i][2] = balls[i][2]*.99;
        balls[i][3] = balls[i][3]*.99;
        balls[i][0] += balls[i][2];
        balls[i][1] += balls[i][3];
      }
    }
  }
  

  const setup = (p5, canvasParentRef) => {
    //setup canvas & basics
   // p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
   p5.createCanvas(500, 500).parent(canvasParentRef);
    p5.noiseSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(SEED !== null ? SEED : p5.floor(p5.random(1, 10000)));
    p5.frameRate(30);
    p5.smooth();
    p5.noStroke();
    resetParams(p5);  
    generateImage(p5);
    generateBalls(p5);
  };

  const draw = (p5) => {
      if(!pause)
        moveBalls(p5);
        p5.background(255);
      for(let i=0; i<nBalls; i++){
        if(!rorschach){
          p5.image(ballImage,balls[i][0]-radius,balls[i][1]-radius);
        }
        else{
          p5.image(ballImage,(p5.width-balls[i][0])-radius,balls[i][1]-radius);
          p5.image(ballImage,balls[i][0]-radius,balls[i][1]-radius);
        }
      }
      if(applyThreshold){
        p5.filter(p5.THRESHOLD,thresh);
      //apply color changes
      p5.loadPixels();
      for(let i=0; i<p5.pixels.length;i++){
        if(p5.red(p5.pixels[i]) === 255)
          p5.pixels[i] = backgroundColor;
        else
          p5.pixels[i] = ballColor;
      }  
      p5.updatePixels();
      }
      if(blackBackground)
        p5.filter(p5.INVERT);
      
  };

  const keyPressed = (p5) => {
    //save the canvas when press "s" or space
    if (p5.keyCode === 83 || p5.keyCode === 32) {
      let fileName = "SimonBuechi" + window.location.hash;
      fileName.replace(/[^a-zA-Z0-9]/g, "");
      p5.saveCanvas(fileName, "jpg");
    }
  };
    /*
    if(key =='1'){
      movementMode = 0;
      generateBalls(p5);
    }
    if(key =='2'){
      movementMode = 1;
      generateBalls(p5);
    }
    if(key =='3'){
      movementMode = 2;
      generateBalls(p5);
    }
    if(key =='4'){
      movementMode = 3;
      generateBalls(p5);
    }
    if(key =='5'){
      movementMode = 4;
      generateBalls(p5);
    }
    if(key =='6'){
      movementMode = 5;
      generateBalls(p5);
    }
    if(key =='7'){
      movementMode = 6;
      generateBalls(p5);
    } 
    //use discrete steps or smooth gradation?
    if(key =='d'){
      renderDiscretely = !renderDiscretely;
      generateImage();
    }
    
    //apply filter?
    if(key == 'f')
      applyThreshold = !applyThreshold;
    
    //invert color of shapes
    if(key == 'i'){
      invertAlpha = !invertAlpha;
      generateImage();
    }
    
    //double the image along x
    if(key == 'r')
      rorschach = !rorschach;
  
    //use squares or circles?
    if(key == 's'){
      ballShapeMode++;
      if(ballShapeMode == numBallShapes)
        ballShapeMode =0;
      generateImage();
    }
    
    if(key=='c'){
      randomColor = !randomColor;
      if(randomColor){
        backgroundColor = color(random(255),random(255),random(255));
        ballColor = color(random(255),random(255),random(255));
      }
      else{
        backgroundColor = color(255);
        ballColor = color(0);
      }
    }
    if(key=='z'){
      resetParams(p5);
      generateBalls(p5);
      generateImage();
    }
  
    
    //pause motion
    if(key == 'p')
      pause = !pause;
    
    //invert all colors?
    if(key == 'b')
      blackBackground = !blackBackground;
    
    //shrink/grow balls
    if(key == '-' && radius>10){
      radius = (int)(radius/1.2);
      println("radius: "+radius);
      generateImage();
    }
    if(key == '=' && radius<width/3){
      radius = (int)(radius*1.2);
      println("radius: "+radius);
      generateImage();
    }
    
    //change drawing threshold
    if(key =='[' && thresh>0){
      thresh = thresh/1.2;
      println("threshold: "+thresh);
    }
    if(key ==']' && thresh*1.2<1){
      thresh = thresh*1.2;
      println("threshold: "+thresh);
    }
    
    //change the number of steps in the discretized image
    if(key =='{' && nSteps>3){
      nSteps--;
      generateImage();
      println("nSteps: "+nSteps);
    }
    if(key =='}'){
      nSteps++;
      generateImage();
      println("nSteps: "+nSteps);
    }
    
    
    //add/remove balls
    if(key =='_'){
      int newNBalls = nBalls;
      if(nBalls>0)
        newNBalls = (int)(nBalls/1.2);
        
      println("nBalls: "+nBalls+" to "+newNBalls);
  
      float[][] newBalls = new float[newNBalls][4];
      for(int i =0; i<newNBalls;i++)
          newBalls[i] = balls[i];
          
      nBalls = newNBalls;
      balls = newBalls;
    }
    if(key =='+'){
      int newNBalls = nBalls+0;
      if(nBalls<5)
        newNBalls++;
      else
        newNBalls = (int)(nBalls*1.2);
      println("nBalls: "+nBalls+" to "+newNBalls);
      float[][] newBalls = new float[newNBalls][4];
      for(int i =0; i<nBalls;i++)
        newBalls[i] = balls[i];
      
      balls = newBalls;
      for(int i =nBalls; i<newNBalls;i++)
        generateBall(i);
      
      nBalls = newNBalls;
      println(balls.length);
    }
    */


  return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />;
};