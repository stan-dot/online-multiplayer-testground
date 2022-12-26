import { CanvasDisplayParameters } from "../../CanvasDisplayParameters";
import { getRectangleFromStartingPoint } from "../../data/constants";
import { Shape } from "../../types/Shape";
import { SubtreeLayer } from "../../types/SubtreeLayer";
import { Statement, Topic } from "../../types/TopicTypes";
import { getArrowPoints } from "./getArrowPoints";
const grey = "#808080";

const MAX_DISTANCE = 3;
const LAYER_HEIGHT = 100;
const STANDARD_WIDTH = 261;

function getClosestLayer(
  parentLayer: SubtreeLayer,
  thisDataLayer: Statement[],
): SubtreeLayer {
  console.log('number of items to distribute:', thisDataLayer.length);
  // todo differentiate between broader and narrower (wrt parents) layers
  const THIS_LAYER_STARTING_POINT: number[] = [parentLayer.xCoordinate - thisDataLayer.length * STANDARD_WIDTH, parentLayer.yCoordinate + LAYER_HEIGHT];
  const shapes: Shape[] = thisDataLayer.map((node: Statement, index: number) => {
    const startingPoint: number[] = [THIS_LAYER_STARTING_POINT[0] + index * STANDARD_WIDTH, THIS_LAYER_STARTING_POINT[1]];
    const rectanglePoints: number[][] = getRectangleFromStartingPoint(startingPoint);
    const shape: Shape = new Shape(rectanglePoints, node.title);
    return shape;
  })

  /**
   * arrow concerns
   * todo 1 use a separate arrow and box class,sharring intersectable interface
   * todo 2 add arrows to each connection, idk how yet
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
  parameters: CanvasDisplayParameters
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


  const rootPoints: number[][] = getStartingPointsFromCanvasDimensions(parameters);
  const rootShape: Shape = new Shape(rootPoints, root.title);
  const rootLayer: SubtreeLayer = {
    xCoordinate: rootPoints[0][0],
    yCoordinate: rootPoints[0][1],
    shapes: [rootShape],
    width: STANDARD_WIDTH
  };
  let allDisplayLayers: SubtreeLayer[] = [rootLayer];
  let allDataLayers: Statement[][] = [[root]];

  for (
    let actualDistance = 0; actualDistance < MAX_DISTANCE; actualDistance++
  ) {
    console.log('all data layers', allDataLayers);
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


function getStartingPointsFromCanvasDimensions(params: CanvasDisplayParameters): number[][] {
  return [[Math.floor(params.width / 2), 20]]

}