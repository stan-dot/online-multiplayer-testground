import Konva from "konva";

export type KonvaShape = {
  id: string;
  x: number;
  y: number;
  rotation: number;
  isDragging: boolean;
};

export function generateShapes(width: number, height: number): KonvaShape[] {
  return [...Array(10)].map((_, i) => getThing(i, width, height));
}

const text: Konva.Text = new Konva.Text({
  x: 10,
  y: 15,
  text: "Simple Text",
  fontSize: 30,
  fontFamily: "Calibri",
  fill: "green",
});

export function getThing(
  i: number,
  width: number,
  height: number,
): KonvaShape {
  return {
    id: i.toString(),
    x: Math.random() * width,
    y: Math.random() * height,
    rotation: Math.random() * 180,
    isDragging: false,
  };
}
