import { getRectangleFromStartingPoint } from "../../data/constants";
import { Shape } from "../../types/Shape";
import { SubtreeLayer } from "../../types/SubtreeLayer";
import { Statement, Topic } from "../../types/TopicTypes";
import { getArrowPoints } from "./getArrowPoints";
const grey = "#808080";

const MAX_DISTANCE = 2;
const LAYER_HEIGHT = 200;
const STANDARD_WIDTH = 200;

function getClosestLayer(
  parentLayer: SubtreeLayer,
  thisDataLayer: Statement[],
): SubtreeLayer {

  console.log('number of items to distribute:', thisDataLayer.length);
  const THIS_LAYER_STARTING_POINT: number[] = [parentLayer.xCoordinate + parentLayer.width, parentLayer.yCoordinate + LAYER_HEIGHT];
  const shapes: Shape[] = thisDataLayer.map((node: Statement, index: number) => {
    const startingPoint: number[] = [THIS_LAYER_STARTING_POINT[0] + index * STANDARD_WIDTH, THIS_LAYER_STARTING_POINT[1]];
    const rectanglePoints: number[][] = getRectangleFromStartingPoint(startingPoint);
    const shape: Shape = new Shape(rectanglePoints, node.title);
    return shape;
  })

  /**
   * arrow concerns
   */
  // const arrowPoints: number[][] = getArrowPoints(
  //   shapes[0].points[0],
  //   shapes[1].points[0],
  // );

  // const arrowLayer: Shape[] = [new Shape(arrowPoints, "against")];
  // shapes.push(arrowLayer[0]);

  const l: SubtreeLayer = {
    yCoordinate: THIS_LAYER_STARTING_POINT[0],
    xCoordinate: THIS_LAYER_STARTING_POINT[1],
    shapes: shapes,
    width: thisDataLayer.length * STANDARD_WIDTH * 2,
  };
  return l;
}

function getAllStatementChildrenOfDataLayer(s: Statement[]): Statement[] {
  console.log(s);
  if (!s) return [];
  return s.reduce(
    (previous: Statement[], current: Statement) =>
      previous.concat(current.supportingChildren, current.opposingChildren),
    [],
  );
}

/**
 * todo it acutally makes more sense to go down, not up. easier to not go into negative parts of the canvas
 * todo identify the lowermost edge, put it on the bottom, then go up
 * list layers ( up to some number)
 * then each layer with good proportional display
 * against on the left, supporting on the right
 * then arrows between the correct pairs
 * recursively build tree up to some distance
 */

export function getLayersFromStatementTree(
  tree: Topic,
  rootId: string,
): SubtreeLayer[] {

  const root: Statement = tree.statements.find((s) => s.id === rootId) ||
    tree.statements[0];

  const errorLayer: SubtreeLayer = {
    yCoordinate: 0,
    xCoordinate: 0,
    shapes: [new Shape([[50, 50], [200, 200]], "No statements here")],
    width: 0,
  };
  if (!root) return [errorLayer];

  const ROOT_DISPLAY_POINTS: number[][] = [[400, 600]];
  const rootShape: Shape = new Shape(ROOT_DISPLAY_POINTS, root.title);
  const rootLayer: SubtreeLayer = {
    yCoordinate: 400,
    xCoordinate: 600,
    shapes: [rootShape],
    width: STANDARD_WIDTH
  };
  let allDisplayLayers: SubtreeLayer[] = [rootLayer];
  let allDataLayers: Statement[][] = [[root]];

  for (
    let actualDistance = 0; actualDistance < MAX_DISTANCE; actualDistance++
  ) {
    const lastParents: Statement[] = allDataLayers[actualDistance];
    const nextDataLayer: Statement[] = getAllStatementChildrenOfDataLayer(lastParents);
    const nextDisplayLayer: SubtreeLayer = getClosestLayer(
      allDisplayLayers[actualDistance],
      nextDataLayer,
    );
    allDisplayLayers.push(nextDisplayLayer);
  }

  return allDisplayLayers;
}
