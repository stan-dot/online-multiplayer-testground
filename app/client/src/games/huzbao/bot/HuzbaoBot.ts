import { Direction, Line } from '../engine/types/Direction';
import { HuzbaoGameState, Move } from '../engine/types/boardTypes';
import { PlayerSignature } from '../engine/types/PlayerSignature';


export abstract class HuzbaoBot {
  public playerSignature: PlayerSignature;

  constructor(signature: PlayerSignature) {
    this.playerSignature = signature;
  }

  public chooseMove(state: HuzbaoGameState): Move {
    return {
      direction: Direction.L,
      line: Line.FRONT,
      index: 0
    };
  }
}
