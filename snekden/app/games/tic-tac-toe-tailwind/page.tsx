"use client";

import { useEffect, useState } from "react";
import { FinalDisplay } from "./components/FinalDisplay";
import { GameDisplay } from "./components/GameDisplay";
import { makeMove, seeIfEnd, seeIfWon } from "./game/engine";
import { initGameConfig, getStartingState } from "./game/init";
import { makeAiMove } from "./game/opponent";
import { CellContent, Move } from "./game/types";

export default function TicTacToe() {
  const [state, setState] = useState(getStartingState());
  const [userTurn, setUserTurn] = useState(state.userTurn);
  useEffect(() => {
    if (!state.userTurn && !state.ended) {
      aiMove();
    }
  }, [aiMove, state]);

  const handleUserMove = (move: Move) => {
    // apply user move
    const { newState, failed } = makeMove(move, state);
    if (failed) {
      console.log("user move failed");
      endCallback();
    } else {
      setUserTurn(false);
      setState((state) => ({
        ...newState,
        userTurn: false,
        message: "waiting for opponent's move",
      }));
      console.log("now use should not interact");
    }

    if (seeIfEnd(state)) {
      console.log('game finished');
      endCallback();
    } else {
      // do the AI move
      // aiMove();
    }
  };

  const handleReset = () => {
    const newState = getStartingState();
    setState(newState);
    if (!state.userTurn && !state.ended) {
      aiMove();
    }
  };

  const endCallback = () => {
    setState((state) => ({ ...state, ended: true }));
    const userToken: CellContent = "x";
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
        active={userTurn}
        resetCallback={handleReset}
      />
    </div>
  );

  function aiMove() {
    const aiMove: Move = makeAiMove(state, initGameConfig);
    const { newState, failed } = makeMove(aiMove, state);
    if (failed) {
      console.log("ai move failed");
      endCallback();
    } else {
      setState((state) => ({
        ...newState,
        userTurn: true,
        message: "your move",
      }));
      console.log("user can interact now");
      setUserTurn(true);
    }
  }
}
