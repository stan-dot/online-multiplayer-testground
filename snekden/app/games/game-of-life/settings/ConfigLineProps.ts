import { Shape } from "../types/CellsCanvasData";

export type ConfigLineProps = {
  deleteCallback?: () => void;
  changeStartingPointCallback?: (newStartingPoint: number[]) => void;
  s: Shape;
};
