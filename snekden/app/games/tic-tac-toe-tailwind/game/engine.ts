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
  console.log('checking if end');
  const lastCell: TicCell | undefined = state.cells.flat().find(c => c.value === '');
  return lastCell ? false:true;
}

export function seeIfGivenWon(state: TicTacState, value: CellContent) {
  const cells: TicCell[] = state.cells.flat().filter(c => c.value === value);
  if (cells.length < 3) return false;
  // check rows
  state.cells.forEach((row: TicCell[]) => {
    if (row.every(c => c.value === value))
      return true;
  });
  // check cols
  state.cells.forEach((row: TicCell[]) => {
    if (row.every(c => c.value === value))
      return true;
  });

  // check diagonals
  // const length = state.cells.length;
  // let downward = false;
  // for (let i = 0; i < length; i++) {
  //   if (state.cells[i][i].value === value) {
  //     downward = true;
  //   } else {
  //     downward = false;
  //     break;
  //   }
  // }
  // if (downward) {
  //   return true;
  // }

  // let leftWard = false;
  // for (let i = 0; i < length; i++) {
  //   console.log(state.cells);
  //   console.log('could be undefined', state.cells[length - 1][i]);
  //   const r = state.cells[length - i];
  //   const c = r[i];
  //   const v = c.value;
  //   if (v === value) {
  //     leftWard = true;
  //   } else {
  //     leftWard = false;
  //     break;
  //   }
  // }

  // if (leftWard) {
  //   return true;
  // }
  return false;
}
