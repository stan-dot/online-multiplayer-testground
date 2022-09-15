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
    // const render = () => draw(ctx, data.cells);
    setTimeout(() => {
      cells = getUpdatedGrid(cells)
      draw(ctx, cells);
      console.log('drawgin the new bit');
    }, DEFAULT_TIME_PERIOD);
    // render();
  }, [draw]);

  return canvasRef;
};
