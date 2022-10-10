import React from 'react';
const style: React.CSSProperties = {
  overflow: 'scroll',
  height: '800px',
  width: '600px'
};

export const Canvas = (props: { draw: any, height: any, width: any }) => {
  const canvas: React.MutableRefObject<HTMLCanvasElement> = React.useRef() as React.MutableRefObject<HTMLCanvasElement>;
  React.useEffect(() => {
    const context = canvas.current.getContext('webgl');
    props.draw(context);
  });
  return <div style={style}>
    <canvas id='glCanvas' ref={canvas} height={props.height} width={props.width} />
  </div>
};
