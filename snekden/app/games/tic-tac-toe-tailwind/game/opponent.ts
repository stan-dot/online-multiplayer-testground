"use client";
import { GameConfig, Move, TicCell, TicTacState } from "./types";

/**
 * here AI always plays the random variant
 * @param state
 */
function makeRandomMove(previousState: TicTacState): Move{
  const possibleCells: TicCell[] = previousState.cells.map((row) => row.filter((cell) => cell.value === "")
  ).flat();
  const chosenIndex: number = Math.floor(Math.random() * possibleCells.length);
  const cell = possibleCells[chosenIndex];
 return {
    value: "o",
    x: cell.x,
    y: cell.y,
  };
  // const { state } = makeMove(move, previousState);
  // return state;
}



export function makeAiMove(previousState: TicTacState, gameConfig: GameConfig):Move{
  // if (gameConfig.aiDifficultty === 'easy') return makeRandomMove(previousState);
  // if (gameConfig.aiDifficultty === 'easy') return makeRandomMove(previousState);
  return makeRandomMove(previousState);
}