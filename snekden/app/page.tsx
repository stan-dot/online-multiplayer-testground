"use client";
import { useEffect } from "react";
import { starConfig } from "./games/anotherGame";

export default function HomePage() {
  const game = useGame(starConfig);
  return <div>
    <p>Some content</p>
    <div id="game-content" ></div>
  </div>
}


function useGame(config: Phaser.Types.Core.GameConfig) {
  useEffect(() => {
    const game = new Phaser.Game({ ...config, parent: 'game-content' });
    return () => { game; };
  }, []);
}
