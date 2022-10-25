import { getRectangleFromStartingPoint } from "./data/constants";
import { Statement, TreeOfStatements } from "./types/TreeOfStatements";
import { Shape } from "./types/Shape";
import { getArrowPoints } from "./getArrowPoints";
const grey = "#808080";

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
  tree: TreeOfStatements,
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
  let shapes: Shape[] = [];
  const rootPoints: number[][] = getRectangleFromStartingPoint(STARTING_POINTS);
  const rootShape: Shape = new Shape(rootPoints, root.title, grey);
  shapes.push(rootShape);
  // todo add layer differences
  // console.log(directSupportingChildren);
  // console.log(directOpposingChildren);
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
    rootShape.points[0],
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
