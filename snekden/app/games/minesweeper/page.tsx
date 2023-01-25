"use client";
import { useEffect, useState } from 'react';
import init, { greet, getState } from './minesweeper_rust_lib/pkg/minesweeper';

export default function Minesweper() {
  const [state, setState] = useState("");
  useEffect(() => {
    async function t() {
      await init().then(() => {
        greet("Stan");
        const newState = getState();
        console.log(newState);
        setState(newState);
      })
    }
    t();

    return () => { }
  }, [])

  // todo maybe this better with konva

  return <div>
    <p>minesweeper</p>
    <div className='h-[30rem] w-[24rem] m-5' id="minesweeper-container">
      {state}
    </div>
  </div>
}

