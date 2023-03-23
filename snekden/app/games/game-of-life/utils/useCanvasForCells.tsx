import { useEffect, useRef } from "react";
import { CellsCanvasData } from "../types/CellsCanvasData";
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
    ctx.strokeStyle = "#e1e1e1";
    ctx.fillStyle = "cadetblue";

    // data
    let cells: number[][] = data.cells;

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
  }, [control.speed, control.stop, data.cells, draw]);

  return canvasRef;
};
