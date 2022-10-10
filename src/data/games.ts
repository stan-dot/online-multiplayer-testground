import { GameCard } from '../types/GameCard';

export const availableGames: GameCard[] = [
  {
    folder: 'react-konva-playground',
    componentName: 'KonvaDisplay',
  },
  {
    folder: 'canvas-interactive',
    componentName: 'CanvasInteractive',
  },
  {
    folder: 'cat-facts',
    componentName: 'CatFacts',
  },
  {
    folder: 'raw-canvas',
    componentName: 'CanvasGame',
  },
  {
    folder: 'webgl-test',
    componentName: 'WebGlTest',
  },
  {
    folder: 'eliza',
    componentName: 'Eliza',
  },

  {
    folder: 'huzbao',
    componentName: 'Huzbao',
  },
  {
    folder: 'game-of-life',
    componentName: 'ConwaysGame',
  },
  // {
  //   folder: 'minesweeper',
  //   componentName: 'Minesweeper',
  // },
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
