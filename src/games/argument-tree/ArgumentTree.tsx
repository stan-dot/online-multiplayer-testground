import axios, { AxiosResponse } from "axios";
import { text } from "node:stream/consumers";
import React, { Dispatch, useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  getRectangleFromStartingPoint,
  rectangleCorners,
} from "./data/constants";
import { DEFAULT_TREE } from "./data/DEFAULT_TREE";
import { DialogWindow } from "./components/DialogWindow";
import { Statement, TreeOfStatements } from "./types/TreeOfStatements";
import { Shape } from "./types/Shape";
import { ChatPanel } from "./components/ChatPanel";
import { getArrowPoints } from "./getArrowPoints";
import { SideTree } from "./components/sidePanel/SideTree";
const canvasId = "myCanvas";

const canvasStyles: React.CSSProperties = {
  left: "20%",
  top: "50px",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#c3c3c3",
};

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
  const directSupportingChildren: Statement[] = root.supportingChildren;
  const directOpposingChildren: Statement[] = root.opposingChildren;
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
  const [dialogOpen, setDialogOpen] = useState(false);

  const textBox = new Shape(rectangleCorners, "test");
  const [loaded, setLoaded] = useState(false);
  const rootId = "2";
  const newShapes: Shape[] = getShapesFromStatementTree(data, rootId);
  const [largestId, setLargestId] = useState(
    DEFAULT_TREE.statements.reduce((previous, current) =>
      parseInt(current.id) > parseInt(previous.id) ? current : previous
    ).id,
  );

  const closeDialog = () => {
    setDialogOpen(false);
  };

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
      <nav style={{ display: 'flex', flexDirection: 'row', maxHeight: '100px', top: '0px' }}>
        <h3>Argument Tree</h3>
        <p>hide tree button</p>
        <p>some navigation option</p>
        <p>another navigation option</p>
        <p>hide chat button</p>
      </nav>
      <SideTree
        tree={data.statements}
        pathSetter={function (nodes: Statement[]): void {
          throw new Error("Function not implemented.");
        }}
        path={[]}
      />
      <div id="optionsPanel" style={{ position: 'fixed', left: '220px', top: '100px' }}>
        <button onClick={() => sendHandler()}>send data</button>
        <button onClick={() => console.log("shape accepted")}>
          Accept shape
        </button>
        <button onClick={() => setDialogOpen(true)}>
          open node creation dialogue
        </button>
        <DialogWindow
          dialogOpen={dialogOpen}
          closeCallback={closeDialog}
          creationCallback={addNewStatement}
          largestId={largestId}
        />
      </div>
      <div id="canvasContainer" style={{ position: 'fixed', left: "220px", top: '150px' }}>
        <canvas id={canvasId} width={1200} height={800} style={canvasStyles}>
          Your browser does not support the HTML5 canvas tag.
        </canvas>
      </div>
      <ChatPanel
        inSupportOf={data.statements[0]}
        tree={data.statements}
        callback={addNewStatement}
      />
    </>
  );
}
