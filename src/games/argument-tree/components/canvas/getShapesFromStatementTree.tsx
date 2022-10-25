import { getRectangleFromStartingPoint } from "./data/constants";
import { Statement, Topic } from "./types/TopicTypes";
import { Shape } from "./types/Shape";
import { getArrowPoints } from "./getArrowPoints";
const grey = "#808080";

const LAYER_HEIGHT = 200;

/**
 * todo
 * identify the lowermost edge, put it on the bottom, then go up
 * list layers ( up to some number)
 * then each layer with good proportional display
 * against on the left, supporting on the right
 * then arrows between the correct pairs
 * @param tree
 * @returns
 */
export function getShapesFromStatementTree(
  tree: Topic,
  rootId: string,
  distance?: number,
): Shape[] {
  const root: Statement = tree.statements.find((s) => s.id === rootId) ||
    tree.statements[0];
  // recursively build tree up to some distance
  const MAX_DISTANCE = 2;
  const directSupportingChildren: Statement[] = root.supportingChildren;
  const directOpposingChildren: Statement[] = root.opposingChildren;
  const STARTING_POINTS: number[] = [400, 600];
  let shapes: Shape[] = getShapesFromArray([root], STARTING_POINTS);

  // todo add layer differences
  const layer1Height: number = 300;
  const supporterPoints: number[][] = getRectangleFromStartingPoint([
    200,
    layer1Height,
  ]);
  const supporter = new Shape(
    supporterPoints,
    directSupportingChildren[0].title ?? "unknown",
  );
  shapes.push(supporter);

  // const arrowPoints: number[][] = getArrowPoints([210, 300], [250, 260]);
  // todo function to get a middle point
  const arrowPoints: number[][] = getArrowPoints(
    shapes[0].points[0],
    supporter.points[0],
  );

  const arrowLayer: Shape[] = [new Shape(arrowPoints, "against")];
  shapes.push(arrowLayer[0]);

  return shapes;

  const redEdges: Shape[] = [];
  const greenEdges: Shape[] = [];
  // const nodes: Shape[] = tree.statements.map((v: Statement) => new Shape());
  // return [redEdges, greenEdges, nodes].flat();
}



function getShapesFromArray(nodes: Statement[], startingPoints: number[], data?: any): Shape[] {
  const rootPoints: number[][] = getRectangleFromStartingPoint(startingPoints);
  const rootShape: Shape = new Shape(rootPoints, nodes[0].title, grey);
  return [rootShape];
}
