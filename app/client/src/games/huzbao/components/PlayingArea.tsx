import React from 'react';
import { HuzbaoGameState } from '../engine/types/boardTypes';

export function PlayingArea(props:{game: HuzbaoGameState}) {
  return <div id='huzbao-background'>
    <p>can play on any image from the internet</p>
    <div id='huzbao-board'>
      here state of the board and interactyivty
    </div>
  </div>;
}
