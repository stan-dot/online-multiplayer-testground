export type ProgramInfo = {
  program: WebGLProgram;
  attribLocations: {
    vertexPosition: GLint;
  };
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation;
    modelViewMatrix: WebGLUniformLocation;
  };
};
