import { MouseEvent, useState } from "react";
import { StatementModificationCallbacksObject } from "../../types/StatementModificationCallbacksObject";
import { Statement } from "../../types/TopicTypes";
import { BottomArrow } from "../svgs/BottomArrow";
import { RightArrow } from "../svgs/RightArrow";
import { notLeaf } from "./notLeaf";
import { SidePanelContextMenu } from "./SidePanelContextMenu";
import { SideSubTree } from "./SideSubTree";

function getPath(s: Statement): Statement[] {
  let output: Statement[] = [s];
  let lastNode: Statement = s;
  // while (lastNode.supportingChildren) {
  //   const parent = (lastNode.parentId);
  //   output.unshift(parent[0]);
  //   lastNode = parent[0];
  // }
  return output;
}

const WIDTH_OF_NODE = 120;
const sideTreeElementContainerStyles: React.CSSProperties = {
  display: "flex",
  width: WIDTH_OF_NODE,
  border: "1px solid",
  borderColor: "purple",
  justifyContent: "space-between",
  height: "fit-content",
  minHeight: "50px",
  minWidth: "220px",
  flexDirection: "column",
};

const sideTreeElementStyles: React.CSSProperties = {
  display: "flex",
  minWidth: WIDTH_OF_NODE,
  width: "fit-content",
  border: "1px solid",
  borderColor: "purple",
  justifyContent: "space-between",
  height: "fit-content",
  minHeight: "50px",
  flexDirection: "row",
};

const X_AXIS_CLICK_DIFF: number = 30;

/**
 * for side displaying FOLDERS ONLY
 * need to display with some offset to the fight
 * @param props
 * @returns
 */
export function SideTreeElement(
  props: {
    thing: Statement;
    pathSetter: (path: Statement[]) => void;
    unrolled: boolean;
    path: Statement[];
    callbacks: StatementModificationCallbacksObject;
  },
): JSX.Element {
  const [position, setPosition] = useState([0, 0]);
  const [unrolled, setUnrolled] = useState(props.unrolled);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const isALeafNode: boolean = notLeaf(props.thing);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const path = getPath(props.thing);
    props.pathSetter(path);
  };

  const handleContextMenu = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setPosition([e.pageX - X_AXIS_CLICK_DIFF, e.pageY]);
    setContextMenuOpen(true);
  };

  return (
    <div
      style={sideTreeElementContainerStyles}
      id={`${props.thing.id}-side-tree-container`}
      onBlur={(e) => {
        if (!e.currentTarget.firstElementChild?.contains(e.relatedTarget)) {
          setContextMenuOpen(false)
        }
      }}
    >
      {contextMenuOpen &&
        (
          <SidePanelContextMenu
            id={`${props.thing.id}-context-menu`}
            thing={props.thing}
            callbacks={props.callbacks}
            position={position}
            closeCallback={() => setContextMenuOpen(false)}
          />
        )}
      <div
        style={sideTreeElementStyles}
        id={`${props.thing.id}-side-tree-row`}
      >
        <button
          id={`${props.thing.id}-arrow`}
          onClick={(e) => setUnrolled(!unrolled)}
          style={{ visibility: isALeafNode ? "visible" : "hidden" }}
        >
          {unrolled ? <RightArrow /> : <BottomArrow />}
        </button>
        <button
          onClick={handleClick}
          onContextMenu={(e) => handleContextMenu(e)}
          style={{ width: "80%", textAlign: "left" }}
        >
          <p>{props.thing.title}</p>
        </button>

      </div>
      {unrolled && (
        <div id={`${props.thing.id}- children`}>
          <SideSubTree
            nodes={props.thing.supportingChildren!}
            pathSetter={props.pathSetter}
            path={props.path}
            callbacks={props.callbacks}
            color={"#FF0000"}
          />
          <SideSubTree
            nodes={props.thing.opposingChildren!}
            pathSetter={props.pathSetter}
            path={props.path}
            callbacks={props.callbacks}
            color={"#00FF00"}
          />
        </div>
      )}
    </div>
  );
}
