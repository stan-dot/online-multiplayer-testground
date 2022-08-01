import { ProgramInfo } from './ProgramInfo';

//
// Initialize a shader program, so WebGL knows how to draw our data
//
export function initShaderProgram(
  gl: WebGL2RenderingContext,
  vsSource: any,
  fsSource: any,
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

  // Create the shader program

  const shaderProgram: WebGLProgram = gl.createProgram() as WebGLProgram;
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

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
): ProgramInfo {
  return {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor')
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

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
export function loadShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type) as WebGLShader;

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`,
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
