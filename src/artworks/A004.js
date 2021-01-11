import React from "react";
import Sketch from "react-p5";
//import { TerrainType } from "p5";

export default (props) => {
  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;
  const seed = "adsfasdf234234";
  const mode = "terrain"; // terrain | height | greyscale
  const noiseScale = 0.01; // range between 0-0.03
  const octaves = 4; // range between 1-5
  const persistance = 0.5; // range between 0-1
  const lacunarity = 2; // range between 1-3
  let regions = [];
  let world, octaveOffsets, generator;

  class MapGenerator {
    generateMap(p5, width, height, noiseScale, octaves, persistance, lacunarity) {
      this.noiseMap = Noise.generateNoiseMap(p5, width, height, noiseScale, octaves, persistance, lacunarity);

      if (mode === "terrain") return MapGenerator.convertNoiseToTerrainMap(this.noiseMap);
      else if (mode === "height") return MapGenerator.convertNoiseToHeightMap(p5, this.noiseMap);
      else if (mode === "greyscale") return MapGenerator.convertNoiseToGreyscaleMap(p5, this.noiseMap);
    }

    static convertNoiseToTerrainMap(noiseMap) {
      let terrainMap = [];

      let height = noiseMap.length;
      let width = noiseMap[0].length;

      let currentHeight;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          currentHeight = noiseMap[y][x];

          for (let i = 0; i < regions.length; i++) {
            if (currentHeight <= regions[i].height) {
              terrainMap.push(regions[i].clr);
              break;
            }
          }
        }
      }
      return terrainMap;
    }

    static convertNoiseToHeightMap(p5, noiseMap) {
      let heightMap = [];

      let height = noiseMap.length;
      let width = noiseMap[0].length;

      let currentHeight, discretizedHeight;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          currentHeight = noiseMap[y][x];
          discretizedHeight = p5.floor(currentHeight * 10) / 10;
          heightMap.push(p5.color(p5.map(discretizedHeight, 0, 0.9, 0, 255)));
        }
      }
      return heightMap;
    }

    static convertNoiseToGreyscaleMap(p5, noiseMap) {
      let greyscaleMap = [];

      let height = noiseMap.length;
      let width = noiseMap[0].length;

      let clr;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          clr = p5.color(p5.round(p5.map(noiseMap[y][x], 0, 1, 0, 255)));
          greyscaleMap.push(clr);
        }
      }
      return greyscaleMap;
    }
  }

  class Noise {
    static generateNoiseMap(p5, mapWidth, mapHeight, scale, octaves, persistance, lacunarity) {
      let noiseMap = [];

      if (scale <= 0) scale = 0.0001;

      let amplitude, frequency, noiseHeight, sampleX, sampleY, perlinValue;

      let maxNoiseHeight = -Infinity;
      let minNoiseHeight = Infinity;

      let halfWidth = mapWidth / 2;
      let halfHeight = mapHeight / 2;

      for (let y = 0; y < mapHeight; y++) {
        noiseMap[y] = [];

        for (let x = 0; x < mapWidth; x++) {
          amplitude = 1;
          frequency = 1;
          noiseHeight = 0;

          for (let i = 0; i < octaves; i++) {
            sampleX = (x - halfWidth) * scale * frequency + octaveOffsets[i].x;
            sampleY = (y - halfHeight) * scale * frequency + octaveOffsets[i].y;

            perlinValue = p5.noise(sampleX, sampleY) * 2 - 1;

            noiseHeight += perlinValue * amplitude;

            amplitude *= persistance;
            frequency *= lacunarity;
          }

          if (noiseHeight < minNoiseHeight) minNoiseHeight = noiseHeight;
          if (noiseHeight > maxNoiseHeight) maxNoiseHeight = noiseHeight;

          noiseMap[y].push(noiseHeight);
        }
      }

      for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
          noiseMap[y][x] = p5.map(noiseMap[y][x], minNoiseHeight, maxNoiseHeight, 0, 1);
        }
      }
      return noiseMap;
    }
  }

  class Map {
    constructor(p5, x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.texture = p5.createImage(this.width, this.height);
    }

    init(p5) {
      this.noiseScale = noiseScale;
      this.octaves = octaves;
      this.persistance = persistance;
      this.lacunarity = lacunarity;
      this.data = generator.generateMap(p5, this.width, this.height, this.noiseScale, this.octaves, this.persistance, this.lacunarity);
    }

    createTexture(p5) {
      this.texture.loadPixels();
      let indPixels;
      let indData = 0;

      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          indPixels = (y * this.width + x) * 4;
          this.texture.pixels[indPixels + 0] = p5.red(this.data[indData]);
          this.texture.pixels[indPixels + 1] = p5.green(this.data[indData]);
          this.texture.pixels[indPixels + 2] = p5.blue(this.data[indData]);
          this.texture.pixels[indPixels + 3] = 255;
          indData++;
        }
      }
      this.texture.updatePixels();
    }
  }

  class TerrainType {
    constructor(name, height, color) {
      this.name = name;
      this.height = height;
      this.clr = color;
    }
  }

  function generateOctaveOffsets(p5) {
    let offsets = [];
    let offsetX, offsetY;
    for (let i = 0; i < 10; i++) {
      offsetX = p5.random(-100000, 100000);
      offsetY = p5.random(-100000, 100000);
      offsets.push(p5.createVector(offsetX, offsetY));
    }
    return offsets;
  }

  function createRegions(p5) {
    const deepWater = new TerrainType("deep water", 0.1, p5.color(50, 50, 150));
    regions.push(deepWater);

    const mediumWater = new TerrainType("medium water", 0.3, p5.color(62, 62, 194));
    regions.push(mediumWater);

    const shallowWater = new TerrainType("shallow water", 0.5, p5.color(71, 71, 255));
    regions.push(shallowWater);

    const beach = new TerrainType("beach", 0.55, p5.color(217, 224, 139));
    regions.push(beach);

    const grass = new TerrainType("grass", 0.67, p5.color(67, 204, 67));
    regions.push(grass);

    const forest = new TerrainType("forest", 0.75, p5.color(17, 99, 33));
    regions.push(forest);

    const dirt = new TerrainType("dirt", 0.82, p5.color(50, 54, 45));
    regions.push(dirt);

    const rock = new TerrainType("rock", 0.95, p5.color(48, 41, 41));
    regions.push(rock);

    const snow = new TerrainType("snow", 1, p5.color(255));
    regions.push(snow);

    return regions;
  }

  const setup = (p5, canvasParentRef) => {
    p5.noiseSeed(seed);
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    p5.pixelDensity(1);
    octaveOffsets = generateOctaveOffsets(p5);
    regions = createRegions(p5);
    generator = new MapGenerator();
    world = new Map(p5, 0, 0, canvasWidth, canvasHeight);
    world.init(p5);
    world.createTexture(p5);
  };

  const draw = (p5) => {
    p5.background(0);
    p5.image(world.texture, world.x, world.y);
  };

  return <Sketch setup={setup} draw={draw} />;
};
