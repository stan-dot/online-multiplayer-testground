import { StatementModificationCallbacksObject } from "../../types/StatementModificationCallbacksObject";
import { Statement } from "../../types/TopicTypes";

const basicNodes: string[] = [
  "root",
];

function getStyles(position: number[]): React.CSSProperties {
  return {
    position: "absolute",
    left: `${position[0]}px`,
    right: `${position[1]}px`,
    zIndex: 3,
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
    callbacks: StatementModificationCallbacksObject;
  },
): JSX.Element {
  const isProtected: boolean = basicNodes.includes(props.thing.title);

  const styles = getStyles(props.position);
  return (
    <div
      id="sidePanelContextMenu"
      className="contextMenu"
      style={styles}
      onBlur={() => props.closeCallback()}
    >
      <div className="group1">
        <button disabled={isProtected}>
          <p>Rename</p>
        </button>
        <button disabled={isProtected}>
          <p>Delete</p>
        </button>
        <button onClick={() => console.log('adding a new statement')}>
          <p>add a child statement</p>
        </button>
      </div>
    </div>
  );
}
