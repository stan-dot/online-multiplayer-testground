"use client";

import { useMachine } from "@xstate/react";
import { urMachine } from "./(logic)/machine";
import { PieceProps } from "./(components)/Piece";
import { useState } from "react";
import { getDiceRoll } from "./(logic)/utils";
import { stat } from "fs";
import Board from "./(components)/Board";

export function NewBoard() {
  const [state, send] = useMachine(urMachine);

  const availablePieces = state.context.p1assets.pieces;
  const p = availablePieces[0].position;
  const [movingPiece, setMovingPiece] = useState<number>(p);
  console.log(state.context.p1assets?.pieces);

  return (
    <div id="newBoard" className="m-2 p-2">
      <p>Hello world</p>
      <div id="player1assets">
        <h3>Here are player 1 assets:</h3>
        <div id="piecesIterate">
          {availablePieces.map((p, i) => {
            return <p key={`piece-${i}`}>piece {i} at position {p.position}</p>;
          })}
        </div>
      </div>
      <button
        id="rollButton"
        className="m-2 p-2 bg-red-500"
        onClick={() => send("ROLL", { result: getDiceRoll() })}
        disabled={state.value !== "p1Roll"}
      >
        <p>{state.value !== "p1Roll" ? "wait" : "Roll"}</p>
      </button>
      <label htmlFor="moveWhichDropdown">
        Choose which piece to move:
      </label>
      <select onChange={(v) => setMovingPiece(parseInt(v.target.value))}>
        {state.context.p1assets.pieces.map((p, i) => {
          return (
            <option key={`option-${i}`} value={p.position}>{p.position}</option>
          );
        })}
      </select>
      <button
        id="moveButton"
        className="m-2 p-2 border-solid bg-red-500 border-1 border-red-500 solid disabled: border-x-pink-400"
        onClick={() =>
          send("MOVE", {
            startingSquare: movingPiece,
            finalSquare: movingPiece + state.context.lastRolledDice,
            player: "1",
          })}
        disabled={state.value !== "p1Move"}
      >
        <p>{state.value !== "p1Move" ? "wait" : "Move"}</p>
      </button>
      <div id="lastRolledDicePlace">
        <p>{state.context.lastRolledDice}</p>
      </div>
      <div id="undeployedRegion">
        <div id="undeployedP1">
          <h2>Undeployed pieces of player 1</h2>
          <p>{state.context.p1assets.undeployed}</p>
        </div>

        <div id="undeployedP2">
          <h2>Undeployed pieces of player 2</h2>
          <p>{state.context.p2assets.undeployed}</p>
        </div>
      </div>
      <Board
        p1assets={state.context.p1assets}
        p2assets={state.context.p2assets}
        lastRolledDice={state.context.lastRolledDice}
      />
    </div>
  );
}
