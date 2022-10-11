import { useEffect, useState } from "react";
import { Shape } from "./types/Shape";
import { starCorners, offsets, rectangleCorners, getRectangleFromStartingPoint } from "./constants";
import axios, { AxiosResponse } from "axios";
import { downwardArrowCorners } from "./downwardArrowCorners";
const canvasId = 'myCanvas';

type Statement = {
  title: string,
  id: string,
  idsSupported: string[],
  idsOpposed: string[]
}

type TreeOfStatements = {
  statements: Statement[]
}

const s2: Statement = {
  title: "The clock has been showing 1:30 for some time now.",
  id: "2",
  idsSupported: ["1"],
  idsOpposed: []
};

const s1: Statement = {
  title: "It must be different time than 1:30",
  id: "1",
  idsSupported: [],
  idsOpposed: []
};

const DEFAULT_TREE: TreeOfStatements = {
  statements: [
    s1, s2
  ]
}

const red = "#FF000";
const green = "#00FF00";

function isFinal(s: Statement): boolean {
  return s.idsOpposed.length === 0 && s.idsSupported.length === 0;
}

/**
 * todo the points need to be 7, not 3
 * need to add 4 more points 
 * @param from 
 * @param to 
 * @returns 
 */
function getArrowPoints(from: number[], to: number[]): number[][] {
  const output: number[][] = [from];
  const radius = 15;
  const xCenter = to[0];
  const yCenter = to[1];

  let angle1 = Math.atan2(to[1] - from[1], to[0] - from[0]);
  const getNewX = (a: number) => radius * Math.cos(a) + xCenter;
  const getNewY = (a: number) => radius * Math.sin(a) + yCenter;
  const updateAngle = (a: number): number => a += (1.0 / 3.0) * (2 * Math.PI);
  const angle2 = updateAngle(angle1);
  output.push([getNewX(angle2), getNewY(angle2)]);

  const angle3 = updateAngle(angle2);
  output.push([getNewX(angle3), getNewY(angle3)]);
  console.log(output);
  return output;
}

type Layer = {
  height: number;
  width: number;
  color: string;
  shapes: Shape[];
}

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
function getShapesFromStatementTree(tree: TreeOfStatements, distance?: number): Shape[] {
  const root: Statement = tree.statements.find(isFinal)!; // todo error handling
  // recursively build tree up to some distance
  const MAX_DISTANCE = 2;
  const directSupportingChildren: Statement[] = tree.statements.filter(s => s.idsSupported.includes(root.id));
  const directOpposingChildren: Statement[] = tree.statements.filter(s => s.idsOpposed.includes(root.id));
  const STARTING_POINTS: number[] = [300, 500];
  let shapes: Shape[] = [];
  const rootPoints: number[][] = getRectangleFromStartingPoint(STARTING_POINTS);
  const grey = '#808080';
  const rootShape: Shape = new Shape(rootPoints, root.title, grey);
  shapes.push(rootShape);
  // const testArrow: Shape = new Shape(downwardArrowCorners, 'supports');
  // shapes.push(testArrow);
  // todo add layer differences

  console.log(directSupportingChildren);
  console.log(directOpposingChildren);
  const layer1Height: number = 300;
  const supporterPoints: number[][] = getRectangleFromStartingPoint([200, layer1Height]);
  const supporter = new Shape(supporterPoints, directSupportingChildren[0].title ?? 'unknown');
  shapes.push(supporter);

  // const arrowPoints: number[][] = getArrowPoints([210, 300], [250, 260]);
  // todo function to get a middle point
  const arrowPoints: number[][] = getArrowPoints(rootShape.points[0], supporter.points[0]);

  const arrowLayer: Shape[] = [new Shape(arrowPoints, 'against')];
  shapes.push(arrowLayer[0]);

  return shapes;

  const redEdges: Shape[] = [];
  const greenEdges: Shape[] = [];
  // const nodes: Shape[] = tree.statements.map((v: Statement) => new Shape());
  // return [redEdges, greenEdges, nodes].flat();
}

export default function ArgumentTree(): JSX.Element {
  const [data, setData] = useState(DEFAULT_TREE);
  const canvasStyles: React.CSSProperties = { borderWidth: '1px', borderStyle: "solid", borderColor: "#c3c3c3" };
  const textBox = new Shape(rectangleCorners, 'test');
  const [loaded, setLoaded] = useState(false);
  const newShapes: Shape[] = getShapesFromStatementTree(data);

  // todo add error handling
  useEffect(() => {
    const c: HTMLCanvasElement = document.getElementById(canvasId) as HTMLCanvasElement;
    const context: CanvasRenderingContext2D = c.getContext('2d')!;
    newShapes.forEach(s => s.draw(context));
    const clickHandler = (e: MouseEvent): void => {
      const x = e.pageX - c.offsetLeft;
      const y = e.pageY - c.offsetTop;
      newShapes.forEach(shape => {
        if (shape.interior(x, y))
          // todo here react on clicks and change the internal data structure
          shape.draw(context);
      });
    };
    c.addEventListener('click', clickHandler)
    setLoaded(true);
    return () => {
      c.removeEventListener('click', clickHandler);
    }
  }, [])

  const sendHandler = () => {
    const url = 'http://localhost:3001/argument';
    axios.post(url, data).then((res: AxiosResponse) => {
      console.log(res.data);
    })
    console.log('clicked!');
  };

  return <>
    <p>Argument Tree</p>
    <div id={'optionsPanel'}>
      <button onClick={() => sendHandler()}> send data</button>
      <button onClick={() => console.log('shape accepted')}>Accept shape</button>
    </div>
    <canvas id={canvasId} width={600}
      height={600} style={canvasStyles}>
      Your browser does not support the HTML5 canvas tag.
    </canvas>
  </>
}