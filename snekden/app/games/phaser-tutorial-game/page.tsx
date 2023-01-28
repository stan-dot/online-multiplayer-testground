"use client";
import { Game as GameType } from "phaser";
import React, { useEffect, useRef, useState } from "react";
import Preloader from "./scenes/Preloader";
import StarScene from "./scenes/StarScene";

export default function PhaserTutorialGame() {
  const parentEl = useRef<HTMLDivElement>(null);
   useGame(parentEl);
  return (
    <div>
      <div ref={parentEl} id="game-content" key="game-content" />
    </div>
  );
}

function useGame(containerRef: React.RefObject<HTMLDivElement>, config?: Phaser.Types.Core.GameConfig) {
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
      parent: containerRef.current!,
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

  useEffect(() => {
    if (!game && containerRef.current) {
      initPhaser()
    }
    return () => {
      game?.destroy(true);
    }
  });
  return game;
}
