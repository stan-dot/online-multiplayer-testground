"use client";
import { getExpanse } from "../types/CellsCanvasData";
import { EditableShapeProps } from "./ConfigLineProps";
import { useCanvasForStatic } from "./useCanvasForStatic";

const SIZE_MULTIPLIER: number = 0.3;

export function EditableShape(
  { shape, deleteCallback, changeStartingPointCallback }: EditableShapeProps,
): JSX.Element {
  const expanse: number[] = getExpanse(shape);
  // console.log('expanse:', expanse, 'for shape:', shape.name);

  const staticCanvasRef = useCanvasForStatic(expanse, shape);

  return (
    <div className="flex flex-col p-2 m-4 border-3 border-solid  ">
      <div className="flex flex-row p-2 m-2 justify-between">
        <p className="p-2">
          {shape.name}
        </p>
        <div id="startingpoint">
          <p>Select starting point</p>
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
        </div>
        <button
          onClick={deleteCallback}
          className="bg-slate-600 rounded shadow-md p-2"
        >
          &#128465; delete
        </button>
      </div>
      <div
        id="canvasPreview"
        className="border-1 border-solid border-red-500 bg-red-400"
        style={{
          width: SIZE_MULTIPLIER * expanse[0],
          height: SIZE_MULTIPLIER * expanse[0],
        }}
      >
        {/* <p>above the canvas</p> */}
        <canvas
          width={ expanse[0]}
          height={ expanse[1]}
          ref={staticCanvasRef}
        />
        {/* <p>below the canvas</p> */}
      </div>
    </div>
  );
}
