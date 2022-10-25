import { Statement } from "../../types/TreeOfStatements";

const basicNodes: string[] = [
  'root'
]

function getStyles(position: number[]): React.CSSProperties {
  return {
    position: "absolute",
    left: `${position[0]}px`,
    right: `${position[1]}px`,
    zIndex: 5,
    fontSize: 10,
    border: "1px solid",
    borderColor: "#FF0000",
    background: "solid",
    backgroundColor: "coral",
    width: "fit-content",
  };
}

export function SidePanelContextMenu(
  props: {
    thing: Statement;
    position: number[];
    closeCallback: () => void;
  },
): JSX.Element {
  const isProtected: boolean = basicNodes.includes(props.thing.title);

  const styles = getStyles(props.position);
  return (
    <div id="sidePanelContextMenu" className="contextMenu" style={styles}>
      <div className="group1">
        <button disabled={!isProtected}>
          <p>rename button</p>
        </button>
        <button disabled={!isProtected}>
          <p>delete button</p>
        </button>
      </div>
      <div className="group4">
        <button onClick={() => props.closeCallback()}>
          Close
        </button>
      </div>
    </div>
  );
}
