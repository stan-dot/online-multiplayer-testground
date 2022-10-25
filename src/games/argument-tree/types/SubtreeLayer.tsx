import { Shape } from "./Shape";

export type SubtreeLayer = {
  yCoordinate: number;
  xCoordinate: number;
  shapes: Shape[];
  width: number;
};
