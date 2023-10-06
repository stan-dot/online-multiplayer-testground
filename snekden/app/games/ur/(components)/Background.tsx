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

function Background() {
  const [state, send] = useMachine(urMachine);
  const p1State = state.context.p1assets;
  const p2State = state.context.p2assets;

  // const actor = useInterpret(urMachine);
  // useEffect(() => {
  //   actor.start();

  //   const { unsubscribe } = actor.subscribe((state) => {
  //     const assets1 = state.context.p1assets;
  //     seTp1State(assets1);
  //     const assets2 = state.context.p2assets;
  //     seTp2State(assets2);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [actor]);

  // actor.send({ type: "MOVE", startingSquare: 1, finalSquare: 2, player: "1" });
  // const [p1State, seTp1State] = useState<PlayerAssets>();
  // const [p2State, seTp2State] = useState<PlayerAssets>();

  const p1Undeployed = p1State?.undeployed || 0;
  const p2Undeployed = p2State?.undeployed || 0;
  const p1Finished = STARTING_PIECES - p1Undeployed -
    (p1State?.pieces.length || 0);
  const p2Finished = STARTING_PIECES - p2Undeployed -
    (p2State?.pieces.length || 0);

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
      {/* <Grid height={100} width={100} /> */}
      {/* {p1State && p2State && <Board p1assets={p1State} p2assets={p2State} />} */}
      <button onClick={() => send("MOVE")}>
        {state.value === "inactive"
          ? "Click to activate"
          : "Active! Click to deactivate"}
      </button>
    </div>
  );
}

export default Background;
