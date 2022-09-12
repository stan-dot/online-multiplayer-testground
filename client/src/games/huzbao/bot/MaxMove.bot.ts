import { HuzbaoGameState, Move } from '../engine/types/boardTypes';
import { Direction, Line } from '../engine/types/Direction';
import { PlayerSignature } from '../engine/types/PlayerSignature';
import { getBestMove, getPossibleMoves } from './BotToolbox';
import { HuzbaoBot } from './HuzbaoBot';
import { MoveScorePair } from './MoveScorePair';

export default class MaxMoveBot extends HuzbaoBot {
  constructor(signature: PlayerSignature) {
    super(signature);
  }
  public chooseMove(state: HuzbaoGameState): Move {
    const possibleMoves: Move[] = getPossibleMoves(state);
    const movesWithGems: MoveScorePair[] = possibleMoves.map((m: Move) => {
      return { move: m, score: this.getMoveGemsTaken(state, m) };
    });
    return getBestMove(movesWithGems);
  }

  public getMoveGemsTaken(state: HuzbaoGameState, move: Move): number {}

}
