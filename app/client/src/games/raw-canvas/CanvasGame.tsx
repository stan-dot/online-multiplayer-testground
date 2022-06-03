import { Canvas } from "./Canvas";
import { predraw, postdraw } from "./canvasOptionUtils";
import { drawArc } from "./canvasUtils";

export default function CanvasGame(): JSX.Element {
  return <Canvas draw={drawArc} predraw={predraw} postdraw={postdraw} />
}
