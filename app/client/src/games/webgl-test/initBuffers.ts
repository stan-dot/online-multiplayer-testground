import { indices, faceColors, positions } from './cubeBufferConstants';
import { GraphicsBuffers } from './types/GraphicsBuffers.type';

export function initBuffers(gl: WebGL2RenderingContext): GraphicsBuffers {
  return {
    position: initPositionBuffer(gl),
    color: initColorBuffer(gl),
    indices: initIndicesBuffer(gl),
  };
}

function initIndicesBuffer(gl: WebGL2RenderingContext): WebGLBuffer {
  const indexBuffer = gl.createBuffer() as WebGLBuffer;
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW,
  );
  return indexBuffer;
}

function initColorBuffer(gl: WebGL2RenderingContext): WebGLBuffer {
  // Convert the array of colors into a table for all the vertices.
  const colors: number[] = faceColors.flat();
  const colorBuffer = gl.createBuffer() as WebGLBuffer;
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  return colorBuffer;
}

function initPositionBuffer(gl: WebGL2RenderingContext): WebGLBuffer {
  const positionBuffer = gl.createBuffer() as WebGLBuffer;
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  return positionBuffer;
}
