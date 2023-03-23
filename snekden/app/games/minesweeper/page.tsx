"use client";
import { useEffect, useState } from "react";
import AddOneComponent from "./components/AddOneComponent";
import build, { getState } from "./minesweeper_rust_lib/pkg/minesweeper";
import wasm from "./minesweeper_rust_lib/pkg/minesweeper_bg.wasm";

export default function Minesweper() {
  const [state, setState] = useState("test state");

  // useEffect(() => {
  //   async function t() {
  //     const m = await WebAssembly.instantiate(
  //       "./minesweeper_rust_lib/pkg/minesweeper",
  //     ).then((module) => {
  //       const { getState } = module.exports;
  //       const newState = getState();
  //       console.log(newState);
  //       setState(newState);
  //     });
  //   }
  //   t();

  //   return () => {};
  // }, []);

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
      {/* <div
        className="h-[30rem] w-[24rem] grid-cols-10 m-5"
        id="minesweeper-container"
      >
        {state}
      </div> */}
      <AddOneComponent
        number={number}
        updateCallback={(n: number) => setNumber(n)}
      />
    </div>
  );
}
