import { MancalaGameState, Move } from '../types/boardTypes';
import { getBestMove, getPossibleMoves } from './BotToolbox';
import { HuzbaoBot } from './HuzbaoBot';
import { MoveScorePair } from './MoveScorePair';

export default class MaxMoveBot extends HuzbaoBot {
  constructor(signature:string) {
    super(signature);
  }
  public chooseMove(state: MancalaGameState): Move {
    const possibleMoves: Move[] = getPossibleMoves(state);
    const movesWithGems: MoveScorePair[] = possibleMoves.map((m: Move) => {
      return { move: m, score: this.getMoveGemsTaken(state, m) };
    });
    return getBestMove(movesWithGems);
  }

  // todo fix this
  public getMoveGemsTaken(state: MancalaGameState, move: Move): number {
    return 1;
  }

}
