import React from "react";
import { Statement } from "../types/TopicTypes";


export function PathItem(
  props: {
    handleClick: (index: number) => void;
    index: number;
    node: Statement;
    contextMenuHandler: any;
  }
): JSX.Element {
  // const [position, setPosition] = useState([0, 0]);
  // const [contextMenuVisibility, setContextMenuVisibility] = useState(false);
  return (
    <div style={{ display: "flex", justifyContent: "start" }}>
      {"/"}
      <button onClick={(v) => props.handleClick(props.index)}>
        {props.node.title}
      </button>
    </div>
  );
}
