import { Shape } from "./Shape";

export type SubtreeLayer = {
  xCoordinate: number;
  yCoordinate: number;
  shapes: Shape[];
  width: number;
};
