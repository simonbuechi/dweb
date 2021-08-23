import React from "react";
import Sketch from "react-p5";
import { Shader } from "p5";

const Artwork = (props) => {
  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;
  //const seed = "adsfasdf234234";
  const noctaves = 4;
  let gl;
  let c = [];
  let shader;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(canvasWidth, canvasHeight, p5.WEBGL).parent(canvasParentRef);
    gl = p5.canvas.getContext("webgl");
    gl.disable(gl.DEPTH_TEST);
    for (let i = 0; i < 22; i++) {
      c[i] = p5.random(-5, 5);
    }
    shader = new Shader(p5._renderer, vert, frag); //shaders are loaded
    p5.shader(shader); //p5.s are applied
  };

  const draw = (p5) => {
    shader.setUniform("iResolution", [p5.width, p5.height]); //pass some values to the shader
    shader.setUniform("iTime", p5.millis() * 0.0005);
    shader.setUniform("noctaves", noctaves);
    shader.setUniform("c", c);
    p5.shader(shader);
    p5.box(p5.width / 2);
  };

  const keyPressed = (p5) => {
    //save the canvas when press "s" or space
    if (p5.keyCode === 83 || p5.keyCode === 32) {
      p5.saveCanvas("simons_artwork", "jpg");
    }
  };

  return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />;
};

var frag = `
// Author Pierre MARZIN 01/2017

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 iResolution;
uniform float iTime;
uniform int noctaves;
uniform float c[22];

float noise( in vec2 x )
{
	return sin(1.5*x.x)*sin(1.5*x.y);
}

const mat2 rot = mat2( 0.80,  0.6, -0.6,  0.8 );
float fbm ( in vec2 _st) {
    float v = 0.0;
    float a = 0.6;
    vec2 shift = 10.0*vec2(c[11],c[12]);
    for (int i = 0; i < 12; ++i) {//noprotect
		if(i>=noctaves)break;
        v += a * noise(_st);
        _st = rot*_st* 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

void main() {
    vec2 st =(-iResolution.xy+2.0*gl_FragCoord.xy)/iResolution.y;//(gl_FragCoord.xy/iResolution.xy);//
    vec3 color = vec3(0.);
    vec2 q = vec2(0.);
    q.x = fbm( st+vec2(c[0],c[1]*.01*iTime) );
    q.y = fbm( st+vec2(c[2],c[3]) );
    vec2 r = vec2(0.);

//play with the values here!
		r.x = fbm( st+ (3.0+0.4)*q+vec2(c[5],c[6]));
    r.y = fbm( st+ (6.0+0.5)*q*sin(.01*iTime)+vec2(c[8]*.05*iTime,c[9]));
    float f = fbm(st+c[10]*(r+length(q) ));
    color = smoothstep(vec3(0.101961,0.19608,0.666667),vec3(0.666667,0.666667,0.98039),color);
    color = mix(color,vec3(1.856,.05*(1.0+cos(1.5+.2*iTime)),0.164706),r.y+length(q));//
    color = mix(color,vec3(1.5*sin(.1*iTime),0.0,cos(.13*iTime)),length(r+q));//.2+.2*(1.0+cos(0.5+.3*iTime))
		color = mix( color, vec3(0.9,0.9,0.9), dot(r,r) );
		color*=(1.5*f*f*f+1.8*f*f+1.7*f);
		color+=.4*vec3(1.8+r.x,0.7+q);
		color=pow(color, vec3(.5));
    gl_FragColor = vec4(color,1.);
}

`;
var vert = `
//standard vertex shader
#ifdef GL_ES
      precision highp float;
    #endif
		#extension GL_OES_standard_derivatives : enable
    // attributes, in
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    attribute vec2 aTexCoord;
    attribute vec4 aVertexColor;

    // attributes, out
    varying vec3 var_vertPos;
    varying vec4 var_vertCol;
    varying vec3 var_vertNormal;
    varying vec2 var_vertTexCoord;
    
    // matrices
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    uniform mat3 uNormalMatrix;

    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);

      // just passing things through
      var_vertPos      = aPosition;
      var_vertCol      = aVertexColor;
      var_vertNormal   = aNormal;
      var_vertTexCoord = aTexCoord;
    }
`;

export default Artwork;