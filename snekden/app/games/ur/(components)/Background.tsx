"use client";
import { interpret } from "xstate";
import { STARTING_PIECES, urMachine } from "../(logic)/machine";
import Board from "./Board";
import PiecesCounter from "./PiecesCounter";
import { useState } from "react";
import { PieceProps } from "./Piece";
import { Grid } from "./Graphic";


function Background() {
  const actor = interpret(urMachine).start();
  actor.send({ type: "MOVE", startingSquare: 1, finalSquare: 2, player: "1" });

  const { unsubscribe } = actor.subscribe((state) => {
    const assets1 = state.context.p1assets;
    const assets2 = state.context.p2assets;
    console.log(state);
  });

  const [p1Undeployed, setp1Undeployed] = useState<number>(STARTING_PIECES);
  const [p2Undeployed, setp2Undeployed] = useState<number>(STARTING_PIECES);

  const [p1State, seTp1State] = useState<PieceProps[]>([]);
  const [p2State, seTp2State] = useState<PieceProps[]>([]);
  // todo display just with text to test the machine, no positions displayed rn tbh
  // todo just 1 state tbh

  return (
    <div>
      Background
      <div id="p1zone" className="m-2 p-2 ">
        <PiecesCounter
          total={STARTING_PIECES}
          current={p1Undeployed}
          title={"P1 undeployed"}
        />
        <PiecesCounter
          total={STARTING_PIECES}
          current={STARTING_PIECES - p1Undeployed - p1State.length}
          title={"P1 finihsed"}
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
          current={STARTING_PIECES - p2Undeployed - p2State.length}
          title={"P2 finihsed"}
        />
      </div>
      <Grid height={100} width={100} />
      {/* <Board p1assets={p1State} p2assets={p2State} /> */}
    </div>
  );
}

export default Background;
