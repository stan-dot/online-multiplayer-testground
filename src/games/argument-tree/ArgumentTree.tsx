import axios, { AxiosResponse } from "axios";
import React, { Dispatch, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { getRectangleFromStartingPoint, rectangleCorners } from "./constants";
import { DEFAULT_TREE } from "./DEFAULT_TREE";
import { Statement, TreeOfStatements } from "./TreeOfStatements";
import { Shape } from "./types/Shape";
const canvasId = "myCanvas";

const red = "#FF000";
const green = "#00FF00";

/**
 * @param start
 * @param end
 * @param proportion how much from the end the parting point is
 * @returns
 */
function getPartPointBetweentPoints(
  start: number[],
  end: number[],
  proportion: number,
): number[] {
  return [
    start[0] + (start[0] - end[0]) / proportion,
    start[1] + (start[1] - end[1]) / proportion,
  ];
}

/**
 * todo the points need to be 7, not 3
 * need to add 4 more points
 * @param fromPoint
 * @param targetPoint
 * @returns
 */
function getArrowPoints(
  fromPoint: number[],
  targetPoint: number[],
): number[][] {
  const output: number[][] = [fromPoint]; // that is bottom right
  const radius = 15;
  const xCenter = targetPoint[0];
  const yCenter = targetPoint[1];

  let angle1 = Math.atan2(
    targetPoint[1] - fromPoint[1],
    targetPoint[0] - fromPoint[0],
  );
  const getNewX = (a: number) => radius * Math.cos(a) + xCenter;
  const getNewY = (a: number) => radius * Math.sin(a) + yCenter;
  const updateAngle = (a: number): number => (a += (1.0 / 3.0) * (2 * Math.PI));
  const angle2 = updateAngle(angle1);
  const point2 = [getNewX(angle2), getNewY(angle2)]; // toprightmost
  output.push(point2);

  const ARROW_PROPORTION = 8;

  // 1/8th of the distance from the end , just on the way
  const cruxPoint = getPartPointBetweentPoints(
    fromPoint,
    targetPoint,
    ARROW_PROPORTION,
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
      PERPENDICULAR_COSINE * linearCoefficient[0] * SPIKE_POINT_DISTANCE,
    ),
    cruxPoint[1] +
    Math.abs(
      PERPENDICULAR_COSINE * linearCoefficient[1] * SPIKE_POINT_DISTANCE,
    ),
  ]; // 5 pixels outwards from the internal point
  output.push(rightSpikePoint);

  const rightInternalPoint: number[] = [
    cruxPoint[0] +
    Math.abs(
      PERPENDICULAR_COSINE * linearCoefficient[0] * INTERNAL_POINT_DISTANCE,
    ),
    cruxPoint[1] +
    Math.abs(
      PERPENDICULAR_COSINE * linearCoefficient[1] * INTERNAL_POINT_DISTANCE,
    ),
  ];
  output.push(rightInternalPoint);

  const angle3 = updateAngle(angle2);
  const point3 = [getNewX(angle3), getNewY(angle3)]; // leftmost
  output.push(point3);
  const leftInternalPoint: number[] = [
    cruxPoint[0] -
    Math.abs(
      PERPENDICULAR_COSINE * linearCoefficient[0] * INTERNAL_POINT_DISTANCE,
    ),
    cruxPoint[1] -
    Math.abs(
      PERPENDICULAR_COSINE * linearCoefficient[1] * INTERNAL_POINT_DISTANCE,
    ),
  ]; // 1/8th of the distance from the end , just on the way
  output.push(leftInternalPoint);
  const leftSpikePoint: number[] = [
    cruxPoint[0] -
    Math.abs(
      PERPENDICULAR_COSINE * linearCoefficient[0] * SPIKE_POINT_DISTANCE,
    ),
    cruxPoint[1] -
    Math.abs(
      PERPENDICULAR_COSINE * linearCoefficient[1] * SPIKE_POINT_DISTANCE,
    ),
  ]; // 5 pixels outwards from the internal point
  output.push(leftSpikePoint);
  console.log(output);
  return output;
}

