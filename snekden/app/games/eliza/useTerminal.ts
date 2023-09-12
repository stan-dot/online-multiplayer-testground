import { useEffect, useRef, useState } from "react";
import { Terminal } from "xterm";

export const useTerminal = (say?: any) => {
  const terminalRef = useRef({} as HTMLDivElement);
  const [first, setfirst] = useState(true);
  useEffect(() => {
    const term = new Terminal();
    if (first) {
      term.open(document.getElementById("terminal")!);
      setfirst(false);
    }
    const render = () => {
      term.write("Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ");
    };
    render();
    return () => {
      // window.cancelAnimationFrame(animationFrameId);
    };
  }, [first, say]);

  return terminalRef;
};
