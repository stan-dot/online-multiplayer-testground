import { useRef, useEffect } from 'react'
import { DrawingConstant, CanvasOptions } from './types/drawingTypes';

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
