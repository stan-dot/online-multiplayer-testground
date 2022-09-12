import { HuzbaoGameState, Move } from '../engine/types/boardTypes';
import { Direction, Line } from '../engine/types/Direction';
import { PlayerSignature } from '../engine/types/PlayerSignature';
import { getBestMove, getPossibleMoves } from './BotToolbox';
import { HuzbaoBot } from './HuzbaoBot';
import { MoveScorePair } from './MoveScorePair';

export default class PreventEnemyMoves extends HuzbaoBot {
  constructor(signature: PlayerSignature) {
    super(signature);
  }
  
  public chooseMove(state: HuzbaoGameState): Move {
    const possibleMoves: Move[] = getPossibleMoves(state);
    const movesWithGems: MoveScorePair[] = possibleMoves.map((m: Move) => {
      return { move: m, score: this.getMoveReduction(state, m) };
    });
    return getBestMove(movesWithGems);
  }

  public getMoveReduction(state: HuzbaoGameState, move: Move): number {}
}
