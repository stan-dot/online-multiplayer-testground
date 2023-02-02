export type DrawingConstantWithCells = (
  context: CanvasRenderingContext2D,
  cells: number[][],
) => void;

export type SideEffectCanvasFunction = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;