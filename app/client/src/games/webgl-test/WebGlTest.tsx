import React from "react";
import { Canvas } from "./Canvas";
import { drawScene } from "./drawScene";
import { ProgramInfo } from "./ProgramInfo";
import { getProgramInfo, initBuffers, initShaderProgram } from "./shaders";
import { vsSource, fsSource } from "./shaper-constants";

export default function WebGlTest(props: {}): JSX.Element {
  const draw = (gl: WebGL2RenderingContext):void => {
    if (gl === null) {
      alert('unable to initalize WebGl. Your browser or machine may not support it');
      return;
    }
    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
    const shaderProgram: WebGLProgram = initShaderProgram(gl, vsSource, fsSource) as WebGLProgram;
    const programInfo: ProgramInfo = getProgramInfo(shaderProgram, gl);
    const buffers: WebGLBuffer = initBuffers(gl);
    drawScene(gl, programInfo, buffers);
  };

  return <div>
    <p>test</p>
    <Canvas draw={draw} height={400} width={400} />
  </div>
}