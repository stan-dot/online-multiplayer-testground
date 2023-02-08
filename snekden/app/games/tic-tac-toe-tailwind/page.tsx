"use client";

import { useEffect, useState } from "react";
import { GameDisplay } from "./components/GameDisplay";
import { makeMove, seeIfEnd, seeIfGivenWon } from "./game/engine";
import { getStartingState, initGameConfig, startingPlayer } from "./game/init";
import { makeAiMove } from "./game/opponent";
import { Message, Move } from "./game/types";

export default function TicTacToe() {
  const [state, setState] = useState(getStartingState());

  const youStart: boolean = startingPlayer();
  const [userTurn, setUserTurn] = useState<boolean>(youStart);
  const m: Message = youStart ? "your move" : "waiting for opponent's move";
  const [message, setMessage] = useState<Message>(m);
  const [ended, setEnded] = useState<boolean>(false);

  const handleUserMove = (move: Move) => {
    const { newState, failed } = makeMove(move, state);
    setUserTurn(false);

    setState(newState);
    setMessage("waiting for opponent's move");
  };

  const handleReset = () => {
    const newState = getStartingState();
    setState(newState);
    setEnded(false);
    setUserTurn(startingPlayer());
  };

  useEffect(() => {
    const userEnded = seeIfEnd(state);
    const userWon: boolean = seeIfGivenWon(state, "x");

    if (userEnded && !userWon) {
      setMessage('draw');
      setEnded(true);
      return;
    }

    if (userWon) {
      setEnded(true);
      setMessage("you won");
      return;
    }

    if (!userTurn) {
      const aiMove: Move = makeAiMove(state, initGameConfig);
      const { newState, failed } = makeMove(aiMove, state);
      const aiEnded = seeIfEnd(newState);
      const aiWon = seeIfGivenWon(newState, "o");
      if (aiEnded && !aiWon) {
        setMessage("draw");
        setEnded(true);
      }
      if (aiWon) {
        setEnded(true);
        setMessage('ai won');
      } else {
        setUserTurn(true);
        setMessage('your move');
      }
      setState(newState);
    }

  }, [ended, state, userTurn]);

  return (
    <div className="ml-96 w-fit h-fit m-10 p-4 grid grid-flow-col grid-cols-2  bg-cyan-800 shadow-lg  max-w-4cl min-h-screen">
      <GameDisplay
        state={state}
        moveCallback={handleUserMove}
        active={userTurn}
        resetCallback={handleReset}
        message={message}
      />
    </div>
  );
}
