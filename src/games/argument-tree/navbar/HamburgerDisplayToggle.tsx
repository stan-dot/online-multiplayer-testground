import React from "react";

export function DisplayToggle(props: { setVisibilityCallback: React.Dispatch<React.SetStateAction<boolean>>; visibleState: boolean; icon: JSX.Element }) {
  return <button onClick={() => props.setVisibilityCallback(props.visibleState ? false : true)}>
    {props.icon}
  </button>;
}

