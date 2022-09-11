import { Direction, Line } from "./Direction";

export type HalfBoard = {
  frontline: number[];
  backline: number[];
};
export type GameStats = {
  movesDone: number;
  takenGems: number;
  roundCounter: number;
};
export type Move = {
  direction: Direction;
  line: Line;
  index: number;
};

export type HuzbaoGameState = {
  boards: HalfBoard[];
  stats: GameStats;
};
