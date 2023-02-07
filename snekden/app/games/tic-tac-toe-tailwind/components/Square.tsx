"use client";

import { TicCell } from "../game/types";

export function Square(
  props: {
    buttonClickHandler: (cell: TicCell) => void;
    cell: TicCell;
  }): JSX.Element {
  const { buttonClickHandler, cell } = props;
  return (
    <button
      className={"h-20 w-20 bg-cyan-600 m-3 grid flow-grid-row grid-rows-1 place-content-center "}
      onClick={() => buttonClickHandler(cell)}
      disabled={cell.value !== ''}
    >
      <p className="text-4xl p-2 m-2 text-cyan-100">
        {cell.value}
      </p>
    </button>
  );
}
