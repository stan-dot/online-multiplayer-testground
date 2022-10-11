import { useEffect, useState } from "react";
import { Shape } from "./types/Shape";
import { starCorners, offsets } from "./starCorners";

export default function CanvasInteractive(): JSX.Element {
  const canvasStyles: React.CSSProperties = { borderWidth: '1px', borderStyle: "solid", borderColor: "#c3c3c3" };
  const star = new Shape(starCorners);
  const shapes: Shape[] = offsets.map(o => star.clone(o));
  console.log(shapes);
  const canvasId = 'myCanvas';
  const [loaded, setLoaded] = useState(false);

  // todo add error handling
  useEffect(() => {
    const c: HTMLCanvasElement = document.getElementById(canvasId) as HTMLCanvasElement;
    const context: CanvasRenderingContext2D = c.getContext('2d')!;
    shapes.forEach(s => s.draw(context));
    const clickHandler = (e: MouseEvent): void => {
      const x = e.pageX - c.offsetLeft;
      const y = e.pageY - c.offsetTop;
      shapes.forEach(shape => {
        if (shape.interior(x, y))
          shape.draw(context);
      });
    };
    c.addEventListener('click', clickHandler)
    setLoaded(true);
    return () => {
      c.removeEventListener('click', clickHandler);
    }
  }, [])

  return <>
    <p>Stars</p>
    <canvas id={canvasId} width="300"
      height={300} style={canvasStyles}>
      Your browser does not support the HTML5 canvas tag.
    </canvas>
  </>
}