export type CellsCanvasData = {
  cells: number[][];
  shapes: Shape[];
};
// http://www.radicaleye.com/lifepage/picgloss/picgloss.html

type ShapeType = "nothing" | "stable" | "repeat";

export type Shape = {
  startingPoint: number[];
  internalCells: number[][];
  name: string;
  type: ShapeType;
};

export function moveByVector(vector: number[], shape: Shape): Shape {
  const newStart: number[] = [
    shape.startingPoint[0] + vector[0],
    shape.startingPoint[1] + vector[1],
  ];
  return { ...shape, startingPoint: newStart };
}

export function prepareCells(shape: Shape): number[][] {
  const y = shape.startingPoint[1];
  const x = shape.startingPoint[0];
  return shape.internalCells.map((pair) => [pair[0] + x, pair[1] + y]);
}

const multiplier = 10;
const minimums = 30;
export function getExpanse(shape: Shape): number[] {
  if (shape.internalCells.length === 0) return [0, 0];
  const maxX = shape.internalCells.reduce(
    (a: number, b: number[]) => Math.max(a, b[0]),
    -Infinity,
  );
  const maxY = shape.internalCells.reduce(
    (a: number, b: number[]) => Math.max(a, b[1]),
    -Infinity,
  );

  return [maxX, maxY].map((x) => x * multiplier).map((x) =>
    x > minimums ? x : minimums
  );
}

export function getFinalCells(shape: Shape): number[][] {
  const yStart = shape.startingPoint[1];
  const xStart = shape.startingPoint[0];
  return shape.internalCells.map(
    (cell) => [cell[0] + xStart, cell[1] + yStart],
  );
}

export function addShapeToGrid(
  grid: number[][],
  shape: Shape,
  dynamic: boolean = true,
): number[][] {
  const cells = dynamic ? getFinalCells(shape) : shape.internalCells;
  cells.forEach((pointThatIs1) => {
    grid[pointThatIs1[0]][pointThatIs1[1]] = 1;
  });
  return grid;
}
