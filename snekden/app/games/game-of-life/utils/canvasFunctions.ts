import { SideEffectCanvasFunction } from "../types/drawingTypes";

export const postdraw: SideEffectCanvasFunction = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void => {
  context.restore();
};

export const predraw: SideEffectCanvasFunction = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void => {
  context.save();
  resizeCanvas(canvas, context);
  const { width, height } = context.canvas;
  context.clearRect(0, 0, width, height);
};

function resizeCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): boolean {
  const { width, height } = canvas.getBoundingClientRect();
  if (canvas.width !== width || canvas.height !== height) {
    const { devicePixelRatio: ratio = 1 } = window;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.scale(ratio, ratio);
    return true;
  }
  return false;
}

export function drawCells(ctx: CanvasRenderingContext2D, cells: number[][]): void {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  cells.forEach((row, x) => {
    row.forEach((cell, y) => {
      ctx.beginPath();
      ctx.rect(x * 8, y * 8, 8, 8);
      cell ? ctx.fill : ctx.stroke();
    });
  });
}
