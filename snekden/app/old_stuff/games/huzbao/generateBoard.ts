import { HalfBoard } from './engine/types/boardTypes';
import { BoardGeneratorVariant } from './types/BoardGeneratorVariant';

export function generateBoard(choice: BoardGeneratorVariant): HalfBoard {
  return {
    frontline: new Array(choice.front),
    backline: new Array(choice.back),
  };
}

/**
 * fill the back row with
 * todo add more use of options
 * @param boards
 */
export function fillBoardWithDefaults(
  boards: HalfBoard[],
  options: BoardGeneratorVariant,
): HalfBoard[] {
  return boards.map((board: HalfBoard) => {
    const half: number = Math.floor(
      board.frontline.length / options.fillFrontFieldsDivision,
    );
    return {
      frontline: board.frontline.map((v, i) =>
        i >= half ? options.amount : v,
      ),
      backline: new Array(board.backline.length).fill(options.amount),
    };
  });
}
