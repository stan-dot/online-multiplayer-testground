import React from "react";
import { StatementModificationCallbacksObject } from "../../types/StatementModificationCallbacksObject";
import { Statement } from "../../types/TopicTypes";
import { SideSubTree } from "./SideSubTree";

const rootSideTreeStyles: React.CSSProperties = {
  position: "absolute",
  left: "0px",
  top: "110px",
  overflow: "scroll",
  overflowX: "scroll",
  overflowY: "scroll",
  minWidth: "200px",
};

/**
 * todo use this link for horizontal scrolling, also vertical scrolling
 * todo also resizable
 * https://codesandbox.io/s/lpjol1opmq
 * @param props
 * @returns
 */
export function SideTree(
  props: {
    tree: Statement[];
    pathSetter: (nodes: Statement[]) => void;
    path: Statement[];
    callbacks: StatementModificationCallbacksObject;
  },
): JSX.Element {
  console.log("tree in the side tree", props.tree.map((v) => v.title));
  return (
    <div
      id="vericalHoriontalScrollArea"
      style={rootSideTreeStyles}
      className="dev-test-outline"
    >
      <SideSubTree
        nodes={props.tree}
        callbacks={props.callbacks}
        pathSetter={props.pathSetter}
        path={props.tree}
      />
      {
        props.tree.length === 0
        &&
        <p>Sorry, there's no statements here</p>
      }
    </div>
  );
}
