import { Statement } from "../../types/TreeOfStatements";
import { notLeaf } from "./notLeaf";
import { SideTreeElement } from "./SideTreeElement";

export function SideSubTree(props: {
  nodes: Statement[];
  pathSetter: (nodes: Statement[]) => void;
  path: Statement[];
  color?: string;
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
      {props.nodes.filter(notLeaf).map((n) => {
        const unrolled: boolean = props.path.includes(n);
        return (
          <SideTreeElement
            thing={n}
            pathSetter={props.pathSetter}
            unrolled={unrolled}
            path={props.path}
          />
        );
      })}
    </div>
  );
}
