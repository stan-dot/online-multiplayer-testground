import { Direction, Line } from '../engine/types/Direction';
import { HuzbaoGameState } from '../HuzbaoGameState';
import { Move } from '../engine/types/Move';



export abstract class HuzbaoBot {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  public chooseMove(state: HuzbaoGameState): Move {
    return {
      direction: Direction.L,
      line: Line.FRONT,
      index: 0
    };
  }
}
