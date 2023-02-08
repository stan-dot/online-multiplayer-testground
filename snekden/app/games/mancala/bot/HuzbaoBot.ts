import { MancalaGameState, Move } from '../types/boardTypes';


export abstract class HuzbaoBot {
  public playerSignature:string;

  constructor(signature:string) {
    this.playerSignature = signature;
  }

  public chooseMove(state: MancalaGameState): Move {
    return {
      direction:"L",
      line:"FRONT",
      index: 0
    };
  }
}
