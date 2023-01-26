"use client";
import Link from "next/link";
import { useState } from "react";
import { linkClassName } from "./navbar";


function ArrowDownSvg() {
  return (
    <svg
      className="w-4 h-4 ml-2"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 9l-7 7-7-7"
      >
      </path>
    </svg>
  );
}

export default function ProjectsRedirect() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        id="dropdownHoverButton"
        type="button"
        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={() => setOpen(!open)}
        onBlur={() => setOpen(false)}
      >
        Works In Progress
        <ArrowDownSvg />
      </button>
      <div
        id="dropdownHover"
        className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${open ? 'fixed z-20' : 'hidden'} `}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
        >
          <li>
            <Link
              href="/games/phaser-tutorial-game"
              className={linkClassName}
            >
              Phaser game
            </Link>
          </li>
          <li>
            <Link
              href="/games/userform"
              className={linkClassName}
            >
              Form
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
