export const c1 = '#4f4';
export const c2 = '#f44';
export const offsets: number[][] = [
  [100, 100],
  [200, 100],
  [100, 200],
  [200, 200],
];
export const starCorners: number[][] = [
  [0.0, -50.0],
  [11.225718676699083, -15.450876230904203],
  [47.552825814757675, -15.450849718747369],
  [18.163594367043608, 5.901709564237537],
  [29.389262614623657, 40.45084971874737],
  [0, 19.098333333333333],
  [-29.38926261462365, 40.45084971874737],
  [-18.163594367043608, 5.901709564237539],
  [-47.55282581475768, -15.450849718747364],
  [-11.225718676699085, -15.450876230904202],
];

export function getRectangleFromStartingPoint(points: number[]): number[][] {
  return [
    [rectangleCorners[0][0] + points[0], rectangleCorners[0][1] + points[1]],
    [rectangleCorners[1][0] + points[0], rectangleCorners[1][1] + points[1]],
    [rectangleCorners[2][0] + points[0], rectangleCorners[2][1] + points[1]],
    [rectangleCorners[3][0] + points[0], rectangleCorners[3][1] + points[1]],
  ];
}

export const rectangleCorners: number[][] = [
  [20, 20],
  [20, 40],
  [80, 40],
  [80, 20],
];

export function getStartingPointForRectangleText(points: number[][]): number[] {
  const startingCorner: number[] = points[0];
  const lastCorner: number[] = points[points.length - 1];
  return [
    startingCorner[0] + (lastCorner[0] - startingCorner[0]) / 2,
    startingCorner[1] + (lastCorner[1] - startingCorner[1]) / 2,
  ];
}
