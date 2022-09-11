import React, { useState } from 'react';
import { initialSetting } from './defaults';
import { HuzbaoGameState } from './engine/types/Move';
import { PlayingArea } from './PlayingArea';
import { StatusDisplay } from './StatusDisplay';
import { HuzbaoSettings } from './types/settings';

export default function Huzbao(): JSX.Element {
  const [gameSettings, setGameSettings] = useState({ gameMode: initialSetting } as HuzbaoSettings);

  return <>
    <h2> Huzbao game</h2>
    <div id='huzbao-holder'>
      <StatusDisplay />
      <PlayingArea />
    </div>
    <div id='start-menu'>
      <div id="dropdown">
        <button id="dropbtn">Dropdown</button>
        <div id="dropdown-content">
          <a href="#">AI type 1</a>
          <a href="#">Predicting AI</a>
          <a href="#">Old AI</a>
        </div>
      </div>
      <button id='start-huzbao'>
        <p>START NEW GAME!</p>
      </button>
    </div>
  </>
}

