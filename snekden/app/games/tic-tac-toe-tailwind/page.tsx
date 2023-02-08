"use client";

import { useState } from "react";
import { FinalDisplay } from "./components/FinalDisplay";
import { GameDisplay } from "./components/GameDisplay";
import { makeMove, seeIfEnd, seeIfWon } from "./game/engine";
import { initGameConfig, startingState } from "./game/init";
import { makeAiMove } from "./game/opponent";
import { CellContent, Move } from "./game/types";

export default function TicTacToe() {
  const [state, setState] = useState(startingState);

  const handleUserMove = (move: Move) => {
    // apply user move
    const { newState, failed } = makeMove(move, state);
    if (failed) {
      endCallback();
    } else {
      setState((state) => ({
        ...newState,
        userTurn: false,
        message: "waiting for opponent's move",
      }));
      console.log("now use should not interact");
    }
    if (seeIfEnd(state)) {
      endCallback();
    }
    // do the AI move
    setTimeout(() => {
      const aiMove: Move = makeAiMove(state, initGameConfig);
      const { newState, failed } = makeMove(aiMove, state);
      if (failed) {
        console.log("move failed");
        endCallback();
      } else {
        setState((state) => ({
          ...newState,
          userTurn: true,
          message: "your move",
        }));
        console.log("user can interact now");
      }
    }, 6000);
  };

  const handleReset = () => {
    setState(startingState);
  };

  const endCallback = () => {
    setState((state) => ({ ...state, ended: true }));
    const userToken: CellContent = "x";
    const aiToken: CellContent = "o";
    const userWon: boolean = seeIfWon(state, userToken);
    if (userWon) {
      setState((state) => ({ ...state, message: "you won" }));
    } else {
      setState((state) => ({ ...state, message: "ai won" }));
    }
  };

  return (
    <div className="ml-96 w-fit h-fit m-10 p-4 grid grid-flow-col grid-cols-2  bg-cyan-800 shadow-lg  max-w-4cl min-h-screen">
      {/* <FinalDisplay gameState={state} /> */}
      <GameDisplay
        state={state}
        moveCallback={handleUserMove}
        active={state.userTurn}
        resetCallback={handleReset}
      />
    </div>
  );
}
