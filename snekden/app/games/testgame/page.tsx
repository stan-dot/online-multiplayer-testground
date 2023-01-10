"use client";
import { useEffect } from "react";
import { starConfig } from "./anotherGame";

export default function Testgame() {
  // const game = useGame(starConfig);
  return <div>
    <p>Some content</p>
    <div id="game-content" ></div>
  </div>
}

// function useGame(config: Phaser.Types.Core.GameConfig) {
//   useEffect(() => {
//     const game = new Phaser.Game({ ...config, parent: 'game-content' });
//     return () => { game; };
//   }, []);
// }
