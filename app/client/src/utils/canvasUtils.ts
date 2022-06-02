
export function resizeCanvasToDisplaySize(canvas: any) {
  const { width, height } = canvas.getBoundingClientRect();
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true; // here you can return some usefull information like delta width and delta height instead of just true

    // this information can be used in the next redraw...
  }
  return false;
}

export function resizeCanvas(canvas: any) {
  const { width, height } = canvas.getBoundingClientRect();
  if (canvas.width !== width || canvas.height !== height) {
    const { devicePixelRatio: ratio = 1 } = window;
    const context = canvas.getContext('2d');
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.scale(ratio, ratio);
    return true;
  }
  return false;
}
const postdraw = (ctx: any) => {
  setIndex(index + 1);
  ctx.restore();
};
const predraw = (context, canvas) => {
  context.save();
  resizeCanvasToDisplaySize(context, canvas);
  const { width, height } = context.canvas;
  context.clearRect(0, 0, width, height);
};
const _predraw = (context) => { };
const _postdraw = () => { };
const Canvas = props => {
  const { draw, predraw = _predraw, postdraw = _postdraw } = props;
  const canvasRef = useCanvas(draw, { predraw, postdraw });
  return <canvas>ref; { canvasRef; } { rest; } />/;
};
const draw = (ctx, frameCount: number) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
  ctx.fill();
};
