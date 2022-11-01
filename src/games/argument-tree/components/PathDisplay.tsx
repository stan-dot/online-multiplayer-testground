import { useEffect, useState } from "react";
import { StatementModificationCallbacksObject } from "../types/StatementModificationCallbacksObject";
import { Statement } from "../types/TopicTypes";
import { PathItem } from "./PathItem";

export function PathDisplay(props: {
  path: Statement[];
  pathChangeHandler: (nodes: Statement[]) => void;
  callbacks: StatementModificationCallbacksObject
}): JSX.Element {
  const [clickedNode, setClickedNode] = useState(props.path[0]);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);

  const handleClick = (index: number) => {
    if (index !== 0 && index !== props.path.length - 1) {
      const newPath: Statement[] = props.path.slice(
        0,
        index,
      );
      console.log("new path: ", newPath);
      props.pathChangeHandler(newPath);
    }
  };

  const upButtonHandler = () => {
    const newPath: Statement[] = props.path.slice(
      0,
      props.path.length - 1,
    );
    console.log("button up, new path: ", newPath);
    props.pathChangeHandler(newPath);
  };

  const handleContextMenuClick = (
    node: Statement,
  ): void => {
    setContextMenuVisible(true);
    setClickedNode(node);
  };

  useEffect(() => {
    setContextMenuVisible(false);
    return () => { }
  }, [clickedNode])


  return (
    <div
      id="taskbar"
      style={{
        display: "flex",
        justifyContent: "flex-start",
        minWidth: "200px",
        border: "2px solid",
        borderColor: "#FF0000",
      }}
    >
      <div id="buttonArea" style={{ position: "relative" }}>
        <button disabled={true} onClick={upButtonHandler}>
          {"<-"}
        </button>
        <button disabled={true} onClick={upButtonHandler}>
          {"->"}
        </button>
        <button disabled={props.path.length < 2} onClick={upButtonHandler}>
          [..]
        </button>
      </div>
      <div
        style={{
          border: "2px solid",
          justifyContent: "space-between",
          borderColor: "#FF0000",
          display: "flex",
        }}
      >
        {props.path.map((n, i) => (
          <PathItem
            key={i}
            handleClick={handleClick}
            index={i}
            node={n}
            callbacks={props.callbacks}
            contextMenuHandler={handleContextMenuClick}
            contextMenuVisible={n.id === clickedNode.id
              ? contextMenuVisible
              : false}
          />
        ))}
      </div>
    </div>
  );
}
