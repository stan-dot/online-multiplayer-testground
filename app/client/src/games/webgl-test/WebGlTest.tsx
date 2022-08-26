import React from "react";
import { Canvas } from "./Canvas";
import { drawScene } from "./drawScene";
import { getProgramInfo, initShaderProgram } from "./shaders";
import { SurfaceModes } from "./SurfaceModes";
import { initBuffers } from "./initBuffers";
import { colorVsSource, colorFsSource, textureVsSource, textureFsSource } from "./shaderConstants";
import { GraphicsBuffers } from "./types/GraphicsBuffers.type";
import { ProgramInfo } from "./types/ProgramInfo.type";
import { loadTexture } from "./loadTextures";

const textureUrl = 'images/cubetexture.png';
export default function WebGlTest(props: {}): JSX.Element {
  const draw = (gl: WebGL2RenderingContext): void => {
    if (gl === null) {
      alert('unable to initalize WebGl. Your browser or machine may not support it');
      return;
    }
    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
    const shaderProgram: WebGLProgram = initShaderProgram(gl, textureVsSource, textureFsSource) as WebGLProgram;
    const programInfo: ProgramInfo = getProgramInfo(shaderProgram, gl, SurfaceModes.Texture);
    const buffers: GraphicsBuffers = initBuffers(gl);
    const textures: WebGLTexture = loadTexture(gl, textureUrl);
    // Flip image pixels into the bottom-to-top order that WebGL expects.
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);


    // Draw the scene repeatedly
    function render(now: number): void {
      let then = 0;
      now *= 0.001;  // convert to seconds
      const deltaTime: number = now - then;
      then = now;
      drawScene(gl, programInfo, buffers, deltaTime, textures);
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  };

  return <div>
    <Canvas draw={draw} height={400} width={400} />
  </div>
}