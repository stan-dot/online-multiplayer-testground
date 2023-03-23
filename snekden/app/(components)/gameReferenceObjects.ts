type GameReferenceObject = {
  name: string;
  relativeLink: string;
  invisible?: boolean;
};
export const gameReferenceObjects: GameReferenceObject[] = [
  {
    name: "Royal Game of Ur",
    relativeLink: "royal-game-of-ur",
    invisible: true,
  },
  {
    name: "Conway's game of life",
    relativeLink: "game-of-life",
  },
  {
    name: "Mancala",
    relativeLink: "mancala",
    invisible: true,
  },
  {
    name: "TicTacToe",
    relativeLink: "tic-tac-toe-tailwind",
  },
  {
    name: "Minesweeper",
    relativeLink: "minesweeper",
    invisible: true,
  },
];
