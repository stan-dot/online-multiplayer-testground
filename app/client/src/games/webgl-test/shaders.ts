import { SurfaceModes } from './SurfaceModes';
import { ProgramInfo } from './types/ProgramInfo.type';

export function initShaderProgram(
  gl: WebGL2RenderingContext,
  vsSource: string,
  fsSource: string,
) {
  const vertexShader = loadShader(
    gl,
    gl.VERTEX_SHADER,
    vsSource,
  ) as WebGLShader;

  const fragmentShader = loadShader(
    gl,
    gl.FRAGMENT_SHADER,
    fsSource,
  ) as WebGLShader;

  const shaderProgram: WebGLProgram = gl.createProgram() as WebGLProgram;
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(
      `Unable to initialize the shader program: ${gl.getProgramInfoLog(
        shaderProgram,
      )}`,
    );
    return null;
  }

  return shaderProgram;
}

export function getProgramInfo(
  shaderProgram: WebGLProgram,
  gl: WebGL2RenderingContext,
  mode: SurfaceModes,
): ProgramInfo {
  if (mode === SurfaceModes.Texture) {
    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(
          shaderProgram,
          'uProjectionMatrix',
        ) as WebGLUniformLocation,
        modelViewMatrix: gl.getUniformLocation(
          shaderProgram,
          'uModelViewMatrix',
        ) as WebGLUniformLocation,
        uSampler: gl.getUniformLocation(
          shaderProgram,
          'uSampler',
        ) as WebGLUniformLocation,
      },
    };
    return programInfo;
  }
  return {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(
        shaderProgram,
        'uProjectionMatrix',
      ) as WebGLUniformLocation,
      modelViewMatrix: gl.getUniformLocation(
        shaderProgram,
        'uModelViewMatrix',
      ) as WebGLUniformLocation,
    },
  };
}

export function loadShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type) as WebGLShader;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`,
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
