"use client";
import { getExpanse } from "../types/CellsCanvasData";
import { ConfigLineProps } from "./ConfigLineProps";
import { useCanvasForStatic } from "./useCanvasForStatic";

export function ExampleLine(
  { s, deleteCallback }: ConfigLineProps,
): JSX.Element {
  const staticCanvasRef = useCanvasForStatic([s]);
  const expanse: number[] = getExpanse(s);
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
