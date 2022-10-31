import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getLayersFromStatementTree } from "./components/canvas/getShapesFromStatementTree";
import { ChatPanel } from "./components/ChatPanel";
import { DialogWindow } from "./components/DialogWindow";
import { PathDisplay } from "./components/PathDisplay";
import { SideTree } from "./components/sidePanel/SideTree";
import { UserIcon } from "./components/svgs/UserIcon";
import { TopicCreationDialogue } from "./components/TopicCreationWindow";
import { createClickHandler } from "./data/createClickHandler";
import { DEFAULT_TREE } from "./data/DEFAULT_TREE";
import { HamburgerDisplayToggle } from "./navbar/HamburgerDisplayToggle";
import { TopicDropdown } from "./navbar/TopicDropdown";
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

function getLargestId(list: Statement[]): string {
  return list.reduce((previous: Statement, current: Statement) =>
    parseInt(current.id) > parseInt(previous.id) ? current : previous
  ).id;
}

export default function ArgumentTree(): JSX.Element {
  /**
   * data handlers
   * todo move those into a different wrapper
   */
  const [data, setData] = useState(DEFAULT_TREE);
  const [path, setPath] = useState([data.statements[0], data.statements[1]]);
  const [discussedStatement, setDiscussedStatement] = useState(
    data.statements[0],
  );
  const [largestId, setLargestId] = useState(getLargestId(data.statements));
  const [loaded, setLoaded] = useState(false);

  /**
   * visibility togglers
   * todo move these into a different wrapper
   */
  const [chatVisible, setChatVisible] = useState(true);
  const [sideTreeVisible, setSideTreeVisible] = useState(true);
  const [topicCreationOpen, setTopicCreationOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  /**
   * login details
   * todo move to a separate wrapper
   */
  const [accessToken, setAccessToken] = useState({});
  const [connectionType, setConnectionType] = useState("");
  const [refreshToken, setrefreshToken] = useState(""); // https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/
  const [loggedInProfile, setLoggedInProfile] = useState({});


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


  const deleteStatement = (id: string): void => {
    const clearArray: Statement[] = data.statements.filter(s => s.id !== id);
    setData({
      statements: clearArray,
      metadata: data.metadata
    })
  }

  const updateStatement = (s: Statement): void => {
    const changedArray: Statement[] = data.statements.map(v => v.id === s.id ? s : v);
    setData({
      statements: changedArray,
      metadata: data.metadata
    });
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
    setData(t);
  };

  // todo this can't be called on a button, but more often
  const sendHandler = () => {
    const url = "http://localhost:3001/sendargument";
    axios.post(url, data).then((res: AxiosResponse) => {
      console.log(res.data);
    });
    console.log("clicked!");
  };

  const pathSetter = (nodes: Statement[]): void => {
    console.log("new path:", nodes);
    setPath(nodes);
  };

  const canvasWidth: number = 1200 + (sideTreeVisible ? 0 : 200) +
    (chatVisible ? 0 : 300);
  const canvasHeight: number = 800 + (sideTreeVisible ? 0 : 200) +
    (chatVisible ? 0 : 300);
  const canvasStartLeft = 70 + (sideTreeVisible ? 100 : 0) +
    (chatVisible ? 100 : 0);
  const canvasStartTop = 170;
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
        <TopicDropdown
          changeTopicCallback={topicChangeCallback}
        />
        <div
          id="iconWrapper"
          style={{ width: "50px", height: "40px", border: "1px solid #8000FF" }}
        >
          <UserIcon />
        </div>
        <HamburgerDisplayToggle
          visibleState={chatVisible}
          setVisibilityCallback={setChatVisible}
        />
        <TopicCreationDialogue
          dialogOpen={topicCreationOpen}
          closeCallback={() => setTopicCreationOpen(false)}
        />
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
        <button onClick={() => console.log("shape accepted")}>
          Reform shape
        </button>
        <button onClick={() => setDialogOpen(true)}>
          Create new node
        </button>
        <PathDisplay path={path} pathChangeHandler={pathSetter} />
        <DialogWindow
          dialogOpen={dialogOpen}
          closeCallback={closeDialog}
          creationCallback={addNewStatement}
          largestId={largestId}
        />
      </div>
      <div
        id="canvasContainer"
        style={{
          position: "fixed",
          left: `${canvasStartLeft}px`,
          top: `${canvasStartTop}px`,
        }}
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
