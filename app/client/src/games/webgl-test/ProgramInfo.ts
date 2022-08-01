export type ProgramInfo = {
  program: WebGLProgram;
  attribLocations: {
    vertexPosition: GLint;
    vertexColor?: GLint
  };
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation;
    modelViewMatrix: WebGLUniformLocation;
  };
};
