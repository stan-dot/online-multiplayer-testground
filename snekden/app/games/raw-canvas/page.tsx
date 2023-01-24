"use client";
import { Canvas } from "./Canvas";
import { predraw, postdraw } from "./utils/canvasOptionUtils";
import { drawArc } from "./strokes";

export default function CanvasGame(): JSX.Element {
  return <Canvas draw={drawArc} predraw={predraw} postdraw={postdraw} />
}
