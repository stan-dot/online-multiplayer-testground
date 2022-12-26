import React from "react";

export function DisplayToggle(
  props: {
    setVisibilityCallback: React.Dispatch<React.SetStateAction<boolean>>;
    visibleState: boolean;
    icon: JSX.Element;
    children?: JSX.Element;
    widthOverride?: number;
  },
) {
  return (
    <button
      onClick={() =>
        props.setVisibilityCallback(props.visibleState ? false : true)}
      style={{ width: props.widthOverride ?? 'inherit' }}
    >
      {props.icon}
      {props.children}
    </button>
  );
}
