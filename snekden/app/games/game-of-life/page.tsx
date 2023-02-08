"use client";
import { Canvas } from "./Canvas";
import { STARTING_CELLS } from "./constants/defaults";
import { CanvasOptions } from "./types/CanvasOptions";
import { CellsCanvasData } from "./types/CellsCanvasData";
import { drawCells } from "./utils/canvasFunctions";
import { fillCellsWithStarts, getInitialArray } from "./utils/initFunctions";

const SQUARE_SIDE_LENGTH = 64;
const canvasShape: CanvasOptions = {
  height: 550,
  width: 580
};

export default function ConwaysGame() {
  const EMPTY_CONTAINER: number[][] = getInitialArray(SQUARE_SIDE_LENGTH, SQUARE_SIDE_LENGTH)
  const cells: number[][] = fillCellsWithStarts(EMPTY_CONTAINER, STARTING_CELLS);
  const data: CellsCanvasData = { cells: cells };

  return <div className="relative left-20 flex flex-col rounded-lg w-4/5 m-4 bg-slate-400">
    <h1 className="bg-green-400 w-1/2 p-2 rounded"> Conway&apos;s game of life</h1>
    <Canvas draw={drawCells} data={data} options={canvasShape} />
  </div >

}


