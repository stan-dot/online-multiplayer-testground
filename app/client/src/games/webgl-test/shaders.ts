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
  p: WebGLProgram,
  gl: WebGL2RenderingContext,
  mode: SurfaceModes,
  lightning?: boolean,
): ProgramInfo {
  const isTexture = mode === SurfaceModes.Texture;
  return {
    program: p,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(p, 'aVertexPosition'),
      vertexColor: isTexture
        ? undefined
        : gl.getAttribLocation(p, 'aVertexColor'),
      textureCoord: isTexture
        ? gl.getAttribLocation(p, 'aTextureCoord')
        : undefined,
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(
        p,
        'uProjectionMatrix',
      ) as WebGLUniformLocation,
      modelViewMatrix: gl.getUniformLocation(
        p,
        'uModelViewMatrix',
      ) as WebGLUniformLocation,
      normalMatrix: lightning
        ? (gl.getUniformLocation(p, 'uNormalMatrix') as WebGLUniformLocation)
        : undefined,
      uSampler: isTexture
        ? (gl.getUniformLocation(p, 'uSampler') as WebGLUniformLocation)
        : undefined,
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
