import { CanvasOptions } from './types/drawingTypes';
import { useCanvas } from './useCanvas';

export const Canvas = (props: { draw: any; predraw?: any; postdraw?: any; }) => {
  const options: CanvasOptions = { predraw: props.predraw, postdraw: props.postdraw };
  const canvasRef = useCanvas(props.draw, options);
  return <>
    <h1>test canvas</h1>
    <canvas
      id="gameCanvas"
      width={200}
      height={100}
      style={{ border: "1px solid #d3d3d3" }} ref={canvasRef}
    >
      Your browser does not support the HTML canvas tag.
    </canvas>
  </>
};
