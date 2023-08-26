import { Sprite } from "@pixi/react";
import React from "react";

export interface PieceProps {
  color: string;
  position: number;
}
// position is the same, from 1 to 14
// 1-4 and 13-14 are safe
// 4 8 14 give extra move

function Piece({ color }: PieceProps) {
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
