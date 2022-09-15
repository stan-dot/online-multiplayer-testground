export function getInitialArray(xLength: number, yLength: number): number[][] {
  let cells: number[][] = [];
  for (var i = 0; i < xLength; i++) {
    cells[i] = [];
    for (var j = 0; j < yLength; j++) {
      cells[i][j] = 0;
    }
  }
  return cells;
}
