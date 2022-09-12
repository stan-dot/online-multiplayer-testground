import { PlayerSignature, PlayerType } from './engine/types/PlayerSignature';
import { BoardGeneratorVariant } from './types/BoardGeneratorVariant';
import { GameMode, LauncherSettings } from './types/settings';

export const INITIAL_SETTINGS: LauncherSettings = {
  gameMode: GameMode.AI,
  gameIsOn: false,
};

export const DEFAULT_BOARD_GENERATION: BoardGeneratorVariant = {
  name: 'standard',
  front: 8,
  back: 8,
  fillFrontFieldsDivision: 2,
  fullBack: true,
  amount: 2,
};

export const DEFAULT_OPPONENT: PlayerSignature = {
  name: 'Standard AI',
  id: '323',
  type: PlayerType.AI
};