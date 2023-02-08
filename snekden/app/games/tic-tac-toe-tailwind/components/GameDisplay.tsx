"use client";
import { TicTacState, Move, TicCell } from "../game/types";
import { FinalDisplay } from "./FinalDisplay";
import { Square } from "./Square";

export function GameDisplay(
  props: {
    state: TicTacState;
    moveCallback: (move: Move) => void;
    active: boolean;
    resetCallback: () => void;
  }) {

  const buttonClickHandler = (cell: TicCell) => {
    const m: Move = {
      value: "x",
      x: cell.x,
      y: cell.y,
    };
    props.moveCallback(m);
  };

  return <div id="gameWindow">
    <div id="statusBar" className="flex flex-row h-20 m-2">
      <button
        id="resetButton"
        className="text-xl bg-cyan-400 p-2 mx-2 rounded-lg hover:text-white "
        onClick={props.resetCallback}
      >
        Reset game
      </button>
      <p className="text-xl bg-cyan-400 m-1 w-60 p-2 rounded-lg ">
        {/* {props.active ? "your move" : "waiting for opponent's move"} */}
        {props.state.message}
      </p>
    </div>
    <div
      id="ticContainer"
      className=" w-fit h-fit relative m-2 grid gap-2 grid-rows-3 bg-cyan-900   grid-flow-col"
      style={{ opacity: props.active ? 1 : 0.5 }}
    >
      {props.state.cells.flat().map((cell: TicCell, index: number) => (
        <Square buttonClickHandler={buttonClickHandler} cell={cell} key={index} />
      ))}
    </div>
  </div>;

}
