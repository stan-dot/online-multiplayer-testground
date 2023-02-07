"use client";

import { useEffect, useState } from "react";
import { startingState } from "./init";
import { Square } from "./Square";
import { Move, TicCell, TicTacState } from "./types";
/**
 * here AI always plays the random variant
 * @param state
 */
function makeRandomMove(previousState: TicTacState): TicTacState {
  const possibleCells: TicCell[] = previousState.cells.map((row) =>
    row.filter((cell) => cell.value === "")
  ).flat();
  const chosenIndex: number = Math.floor(Math.random() * possibleCells.length);
  const cell = possibleCells[chosenIndex];
  const move: Move = {
    value: "o",
    x: cell.x,
    y: cell.y,
  };
  const { state } = makeMove(move, previousState);
  return state;
}

function makeMove(
  move: Move,
  state: TicTacState,
): { state: TicTacState; failed: boolean } {
  // check if the thing is free
  // const index: number = state.cells[move.x][move.y];
  // if (index == -1) return { state, failed: true };
  // const cell = state.cells[index];
  const cell = state.cells[move.x][move.y];
  if (cell.value !== "") return { state, failed: true };
  // update the state
  state.cells[move.x][move.y] = { ...cell, value: move.value };
  // return new state
  return { state, failed: false };
}


function seeIfEnd(state: TicTacState) {
  

}

export default function TicTacToe() {
  const [state, setState] = useState(startingState);
  const [userTurn, setUserTurn] = useState(true);

  const handleUserMove: (state: TicTacState) => void = (state: TicTacState) => {
    setState(state);
    setUserTurn(false);
    setTimeout(() => {
      const aiNewState: TicTacState = makeRandomMove(state);
      setState(aiNewState);
      setUserTurn(true);
    }, 1000);
  };


  const handleReset = () => {
    setState(startingState);
  }

  return (
    <div className="ml-96 w-fit h-fit m-10 p-4 grid grid-flow-col grid-cols-2  bg-cyan-800 shadow-lg">
      <GameWindow
        state={state}
        stateCallback={handleUserMove}
        active={userTurn}
        resetCallback={handleReset}
      />
      {
        /* <div id="scoreboard" className="bg-cyan-700">
        <h3 className="text-cyan-50">Player to go now:{userTurn ? 'you' : 'ai'}</h3>
        <div id="history">
          <ul>
            <li>
              here some past moves
            </li>
          </ul>
        </div>
      </div> */
      }
    </div>
  );
}

function GameWindow(
  props: {
    state: TicTacState;
    stateCallback: (state: TicTacState) => void;
    active: boolean;
    resetCallback: () => void;
  },
) {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    props.resetCallback();

  }, [failed, props])


  function buttonClickHandler(cell: TicCell) {
    return () => {
      console.log("x, y :", cell.x, cell.y);
      const move: Move = {
        value: "x",
        x: cell.x,
        y: cell.y,
      };
      const { state, failed } = makeMove(move, props.state);
      if (failed) {
        setFailed(true);
      } else {
        props.stateCallback(state);
        setFailed(false);
      }
    };
  }

  return <div >
    <div id="status" className="flex flex-row">
      <button
        id="resetButton"
        className="text-xl bg-cyan-700 p-2 m-2 rounded-lg h-20"
        onClick={props.resetCallback}
      >
        Reset game
      </button>
      <p className="text-xl bg-cyan-700 m-1  h-20 w-40">
        {props.active ? "your move" : "waiting for opponent's move"}
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
  </div>

}


