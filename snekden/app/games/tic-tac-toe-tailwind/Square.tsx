"use client";
import { buttonName } from "./init";
import { TicCell } from "./types";

export function Square(
  props: {
    buttonClickHandler: (cell: TicCell) => () => void;
    cell: TicCell;
  }): JSX.Element {
  const { buttonClickHandler, cell } = props;
  return (
    <button
      className={buttonName}
      onClick={buttonClickHandler(cell)}
      disabled={cell.value !== ''}
    >
      <p className="text-4xl p-2 m-2 text-cyan-100">
        {cell.value}
      </p>
    </button>
  );
}
