import { GameCard } from "../types/GameCard";

export const availableGames: GameCard[] = [
  {
    folder: 'cat-facts',
    componentName: 'CatFacts'
  },
  // {
  //   folder: 'eliza',
  //   componentName: 'Eliza',
  // },
  // {
  //   folder: 'minesweeper',
  //   componentName: 'Minesweeper',
  // },
  {
    folder: 'raw-canvas',
    componentName: 'CanvasGame',
  },
  {
    folder: 'snake',
    componentName: 'SnakeGame',
    options: {
      usesCanvas: true,
      usesSockets: true
    }
  },
  // {
  //   folder: 'tictactoe',
  //   componentName: 'TicTacToe',
  // },
];