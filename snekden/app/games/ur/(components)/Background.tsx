"use client";
import { actions, interpret } from "xstate";
import { STARTING_PIECES, urMachine } from "../(logic)/machine";
import Board from "./Board";
import PiecesCounter from "./PiecesCounter";
import { useEffect, useState } from "react";
import { PieceProps } from "./Piece";
import { Grid } from "./Graphic";
import { useInterpret, useMachine } from "@xstate/react";
import { PlayerAssets } from "../(logic)/types";
import { useDownstreamStates } from "../hooks/useDownstreamStates";

function Background() {
  const [state, send] = useMachine(urMachine);
  const { p1Undeployed, p1Finished, p2Undeployed, p2Finished } =
    useDownstreamStates({ state });

  return (
    <div>
      <h2 className="text-xl">
        Background
      </h2>
      <div id="p1zone" className="m-2 p-2 ">
        <PiecesCounter
          total={STARTING_PIECES}
          current={p1Undeployed}
          title={"P1 undeployed"}
        />
        <PiecesCounter
          total={STARTING_PIECES}
          current={p1Finished}
          title={"P1 finished"}
        />
      </div>

      <div id="p2zone" className="m-2 p-2 ">
        <PiecesCounter
          total={STARTING_PIECES}
          current={p2Undeployed}
          title={"P2 undeployed"}
        />
        <PiecesCounter
          total={STARTING_PIECES}
          current={p2Finished}
          title={"P2 finished"}
        />
      </div>{" "}
      <Grid height={100} width={100} />
      {<Board p1assets={p1State} p2assets={p2State} />}
      <button onClick={() => send("MOVE")}>
        {state.value === "inactive"
          ? "Click to activate"
          : "Active! Click to deactivate"}
      </button>
    </div>
  );
}

export default Background;
