export function getContextMenuStyles(position: number[]): React.CSSProperties {
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
