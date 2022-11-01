import { StatementModificationCallbacksObject } from "../../types/StatementModificationCallbacksObject";
import { Statement } from "../../types/TopicTypes";
import { sendTestSvalAlert } from "../alerts/TestAlert";

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
        <button disabled={isProtected} onClick={() => sendTestSvalAlert()}>
          <p>Rename</p>
        </button>
        <button disabled={isProtected} onClick={() => sendTestSvalAlert()}>
          <p>Delete</p>
        </button>
        <button onClick={() => sendTestSvalAlert()}>
          <p>Add a child statement</p>
        </button>
      </div>
    </div>
  );
}
