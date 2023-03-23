"use client";
import { useState } from "react";
import AddOneComponent from "./components/AddOneComponent";
import MinesweeperStateComponent from "./components/MinesweeperStateComponent";

export default function Minesweper() {
  const [state, setState] = useState("test state");

  const clickHandler = (e: any) => {
    console.log("new event: ", e);
  };

  // rerender on field
  // render should always get new state

  // todo react to right click toggleFlag(x, y);
  const [number, setNumber] = useState<number>(0);

  return (
    <div className="text-align-center">
      <p>minesweeper</p>
      {
        /* <div
        className="h-[30rem] w-[24rem] grid-cols-10 m-5"
        id="minesweeper-container"
      >
        {state}
      </div> */
      }
      <AddOneComponent
        number={number}
        updateCallback={(n: number) => setNumber(n)}
      />
      <MinesweeperStateComponent
        number={number}
        updateCallback={(n: number) => setNumber(n)}
      />
    </div>
  );
}
