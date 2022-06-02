import { CanvasOptions } from '../types/drawingTypes';
import { useCanvas } from './canvasUtils';

export const Canvas = (props: { draw: any; predraw?: any; postdraw?: any; }) => {
  const options: CanvasOptions = { predraw: props.predraw, postdraw: props.postdraw };
  const canvasRef = useCanvas(props.draw, options);
  return <canvas ref={canvasRef} />;
};
