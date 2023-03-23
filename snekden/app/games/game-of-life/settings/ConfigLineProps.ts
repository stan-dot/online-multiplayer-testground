import { Shape } from "../types/CellsCanvasData";

export type EditableShapeProps = {
  deleteCallback: () => void;
  changeStartingPointCallback: (newStartingPoint: number[]) => void;
  shape: Shape;
};
