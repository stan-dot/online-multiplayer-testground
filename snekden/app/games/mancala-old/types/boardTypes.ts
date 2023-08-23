export type Direction = "L" | "R";

export type Line = "FRONT" | "BACK";

export type HalfBoard = {
  frontline: number[];
  backline: number[];
};
export type GameStats = {
  movesDone: number;
  takenGems: number;
  roundCounter: number;
  startingTime: number;
};
export type Move = {
  direction: Direction;
  line: Line;
  index: number;
};

export type MancalaGameState = {
  ownBoard: HalfBoard;
  opponentBoard: HalfBoard;
  stats: GameStats;
};
