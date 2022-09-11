export enum GameMode {
  RANKED,
  UNRANKED,
  BATTLE_ROYALE,
  AI,
  HOT_SEAT
}

export type HuzbaoSettings = {
  gameMode: GameMode;
};
