import { MancalaGameState, Move } from '../types/boardTypes';
import { getBestMove, getPossibleMoves } from './BotToolbox';
import { HuzbaoBot } from './HuzbaoBot';
import { MoveScorePair } from './MoveScorePair';

export default class PreventEnemyMoves extends HuzbaoBot {
  constructor(signature:string) {
    super(signature);
  }
  
  public chooseMove(state: MancalaGameState): Move {
    const possibleMoves: Move[] = getPossibleMoves(state);
    const movesWithGems: MoveScorePair[] = possibleMoves.map((m: Move) => {
      return { move: m, score: this.getMoveReduction(state, m) };
    });
    return getBestMove(movesWithGems);
  }

  // todo clear this
  public getMoveReduction(state: MancalaGameState, move: Move): number {
    return 1;
  }
}
