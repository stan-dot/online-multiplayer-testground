import { HalfBoard } from './engine/types/Move';
import { StartingOptions } from './StartingOptions';

function generateBoard(front: number, back: number): HalfBoard {
  return {
    frontline: new Array(front),
    backline: new Array(back)
  };
}
/**
 * fill the back row with
 * todo add more use of options
 * @param boards
 */
function fillBoardWithDefaults(boards: HalfBoard[], options: StartingOptions): HalfBoard[] {
  return boards.map((board: HalfBoard) => {
    const half: number = Math.floor(board.frontline.length / options.fillFrontFieldsDivision);
    return {
      frontline: board.frontline.map((v, i) => i >= half ? options.amount : v),
      backline: new Array(board.backline.length).fill(options.amount)
    };
  });

}
