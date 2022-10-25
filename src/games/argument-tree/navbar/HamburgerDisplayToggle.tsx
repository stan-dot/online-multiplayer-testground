import React from "react";

export function HamburgerDisplayToggle(props: { setVisibilityCallback: React.Dispatch<React.SetStateAction<boolean>>; visibleState: boolean; }) {
  return <button onClick={() => props.setVisibilityCallback(props.visibleState ? false : true)}>
    <svg viewBox="0 0 100 80" width="40" height="40">
      <rect width="100" height="20"></rect>
      <rect y="30" width="100" height="20"></rect>
      <rect y="60" width="100" height="20"></rect>
    </svg>
  </button>;
}
