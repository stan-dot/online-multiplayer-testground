"use client";

import { TicTacState } from "../game/types";

export function FinalDisplay(props: { gameState: TicTacState; }) {
  return <div id="finalDisplay" className="absolute l-50 t-50 z-10 h-40 bg-cyan-600 text-3xl text-white"
    // todo this might not work right
    style={{ visibility: props.gameState.ended ? 'visible' : 'hidden' }}
  >
    {props.gameState.message}
  </div>;
}
