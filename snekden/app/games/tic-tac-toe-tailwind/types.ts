"use client";
export type TicTacState = {
  ended: boolean;
  message: EndMessage;
  cells: TicCell[][];
};
type EndMessage = "you won" | "ai won" | "draw";
export type TicCell = {
  x: number;
  y: number;
  value: CellContent;
};
export type CellContent = "x" | "o" | "";

export type Move = { value: CellContent; x: number; y: number };