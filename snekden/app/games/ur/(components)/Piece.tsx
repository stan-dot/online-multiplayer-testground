import { Sprite } from "@pixi/react";
import React from "react";

export interface PieceProps {
  position: number;
}
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
