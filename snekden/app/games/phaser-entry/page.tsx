"use client";

import { NextPage } from 'next';
import dynamic from 'next/dynamic';

export default function PhaserEntry() {
  const PhaserGameNoSSR = dynamic(() => import('../phaser-tutorial-game/page'), {
    ssr: false,
  });
  console.log('game:', PhaserGameNoSSR);
  const PhaserGamePage: NextPage = () => <PhaserGameNoSSR />
  return PhaserGamePage;
}