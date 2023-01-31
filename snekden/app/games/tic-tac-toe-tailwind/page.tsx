"use client";

import { useState } from "react";

type TicTacState = {
  ended: boolean;
  message: EndMessage;
  cells: TicCell[];
};

type EndMessage = "you won" | "ai won" | "draw";

type TicCell = {
  x: number;
  y: number;
  value: CellContent;
};

const name =
  "h-20 w-20 bg-cyan-600 m-3 grid flow-grid-row grid-rows-1 place-content-center ";

type CellContent = "x" | "o" | "";

function generateCells(size: number): TicCell[] {
  let cells: TicCell[] = [];
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      cells.push({ x: x, y: y, value: "" });
      // console.log(cells);
    }
  }
  return cells;
}

const defaultSize = 3;

const startingState: TicTacState = {
  ended: false,
  message: "draw",
  cells: generateCells(defaultSize),
};

/**
 * here AI always plays the random variant
 * @param state
 */
function makeRandomMove(previousState: TicTacState): TicTacState {
  const possibleCells: TicCell[] = previousState.cells.filter((c) =>
    c.value === ""
  );
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

type Move = { value: CellContent; x: number; y: number };

function makeMove(
  move: Move,
  state: TicTacState,
): { state: TicTacState; failed: boolean } {
  // check if the thing is free
  const index: number = state.cells.findIndex((c) =>
    c.x === move.x && c.y === c.y
  );
  if (index == -1) return { state, failed: true };
  const cell = state.cells[index];
  if (cell.value !== "") return { state, failed: true };
  // update the state
  state.cells[index] = { ...cell, value: move.value };
  // return new state
  return { state, failed: false };
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

  return (
    <div className="ml-96 w-fit h-96 m-10 p-4 grid grid-flow-col grid-cols-2  bg-cyan-800 shadow-lg">
      <GameWindow state={state} stateCallback={handleUserMove} active={userTurn} />
      <div id="scoreboard" className="bg-cyan-700">
        <h3 className="text-cyan-50">Player to go now:{userTurn ? 'you' : 'ai'}</h3>
        <div id="history">
          <ul>
            <li>
              here some past moves
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function GameWindow(props: { state: TicTacState, stateCallback: (state: TicTacState) => void; active: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <div>
      {/* <h4 style={{
        display: 'absolute',
        visibility: `${failed ? 'visible' : 'hidden'}`
      }} className="text-coral-400">
        You can&apos;t do that now
      </h4> */}
      <div className="animate-spin w-20 h-20 text-2xl p-0 m-0  visible" style={{ zIndex: props.active ? 20 : 10 }}>
        &#9203;
      </div>
      <div
        id="ticContainer"
        className=" w-fit h-fit relative m-4 grid gap-2 grid-rows-3 bg-cyan-900   grid-flow-col"
      >
        {props.state.cells.map((cell: TicCell, index: number) => {
          return (
            <button className={name} key={index}
              onClick={() => {
                const move: Move = {
                  value: "x",
                  x: cell.x,
                  y: cell.y
                };
                const { state, failed } = makeMove(move, props.state);
                if (failed) {
                  setFailed(true);
                } else {
                  props.stateCallback(state);
                  setFailed(false);
                }
              }}
            >
              <p className="text-4xl p-2 m-2 text-cyan-100">
                {cell.value}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
