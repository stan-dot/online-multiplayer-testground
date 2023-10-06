import { Container, Sprite, Stage, Text } from "@pixi/react";
import React from "react";
import { PieceProps } from "./Piece";
import RollArea from "./RollArea";
import { interpret } from "xstate";
import { UrContext } from "../(logic)/types";

function Board({ p1assets, p2assets }: UrContext) {
  console.log(p1assets);
  console.log(p2assets);
  return (
    <Stage>
      <RollArea callback={(n) => console.log(`roll result: ${n}`)} />
      <Container x={400} y={330}>
        <Text
          text="Hello World"
          anchor={{ x: 0.5, y: 0.5 }}
          // filters={[blurFilter]}
        />
        {
          /* <Square />
        <Square />
        <Square /> */
        }
      </Container>
    </Stage>
  );
}

export default Board;

function Square(props: {}) {
  return (
    <div
      className={"h-20 w-20 bg-cyan-600 m-3 grid flow-grid-row grid-rows-1 place-content-center "}
    >
      <p className="text-4xl p-2 m-2 text-cyan-100">
        test square
      </p>
    </div>
  );
}
