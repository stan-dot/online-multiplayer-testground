export type SideEffectCanvasFunction = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
export type DrawingConstant = (context: CanvasRenderingContext2D, frameCount: number) => void;
export type CanvasOptions = {
  predraw?: SideEffectCanvasFunction;
  postdraw?: SideEffectCanvasFunction;
};
