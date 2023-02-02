import { Direction, Line } from '../engine/types/Direction';
import { MancalaGameState, Move } from '../types/boardTypes';
import { PlayerSignature } from '../engine/types/PlayerSignature';


export abstract class HuzbaoBot {
  public playerSignature: PlayerSignature;

  constructor(signature: PlayerSignature) {
    this.playerSignature = signature;
  }

  public chooseMove(state: MancalaGameState): Move {
    return {
      direction: Direction.L,
      line: Line.FRONT,
      index: 0
    };
  }
}
