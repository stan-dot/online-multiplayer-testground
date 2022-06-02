import { CanvasOptions } from '../types/drawingTypes';
import { useCanvas } from './canvasUtils';

export const Canvas = (props: { draw: any; predraw?: any; postdraw?: any; }) => {
  const options: CanvasOptions = { predraw: props.predraw, postdraw: props.postdraw };
  const canvasRef = useCanvas(props.draw, options);
  return <canvas
    id="myCanvas"
    width={2000}
    height={1000}
    style={{ border: "1px solid #d3d3d3" }} ref={canvasRef}
  >
    Your browser does not support the HTML canvas tag.
  </canvas>
};
