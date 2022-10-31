import { StatementModificationCallbacksObject } from "../types/StatementModificationCallbacksObject";
import { Statement } from "../types/TopicTypes";


export function PathDisplayContextMenu(
  props: {
    node: Statement;
    position: number[];
    callbacks: StatementModificationCallbacksObject;
  },
): JSX.Element {
  const handleCopyOption = () => {
  };

  const styles: React.CSSProperties = {
    position: "absolute",
    left: `${props.position[0]}px`,
    right: `${props.position[1]}px`,
  };

  return (
    <div
      id="tableContextMenu"
      className="contextMenu"
      style={styles}
    >
      <div className="group1">
        <button onClick={() => props.callbacks.update(props.node)}>
          <p>Delete</p>
        </button>
        <button onClick={() => props.callbacks.update(props.node)}>
          <p>Paste</p>
        </button>
      </div>
      <div className="group2">
        <button onClick={() => props.callbacks.update(props.node)}>
          <p>Copy path</p>
        </button>
        <button onClick={() => props.callbacks.update(props.node)}>
          <p>Rename</p>
        </button>
      </div>
    </div>
  );
}
