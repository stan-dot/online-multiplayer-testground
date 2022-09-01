import { useRef, useEffect } from 'react';

export const useTerminal = (draw: any) => {
  const terminalRef = useRef({} as HTMLDivElement);
  useEffect(() => {
    const canvas = terminalRef.current;
    const render = () => {
      draw();
    };
    render();
    return () => {
      // window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return terminalRef;
};
