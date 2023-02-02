function checkIfSurvives(
  x: number,
  y: number,
  cellValue: number,
  cells: number[][],
): number {
  let count = countNeighbours(x, y, cells);
  if (cellValue > 0) {
    return (count === 2 || count === 3) ? 1 : 0;
  }
  return count === 3 ? 1 : 0;
}

function countNeighbours(
  xCoor: number,
  yCoor: number,
  cells: number[][],
): number {
  var amount = 0;

  // three neighbours higher
  if (isFilled(xCoor - 1, yCoor - 1, cells)) {
    amount++;
  }
  if (isFilled(xCoor, yCoor - 1, cells)) {
    amount++;
  }
  if (isFilled(xCoor + 1, yCoor - 1, cells)) {
    amount++;
  }

  // 2 sideways neighbours
  if (isFilled(xCoor - 1, yCoor, cells)) {
    amount++;
  }
  if (isFilled(xCoor + 1, yCoor, cells)) {
    amount++;
  }

  // three neightbours lower
  if (isFilled(xCoor - 1, yCoor + 1, cells)) {
    amount++;
  }
  if (isFilled(xCoor, yCoor + 1, cells)) {
    amount++;
  }
  if (isFilled(xCoor + 1, yCoor + 1, cells)) {
    amount++;
  }

  return amount;
}

function isFilled(x: number, y: number, cells: number[][]): number {
  return cells[x] && cells[x][y];
}

export function getUpdatedGrid(cells: number[][]): number[][] {
  var result: number[][] = [];

  cells.forEach((row, x) => {
    result[x] = row.map((cellValue, yCoor) =>
      checkIfSurvives(x, yCoor, cellValue, cells)
    );
  });

  return result;
}
