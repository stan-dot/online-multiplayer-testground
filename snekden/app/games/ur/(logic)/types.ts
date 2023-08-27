import { PieceProps } from "../(components)/Piece";

export interface PlayerAssets {
  pieces: PieceProps[];
  color: string;
  undeployed: number;
}

export interface UrContext {
  p1assets: PlayerAssets;
  p2assets: PlayerAssets;
}

export interface RollEvent {
  type: "ROLL";
  result: number;
}

export interface MoveEvent {
  type: "MOVE";
  startingSquare: number;
  finalSquare: number;
  player:"1" | "2"
}
