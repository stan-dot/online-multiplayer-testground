import { useEffect, useState } from "react";
import { Shape } from "./types/Shape";
import { starCorners, offsets, rectangleCorners, getRectangleFromStartinPoint } from "./constants";
import axios, { AxiosResponse } from "axios";

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

const downwardArrowCorners: number[][] = [
  [10, 10], // top left corner
  [20, 10], // top right corner
  [5, 30], // bottom left arrowhead corner
  [25, 30], // botton right arrowhead corner
  [15, 40], // arrowhead point
];

const red = "#FF000";
const green = "#00FF00";

function isFinal(s: Statement): boolean {
  return s.idsOpposed.length === 0 && s.idsSupported.length === 0;
}

/**
 * todo
 * identify the lowermost edge, put it on the bottom, then go up
 * @param tree 
 * @returns 
 */
function getShapesFromStatementTree(tree: TreeOfStatements): Shape[] {
  const root: Statement = tree.statements.find(isFinal)!; // todo error handling
  // recursively build tree up to some distance
  const MAX_DISTANCE = 2;
  const directSupportingChildren: Statement[] = tree.statements.filter(s => s.idsOpposed.includes(root.id));
  const directOpposingChildren: Statement[] = tree.statements.filter(s => s.idsSupported.includes(root.id));
  const STARTING_POINTS: number[] = [300, 500];
  let shapes: Shape[] = [];
  const rootPoints: number[][] = getRectangleFromStartinPoint(STARTING_POINTS);
  const grey = '#808080';
  const rootShape: Shape = new Shape(rootPoints, root.title, grey);
  shapes.push(rootShape);
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
  const shapes: Shape[] = offsets.map(o => textBox.clone(o));
  console.log(shapes);
  const canvasId = 'myCanvas';
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