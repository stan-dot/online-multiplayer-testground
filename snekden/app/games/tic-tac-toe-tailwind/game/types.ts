"use client";

export type TicTacState = {
  // ended: boolean;
  // message: Message;
  // userTurn: boolean;
  cells: TicCell[][];
};

export type Message = "you won" | "ai won" | "your move" | "waiting for opponent's move" | "draw";

export type TicCell = {
  x: number;
  y: number;
  value: CellContent;
};
export type CellContent = "x" | "o" | "";

export type Move = { value: CellContent; x: number; y: number };

export type AiDifficulty = 'easy' | 'medium' | 'hard';


export type GameConfig = {
  aiDifficultty: AiDifficulty,
}