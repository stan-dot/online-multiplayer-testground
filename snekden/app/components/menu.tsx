"use client";

import { useState } from "react";

export function HamburgerMenu(props: {}): JSX.Element {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };
  return <button
    className="inline-flex p-3 hover:bg-green-600 rounded lg:hidden text-white ml-auto hover:text-white outline-none"
    onClick={handleClick}
  >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>;
}
