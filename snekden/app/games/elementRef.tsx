
import { useRef, useEffect } from 'react'

export const useGameField = () => {
  const canvasRef = useRef({} as HTMLCanvasElement);
  useEffect(() => {
    const canvas = canvasRef.current
    let animationFrameId = 0;
    const context: CanvasRenderingContext2D = canvas!.getContext('2d')!;
    let frameCount = 0
    const render = () => {
      frameCount++
      // (context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render();
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return canvasRef
}
