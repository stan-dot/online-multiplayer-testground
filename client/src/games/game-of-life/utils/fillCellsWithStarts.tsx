export function fillCellsWithStarts(container: number[][], contents: number[][]) {
  contents.forEach(point => {
    container[point[0]][point[1]] = 1;
  });
  return container;
}
