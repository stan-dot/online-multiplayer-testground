import React, { ReactNode } from "react";

const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT = 300;


export type CanvasInterface = {
  renderingContext: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
}

export const CanvasContext = React.createContext({} as CanvasInterface);

const canvasName = 'gameCanvas';
export function CanvasWrapper(props: { children: ReactNode, height: number, width: number }): JSX.Element {

  const canvas: HTMLCanvasElement = document.getElementById(canvasName) as HTMLCanvasElement;
  const context: CanvasRenderingContext2D = canvas!.getContext('2d')!;
  const canvasInterface: CanvasInterface = {
    renderingContext: context,
    canvas: canvas,
  }

  return <>
    <canvas
      id={canvasName}
      width={props.width ?? DEFAULT_WIDTH}
      height={props.height ?? DEFAULT_HEIGHT}
    >
      Your browser does not support the HTML canvas tag.
    </canvas>
    <CanvasContext.Provider value={canvasInterface}>
      {props.children}
    </CanvasContext.Provider>
  </>
}