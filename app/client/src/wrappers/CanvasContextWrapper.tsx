import React from "react";
import { CANVAS_NAME } from "../utils/canvasDefaults";

export type CanvasInterface = {
  renderingContext: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
};

export const CanvasContext = React.createContext({} as CanvasInterface);
export function CanvasContextWrapper(props: {
  children: any;
}): JSX.Element {
  const canvas: HTMLCanvasElement = document.getElementById(CANVAS_NAME) as HTMLCanvasElement;
  const context: CanvasRenderingContext2D = canvas.getContext('2d')!;
  const canvasInterface: CanvasInterface = {
    renderingContext: context,
    canvas: canvas,
  };
  return <CanvasContext.Provider value={canvasInterface}>
    {props.children}
  </CanvasContext.Provider>
}
