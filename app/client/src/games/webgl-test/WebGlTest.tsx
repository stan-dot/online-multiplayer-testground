import React from "react";
import { Canvas } from "./Canvas";

export default function WebGlTest(props: {}): JSX.Element {
  const draw = (ctx: WebGL2RenderingContext) => {
    if (ctx === null) {
      alert('unable to initalize WebGl. Your browser or machine may not support it');
      return;
    }
    // Set clear color to black, fully opaque
    ctx.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    ctx.clear(ctx.COLOR_BUFFER_BIT);

  };

  return <div>
    <p>test</p>
    <Canvas draw={draw} height={400} width={400} />
  </div>
}