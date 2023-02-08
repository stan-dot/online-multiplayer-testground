"use client";
import { GameConfig, TicCell, TicTacState } from "./types";

const defaultSize = 3;

const startingPlayer = () => {
  return Math.floor(Math.random() * 2) > 1 ? true : false
}

export const initGameConfig:GameConfig = {
  aiDifficultty: "easy"
};

export const startingState: TicTacState = {
  ended:true,
  message: "draw",
  userTurn:startingPlayer(),
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
