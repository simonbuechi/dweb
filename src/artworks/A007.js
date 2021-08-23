import React from "react";
import Sketch from "react-p5";

const Artwork = (props) => {
  const CRYSTAL_SIZE = 150;
  const SIDES = 6;
  // layout
  const MARGIN = CRYSTAL_SIZE / 2;
  const COLUMNS = 3;
  const ROWS = 4;
  const PADDING = CRYSTAL_SIZE * 0.2;
  const GRIDBOX = CRYSTAL_SIZE + PADDING;
  const START = CRYSTAL_SIZE / 2 + MARGIN;
  let PALETTE = [];
  let ALL_CRYSTALS = [];

  const hexagon = (p5, posX, posY, radius) => {
    const rotAngle = 360 / 6;
    p5.beginShape();
    for (let i = 0; i < 6; i++) {
      const thisVertex = pointOnCircle(p5, posX, posY, radius, i * rotAngle);
      p5.vertex(thisVertex.x, thisVertex.y);
    }
    p5.endShape(p5.CLOSE);
  };

  const pointOnCircle = (p5, posX, posY, radius, angle) => {
    const x = posX + radius * p5.cos(angle);
    const y = posY + radius * p5.sin(angle);
    return p5.createVector(x, y);
  };

  const randomSelectTwo = () => {
    const rando = Math.random();
    return rando > 0.5 ? true : false;
  };

  const getRandomFromPalette = () => {
    const rando = Math.floor(Math.random() * PALETTE.length);
    return PALETTE[rando];
  };

  const testLines = (p5, state) => {
    state.numShapes = randomSelectTwo() ? state.sides : state.sides * 2;
    state.angle = 360 / state.numShapes;

    return {
      name: "testLines",
      state,
      render: () => {
        p5.stroke(state.layerColor);
        p5.noFill();
        p5.strokeWeight(state.thickStroke);
        p5.push();
        // translate(width / 2, height / 2) //**
        if (state.lines) {
          for (let i = 0; i < 360 - 0.1; i += state.angle) {
            p5.line(0, 0, 0, CRYSTAL_SIZE / 2);
            p5.rotate(state.angle);
          }
        }
        if (state.circle) {
          p5.ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE);
        }
        p5.pop();
      },
    };
  };

  const myTriangle = (p5, center, radius, direction) => {
    if (direction) {
      p5.beginShape();
      p5.vertex(center + radius * p5.cos(0), radius * p5.sin(0));
      p5.vertex(center + radius * p5.cos(120), radius * p5.sin(120));
      p5.vertex(center + radius * p5.cos(240), radius * p5.sin(240));
      p5.endShape(p5.CLOSE);
    } else {
      p5.beginShape();
      p5.vertex(center + radius * p5.cos(180), radius * p5.sin(180));
      p5.vertex(center + radius * p5.cos(300), radius * p5.sin(300));
      p5.vertex(center + radius * p5.cos(60), radius * p5.sin(60));
      p5.endShape(p5.CLOSE);
    }
  };

  const layerConstructors = [
    {
      name: "Outline Shape",
      init: (p5, props) =>
        outlineShape(p5, {
          ...props,
          ...setState(p5, state),
        }),
      weight: 0.3,
    },
    {
      name: "Centered Shape",
      init: (p5, props) =>
        centeredShape(p5, {
          ...props,
          ...setState(state),
        }),
      weight: 0.3,
    },
    {
      name: "Circles",
      init: (p5, props) =>
        circles(p5, {
          ...props,
          ...setState(p5, state),
        }),
      weight: 0.3,
    },
    {
      name: "Simple Lines",
      init: (p5, props) =>
        simpleLines(p5, {
          ...props,
          ...setState(p5, state),
        }),
      weight: 0.3,
    },
    {
      name: "Dotted Lines",
      init: (p5, props) =>
        dottedLines(p5, {
          ...props,
          ...setState(p5, state),
        }),
      weight: 0.3,
    },
    {
      name: "Ring of Shapes",
      init: (p5, props) =>
        ringOfShapes(p5, {
          ...props,
          ...setState(p5, state),
        }),
      weight: 0.3,
    },
    {
      name: "Stepped Hexagons",
      init: (p5, props) =>
        steppedHexagons(p5, {
          ...props,
          ...setState(p5, state),
        }),
      weight: 0.7,
    },
    {
      name: "Test Lines",
      init: (p5, props) =>
        testLines(p5, {
          lines: false,
          circle: false,
          ...props,
          ...setState(p5, state),
        }),
      weight: 1,
    },
  ];

  const makeCrystal = (p5, pos) => {
    const layers = layerConstructors.map((lcon) => {
      let picker = p5.random(1);
      const draw = picker > lcon.weight;
      // const draw = lcon.name === 'Test Lines'
      return lcon.init(p5, {
        pos,
        draw,
      });
    });
    return layers;
  };

  const drawCrystal = (p5, crystal) => {
    crystal.forEach((layer) => {
      if (layer.state.draw) {
        p5.push();
        p5.translate(layer.state.pos.x, layer.state.pos.y);
        layer.render();
        p5.pop();
      }
    });
  };

  const state = {
    sides: SIDES,
    stepsOut: 8,
    thinStroke: 1,
    thickStroke: 3,
  };

  const setState = (state) => {
    state.numShapes = state.sides;
    state.angle = 360 / state.numShapes;
    state.singleStep = CRYSTAL_SIZE / 2 / state.stepsOut;
    state.layerColor = getRandomFromPalette();
    return state;
  };

  const circles = (p5, state) => {
    state.shapeSize = (CRYSTAL_SIZE / 2) * 0.93;
    state.position = CRYSTAL_SIZE / 2 - state.shapeSize / 2;

    return {
      name: "circles",
      state,
      render: () => {
        p5.noFill();
        p5.stroke(state.layerColor);
        p5.strokeWeight(1);
        p5.push();
        //translate(width/2, height/2)
        for (let i = 0; i <= state.numShapes; i++) {
          p5.ellipse(state.position, 0, state.shapeSize, state.shapeSize);
          p5.rotate(state.angle);
        }
        p5.pop();
      },
    };
  };

  const simpleLines = (p5, state) => {
    state.numSteps = randomSelectTwo() ? state.stepsOut : p5.int(state.stepsOut * 1.25);
    state.step = CRYSTAL_SIZE / 2 / state.numSteps;
    state.start = p5.floor(p5.random(0, state.numSteps));
    state.stop = p5.floor(p5.random(state.start, state.numSteps + 1));
    state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke;
    state.numShapes = randomSelectTwo() ? state.sides : state.sides * 2;
    state.angle = 360 / state.numShapes;

    return {
      name: "Simple Lines",
      state,
      render: () => {
        p5.noFill();
        p5.stroke(state.layerColor);
        p5.strokeWeight(state.weight);
        p5.push();
        //translate(width/2, height/2)
        for (let i = 0; i < state.numShapes; i++) {
          p5.line(state.start * state.step, 0, state.stop * state.step, 0);
          p5.rotate(state.angle);
        }
        p5.pop();
      },
    };
  };

  const outlineShape = (p5, state) => {
    state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke;
    state.hexagonTrue = randomSelectTwo();

    return {
      name: "Outline Shape",
      state,
      render: () => {
        p5.stroke(state.layerColor);
        p5.strokeWeight(state.weight);
        p5.push();
        //translate(width/2, height/2)
        if (state.hexagonTrue) {
          hexagon(p5, 0, 0, CRYSTAL_SIZE / 2);
        } else {
          p5.ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE);
        }
        p5.pop();
      },
    };
  };

  const dottedLines = (p5, state) => {
    state.numShapes = randomSelectTwo() ? state.sides : state.sides * 2;
    state.angle = 360 / state.numShapes;
    state.shapeSize = 3;
    state.centerOffset = state.singleStep;

    return {
      name: "Dotted Lines",
      state,
      render: () => {
        p5.fill(state.layerColor);
        p5.noStroke();
        p5.push();
        //translate(width / 2, height / 2)
        for (let i = 0; i <= state.numShapes; i++) {
          for (let x = state.centerOffset; x < CRYSTAL_SIZE / 2; x += state.singleStep) {
            p5.rect(x, 0, state.shapeSize, state.shapeSize);
          }
          p5.rotate(state.angle);
        }
        p5.pop();
      },
    };
  };

  const centeredShape = (p5, state) => {
    state.randomShape = p5.random(1);
    state.shapeSize = p5.floor(p5.random(state.stepsOut / 2, state.stepsOut - 2)) * state.singleStep;

    return {
      name: "Centered Shape",
      state,
      render: () => {
        p5.fill(state.layerColor);
        p5.noStroke();
        p5.push();
        // translate(width / 2, height / 2)
        if (state.randomShape < 0.1) {
          p5.rect(0, 0, state.shapeSize * 2, state.shapeSize * 2);
        } else if (state.randomShape >= 0.1 && state.randomShape < 0.6) {
          p5.ellipse(0, 0, state.shapeSize * 2, state.shapeSize * 2);
        } else if (state.randomShape >= 0.6) {
          p5.rotate(state.angle / 2);
          hexagon(p5, 0, 0, state.shapeSize);
        }
        p5.pop();
      },
    };
  };

  const ringOfShapes = (p5, state) => {
    state.steps = p5.floor(p5.random(1, state.stepsOut));
    state.center = state.steps * state.singleStep;
    state.randomShape = p5.random(1);
    state.direction = randomSelectTwo(p5); // used for triangle only
    state.fillColor = randomSelectTwo(p5) ? state.layerColor : p5.color(0, 1);
    state.weight = randomSelectTwo(p5) ? state.thinStroke : state.thickStroke;

    if (state.steps < state.stepsOut / 2) {
      state.radius = p5.floor(p5.random(1, state.steps)) * state.singleStep;
    } else if (state.steps > state.stepsOut / 2) {
      state.radius = p5.floor(p5.random(1, state.stepsOut - state.steps)) * state.singleStep;
    } else {
      state.radius = p5.floor(p5.random(1, state.stepsOut / 2 + 1)) * state.singleStep;
    }

    return {
      name: "Ring of Shapes",
      state,
      render: () => {
        p5.stroke(state.layerColor);
        p5.fill(state.fillColor);
        p5.strokeWeight(state.weight);
        p5.push();
        //translate(width / 2, height / 2)
        for (let i = 0; i < state.numShapes; i++) {
          if (state.randomShape < 0.33) {
            p5.ellipse(0, state.center, state.radius, state.radius);
          } else if (state.randomShape >= 0.33 && state.randomShape < 0.66) {
            p5.rect(0, state.center, state.radius, state.radius);
          } else if (state.randomShape >= 0.66) {
            myTriangle(p5, state.center, state.radius, state.direction);
          }
          p5.rotate(state.angle);
        }
        p5.pop();
      },
    };
  };

  const steppedHexagons = (p5, state) => {
    state.numSteps = randomSelectTwo(p5) ? state.stepsOut : state.stepsOut * 1.25;
    state.centerOffset = (CRYSTAL_SIZE / 2) * 0.15;
    state.singleStep = (CRYSTAL_SIZE / 2 - state.centerOffset) / state.numSteps;
    state.weight = randomSelectTwo(p5) ? state.thinStroke : state.thickStroke;

    return {
      name: "Stepped Hexagons",
      state,
      render: () => {
        p5.stroke(state.layerColor);
        p5.noFill();
        p5.strokeWeight(state.weight);
        p5.push();
        //translate(width / 2, height / 2)
        p5.rotate(state.angle / 2);
        for (let i = 1; i < state.numSteps + 1; i++) {
          hexagon(p5, 0, 0, state.centerOffset + i * state.singleStep);
        }
        p5.pop();
      },
    };
  };

  const setup = (p5, canvasParentRef) => {
    const totalX = START + GRIDBOX * COLUMNS;
    const totalY = START + GRIDBOX * ROWS;
    p5.createCanvas(totalX, totalY, p5.SVG).parent(canvasParentRef);

    PALETTE = [
      p5.color(255, 52, 154), // pink
      p5.color(4, 0, 152), // blue
    ];

    p5.noLoop();
    p5.angleMode(p5.DEGREES);
    p5.rectMode(p5.CENTER);
  };

  const draw = (p5) => {
    // go to a point on the screen and draw a crystal
    // continue to do this until we run out of room
    for (let x = 0; x < COLUMNS; x++) {
      for (let y = 0; y < ROWS; y++) {
        const posX = START + x * GRIDBOX;
        const posY = START + y * GRIDBOX;
        const crystal = makeCrystal(p5, { x: posX, y: posY });
        console.log(crystal);
        ALL_CRYSTALS.push(crystal);
      }
    }

    ALL_CRYSTALS.forEach((crystal) => {
      drawCrystal(p5, crystal);
    });
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