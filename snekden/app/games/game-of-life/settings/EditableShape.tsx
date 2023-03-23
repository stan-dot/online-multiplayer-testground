"use client";
import { useState } from "react";
import { getExpanse } from "../types/CellsCanvasData";
import { EditableShapeProps } from "./ConfigLineProps";
import { useCanvasForStatic } from "./useCanvasForStatic";

export function EditableShape(
  { shape, deleteCallback, changeStartingPointCallback }: EditableShapeProps,
): JSX.Element {
  const staticCanvasRef = useCanvasForStatic([shape]);
  const expanse: number[] = getExpanse(shape);
  // console.log(expanse);

  return (
    <div className="flex flex-row p-2 m-2 justify-between">
      <p>
        {shape.name}
      </p>
      <input
        type="number"
        min={0}
        max={100}
        id="xAxis"
        value={shape.startingPoint[0]}
        onChange={(e) => {
          changeStartingPointCallback([
            parseInt(e.target.value),
            shape.startingPoint[1],
          ]);
        }}
      />
      <input
        type="number"
        min={0}
        max={100}
        id="yAxis"
        value={shape.startingPoint[1]}
        onChange={(e) => {
          changeStartingPointCallback([
            shape.startingPoint[0],
            parseInt(e.target.value),
          ]);
        }}
      />
      <div
        id="canvasPreview"
        className="border-1 border-solid border-red-500"
        style={{ width: expanse[1], height: expanse[0] }}
      >
        <canvas height={expanse[0]} width={expanse[1]} ref={staticCanvasRef} />
      </div>
      <button onClick={deleteCallback}>
        &#128465; delete
      </button>
    </div>
  );
}
