import React from "react";
import { Statement } from "../../types/TopicTypes";
import { SideSubTree } from "./SideSubTree";

const rootSideTreeStyles: React.CSSProperties = {
  position: "absolute",
  left: "20px",
  top: "100px",
  overflow: 'scroll',
  overflowX: 'scroll',
  overflowY: 'scroll',
  minWidth: '200px'
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
  },
): JSX.Element {
  console.log('tree in the side tree', props.tree.map(v => v.title));
  return (
    <div
      id="vericalHoriontalScrollArea"
      style={rootSideTreeStyles}
      className="dev-test-outline"
    >
      <SideSubTree
        nodes={props.tree}
        pathSetter={props.pathSetter}
        path={props.tree}
      />
    </div>
  );
}
