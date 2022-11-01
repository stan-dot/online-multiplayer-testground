import { StatementModificationCallbacksObject } from "../../types/StatementModificationCallbacksObject";
import { Statement } from "../../types/TopicTypes";
import { fireAddChildPopup } from "../alerts/AddChildPopup";
import { fireDeletePopup } from "../alerts/DeletePopup";
import { fireEditPopup } from "../alerts/EditPopup";
import { getContextMenuStyles } from "./getContextMenuStyles";

const basicNodes: string[] = [
  "root"
];

export function SidePanelContextMenu(
  props: {
    thing: Statement;
    position: number[];
    closeCallback: () => void;
    callbacks: StatementModificationCallbacksObject;
    id: string;
  },
): JSX.Element {
  const isProtected: boolean = basicNodes.includes(props.thing.title);

  const styles = getContextMenuStyles(props.position);
  return (
    <div
      id="sidePanelContextMenu"
      className="contextMenu"
      style={styles}
      onBlur={() => props.closeCallback()}
    >
      <div className="group1">
        <button
          disabled={isProtected}
          onClick={(e) => {
            e.preventDefault();
            fireEditPopup(props.thing, props.callbacks);
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
            fireDeletePopup(props.thing, props.callbacks);
            props.closeCallback();
          }}
          style={{ width: "100%", textAlign: "left" }}
        >
          <p>Delete</p>
        </button>
        <button
          onClick={() => fireAddChildPopup(props.thing, props.callbacks)}
          style={{ textAlign: "left", width: "fit-content" }}
        >
          <p>Add a child statement</p>
        </button>
      </div>
    </div >
  );
}
