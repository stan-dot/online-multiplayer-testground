"use client";
import { useEffect, useState } from 'react';
import init, { getState } from './minesweeper_rust_lib/pkg/minesweeper';

export default function Minesweper() {
  const [state, setState] = useState("");
  useEffect(() => {
    async function t() {
      // await init().then(() => {
      const newState = getState();
      console.log(newState);
      setState(newState);
      // })
    }
    t();

    return () => { }
  }, [])

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
  </div>
}

