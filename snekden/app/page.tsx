'use client';
import { useEffect } from "react";
import { config } from "./games/testgame";

export default function HomePage() {

  const game = useGame();

  return <div>
    <h1> Home Page</h1>
    <p>Some content</p>
    <div id="game-content"></div>
  </div>
}

function useGame() {
  useEffect(() => {
    const game = new Phaser.Game({ ...config, parent: 'game-content' });
    return () => { game; };
  }, []);
}
