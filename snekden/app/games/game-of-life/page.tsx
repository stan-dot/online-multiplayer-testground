"use client";
import { useState } from "react";
import { Canvas } from "./Canvas";
import { STARTING_CELLS } from "./constants/defaults";
import { CanvasOptions } from "./types/CanvasOptions";
import { CellsCanvasData } from "./types/CellsCanvasData";
import { drawCells } from "./utils/canvasFunctions";
import { fillCellsWithStarts, getInitialArray } from "./utils/initFunctions";

const SQUARE_SIDE_LENGTH = 64;
const canvasShape: CanvasOptions = {
  height: 550,
  width: 580,
};

const minSpeed = 4;
const maxSpeed = 40;

const DEFAULT_TIME_PERIOD = 20;

export default function ConwaysGame() {
  const EMPTY_CONTAINER: number[][] = getInitialArray(
    SQUARE_SIDE_LENGTH,
    SQUARE_SIDE_LENGTH,
  );
  const cells: number[][] = fillCellsWithStarts(
    EMPTY_CONTAINER,
    STARTING_CELLS,
  );
  const data: CellsCanvasData = { cells: cells };
  const [speed, setSpeed] = useState<number>(DEFAULT_TIME_PERIOD);
  const [stop, setStop] = useState<boolean>(true);

  return (
    <div className="relative left-20 flex flex-col rounded-lg w-4/5 m-4 bg-slate-400">
      <h1 className="bg-green-400 w-1/2 p-2 rounded">
        Conway&apos;s game of life
      </h1>
      {/* speed slider */}
      <div id="speedSlider" className="p-2 m-2 ">
        <input
          type="range"
          value={speed}
          onChange={(v) => setSpeed(parseInt(v.target.value))}
          min={minSpeed}
          max={maxSpeed}
        />
        <div className="border-white border-1 border-solid rounded p-2">
          <h2>Speed</h2>
          <p>min: {minSpeed}</p>
          <p>max: {maxSpeed}</p>
          <p>current: {speed}</p>
        </div>
        <button onClick={() => setStop(!stop)} className='rounded bg-slate-500 p-1 m-2'>
          START/STOP
        </button>
      </div>
      <Canvas
        draw={drawCells}
        data={data}
        options={canvasShape}
        control={{ speed: speed, stop: stop }}
      />
    </div>
  );
}
