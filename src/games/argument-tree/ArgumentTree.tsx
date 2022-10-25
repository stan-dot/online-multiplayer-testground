import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ChatPanel } from "./components/ChatPanel";
import { DialogWindow } from "./components/DialogWindow";
import { SideTree } from "./components/sidePanel/SideTree";
import { rectangleCorners } from "./data/constants";
import { DEFAULT_TREE } from "./data/DEFAULT_TREE";
import { getShapesFromStatementTree } from "./getShapesFromStatementTree";
import { Shape } from "./types/Shape";
import { Statement, TreeOfStatements } from "./types/TreeOfStatements";
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

export default function ArgumentTree(): JSX.Element {
  const [data, setData] = useState(DEFAULT_TREE);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [path, setPath] = useState([data.statements[0], data.statements[1]]);
  const [loaded, setLoaded] = useState(false);
  const [chatVisible, setChatVisible] = useState(true);
  const [sideTreeVisible, setSideTreeVisible] = useState(true);

  const textBox = new Shape(rectangleCorners, "test");
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

  const pathSetter = (nodes: Statement[]) => {
    console.log("new path:", nodes);
    setPath(nodes);
  };

  const canvasWidth: number = 1200 + (sideTreeVisible ? 0 : 200) + (chatVisible ? 0 : 300);
  const canvasHeight: number = 800 + (sideTreeVisible ? 0 : 200) + (chatVisible ? 0 : 300);
  return (
    <>
      <nav
        style={{
          display: "flex",
          flexDirection: "row",
          maxHeight: "100px",
          top: "0px",
          justifyContent: "space-between",
        }}
      >
        <button onClick={() => setSideTreeVisible(sideTreeVisible ? false : true)}>
          <svg viewBox="0 0 100 80" width="40" height="40">
            <rect width="100" height="20"></rect>
            <rect y="30" width="100" height="20"></rect>
            <rect y="60" width="100" height="20"></rect>
          </svg>
        </button>
        <h3>Argument Tree</h3>
        <a href="https://github.com/stan-dot/online-multiplayer-testground">See website</a>
        <p>another navigation option</p>
        <button onClick={() => setChatVisible(chatVisible ? false : true)}>
          <svg viewBox="0 0 100 80" width="40" height="40">
            <rect width="100" height="20"></rect>
            <rect y="30" width="100" height="20"></rect>
            <rect y="60" width="100" height="20"></rect>
          </svg>
        </button>
      </nav>
      {sideTreeVisible &&
        (
          <SideTree
            tree={data.statements}
            pathSetter={pathSetter}
            path={path}
          />
        )}
      <div
        id="optionsPanel"
        style={{ position: "fixed", left: "220px", top: "100px" }}
      >
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
      <div
        id="canvasContainer"
        style={{ position: "fixed", left: "220px", top: "170px" }}
      >
        <canvas id={canvasId} width={canvasWidth} height={canvasHeight} style={canvasStyles}>
          Your browser does not support the HTML5 canvas tag.
        </canvas>
      </div>
      {chatVisible &&
        (
          <ChatPanel
            inSupportOf={data.statements[0]}
            tree={data.statements}
            callback={addNewStatement}
          />
        )}
    </>
  );
}
