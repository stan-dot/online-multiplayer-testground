import { Statement } from "../types/TopicTypes";

export function PathDisplayContextMenu(
  props: { thing: Statement; position: number[] },
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
        <p>rename button</p>
        <p>delete button</p>
      </div>
      <div className="group2">
        <p>copy path</p>
        <p>paste buton</p>
      </div>
    </div>
  );
}
