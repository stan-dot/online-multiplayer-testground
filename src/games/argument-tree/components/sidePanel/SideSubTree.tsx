import { Statement } from "../../types/TreeOfStatements";
import { notLeaf } from "./notLeaf";
import { SideTreeElement } from "./SideTreeElement";

export function SideSubTree(props: {
  nodes: Statement[];
  pathSetter: (nodes: Statement[]) => void;
  path: Statement[];
}): JSX.Element {
  return (
    <div id="sidesubtree" style={{ position: 'relative', left: '5%' }}>
      {
        props.nodes.filter(notLeaf).map((n) => {
          const unrolled: boolean = props.path.includes(n);
          return < SideTreeElement
            thing={n}
            pathSetter={props.pathSetter}
            unrolled={unrolled}
            path={props.path} />
        })
      }
    </div >
  );
}
