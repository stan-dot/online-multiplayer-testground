import { useRef, useEffect } from 'react'
import { CanvasOptions, DrawingConstant } from '../types/drawingTypes';


export const drawArc: DrawingConstant = (ctx: CanvasRenderingContext2D, frameCount: number): void => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
  ctx.fill();
};

export const drawDiagonal: DrawingConstant = (ctx: CanvasRenderingContext2D): void => {
  ctx.moveTo(0, 0);
  ctx.lineTo(200, 100);
  ctx.stroke();
}


export const useCanvas = (draw: DrawingConstant, options = {} as CanvasOptions) => {
  const canvasRef = useRef({} as HTMLCanvasElement);
  useEffect(() => {
    const canvas = canvasRef.current
    let animationFrameId = 0;
    const context: CanvasRenderingContext2D = canvas!.getContext('2d')!;
    let frameCount = 0
    const render = () => {
      frameCount++
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render();
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])

  return canvasRef
}
