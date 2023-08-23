import { MancalaGameState, Move } from '../types/boardTypes';
import { MoveScorePair } from './MoveScorePair';

export function getPossibleMoves(state: MancalaGameState): Move[] {
  const move: Move = {
    index: 0,
    direction: 'L',
    line: 'FRONT'
  };
  return [move];
}

export function getBestMove(options: MoveScorePair[]): Move {
  const move: Move = {
    direction:"L",
    line:"FRONT",
    index: 0,
  };
  return move;
}
