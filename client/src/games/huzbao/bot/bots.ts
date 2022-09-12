import { PlayerSignature, PlayerType } from '../engine/types/PlayerSignature';
import { BotCaller } from './BotCaller';
import MaxMoveBot from './MaxMove.bot';
import PreventEnemyMoves from './PreventEnemyMoves.bot';

export const possibleBots: BotCaller[] = [
  {
    signature: {
      id: '1',
      name: 'maxGemsPerMoveBot',
      type: PlayerType.AI,
    },
    caller: (signature: PlayerSignature) => new MaxMoveBot(signature),
  },
  {
    signature: {
      id: '2',
      name: 'maxMovesPreventedBot',
      type: PlayerType.AI,
    },
    caller: (signature: PlayerSignature) => new PreventEnemyMoves(signature),
  },
];
