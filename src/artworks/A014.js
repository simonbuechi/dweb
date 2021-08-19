import React from "react";
import Sketch from "react-p5";

export const Artwork = (props) => {
  //global constants
  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;
  const seed = window.localStorage.getItem("signature");

  const size = 1024;
  const siz = size - 1;
  const si = size - 2;

  let halfWidth, halfHeight;
  let r = 192;
  let g = 192;
  let b = 192;
  let vr = 0;
  let vg = 0;
  let vb = 0;
  let tension = 0.5;
  let sympathy = 0.25;

  let px = [];
  let py = [];
  let vx = [];
  let vy = [];
  let ax = [];
  let ay = [];

  const setup = (p5, canvasParentRef) => {
    //setup canvas
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    p5.noiseSeed(seed !== null ? seed : p5.floor(p5.random(1, 10000)));
    p5.randomSeed(seed !== null ? seed : p5.floor(p5.random(1, 10000)));

    // p5.colorMode(p5.RGB, 100);
    p5.background(0);
    p5.noFill();
    p5.strokeWeight(0.05);

    halfWidth = p5.width / 2;
    halfHeight = p5.height / 2;

    for (let i = 0; i < size; i++) {
      const angle = (p5.TAU * i) / size;
      px[i] = halfWidth + p5.cos(angle) * halfHeight;
      py[i] = halfHeight + p5.sin(angle) * halfHeight;
      vx[i] = 0;
      vy[i] = 0;
      ax[i] = 0;
      ay[i] = 0;
    }
  };

  const draw = (p5) => {
    for (let i = 1; i < siz; i++) {
      ax[i] = (px[i - 1] + px[i + 1] - px[i] - px[i]) * tension + (vx[i - 1] + vx[i + 1] - vx[i] - vx[i]) * sympathy;
      ay[i] = (py[i - 1] + py[i + 1] - py[i] - py[i]) * tension + (vy[i - 1] + vy[i + 1] - vy[i] - vy[i]) * sympathy;
    }

    ax[0] = (px[siz] + px[1] - px[0] - px[0]) * tension + (vx[siz] + vx[1] - vx[0] - vx[0]) * sympathy;
    ay[0] = (py[siz] + py[1] - py[0] - py[0]) * tension + (vy[siz] + vy[1] - vy[0] - vy[0]) * sympathy;

    ax[siz] = (px[si] + px[0] - px[siz] - px[siz]) * tension + (vx[si] + vx[0] - vx[siz] - vx[siz]) * sympathy;
    ay[siz] = (py[si] + py[0] - py[siz] - py[siz]) * tension + (vy[si] + vy[0] - vy[siz] - vy[siz]) * sympathy;

    let randomNode = p5.floor(p5.random(0, size));
    ax[randomNode] = (halfWidth - px[randomNode]) * 0.001 + p5.randomGaussian() * 5;
    ay[randomNode] = (halfHeight - py[randomNode]) * 0.001 + p5.randomGaussian() * 5;

    for (let i = 0; i < size; i++) {
      vx[i] += ax[i];
      vy[i] += ay[i];
      px[i] += vx[i];
      py[i] += vy[i];
      px[i] = p5.constrain(px[i], 0, p5.width);
      py[i] = p5.constrain(py[i], 0, p5.height);
    }

    vr = vr * 0.995 + p5.randomGaussian() * 0.04;
    vg = vg * 0.995 + p5.randomGaussian() * 0.04;
    vb = vb * 0.995 + p5.randomGaussian() * 0.04;

    r += vr;
    g += vg;
    b += vb;

    if ((r < 128 && vr < 0) || (r > 255 && vr > 0)) vr = -vr;
    if ((g < 128 && vg < 0) || (g > 255 && vg > 0)) vg = -vg;
    if ((b < 128 && vb < 0) || (b > 255 && vb > 0)) vb = -vb;

    p5.stroke(r, g, b);
    p5.beginShape();
    for (let i = 0; i < size; i++) {
      p5.vertex(px[i], py[i]);
    }
    p5.endShape();
  };

  const keyPressed = (p5) => {
    //save the canvas when press "s" or space
    if (p5.keyCode === 83 || p5.keyCode === 32) {
      p5.saveCanvas("simons_artwork", "jpg");
    }
  };

  return <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />;
};
