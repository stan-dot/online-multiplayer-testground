import { HuzbaoGameState, Move } from '../engine/types/boardTypes';
import { Direction, Line } from '../engine/types/Direction';
import { MoveScorePair } from './MoveScorePair';

// todo fix this
export function getPossibleMoves(state: HuzbaoGameState): Move[] {
  const move: Move = {
    direction: Direction.L,
    line: Line.FRONT,
    index: 0,
  };
  return [move];
}

// todo fix
export function getBestMove(options: MoveScorePair[]): Move {
  const move: Move = {
    direction: Direction.L,
    line: Line.FRONT,
    index: 0,
  };
  return move;
}
