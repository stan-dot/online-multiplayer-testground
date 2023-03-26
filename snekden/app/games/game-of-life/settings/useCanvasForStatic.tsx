"use client";
import { useEffect, useRef } from "react";
import { addShapeToGrid, Shape } from "../types/CellsCanvasData";

function getEmptyGrid(xSpan: number, ySpan: number): number[][] {
  const emptyGrid: number[][] = [];
  for (let i = 0; i < xSpan; i++) {
    const row: number[] = [];
    for (let j = 0; j < ySpan; j++) {
      row.push(0);
    }
    emptyGrid.push(row);
  }

  return emptyGrid;
}

export const useCanvasForStatic = (
  dimensions: number[],
  shape: Shape,
) => {
  const canvasRef = useRef({} as HTMLCanvasElement);
  useEffect(() => {
    console.log("running canvas for shape: ", shape);
    // display concerns
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx: CanvasRenderingContext2D = canvas!.getContext("2d")!;
    ctx.strokeStyle = "#e1e1e1";
    ctx.fillStyle = "cadetblue";
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // data concerns
    const grid = getEmptyGrid(dimensions[0], dimensions[1]);
    const cells = addShapeToGrid(grid, shape);

    cells.forEach((row, x) => {
      row.forEach((cell, y) => {
        ctx.beginPath();
        ctx.rect(x * 8, y * 8, 8, 8);
        cell ? ctx.fill : ctx.stroke();
      });
    });
  }, [dimensions, shape]);

  return canvasRef;
};
