/**
 *  Initialize a texture and load an image.
 *  When the image finished loading copy it into the texture.
 * @param gl
 * @param url
 * @returns
 */
export function loadTexture(
  gl: WebGL2RenderingContext,
  url: string,
): WebGLTexture {
  const texture: WebGLTexture | null = gl.createTexture();
  if (gl === null) {
    alert(
      'unable to initalize WebGl. Your browser or machine may not support it',
    );
    return null as unknown as WebGLTexture;
  }
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Because images have to be downloaded over the internet
  // they might take a moment until they are ready.
  // Until then put a single pixel in the texture so we can
  // use it immediately. When the image has finished downloading
  // we'll update the texture with the contents of the image.
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]); // opaque blue
  paintTemporaryPixelBeforeRemoteTextureLoads(
    gl,
    level,
    internalFormat,
    width,
    height,
    border,
    srcFormat,
    srcType,
    pixel,
  );

  const image: HTMLImageElement = new Image();
  image.onload = () => {
    onloadCallback(
      gl,
      texture,
      level,
      internalFormat,
      srcFormat,
      srcType,
      image,
    );
  };
  image.src = url ;

  return texture!;
}

function onloadCallback(
  gl: WebGL2RenderingContext,
  texture: WebGLTexture | null,
  level: number,
  internalFormat: number,
  srcFormat: number,
  srcType: number,
  image: HTMLImageElement,
): void {
  console.log('image loaded')
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    level,
    internalFormat,
    srcFormat,
    srcType,
    image,
  );
  // WebGL1 has different requirements for power of 2 images
  // vs non power of 2 images so check if the image is a
  // power of 2 in both dimensions.
  if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
    // Yes, it's a power of 2. Generate mips.
    gl.generateMipmap(gl.TEXTURE_2D);
  } else {
    // No, it's not a power of 2. Turn off mips and set
    // wrapping to clamp to edge
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // // gl.NEAREST is also allowed, instead of gl.LINEAR, as neither mipmap.
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // // Prevents s-coordinate wrapping (repeating).
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    // // Prevents t-coordinate wrapping (repeating).
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  }
}

function paintTemporaryPixelBeforeRemoteTextureLoads(
  gl: WebGL2RenderingContext,
  level: number,
  internalFormat: number,
  width: number,
  height: number,
  border: number,
  srcFormat: number,
  srcType: number,
  pixel: Uint8Array,
): void {
  gl.texImage2D(
    gl.TEXTURE_2D,
    level,
    internalFormat,
    width,
    height,
    border,
    srcFormat,
    srcType,
    pixel,
  );
}

function isPowerOf2(value: number): boolean {
  const bitwise: number = value & (value - 1);
  return bitwise === 0;
}
