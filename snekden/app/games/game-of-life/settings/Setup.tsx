"use client";
import { useEffect, useRef, useState } from "react";
import { CellsCanvasData, getExpanse, Shape } from "../types/CellsCanvasData";
import { getUpdatedGrid } from "../utils/gridUpdateFunction";
import { useCanvasForCells } from "../utils/useCanvasForCells";

const DEFAULT_SHAPES: Shape[] = [];
// todo possibly add name to the shape

const useCanvasForStatic = (
  shapes: Shape[],
) => {
  const canvasRef = useRef({} as HTMLCanvasElement);
  useEffect(() => {
    // display concerns
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx: CanvasRenderingContext2D = canvas!.getContext("2d")!;
    ctx.strokeStyle = "#e1e1e1";
    ctx.fillStyle = "cadetblue";
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // let cells: number[][] = data.cells;

    shapes.forEach((shape) => {
      shape.internalCells.forEach((row, x) => {
        row.forEach((cell, y) => {
          ctx.beginPath();
          ctx.rect(x * 8, y * 8, 8, 8);
          cell ? ctx.fill : ctx.stroke();
        });
      });
    });
  }, [shapes]);

  return canvasRef;
};

const availableShapes: Shape[] = [];

const emptyShape: Shape = {
  startingPoint: [0, 0],
  internalCells: [],
};

export function Setup(
  props: { callback: (shapes: Shape[]) => void; cancelCallback: () => void },
) {
  const [shapes, setShapes] = useState<Shape[]>(DEFAULT_SHAPES);

  const newShapeCallback = (newShape: Shape) => {
    setShapes((existing) => {
      return [...existing, newShape];
    });
  };
  return (
    <div id="setup">
      {/* a list of shapes and introduction to a starting point for each */}
      {shapes.map((s, i) => <ExampleLine key={i} s={s} />)}
      <AddNewShape addCallback={newShapeCallback} />
      <div>
        <button onClick={() => props.callback(shapes)}>
          Submit
        </button>
        <button onClick={props.cancelCallback}>
          Cancel
        </button>
      </div>
    </div>
  );
}

type ConfigLineProps = {
  deleteCallback?: () => void;
  changeStartingPointCallback?: (newStartingPoint: number[]) => void;
  s: Shape;
};

function AddNewShape(props: { addCallback: (newShape: Shape) => void }) {
  const [newShape, setNewShape] = useState<Shape>(emptyShape);
  // todo choose one of available shape names, if input not found there say error disallow submit
  return (
    <div id="addNewShape">
      <label htmlFor="ice-cream-choice">Choose a flavor:</label>
      <input
        list="ice-cream-flavors"
        id="ice-cream-choice"
        name="ice-cream-choice"
      />

      <datalist id="ice-cream-flavors">
        <option value="Chocolate" />
        <option value="Coconut" />
        <option value="Mint" />
        <option value="Strawberry" />
        <option value="Vanilla" />
      </datalist>

      <button
        onClick={() => {
          props.addCallback(newShape);
          setNewShape(emptyShape);
        }}
      >
        Add new shape
      </button>
    </div>
  );
}

function ExampleLine({ s, deleteCallback }: ConfigLineProps): JSX.Element {
  const staticCanvasRef = useCanvasForStatic([s]);
  const expanse = getExpanse(s);
  return (
    <div className="flex flex-row p-2 m-2 ">
      <p>
        {s.startingPoint}
      </p>
      <input type="number" min={0} max={100} id="xAxis" />
      <input type="number" min={0} max={100} id="yAxis" />
      <div id="canvasPreview">
        <canvas height={expanse[0]} width={expanse[1]} ref={staticCanvasRef} />
      </div>
      <button onClick={deleteCallback}>
        delete shape
      </button>
    </div>
  );
}
