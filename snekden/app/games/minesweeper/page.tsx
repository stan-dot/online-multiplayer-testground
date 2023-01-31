"use client";
import { useEffect, useState } from 'react';
import RustComponent from './components/MinesweeperComponent';
import build, { getState } from './minesweeper_rust_lib/pkg/minesweeper';
// import wasm from './minesweeper_rust_lib/pkg/minesweeper_bg.wasm';


export default function Minesweper() {
  const [state, setState] = useState("");
  // useEffect(() => {
  //   async function t() {
  //     await build().then(() => {
  //       const m = await WebAssembly.instantiate('./minesweeper_rust_lib/pkg/minesweeper');
  //       const { getState, } = m.exports;
  //       const newState = getState();
  //       console.log(newState);
  //       setState(newState);
  //       // })
  //     }
  //   t();

  //     return () => { }
  //   }, []);

  // todo maybe this better with konva
  const clickHandler = (e: any) => {
    console.log("new event: ", e);
  }

  // rerender on field
  // render should always get new state

  // text align cneter

  // todo react to right click toggleFlag(x, y);


  return <div>
    <p>minesweeper</p>
    <div className='h-[30rem] w-[24rem] grid-cols-10 m-5' id="minesweeper-container">
      {state}
    </div>
    <RustComponent number={0} />
  </div>
}

