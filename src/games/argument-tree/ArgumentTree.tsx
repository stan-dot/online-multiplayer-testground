import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { CanvasContainer } from "./CanvasContainer";
import { CanvasDisplayParameters } from "./CanvasDisplayParameters";
import { getLayersFromStatementTree } from "./components/canvas/getShapesFromStatementTree";
import { StageWrapper } from "./components/canvas/StageWrapper";
import { ChatPanel } from "./components/ChatPanel";
import { DialogWindow } from "./components/DialogWindow";
import { PathDisplay } from "./components/PathDisplay";
import { SideTree } from "./components/sidePanel/SideTree";
import { HamburgerIcon } from "./components/svgs/HamburgerIcon";
import { ToggleOffIcon } from "./components/svgs/ToggleOffIcon";
import { ToggleOnIcon } from "./components/svgs/ToggleOnIcon";
import { UserIcon } from "./components/svgs/UserIcon";
import { createClickHandler, createContextClickHandler } from "./data/createClickHandler";
import { DEFAULT_TREE as DEFAULT_TOPIC } from "./data/DEFAULT_TREE";
import {
  addNewStatement,
  deleteStatement,
  getCanvasDimensions,
  getLargestId,
  updateStatement
} from "./helpers";
import { DisplayToggle } from "./navbar/DisplayToggle";
import { TopicDropdown } from "./navbar/TopicDropdown";
import { PrintImageButton } from "./PrintImageButton";
import { StatementModificationCallbacksObject } from "./types/StatementModificationCallbacksObject";
import { SubtreeLayer } from "./types/SubtreeLayer";
import { Statement, Topic } from "./types/TopicTypes";
import { AuthorizationWrapper } from "./wrappers/Authorization.wrapper";

// todo this can't be called on a button, but more often
/**
 * @returns
 */
function sendData() {
  return (data: Topic) => {
    const url = "http://localhost:3001/sendargument";
    axios.post(url, data).then((res: AxiosResponse) => {
      console.log(res.data);
    });
    console.log("clicked!");
  };
}

export default function ArgumentTree(): JSX.Element {
  /**
   * data handlers
   * todo move those into a different wrapper
   * todo consider moving metadata to a separate variable, 2 diff kinds of updates
   */
  const [data, setData] = useState(DEFAULT_TOPIC);
  const [path, setPath] = useState([data.statements[0]]);
  const [discussedStatement, setDiscussedStatement] = useState(
    data.statements[0],
  );
  const [largestId, setLargestId] = useState(getLargestId(data.statements));
  const [loaded, setLoaded] = useState(false);

  const pathSetter = (nodes: Statement[]): void => {
    console.log("new path:", nodes);
    setPath(nodes);
  };

  const topicChangeCallback = (t: Topic) => {
    setData(t);
  };

  /**
   * visibility togglers
   * todo move these into a different wrapper
   */
  const [chatVisible, setChatVisible] = useState(true);
  const [sideTreeVisible, setSideTreeVisible] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const closeDialog = () => {
    setDialogOpen(false);
  };

  /**
   * LOGIN DETAILS
   * todo move to a separate wrapper
   */
  const [accessToken, setAccessToken] = useState({});
  const [connectionType, setConnectionType] = useState("");
  const [refreshToken, setrefreshToken] = useState(""); // https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/
  const [loggedInProfile, setLoggedInProfile] = useState({});

  const rootId = "2";

  const callbacks: StatementModificationCallbacksObject = {
    delete: deleteStatement(setData, data),
    update: updateStatement(setData, data),
    add: addNewStatement(setData, data, largestId, setLargestId),
  };

  /**
   * DISPLAY CONCERNS
   */
  const displayParameters: CanvasDisplayParameters = getCanvasDimensions(sideTreeVisible, chatVisible);
  const layers: SubtreeLayer[] = getLayersFromStatementTree(data, rootId, displayParameters);

  const canvasId = "myCanvas";
  useEffect(() => {
    const c = document.getElementById(canvasId) as HTMLCanvasElement;
    const clickHandler = createClickHandler(c, layers);
    c.addEventListener("click", clickHandler);
    const contextHandler = createContextClickHandler(c, layers);
    c.addEventListener('contextmenu', contextHandler)
    setLoaded(true);
    return () => {
      c.removeEventListener("click", clickHandler);
    };
  }, [chatVisible, sideTreeVisible]);

  return (
    <div id='app' style={{ overflow: 'clip', height: document.documentElement.clientHeight }}>
      <AuthorizationWrapper>

        <nav
          style={{
            position: 'fixed',
            display: "flex",
            flexDirection: "row",
            height: "50px",
            top: "30px",
            justifyContent: "space-between",
          }}
        >
          <DisplayToggle
            visibleState={sideTreeVisible}
            setVisibilityCallback={setSideTreeVisible}
            icon={sideTreeVisible ? ToggleOnIcon() : ToggleOffIcon()}
          />
          <h3>Argument Tree</h3>
          <PrintImageButton canvasId={canvasId} />
          <TopicDropdown
            changeTopicCallback={topicChangeCallback}
          />
          <DisplayToggle
            visibleState={chatVisible}
            setVisibilityCallback={setChatVisible}
            icon={chatVisible ? ToggleOnIcon() : ToggleOffIcon()}
          />
          <DisplayToggle
            visibleState={menuVisible}
            setVisibilityCallback={setMenuVisible}
            icon={HamburgerIcon()}
            widthOverride={300}
          >
            {menuVisible ?
              <div id="menu" onBlur={(e) => {
                if (!e.currentTarget.firstElementChild?.contains(e.relatedTarget)) {
                  setMenuVisible(false)
                }
              }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  zIndex: 4,
                  height: '200px',
                  backgroundColor: 'beige',
                }}
              >
                <a href="https://github.com/stan-dot/online-multiplayer-testground">
                  See website
                </a>
                <br />
                <p>
                  <UserIcon />
                  Your Account
                </p>
              </div>
              :
              <p style={{ visibility: 'hidden' }}></p>
            }
          </DisplayToggle>
        </nav>
        {
          sideTreeVisible &&
          (
            <SideTree
              tree={data.statements}
              pathSetter={pathSetter}
              path={path}
              callbacks={callbacks}
            />
          )
        }
        <div
          id="optionsPanel"
          style={{ position: "fixed", left: "270px", top: "100px" }}
        >
          <PathDisplay
            path={path}
            pathChangeHandler={pathSetter}
            callbacks={callbacks}
          />
          <DialogWindow
            dialogOpen={dialogOpen}
            closeCallback={closeDialog}
            callbacks={callbacks}
          />
        </div>
        <CanvasContainer
          displayParameters={displayParameters}
          id={canvasId}
        />
        <StageWrapper width={200} height={200} objects={data} />
        {
          chatVisible &&
          (
            <ChatPanel
              inSupportOf={discussedStatement}
              tree={data.statements}
              callbacks={callbacks}
              largestId={largestId}
            />
          )
        }
      </AuthorizationWrapper >
    </div >
  );
}

