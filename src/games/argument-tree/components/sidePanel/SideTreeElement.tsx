import { MouseEvent, useState } from "react";
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
  //   // console.log("getting parent of the clicked element", parent);
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
  minWidth: '220px',
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
  },
): JSX.Element {
  const [position, setPosition] = useState([0, 0]);
  const [unrolled, setUnrolled] = useState(props.unrolled);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const isALeafNode: boolean = notLeaf(props.thing);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const path = getPath(props.thing);
    console.log("path: ", path);
    props.pathSetter(path);
  };

  const handleContextMenu = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    console.log("summoned the context menu on", props.thing.title);
    e.preventDefault();
    e.stopPropagation();
    setPosition([e.pageX, e.pageY]);
    setContextMenuOpen(true);
  };

  // https://www.svgrepo.com/svg/175769/down-arrow
  // todo add this
  return (
    <div
      style={sideTreeElementContainerStyles}
      id={`${props.thing.id}-side-tree-container`}
    >
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
        {contextMenuOpen &&
          (
            <SidePanelContextMenu
              thing={props.thing}
              position={position}
              closeCallback={() => setContextMenuOpen(false)}
            />
          )}
      </div>
      {unrolled && (
        <div id={`${props.thing.id}-children`}>
          <SideSubTree
            nodes={props.thing.supportingChildren!}
            pathSetter={props.pathSetter}
            path={props.path}
            color={'#FF0000'}
          />
          <SideSubTree
            nodes={props.thing.opposingChildren!}
            pathSetter={props.pathSetter}
            path={props.path}
            color={'#00FF00'}
          />
        </div>
      )}
    </div>
  );
}
