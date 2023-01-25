import { Canvas } from "./Canvas";
import { predraw, postdraw } from "./utils/canvasOptionUtils";
import { drawArc } from "./strokes";

export default function CanvasGame() {
  return <Canvas draw={drawArc} predraw={predraw} postdraw={postdraw} />
}
