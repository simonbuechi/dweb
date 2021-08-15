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
const A010 = lazy(() => import("../artworks/A010"));
const A011 = lazy(() => import("../artworks/A011"));
const A012 = lazy(() => import("../artworks/A012"));
const A013 = lazy(() => import("../artworks/A013"));
const A014 = lazy(() => import("../artworks/A014"));
const A015 = lazy(() => import("../artworks/A015"));
const A016 = lazy(() => import("../artworks/A016"));
const A017 = lazy(() => import("../artworks/A017"));
const A018 = lazy(() => import("../artworks/A018"));
const A019 = lazy(() => import("../artworks/A019"));
const A020 = lazy(() => import("../artworks/A020"));
const A021 = lazy(() => import("../artworks/A021"));
const A022 = lazy(() => import("../artworks/A022"));
const A023 = lazy(() => import("../artworks/A023"));
const A024 = lazy(() => import("../artworks/A024"));
const A025 = lazy(() => import("../artworks/A025"));
// const A026 = lazy(() => import("../artworks/A026"));
const A027 = lazy(() => import("../artworks/A027"));
//const A028 = lazy(() => import("../artworks/A028"));
const A029 = lazy(() => import("../artworks/A029"));
const A030 = lazy(() => import("../artworks/A030"));

export const artworkIndex = [
  {
    id: "p5helper",
    primary: "P5 Helper functions",
    secondary: "not really a piece of art...",
    date: new Date(2020, 11, 27),
    content: <P5Helper />,
    draft: true,
  },
  {
    id: "A001",
    primary: "Bar code",
    secondary: "A simple case of color theory",
    staticImage: true,
    date: new Date(2020, 12, 5),
    content: <A001 />,
    color: true,
    noise: true,
    draft: true,
  },
  {
    id: "A002",
    primary: "Mondrian playground",
    secondary: "inspired by angichau/r1BOM69-4",
    staticImage: true,
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
    staticImage: true,
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
    staticImage: true,
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
    staticImage: true,
    date: new Date(2021, 0, 10),
    content: <A005 />,
    animated: true,
    noise: false,
  },
  {
    id: "A006",
    primary: "Procedural Tripping",
    secondary: "inspired by procedural night reflections",
    staticImage: true,
    date: new Date(2021, 0, 11),
    content: <A006 />,
    webgl: true,
    animated: true,
    color: true,
    noise: false,
  },
  {
    id: "A007",
    primary: "Hexadingens",
    secondary: "inspired by https://www.youtube.com/watch?v=n66jkd94qN4",
    staticImage: true,
    link: "https://github.com/matthewepler/Generative-Design-Systems-with-P5js/tree/master/21_final",
    date: new Date(2021, 0, 17),
    content: <A007 />,
    draft: true,
  },
  {
    id: "A008",
    primary: "Rosette",
    secondary: "A single rosette",
    staticImage: true,
    date: new Date(2021, 0, 20),
    content: <A008 />,
    noise: true,
    starred: false,
    draft: true,
  },
  {
    id: "A009",
    primary: "Painting a painting",
    secondary: "Brush on a perlin noise path",
    staticImage: true,
    date: new Date(2021, 0, 22),
    content: <A009 />,
    link: "https://openprocessing.org/sketch/1015644",
    noise: true,
    color: true,
    starred: true,
  },
  {
    id: "A010",
    primary: "Misty mountains",
    secondary: "Perlin generated mountains",
    staticImage: true,
    link: "https://openprocessing.org/sketch/179401",
    date: new Date(2021, 1, 10),
    content: <A010 />,
    noise: true,
    draft: true,
  },
  {
    id: "A011",
    primary: "Sunset in the mountains",
    secondary: "Perlin generated mountains",
    staticImage: true,
    link: "https://openprocessing.org/sketch/624484",
    date: new Date(2021, 2, 4),
    content: <A011 />,
    noise: true,
  },
  {
    id: "A012",
    primary: "Bezierchen",
    secondary: "Bezier curves on perlin noise path",
    staticImage: true,
    date: new Date(2021, 2, 17),
    content: <A012 />,
    noise: true,
    animated: true,
    color: true,
    draft: true,
  },
  {
    id: "A013",
    primary: "Triangulation",
    secondary: "Animated path of fading triangles",
    staticImage: true,
    date: new Date(2021, 2, 23),
    content: <A013 />,
    noise: true,
    animated: true,
    draft: true,
  },
  {
    id: "A014",
    primary: "Smoking circle",
    secondary: "perlin based smoke",
    staticImage: true,
    date: new Date(2021, 2, 24),
    content: <A014 />,
    noise: true,
    animated: true,
    draft: true,
  },
  {
    id: "A015",
    primary: "Wildline",
    secondary: "perlin noise path in groups",
    staticImage: true,
    link: "https://openprocessing.org/sketch/1149962",
    date: new Date(2021, 2, 27),
    content: <A015 />,
    noise: true,
    starred: true,
    color: true,
  },
  {
    id: "A016",
    primary: "Multitude of Suns",
    secondary: "inspired by okazz sketch 1034762",
    staticImage: true,
    link: "https://openprocessing.org/sketch/1034762",
    date: new Date(2021, 2, 30),
    content: <A016 />,
    noise: true,
    color: true,
    draft: true,
  },
  {
    id: "A017",
    primary: "You're a snowflake",
    secondary: "...",
    staticImage: false,
    date: new Date(2021, 4, 2),
    content: <A017 />,
    noise: true,
    color: true,
    draft: true,
  },
  {
    id: "A018",
    primary: "Rotating cube",
    secondary: "webgl based, random path",
    staticImage: true,
    link: "https://openprocessing.org/sketch/1117787",
    date: new Date(2021, 3, 4),
    content: <A018 />,
    noise: false,
    webgl: true,
    animated: true,
    draft: true,
  },
  {
    id: "A019",
    primary: "Epic Yarn Ravel",
    secondary: "Perlin noise path of hundreds of colored yarns",
    staticImage: true,
    date: new Date(2021, 3, 8),
    content: <A019 />,
    noise: true,
    starred: true,
    color: true,
  },
  {
    id: "A020",
    primary: "WEBGL playground",
    secondary: "Gradients and stuff...",
    staticImage: false,
    date: new Date(2021, 3, 28),
    content: <A020 />,
    noise: true,
    color: true,
  },
  {
    id: "A021",
    primary: "Voronoien I",
    secondary: "...",
    staticImage: false,
    date: new Date(2021, 4, 7),
    content: <A021 />,
    noise: true,
    color: true,
    draft: true,
  },
  {
    id: "A022",
    primary: "Voronoien II",
    secondary: "...",
    staticImage: false,
    date: new Date(2021, 4, 7),
    content: <A022 />,
    noise: true,
    color: true,
    draft: true,
  },
  {
    id: "A023",
    primary: "Pencil Sketch",
    secondary: "inspired by sketch 893302",
    staticImage: false,
    date: new Date(2021, 7, 2),
    content: <A023 />,
    link: "https://openprocessing.org/sketch/893302",
    noise: true,
    draft: true,
  },
  {
    id: "A024",
    primary: "Triposkop",
    secondary: "Colorful kaleidoscope",
    staticImage: false,
    date: new Date(2021, 7, 4),
    content: <A024 />,
    link: "https://openprocessing.org/sketch/940954",
    noise: true,
    color: true,
    draft: true,
  },
  {
    id: "A025",
    primary: "Rorschach on Eleven",
    secondary: "A colorful Rorschach test",
    staticImage: false,
    date: new Date(2021, 7, 5),
    content: <A025 />,
    link: "https://openprocessing.org/sketch/476860",
    noise: true,
    color: true,
    starred: true,
  },
  /*
  // not working --> abandon
  {
    id: "A026",
    primary: "Perpetual Rorschach",
    secondary: "inspired by sketch 4675",
    staticImage: false,
    date: new Date(2021, 7, 6),
    content: <A026 />,
    link: "https://openprocessing.org/sketch/4675",
    noise: true,
    color: false,
    draft: true,
  },
  */
  {
    id: "A027",
    primary: "A tree",
    secondary: "just a tree",
    staticImage: false,
    date: new Date(2021, 7, 7),
    content: <A027 />,
    noise: true,
    color: true,
    draft: true,
  },
  /*
  {
    id: "A028",
    primary: "A tree",
    secondary: "just a tree",
    staticImage: false,
    date: new Date(2021, 7, 7),
    content: <A028 />,
    noise: true,
    color: true,
    draft: true,
  },
  */
  {
    id: "A029",
    primary: "A029",
    secondary: "...",
    staticImage: false,
    date: new Date(2021, 7, 13),
    content: <A029 />,
    noise: true,
    color: true,
    draft: true,
  },
  {
    id: "A030",
    primary: "A030",
    secondary: "...",
    staticImage: false,
    date: new Date(2021, 7, 14),
    content: <A030 />,
    noise: true,
    color: false,
    draft: true,
  },
];
