"use client";
import { useEffect, useRef } from "react";
import { Shape } from "../types/CellsCanvasData";

// todo add name to the shape
export const useCanvasForStatic = (
  shapes: Shape[],
) => {
  const canvasRef = useRef({} as HTMLCanvasElement);
  useEffect(() => {
    // display concerns
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx: CanvasRenderingContext2D = canvas!.getContext("2d")!;
    ctx.strokeStyle = "#e1e1e1";
    ctx.fillStyle = "cadetblue";
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // let cells: number[][] = data.cells;
    shapes.forEach((shape) => {
      shape.internalCells.forEach((row, x) => {
        row.forEach((cell, y) => {
          ctx.beginPath();
          ctx.rect(x * 8, y * 8, 8, 8);
          cell ? ctx.fill : ctx.stroke();
        });
      });
    });
  }, [shapes]);

  return canvasRef;
};
