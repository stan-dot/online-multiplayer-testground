/**
 * @param start
 * @param end
 * @param proportion how much from the end the parting point is
 * @returns
 */
function getPartPointBetweentPoints(
  start: number[],
  end: number[],
  proportion: number
): number[] {
  return [
    start[0] + (start[0] - end[0]) / proportion,
    start[1] + (start[1] - end[1]) / proportion,
  ];
}
/**
 * todo the points need to be 7, not 3 = need to add 4 more points
 * @param fromPoint
 * @param targetPoint
 * @returns
 */
export function getArrowPoints(
  fromPoint: number[],
  targetPoint: number[]): number[][] {
  const output: number[][] = [fromPoint]; // that is bottom right
  const radius = 15;
  const xCenter = targetPoint[0];
  const yCenter = targetPoint[1];

  let angle1 = Math.atan2(
    targetPoint[1] - fromPoint[1],
    targetPoint[0] - fromPoint[0]
  );
  const getNewX = (a: number) => radius * Math.cos(a) + xCenter;
  const getNewY = (a: number) => radius * Math.sin(a) + yCenter;
  const updateAngle = (a: number): number => (a += (1.0 / 3.0) * (2 * Math.PI));
  const angle2 = updateAngle(angle1);
  const point2 = [getNewX(angle2), getNewY(angle2)]; // toprightmost
  output.push(point2);

  const ARROW_PROPORTION = 8;

  // 1/8th of the distance from the end, just on the way
  const cruxPoint = getPartPointBetweentPoints(
    fromPoint,
    targetPoint,
    ARROW_PROPORTION
  );
  const linearCoefficient: number[] = [
    Math.abs(fromPoint[0] - targetPoint[0]),
    Math.abs(fromPoint[1] - targetPoint[1]),
  ];
  const PERPENDICULAR_COSINE = -1;
  const INTERNAL_POINT_DISTANCE: number = 5;
  const SPIKE_POINT_DISTANCE = 10;

  // the additional 4 points
  const rightSpikePoint: number[] = [
    cruxPoint[0] +
    Math.abs(
      PERPENDICULAR_COSINE * linearCoefficient[0] * SPIKE_POINT_DISTANCE
    ),
    cruxPoint[1] +
    Math.abs(
      PERPENDICULAR_COSINE * linearCoefficient[1] * SPIKE_POINT_DISTANCE
    ),
  ]; // 5 pixels outwards from the internal point


  // output.push(rightSpikePoint);
  const rightInternalPoint: number[] = [
    cruxPoint[0] +
    Math.abs(
      PERPENDICULAR_COSINE * linearCoefficient[0] * INTERNAL_POINT_DISTANCE
    ),
    cruxPoint[1] +
    Math.abs(
      PERPENDICULAR_COSINE * linearCoefficient[1] * INTERNAL_POINT_DISTANCE
    ),
  ];
  // output.push(rightInternalPoint);
  const angle3 = updateAngle(angle2);
  const point3 = [getNewX(angle3), getNewY(angle3)]; // leftmost

  // output.push(point3);
  const leftInternalPoint: number[] = [
    cruxPoint[0] -
    Math.abs(
      PERPENDICULAR_COSINE * linearCoefficient[0] * INTERNAL_POINT_DISTANCE
    ),
    cruxPoint[1] -
    Math.abs(
      PERPENDICULAR_COSINE * linearCoefficient[1] * INTERNAL_POINT_DISTANCE
    ),
  ]; // 1/8th of the distance from the end , just on the way
  output.push(leftInternalPoint);
  const leftSpikePoint: number[] = [
    cruxPoint[0] -
    Math.abs(
      PERPENDICULAR_COSINE * linearCoefficient[0] * SPIKE_POINT_DISTANCE
    ),
    cruxPoint[1] -
    Math.abs(
      PERPENDICULAR_COSINE * linearCoefficient[1] * SPIKE_POINT_DISTANCE
    ),
  ]; // 5 pixels outwards from the internal point

  // output.push(leftSpikePoint);
  console.log(output);
  return output;
}