type Layer = {
  height: number;
  width: number;
  color: string;
  shapes: Shape[];
};

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
function getShapesFromStatementTree(
  tree: TreeOfStatements,
  rootId: string,
  distance?: number,
): Shape[] {
  const root: Statement = tree.statements.find((s) => s.id === rootId) ||
    tree.statements[0];
  // recursively build tree up to some distance
  const MAX_DISTANCE = 2;
  const directSupportingChildren: Statement[] = tree.statements.filter((s) =>
    s.supportingChildren.includes(root.id)
  );
  const directOpposingChildren: Statement[] = tree.statements.filter((s) =>
    s.opposingChildren.includes(root.id)
  );
  const STARTING_POINTS: number[] = [400, 600];
  let shapes: Shape[] = [];
  const rootPoints: number[][] = getRectangleFromStartingPoint(STARTING_POINTS);
  const grey = "#808080";
  const rootShape: Shape = new Shape(rootPoints, root.title, grey);
  shapes.push(rootShape);
  // const testArrow: Shape = new Shape(downwardArrowCorners, 'supports');
  // shapes.push(testArrow);
  // todo add layer differences

  console.log(directSupportingChildren);
  console.log(directOpposingChildren);
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

export default function ArgumentTree(): JSX.Element {
  const [data, setData] = useState(DEFAULT_TREE);
  const [dialogOpen, setdialogOpen] = useState(false);
  const canvasStyles: React.CSSProperties = {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#c3c3c3",
  };
  const textBox = new Shape(rectangleCorners, "test");
  const [loaded, setLoaded] = useState(false);
  const rootId = "2";
  const newShapes: Shape[] = getShapesFromStatementTree(data, rootId);
  const [largestId, setLargestId] = useState(
    DEFAULT_TREE.statements.reduce((previous, current) =>
      parseInt(current.id) > parseInt(previous.id) ? current : previous
    ).id,
  );

  const addNewStatement = (s: Statement): void => {
    const validSupportIds: boolean = true;
    if (!validSupportIds) {
      Swal.fire({
        title: "Error!",
        text: "Do you want to continue",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
    const joined: TreeOfStatements = {
      statements: data.statements.concat(s),
    };
    setData(joined);
  };

  // todo add error handling
  useEffect(() => {
    const c: HTMLCanvasElement = document.getElementById(
      canvasId,
    ) as HTMLCanvasElement;
    const context: CanvasRenderingContext2D = c.getContext("2d")!;
    newShapes.forEach((s) => s.draw(context));
    const clickHandler = (e: MouseEvent): void => {
      const x = e.pageX - c.offsetLeft;
      const y = e.pageY - c.offsetTop;
      newShapes.forEach((shape) => {
        if (shape.interior(x, y)) {
          // todo here react on clicks and change the internal data structure
          shape.draw(context);
        }
      });
    };
    c.addEventListener("click", clickHandler);
    setLoaded(true);
    return () => {
      c.removeEventListener("click", clickHandler);
    };
  }, []);

  const sendHandler = () => {
    const url = "http://localhost:3001/argument";
    axios.post(url, data).then((res: AxiosResponse) => {
      console.log(res.data);
    });
    console.log("clicked!");
  };

  return (
    <>
      <p>Argument Tree</p>
      <div id={"optionsPanel"}>
        <button onClick={() => sendHandler()}>send data</button>
        <button onClick={() => console.log("shape accepted")}>
          Accept shape
        </button>
        <button onClick={() => setdialogOpen(true)}>
          open node creation dialogue
        </button>
        <DialogWindow />
      </div>
      <div id="sidePanel">
        <ul>
          <li>option 1</li>
          <li>option 2</li>
        </ul>
      </div>
      <canvas id={canvasId} width={1200} height={800} style={canvasStyles}>
        Your browser does not support the HTML5 canvas tag.
      </canvas>
      <ChatPanel
        inSupportOf={data.statements[0]}
        tree={data.statements}
        callback={addNewStatement}
      />
    </>
  );
}

type Message = {
  text: string;
  sender: string;
  readStatus: boolean;
  id: string;
};

function DialogWindow(
  props: {
    dialogOpen: boolean;
    closeCallback: Function;
    creationCallback: (s: Statement) => void;
    largestId: string;
  },
) {
  const [newStatement, setNewStatement] = useState({} as Statement);
  const dialogStyles: React.CSSProperties = {
    position: "absolute",
    left: "10px",
    top: "10px",
    height: "300px",
    width: "300px",
    zIndex: "auto",
  };
  const textRef = React.createRef();
  const opposedIdRef = React.createRef();
  const supportedIdRef = React.createRef();

  const num: number = parseInt(props.largestId) ?? 0 + 1;
  const newId: string = num.toString();
  const handleSubmit = () => {
    const n: Statement = {
      title: textRef.current as string ?? 'empty',
      id: newId,
      supportingChildren: [],
      opposingChildren: []
    };

    props.creationCallback(n);
  }
  return (
    <dialog open={props.dialogOpen} style={dialogStyles} onSubmit={handleSubmit}>
      <form>
        <label htmlFor="title">
          Text of the statement
          <input type={"text"} id="title" ref={textRef}></input>
        </label>
        <label htmlFor="opposedId">
          write 1 id of what this claim opposes
          <input type={"text"} id="opposedId"></input>
        </label>
        <label htmlFor="supportedId">
          write 1 id of what supports this claim
          <input type={"text"} id="supportedId"></input>
        </label>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.creationCallback(newStatement);
          }}
        >
          ready
        </button>
      </form>

      <button onClick={() => props.closeCallback()}>close</button>
    </dialog>
  );
}

function ChatPanel(
  props: {
    inSupportOf: Statement;
    tree: Statement[];
    callback: (s: Statement) => void;
  },
): JSX.Element {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([] as Message[]);

  return (
    <div id="chatPanel">
      <div id="charDisplayArea">
        <div>
          <p>
            position argued:
            {props.inSupportOf.title}
          </p>
        </div>
        {messages.map((m) => {
          return (
            <div id={`text-message-${m.id}`}>
              <button onClick={() => console.log("clicked a message")}>
                m.text
              </button>
            </div>
          );
        })}
      </div>
      <div id="input area">
        <input type={"text"} placeholder={"here type a statement"}>
        </input>
        <button
          onClick={(e) => {
            const messageFromInput: Message = {
              text: input,
              sender: "ME",
              readStatus: false,
              id: `${messages[messages.length - 1].id}`,
            };
            const joined = messages.concat(messageFromInput);
            setMessages(joined);
            setInput("");
          }}
        >
          send
        </button>
      </div>
    </div>
  );
}
