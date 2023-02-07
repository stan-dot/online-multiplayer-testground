"use client";

import { useState } from "react";
import { FinalDisplay } from "./components/FinalDisplay";
import { GameDisplay } from "./components/GameDisplay";
import { makeMove } from "./game/engine";
import { initGameConfig, startingState } from "./game/init";
import { makeAiMove } from "./game/opponent";
import { Move } from "./game/types";


export default function TicTacToe() {
  const [state, setState] = useState(startingState);

  const handleUserMove = (move: Move) => {
    const { newState, failed } = makeMove(move, state);
    if (failed) {
      endCallback();
    } else {
      setState(state => ({ ...newState, userTurn: true }));
    }
    // todo here check if need to do that
    setState(state => ({ ...newState, userTurn: false }));
    setTimeout(() => {
      const aiMove: Move = makeAiMove(state, initGameConfig);
      const { newState, failed } = makeMove(aiMove, state);
      if (failed) {
        endCallback();
      } else {
        setState(state => ({ ...newState, userTurn: true }));
      }
    }, 1000);
  };

  const handleReset = () => {
    setState(startingState);
  }

  const endCallback = () => {
    setState(state => ({ ...state, ended: true }));
    // todo ensure this triggers the final display

  }

  return <div className="ml-96 w-fit h-fit m-10 p-4 grid grid-flow-col grid-cols-2  bg-cyan-800 shadow-lg  max-w-4cl min-h-screen">
    <FinalDisplay gameState={state} />
    <GameDisplay
      state={state}
      moveCallback={handleUserMove}
      active={state.userTurn}
      resetCallback={handleReset}
    />
  </div>
}



