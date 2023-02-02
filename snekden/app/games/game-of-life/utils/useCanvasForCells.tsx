import { useEffect, useRef } from 'react';
import { CellsCanvasData } from '../types/CellsCanvasData';
import { DrawingConstantWithCells } from '../types/drawingTypes';
import { getUpdatedGrid } from './gridUpdateFunction';

const DEFAULT_TIME_PERIOD = 20;

export const useCanvasForCells = (
  draw: DrawingConstantWithCells,
  data: CellsCanvasData,
) => {
  const canvasRef = useRef({} as HTMLCanvasElement);
  useEffect(() => {
    // display concerns
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx: CanvasRenderingContext2D = canvas!.getContext('2d')!;
    ctx.strokeStyle = '#e1e1e1';
    ctx.fillStyle = 'cadetblue';

    // data 
    let cells: number[][] = data.cells;

    // animation
    let frameCount = 0;
    let animationFrameId = 0;

    const render = () => {
      frameCount++;
      if (frameCount > DEFAULT_TIME_PERIOD) {
        cells = getUpdatedGrid(cells);
        draw(ctx, cells);
        frameCount = 0
      }
      animationFrameId = window.requestAnimationFrame(render);
    }
    render();
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [data.cells, draw]);

  return canvasRef;
};
