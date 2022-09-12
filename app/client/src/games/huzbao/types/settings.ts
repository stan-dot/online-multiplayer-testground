export enum GameMode {
  RANKED,
  UNRANKED,
  BATTLE_ROYALE,
  AI,
  HOT_SEAT,
  AI_BATTLE,
}

export type LauncherSettings = {
  gameMode: GameMode;
  gameIsOn: boolean;
};
