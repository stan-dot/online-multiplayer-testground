import { Shape } from '../types/Shape';
import { SubtreeLayer } from '../types/SubtreeLayer';

export function createClickHandler(
  c: HTMLCanvasElement,
  layers: SubtreeLayer[],
) {
  const context: CanvasRenderingContext2D = c.getContext('2d')!;
  layers.forEach(l => l.shapes.forEach(s => s.draw(context)));
  const clickHandler = (e: MouseEvent): void => {
    const x = e.pageX - c.offsetLeft;
    const y = e.pageY - c.offsetTop;
    layers.forEach(layer => {
      layer.shapes.forEach((shape: Shape) => {
        if (shape.interior(x, y)) {
          shape.draw(context);
        }
      });
    });
  };
  return clickHandler;
}

export function createContextClickHandler(
  c: HTMLCanvasElement,
  layers: SubtreeLayer[],
) {
  const context: CanvasRenderingContext2D = c.getContext('2d')!;
  layers.forEach(l => l.shapes.forEach(s => s.draw(context)));
  const clickHandler = (e: MouseEvent): void => {
    const x = e.pageX - c.offsetLeft;
    const y = e.pageY - c.offsetTop;
    layers.forEach(layer => {
      layer.shapes.forEach((shape: Shape) => {
        if (shape.interior(x, y)) {
          // todo here react on clicks and change the internal data structure
          console.log('this shape clicked', shape);
        }
      });
    });
  };
  return clickHandler;
}
