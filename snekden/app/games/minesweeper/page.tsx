"use client";
import { useEffect } from 'react';
import init, { greet } from './minesweeper_rust_lib/pkg/minesweeper';

export default function Minesweper(): JSX.Element {
  useEffect(() => {
    async function t() {
      await init().then(() => {
        greet("Stan");
      })
    }
    t();

    return () => { }
  }, [])


  return <div>
    <p>minesweeper</p>
    <div id="minesweeper-container">

    </div>
  </div>
}

