import { StatementModificationCallbacksObject } from "../../types/StatementModificationCallbacksObject";
import { Statement } from "../../types/TopicTypes";
import { SideTreeElement } from "./SideTreeElement";

export function SideSubTree(props: {
  nodes: Statement[];
  pathSetter: (nodes: Statement[]) => void;
  path: Statement[];
  color?: string;
  callbacks: StatementModificationCallbacksObject;
}): JSX.Element {
  return (
    <div
      id="sidesubtree"
      style={{
        backgroundColor: props.color ?? "#808080",
        position: "relative",
        left: "5%",
      }}
    >
      {/* {props.nodes.filter(notLeaf).map((n) => { */}
      {props.nodes.map((n, i) => {
        // const unrolled: boolean = props.path.includes(n);
        const unrolled: boolean = true;
        return (
          <SideTreeElement
            key={i}
            thing={n}
            pathSetter={props.pathSetter}
            unrolled={unrolled}
            callbacks={props.callbacks}
            path={props.path}
          />
        );
      })}
    </div>
  );
}
