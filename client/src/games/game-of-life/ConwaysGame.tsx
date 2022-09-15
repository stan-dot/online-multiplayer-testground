import { Canvas } from "./Canvas";
import { CellsCanvasData } from "./CellsCanvasData";
import { SQUARE_SIDE_LENGTH, STARTING_CELLS } from "./constants/defaults";
import { draw } from "./strokes";
import { fillCellsWithStarts } from "./utils/fillCellsWithStarts";
import { getInitialArray } from "./utils/getInitialArray";

export default function ConwaysGame(): JSX.Element {
  const EMPTY_CONTAINER: number[][] = getInitialArray(SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH)
  const data: CellsCanvasData = {
    cells: fillCellsWithStarts(EMPTY_CONTAINER, STARTING_CELLS),
  };

  return <>
    <h1> Conway's game of life</h1>
    <Canvas draw={draw} data={data} options={
      {
        height: 800,
        width: 800
      }
    } />
  </>

}


