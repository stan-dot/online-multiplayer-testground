export type CellsCanvasData = {
  cells: number[][];
  shapes: Shape[];
};

export type Shape = {
  startingPoint: number[];
  internalCells: number[][];
};

export function moveByVector(vector: number[], shape: Shape): Shape {
  const newStart: number[] = [
    shape.startingPoint[0] + vector[0],
    shape.startingPoint[1] + vector[1],
  ];
  return { internalCells: shape.internalCells, startingPoint: newStart };
}


export function getExpanse(shape: Shape): number[]{
const maxX = shape.internalCells[0].reduce((a, b) => Math.max(a, b), -Infinity);
const maxY = shape.internalCells[1].reduce((a, b) => Math.max(a, b), -Infinity);
// const minX = shape.internalCells[0].reduce((a, b) => Math.min(a, b), -Infinity);
// const minY = shape.internalCells[1].reduce((a, b) => Math.min(a, b), -Infinity);
  return [maxX, maxY]
}