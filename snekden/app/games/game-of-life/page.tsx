"use client";
import { useState } from "react";
import { Canvas } from "./Canvas";
import {
  DEFAULT_SHAPES,
  STARTING_CELLS_COORDINATES,
} from "./constants/defaults";
import { Setup } from "./settings/Setup";
import { CanvasOptions } from "./types/CanvasOptions";
import { CellsCanvasData, Shape } from "./types/CellsCanvasData";
import { SimulationControl } from "./types/SimulationControl";
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

const EMPTY_CONTAINER: number[][] = getInitialArray(
  SQUARE_SIDE_LENGTH,
  SQUARE_SIDE_LENGTH,
);

export default function ConwaysGame() {
  const startingGrid: number[][] = fillCellsWithStarts(
    EMPTY_CONTAINER,
    STARTING_CELLS_COORDINATES,
  );
  const defaultData: CellsCanvasData = {
    cells: startingGrid,
    shapes: DEFAULT_SHAPES,
  };
  const [data, setData] = useState<CellsCanvasData>(defaultData);
  const [speed, setSpeed] = useState<number>(DEFAULT_TIME_PERIOD);
  const [stop, setStop] = useState<boolean>(true);
  const [borderColor, setBorderColor] = useState<string>("#e1e1e1");
  const [fillColor, setFillColor] = useState<string>("#5F9EA0");

  const control: SimulationControl = {
    speed: speed,
    stop: stop,
    borderColor: borderColor,
    fillColor: fillColor,
  };

  return (
    <div className="relative left-20 flex flex-col rounded-lg w-4/5 m-4 bg-slate-400">
      <h1 className="bg-green-400 w-1/2 p-2 rounded">
        Conway&apos;s game of life
      </h1>
      <div>
        <div id="speedSlider" className="p-2 m-2 flex flex-row">
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
          <div className="border-white border-1 border-solid rounded p-2">
            <h2>Color</h2>
            <label htmlFor="borderColor" />
            <input
              type="color"
              id="borderColor"
              onChange={(e) => setBorderColor(e.target.value)}
              value={borderColor}
            />
            {/* <label htmlFor="fillColor" />
            <input
              type="color"
              id="fillColor"
              onChange={(e) => setFillColor(e.target.value)}
              value={fillColor}
            /> */}
          </div>
          <button
            onClick={() => {
              setData(defaultData);
            }}
            className="bg-green-600 p-2 rounded shadow"
          >
            Reset cells to defaults
          </button>
          <button
            onClick={() => {
              setStop(!stop);
              console.log(
                data.shapes,
              );
            }}
            className="rounded bg-slate-500 p-2 m-2"
          >
            START/STOP
          </button>
        </div>
        <details>
          <summary className="m-2">
            &#9881; Choose elements
          </summary>
          <Setup
            callback={(shapes: Shape[]) =>
              setData((data) => {
                return {
                  cells: data.cells,
                  shapes: shapes,
                };
              })}
            shapes={DEFAULT_SHAPES}
          />
        </details>
      </div>

      <Canvas
        draw={drawCells}
        data={data}
        options={canvasShape}
        control={control}
      />
    </div>
  );
}
