export type ProgramInfo = {
  program: WebGLProgram;
  attribLocations: {
    vertexPosition: GLint;
    vertexColor?: GLint;
    textureCoord?: GLint;
  };
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation;
    modelViewMatrix: WebGLUniformLocation;
    uSampler?: WebGLUniformLocation;
  };
};
