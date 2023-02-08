"use client";

import { TicTacState } from "../game/types";

export function FinalDisplay(props: { gameState: TicTacState; }) {
  console.log("ended:", props.gameState.ended);
  return <div id="finalDisplay"
    className="absolute backdrop-blur-md w-80 h-80 flex flex-col justify-center z-50 top-40 w-fit h-fit m-2 "
    style={{ display: props.gameState.ended ? 'absolute' : 'none' }}
  >
    <p id="finalMessage" className="bg-cyan-400 text-3xl  flex mx-auto p-4 w-40 h-20 justify-center rounded">
      {props.gameState.message}
    </p>
  </div>;
}
