import { Sprite } from "@pixi/react";
import React from "react";

export interface PieceProps {
  position: number;
}
// position is the same, from 1 to 14
// 1-4 and 13-14 are safe
// 4 8 14 give extra move

function Piece({ position }: PieceProps) {
  return (
    <div className="rounded">
      <Sprite
        image="https://pixijs.io/pixi-react/img/bunny.png"
        x={400}
        y={270}
        anchor={{ x: 0.5, y: 0.5 }}
      />
      Piece
    </div>
  );
}

export default Piece;
