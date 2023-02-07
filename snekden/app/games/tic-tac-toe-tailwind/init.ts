"use client";
import { TicCell, TicTacState } from "./types";

// todo need to randomize who starts
export const buttonName = "h-20 w-20 bg-cyan-600 m-3 grid flow-grid-row grid-rows-1 place-content-center ";
const defaultSize = 3;
export const startingState: TicTacState = {
  ended: false,
  message: "draw",
  cells: generateCells(defaultSize),
};
function generateCells(size: number): TicCell[][] {
  let cells: TicCell[][] = [];
  for (let x = 0; x < size; x++) {
    const newRow: TicCell[] = [];
    for (let y = 0; y < size; y++) {
      newRow.push({ x: x, y: y, value: "" });
    }
    cells.push(newRow);
  }
  return cells;
}
