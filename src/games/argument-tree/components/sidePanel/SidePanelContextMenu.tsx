import { useState } from "react";
import { StatementModificationCallbacksObject } from "../../types/StatementModificationCallbacksObject";
import { Statement } from "../../types/TopicTypes";
import { sendTestSvalAlert } from "../alerts/TestAlert";

const basicNodes: string[] = [
  "root", "Other bookmarks", "Mobile bookmarks", "Bookmarks bar"
];

function getStyles(position: number[]): React.CSSProperties {
  return {
    position: "absolute",
    left: `${position[0]}px`,
    right: `${position[1]}px`,
    zIndex: 9,
    fontSize: 10,
    border: "1px solid",
    borderColor: "#808080",
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

  // const darkGrey = "#808080";
  // const pinkish = "#db7070";
  // const [testButtonColor, setTestButtonColor] = useState(darkGrey);
  const styles = getStyles(props.position);
  return (
    <div
      id="sidePanelContextMenu"
      className="contextMenu"
      style={styles}
      onBlur={() => props.closeCallback()}
    >
      <div className="group1">
        {/* <button
          onClick={() =>
            setTestButtonColor(
              testButtonColor === darkGrey ? pinkish : darkGrey,
            )}
          style={{ backgroundColor: `${testButtonColor}` }}
        >
          test
        </button> */}
        <button
          disabled={isProtected}
          onClick={(e) => {
            e.preventDefault();
            console.log("clicked button");
            sendTestSvalAlert();
            props.closeCallback();
          }}
          style={{ width: "100%", textAlign: "left" }}
        >
          <p>Rename</p>
        </button>
        <button
          disabled={isProtected}
          onClick={(e) => {
            e.preventDefault();
            console.log("clicked button");
            sendTestSvalAlert();
            props.closeCallback();
          }}
          style={{ width: "100%", textAlign: "left" }}
        >
          <p>Delete</p>
        </button>
        <button
          onClick={() => sendTestSvalAlert()}
          style={{ textAlign: "left", width: "fit-content" }}
        >
          <p>Add a child statement</p>
        </button>
      </div>
    </div>
  );
}
