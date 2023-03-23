import { CanvasOptions } from './types/CanvasOptions';
import { CellsCanvasData } from './types/CellsCanvasData';
import { DrawingConstantWithCells } from './types/drawingTypes';
import { SimulationControl } from './types/SimulationControl';
import { useCanvasForCells } from './utils/useCanvasForCells';

type GameOfLifeCanvasProps = {
  draw: DrawingConstantWithCells;
  data: CellsCanvasData;
  options?: CanvasOptions;
  control:SimulationControl
};

export const Canvas = ({
  draw,
  data,
  options,
  control,
}:
 GameOfLifeCanvasProps) => {
  const canvasRef: React.MutableRefObject<HTMLCanvasElement> = useCanvasForCells(draw, data,control);
  return <>
    <canvas
      id="gameCanvas"
      width={options?.width ?? 200}
      height={options?.height ?? 100}
      style={options?.style ?? { border: "1px solid #d3d3d3" }}
      ref={canvasRef}
    >
      Your browser does not support the HTML canvas tag.
    </canvas>
  </>
};
