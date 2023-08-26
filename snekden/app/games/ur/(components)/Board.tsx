"use client";
import { Container, Sprite, Stage, Text } from "@pixi/react";
import React from "react";
import { PieceProps } from "./Piece";
import { UrContext, urMachine } from "../machine";
import RollArea from "./RollArea";
import { interpret } from "xstate";

// todo here need to insiitalize the actor
function Board({}: UrContext) {
  return (
    <Stage>
      <RollArea
        callback={function (result: number): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Container x={400} y={330}>
        <Text
          text="Hello World"
          anchor={{ x: 0.5, y: 0.5 }}
          // filters={[blurFilter]}
        />
        
      </Container>
    </Stage>
  );
}

export default Board;
