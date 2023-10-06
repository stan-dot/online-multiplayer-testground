"use client";

import { useMachine } from "@xstate/react";
import { urMachine } from "./(logic)/machine";

export function NewBoard() {
  const [state, send] = useMachine(urMachine);

  console.log(state.context.p1assets?.pieces);

  return (
    <div id="newBoard" className="m-2 p-2">
      <p>Hello world</p>
      <div id="player1assets">
        <h3>Here are player 1 assets:</h3>
        <div id="piecesIterate">
          {state.context.p1assets.pieces.map((p, i) => {
            return <p key={`piece-${i}`}>piece {i} at position {p.position}</p>;
          })}
        </div>
      </div>
      <button
        id="rollButton"
        className="m-2 p-2 bg-red-500"
        onClick={() => send("ROLL")}
        disabled={state.value !== "p1Roll"}
      >
        <p>Roll</p>
      </button>
      <label htmlFor="moveWhichDropdown">
        Choose which piece to move:
      </label>
      <select>
        {state.context.p1assets.pieces.map((p, i) => {
          return (
            <option key={`option-${i}`} value={p.position}>{p.position}</option>
          );
        })}
      </select>
      <button
        id="moveButton"
        className="m-2 p-2 bg-red-500"
        onClick={() => send("MOVE")}
        disabled={state.value !== "p1Move"}
      >
        <p>Move</p>
      </button>
      <p>{state.context.lastRolledDice}</p>
    </div>
  );
}
