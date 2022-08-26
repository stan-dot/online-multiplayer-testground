export type ProgramInfo = {
  program: WebGLProgram;
  attribLocations: {
    vertexPosition: GLint;
    vertexColor?: GLint;
    textureCoord?: GLint;
    vertexNormal?: GLint;
  };
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation;
    modelViewMatrix: WebGLUniformLocation;
    normalMatrix?: WebGLUniformLocation;
    uSampler?: WebGLUniformLocation;
  };
};
