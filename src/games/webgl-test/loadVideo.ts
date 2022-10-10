export function setupVideo(
  url: string,
  copyVideo: () => void,
): HTMLVideoElement {
  const video: HTMLVideoElement = document.createElement('video');

  let playing = false;
  let timeupdate = false;

  video.playsInline = true;
  video.muted = true;
  video.loop = true;

  // Waiting for these 2 events ensures
  // there is data in the video

  video.addEventListener(
    'playing',
    () => {
      playing = true;
      checkReady();
    },
    true,
  );

  video.addEventListener(
    'timeupdate',
    () => {
      timeupdate = true;
      checkReady();
    },
    true,
  );

  video.src = url;
  video.play();

  function checkReady() {
    if (playing && timeupdate) {
      () => copyVideo();
    }
  }

  return video;
}

export function updateTextureWithVideo(
  gl: WebGL2RenderingContext,
  texture: WebGLTexture,
  video: HTMLVideoElement,
): void {
  const level = 0;
  const internalFormat = gl.RGBA;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    level,
    internalFormat,
    srcFormat,
    srcType,
    video,
  );
}
