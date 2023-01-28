"use client";
import { Game as GameType } from "phaser";
import { useEffect, useState } from "react";
import Preloader from "./scenes/Preloader";
import StarScene from "./scenes/StarScene";

export default function PhaserTutorialGame() {

  const game = useGame();
  return (
    <div>
      <div id="game-content" key="game-content"></div>
    </div>
  );
}

function useGame() {
  const [game, setGame] = useState<GameType>();
  async function initPhaser() {
    console.log("init phaser");
    const Phaser = (await import("phaser")).default;
    const preloader: Preloader = new (await import("./scenes/Preloader")).default;
    const scene: StarScene = new (await import("./scenes/StarScene")).default;
    console.log("finished lazy import");

    const starConfig: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      // pixelArt: true,
      parent: 'game-content',
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 300 },
          debug: false,
        },
      },
      scene: [preloader, scene],
    };

    const game = new Phaser.Game(starConfig);
    console.log("initalized game");
    setGame(game);
    console.log("finished hook");
  }
  useEffect(() => { initPhaser() }, []);
  return game;
}
