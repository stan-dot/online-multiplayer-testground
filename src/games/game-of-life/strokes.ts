export function draw(ctx: CanvasRenderingContext2D, cells: number[][]): void {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  cells.forEach((row, x) => {
    row.forEach((cell, y) => {
      ctx.beginPath();
      ctx.rect(x * 8, y * 8, 8, 8);
      if (cell) {
        ctx.fill();
      } else {
        ctx.stroke();
      }
    });
  });
}
