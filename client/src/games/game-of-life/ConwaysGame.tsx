import { Canvas } from "./Canvas";
import { getUpdatedGrid } from "./utils/checkIfSurvives";
import { SQUARE_SIDE_LENGTH, STARTING_CELLS } from "./constants/defaults";
import { fillCellsWithStarts } from "./utils/fillCellsWithStarts";
import { getInitialArray } from "./utils/getInitialArray";
import { draw } from "./strokes";
import { CellsCanvasData } from "./CellsCanvasData";

export default function ConwaysGame(): JSX.Element {
  const EMPTY_CONTAINER: number[][] = getInitialArray(SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH)
  const data: CellsCanvasData = {
    cells: fillCellsWithStarts(EMPTY_CONTAINER, STARTING_CELLS),
  };

  return <>
    <h1> Conway's game of life</h1>
    <Canvas draw={draw} data={data} />
  </>

}


