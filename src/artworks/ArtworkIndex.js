import React, { lazy } from "react";
//artworks
const P5Helper = lazy(() => import("../artworks/P5Helper"));
const A001 = lazy(() => import("../artworks/A001"));
const A002 = lazy(() => import("../artworks/A002"));
const A003 = lazy(() => import("../artworks/A003"));
const A004 = lazy(() => import("../artworks/A004"));
const A005 = lazy(() => import("../artworks/A005"));
const A006 = lazy(() => import("../artworks/A006"));
const A007 = lazy(() => import("../artworks/A007"));
const A008 = lazy(() => import("../artworks/A008"));
const A009 = lazy(() => import("../artworks/A009"));

export const artworkIndex = [
  {
    id: "p5helper",
    primary: "P5 Helper functions",
    secondary: "not really a piece of art...",
    date: new Date(2020, 11, 27),
    content: <P5Helper />
  },
  {
    id: "A001",
    primary: "Bar code",
    secondary: "A simple case of color theory",
    date: new Date(2020, 12, 5),
    content: <A001 />,
    color: true,
    noise: true,
  },
  {
    id: "A002",
    primary: "Mondrian playground",
    secondary: "inspired by angichau/r1BOM69-4",
    link: "https://editor.p5js.org/angichau/sketches/r1BOM69-4",
    date: new Date(2021, 0, 3),
    content: <A002 />,
    color: true,
    noise: true,
  },
  {
    id: "A003",
    primary: "Mondrian recursive",
    secondary: "inspired by sofiagarcia/mondrian",
    link: "https://github.com/sofiagarcia/mondrian/blob/master/mondrian-v.1/sketch.js",
    date: new Date(2021, 0, 5),
    content: <A003 />,
    color: false,
    noise: true,
  },
  {
    id: "A004",
    primary: "A new world",
    secondary: "inspired by openprocessing/397924",
    link: "https://editor.p5js.org/Kubi/sketches/CHPTDZOu2",
    date: new Date(2021, 0, 7),
    content: <A004 />,
    color: false,
    noise: false,
  },
  {
    id: "A005",
    primary: "Noisy pathways",
    secondary: "Experimenting with Perlin noise",
    date: new Date(2021, 0, 10),
    content: <A005 />,
    animated: true,
    noise: false,
  },
  {
    id: "A006",
    primary: "Procedural Tripping",
    secondary: "inspired by procedural night reflections",
    date: new Date(2021, 0, 11),
    content: <A006 />,
    webgl: true,
    animated: true,
    color: true,
    noise: false,
  },
  {
    id: "A007",
    primary: "Hexadingens  (draft)",
    secondary: "inspired by https://www.youtube.com/watch?v=n66jkd94qN4",
    link: "https://github.com/matthewepler/Generative-Design-Systems-with-P5js/tree/master/21_final",
    date: new Date(2021, 0, 17),
    content: <A007 />,
  },
  {
    id: "A008",
    primary: "Rosette I  (draft)",
    secondary: "A single rosette",
    date: new Date(2021, 0, 20),
    content: <A008 />,
    noise: true,
  },
  {
    id: "A009",
    primary: "Rosette II (draft)",
    secondary: "A bouquet of rosettes",
    date: new Date(2021, 0, 22),
    content: <A009 />,
    noise: true,
  },
];