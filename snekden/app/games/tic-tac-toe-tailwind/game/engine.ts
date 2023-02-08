"use client";
import { CellContent, Move, TicCell, TicTacState } from "./types";

export function makeMove(
  move: Move,
  state: TicTacState
): { newState: TicTacState; failed: boolean; } {
  const cell = state.cells[move.x][move.y];
  if (cell.value !== "")
    return { newState: state, failed: true };
  // update the state
  state.cells[move.x][move.y] = { ...cell, value: move.value };
  // return new state
  return { newState: state, failed: false };
}

export function seeIfEnd(state: TicTacState): boolean {
  const lastCell: TicCell | undefined = state.cells.flat().find(c => c.value === '');
  return lastCell ? false:true;
}

const winningNumbers: number[][][] = [
  // rows
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  // cols
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  // diagonals
  [[0,0], [1,1], [2,2]],
  [[0,2], [1,1], [2,0]]
]

export function seeIfGivenWon(state: TicTacState, value: CellContent) {
  const cells: TicCell[] = state.cells.flat().filter(c => c.value === value);
  if (cells.length < 3) return false;

  const numberifiedCells: number[][] = cells.map(cell => [cell.x, cell.y]);

  const winningRow:number[][] | undefined =  winningNumbers.find(row => {
    const matches = row.every(coor => numberifiedCells.find(cell => coor[0] === cell[0] && cell[1] === coor[1]));
    // here it didn't work for the reason that return applied to the forEach, not big function
    return matches
  });
  return winningRow ? true : false;
}
