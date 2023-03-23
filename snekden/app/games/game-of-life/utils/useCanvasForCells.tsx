import { useEffect, useRef } from "react";
import { CellsCanvasData, prepareCells } from "../types/CellsCanvasData";
import { DrawingConstantWithCells } from "../types/drawingTypes";
import { SimulationControl } from "../types/SimulationControl";
import { getUpdatedGrid } from "./gridUpdateFunction";

const DISTANCE = 20;

export const useCanvasForCells = (
  draw: DrawingConstantWithCells,
  data: CellsCanvasData,
  control: SimulationControl,
) => {
  const canvasRef = useRef({} as HTMLCanvasElement);
  useEffect(() => {
    // display concerns
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx: CanvasRenderingContext2D = canvas!.getContext("2d")!;
    ctx.strokeStyle = control.borderColor;
    ctx.fillStyle = control.fillColor;

    console.log(data.cells);
    // data
    let cells: number[][] = [
      ...data.cells,
      // ...data.shapes.map(prepareCells).flat(1),
    ];

    console.log('cells: ', cells);
    // animation
    let frameCount = 0;
    let animationFrameId = 0;

    const render = () => {
      if (control.stop) return;
      frameCount++;
      const change = DISTANCE / control.speed;
      if (frameCount > change) {
        cells = getUpdatedGrid(cells);
        draw(ctx, cells);
        frameCount = 0;
      }
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [
    control.borderColor,
    control.fillColor,
    control.speed,
    control.stop,
    data.cells,
    data.shapes,
    draw,
  ]);

  return canvasRef;
};
