import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getLayersFromStatementTree } from "./components/canvas/getShapesFromStatementTree";
import { ChatPanel } from "./components/ChatPanel";
import { DialogWindow } from "./components/DialogWindow";
import { SideTree } from "./components/sidePanel/SideTree";
import { DEFAULT_TREE } from "./data/DEFAULT_TREE";
import { HamburgerDisplayToggle } from "./navbar/HamburgerDisplayToggle";
import { TopicDropdown } from "./navbar/TopicDropdown";
import { Shape } from "./types/Shape";
import { SubtreeLayer } from "./types/SubtreeLayer";
import { Statement, Topic } from "./types/TopicTypes";
const canvasId = "myCanvas";

const canvasStyles: React.CSSProperties = {
  left: "20%",
  top: "50px",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#c3c3c3",
};

function formatPath(nodes: Statement[]): string {
  return nodes.map((v) => v.title).reduce(
    (previous: string, current: string) => {
      return previous + "-" + current;
    },
    "",
  );
}

function getLargestId(list: Statement[]): string {
  return list.reduce((previous: Statement, current: Statement) =>
    parseInt(current.id) > parseInt(previous.id) ? current : previous
  ).id;
}

export default function ArgumentTree(): JSX.Element {
  const [data, setData] = useState(DEFAULT_TREE);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [path, setPath] = useState([data.statements[0], data.statements[1]]);
  const [loaded, setLoaded] = useState(false);
  const [chatVisible, setChatVisible] = useState(true);
  const [sideTreeVisible, setSideTreeVisible] = useState(true);
  const [topicListVisible, setTopicListVisible] = useState(true);
  const [discussedStatement, setDiscussedStatement] = useState(
    data.statement[0],
  );
  const [largestId, setLargestId] = useState(getLargestId(data.statements));

  const rootId = "2";

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
    const joined: Topic = {
      statements: data.statements.concat(s),
      metadata: {
        creatorsIds: ["Me", "you"],
        confirmationPercent: 0,
        tags: ["test"],
        triggerWarnings: [],
        question: "",
      },
    };
    setData(joined);
  };

  const layers: SubtreeLayer[] = getLayersFromStatementTree(data, rootId);

  useEffect(() => {
    const c: HTMLCanvasElement = document.getElementById(
      canvasId,
    ) as HTMLCanvasElement;
    const clickHandler = createClickHandler(c, layers);
    c.addEventListener("click", clickHandler);
    setLoaded(true);
    return () => {
      c.removeEventListener("click", clickHandler);
    };
  }, []);

  const topicChangeCallback = (t: Topic) => {
    setTopicListVisible(false);
    setData(t);
  };

  const sendHandler = () => {
    const url = "http://localhost:3001/sendargument";
    axios.post(url, data).then((res: AxiosResponse) => {
      console.log(res.data);
    });
    console.log("clicked!");
  };

  const pathSetter = (nodes: Statement[]) => {
    console.log("new path:", nodes);
    setPath(nodes);
  };

  const canvasWidth: number = 1200 + (sideTreeVisible ? 0 : 200) +
    (chatVisible ? 0 : 300);
  const canvasHeight: number = 800 + (sideTreeVisible ? 0 : 200) +
    (chatVisible ? 0 : 300);
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
        <HamburgerDisplayToggle
          visibleState={sideTreeVisible}
          setVisibilityCallback={setSideTreeVisible}
        />
        <h3>Argument Tree</h3>
        <a href="https://github.com/stan-dot/online-multiplayer-testground">
          See website
        </a>
        <button onClick={() => setTopicListVisible(true)}>
          Show topic selection
        </button>
        <HamburgerDisplayToggle
          visibleState={chatVisible}
          setVisibilityCallback={setChatVisible}
        />
        {topicListVisible && (
          <TopicDropdown changeTopicCallback={topicChangeCallback} />
        )}
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
        style={{ position: "fixed", left: "270px", top: "100px" }}
      >
        <button onClick={() => sendHandler()}>send data</button>
        <button onClick={() => console.log("shape accepted")}>
          Accept shape
        </button>
        <button onClick={() => setDialogOpen(true)}>
          open node creation dialogue
        </button>
        <p>
          current path:<span>{formatPath(path)}</span>
        </p>
        <DialogWindow
          dialogOpen={dialogOpen}
          closeCallback={closeDialog}
          creationCallback={addNewStatement}
          largestId={largestId}
        />
      </div>
      <div
        id="canvasContainer"
        style={{ position: "fixed", left: "270px", top: "170px" }}
      >
        <canvas
          id={canvasId}
          width={canvasWidth}
          height={canvasHeight}
          style={canvasStyles}
        >
          Your browser does not support the HTML5 canvas tag.
        </canvas>
      </div>
      {chatVisible &&
        (
          <ChatPanel
            inSupportOf={discussedStatement}
            tree={data.statements}
            addCallback={addNewStatement}
            largestId={largestId}
          />
        )}
    </>
  );
}

function createClickHandler(
  c: HTMLCanvasElement,
  layers: SubtreeLayer[],
) {
  const context: CanvasRenderingContext2D = c.getContext("2d")!;
  layers.forEach((l) => l.shapes.forEach((s) => s.draw(context)));
  const clickHandler = (e: MouseEvent): void => {
    const x = e.pageX - c.offsetLeft;
    const y = e.pageY - c.offsetTop;
    layers.forEach((layer) => {
      layer.shapes.forEach((shape) => {
        if (shape.interior(x, y)) {
          // todo here react on clicks and change the internal data structure
          shape.draw(context);
        }
      });
    });
  };
  return clickHandler;
}

