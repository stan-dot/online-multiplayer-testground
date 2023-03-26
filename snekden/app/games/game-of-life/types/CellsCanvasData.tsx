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
  // console.log(shape);
  // console.log(maxX, maxY);
  // const minX = shape.internalCells[0].reduce((a, b) => Math.min(a, b), -Infinity);
  // const minY = shape.internalCells[1].reduce((a, b) => Math.min(a, b), -Infinity);
  return [maxX, maxY].map((x) => x * multiplier);
}

export function getFinalCells(shape: Shape): number[][] {
  const yStart = shape.startingPoint[1];
  const xStart = shape.startingPoint[0];
  return shape.internalCells.map(
    (cell) => [cell[0] + xStart, cell[1] + yStart],
  );
}

export function addShapeToGrid(grid: number[][], shape: Shape): number[][] {
  console.log("grid before addding: ", grid);
  const movedShape: number[][] = getFinalCells(shape);
  console.log("moved shape: ", movedShape);
  movedShape.forEach((pointThatIs1) => {
    grid[pointThatIs1[0]][pointThatIs1[1]] = 1;
  });
  // grid = grid.map((row, i) => {
  //   return row.map((cell, j) => {
  //     if (cell === 1) return 1;
  //     const syntheticCell: number[] = [i, j];
  //     if (movedShape.includes(syntheticCell)) {
  //       return 1;
  //     }
  //     return 0;
  //   });
  // });

  console.log("grid after adding: ", shape, " grid: ", grid);
  return grid;
}
