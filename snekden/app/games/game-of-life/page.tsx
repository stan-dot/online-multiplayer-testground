"use client";
import { Canvas } from "./Canvas";
import { STARTING_CELLS } from "./constants/defaults";
import { CanvasOptions } from "./types/CanvasOptions";
import { CellsCanvasData } from "./types/CellsCanvasData";
import { drawCells } from "./utils/canvasFunctions";
import { fillCellsWithStarts, getInitialArray } from "./utils/initFunctions";

const SQUARE_SIDE_LENGTH = 64;
const canvasShape: CanvasOptions = {
  height:550,
  width:580
};

export default function ConwaysGame() {
  const EMPTY_CONTAINER: number[][] = getInitialArray(SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH)
  const cells: number[][] = fillCellsWithStarts(EMPTY_CONTAINER, STARTING_CELLS);
  const data: CellsCanvasData = { cells: cells };

  return <div className="relative left-20">
    <h1 className="text-slate-50 texl-2xl bg-cyan-700 rounded-md w-40"> Conway&apos;s game of life</h1>
    <Canvas draw={drawCells} data={data} options={canvasShape} />
  </div>

}


