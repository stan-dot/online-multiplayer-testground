import React from "react";
import { CanvasDisplayParameters } from "./CanvasDisplayParameters";

export function CanvasContainer(props: { displayParameters: CanvasDisplayParameters; id: string; }) {
  return <div
    id="canvasContainer"
    style={{
      position: "fixed",
      left: `${props.displayParameters.startLeft}px`,
      top: `${props.displayParameters.startTop}px`,
      overflow: 'scroll'
    }}
  >
    <canvas
      id={props.id}
      width={props.displayParameters.width}
      height={props.displayParameters.height}
      style={canvasStyles}
    >
      Your browser does not support the HTML5 canvas tag.
    </canvas>
  </div>;
}
const canvasStyles: React.CSSProperties = {
  left: "20%",
  top: "50px",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#c3c3c3",
};
