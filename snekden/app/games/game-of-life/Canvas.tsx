import { CanvasOptions } from './types/CanvasOptions';
import { CellsCanvasData } from './types/CellsCanvasData';
import { DrawingConstantWithCells } from './types/drawingTypes';
import { useCanvasForCells } from './utils/useCanvasForCells';

export const Canvas = (props: { draw: DrawingConstantWithCells, data: CellsCanvasData, options?: CanvasOptions }) => {
  const canvasRef: React.MutableRefObject<HTMLCanvasElement> = useCanvasForCells(props.draw, props.data);
  return <>
    <canvas
      id="gameCanvas"
      width={props.options?.width ?? 200}
      height={props.options?.height ?? 100}
      style={props.options?.style ?? { border: "1px solid #d3d3d3" }}
      ref={canvasRef}
    >
      Your browser does not support the HTML canvas tag.
    </canvas>
  </>
};
