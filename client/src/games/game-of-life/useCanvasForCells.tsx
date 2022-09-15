import { useEffect, useRef } from 'react';
import { CellsCanvasData } from './CellsCanvasData';
import { DEFAULT_TIME_PERIOD } from './constants/defaults';
import { DrawingConstantWithCells } from './types/drawingTypes';
import { getUpdatedGrid } from './utils/checkIfSurvives';

export const useCanvasForCells = (
  draw: DrawingConstantWithCells,
  data: CellsCanvasData,
) => {
  const canvasRef = useRef({} as HTMLCanvasElement);
  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx: CanvasRenderingContext2D = canvas!.getContext('2d')!;
    ctx.strokeStyle = '#e1e1e1';
    ctx.fillStyle = 'cadetblue';
    let cells: number[][] = data.cells;
    let frameCount = 0;
    let animationFrameId = 0;
    const render = () => {
      frameCount++;
      // todo change to seconds based approach
      if (frameCount > DEFAULT_TIME_PERIOD) {
        cells = getUpdatedGrid(cells);
        draw(ctx, cells);
        frameCount = 0
      }
      animationFrameId = window.requestAnimationFrame(render);
    }
    render();
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    }
  }, [draw]);

  return canvasRef;
};
