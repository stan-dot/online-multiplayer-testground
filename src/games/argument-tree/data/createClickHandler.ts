import { SubtreeLayer } from "../types/SubtreeLayer";

export function createClickHandler(
  c: HTMLCanvasElement,
  layers: SubtreeLayer[]) {
  const context: CanvasRenderingContext2D = c.getContext("2d")!;
  layers.forEach((l) => l.shapes.forEach((s) => s.draw(context)));
  const clickHandler = (e: MouseEvent): void => {
    const x = e.pageX - c.offsetLeft;
    const y = e.pageY - c.offsetTop;
    layers.forEach((layer) => {
      layer.shapes.forEach((shape) => {
        if (shape.interior(x, y)) {
          // todo here react on clicks and change the internal data structure
          shape.draw(context);
        }
      });
    });
  };
  return clickHandler;
}
