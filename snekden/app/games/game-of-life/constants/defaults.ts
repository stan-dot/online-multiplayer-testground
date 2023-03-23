// shooting glider

import { Shape } from "../types/CellsCanvasData";

const gliderCells: number[][] = [
  [1, 5],
  [1, 6],
  [2, 5],
  [2, 6],
  [11, 5],
  [11, 6],
  [11, 7],
  [12, 4],
  [12, 8],
  [13, 3],
  [13, 9],
  [14, 3],
  [14, 9],
  [15, 6],
  [16, 4],
  [16, 8],
  [17, 5],
  [17, 6],
  [17, 7],
  [18, 6],
  [21, 3],
  [21, 4],
  [21, 5],
  [22, 3],
  [22, 4],
  [22, 5],
  [23, 2],
  [23, 6],
  [25, 1],
  [25, 2],
  [25, 6],
  [25, 7],
  [35, 3],
  [35, 4],
  [36, 3],
  [36, 4],
];

const randomCells: number[][] = [
  // Random cells
  // If you wait enough time these will eventually take part
  // in destroying the glider gun, and the simulation will be in a "static" state.
  [60, 47],
  [61, 47],
  [62, 47],
  [60, 48],
  [61, 48],
  [62, 48],
  [60, 49],
  [61, 49],
  [62, 49],
  [60, 51],
  [61, 51],
  [62, 51],
];

 const defaultGlider: Shape = {
  name: "glider",
  startingPoint: [0, 0],
  internalCells: gliderCells,
  type: "repeat",
};

const basicSquare: Shape = {
  name: "square",
  startingPoint: [0, 0],
  internalCells: [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ],
  type: "stable",
};

const nothingTriomino: Shape = {
  startingPoint: [0,0],
  internalCells: [[0,1], [0,2], [1,0]],
  name: "nihilist triomino",
  type: "nothing",
};

export const STARTING_CELLS: number[][] = [randomCells.flat(1)];

export const availableShapes: Shape[] = [defaultGlider, basicSquare, nothingTriomino];

export const DEFAULT_SHAPES: Shape[] = [defaultGlider, basicSquare];