import React from 'react';
import { HalfBoard } from '../engine/types/boardTypes';
import { HuzbaoGameState } from '../engine/types/boardTypes';
import { PlayerSignature } from '../engine/types/PlayerSignature';

export function PlayingArea(props: { game: HuzbaoGameState, opponent: PlayerSignature, self: PlayerSignature }) {
  // let's try with buttons, but it should be canvas tbh
  const opBoard: HalfBoard = props.game.opponentBoard;
  const ownBoard: HalfBoard = props.game.ownBoard;

  return <div id='huzbao-background'>
    <p>can play on any image from the internet</p>
    <div id='huzbao-board'>
      here state of the board and interactyivty
      <div id='opponent'>
        <p> here opponent's board</p>
        <div>
          <p> op backline </p>
          {/* <LineReady line={opBoard.backline} /> */}
        </div>
        <div>
          <p> op frontline</p>
          {/* <LineReady line={opBoard.frontline} /> */}
        </div>
      </div>
      <div id='self'>
        <p> here your board</p>
        <div>
          <p> op frontline</p>
          {/* <LineReady line={ownBoard.frontline} /> */}
        </div>
        <div>
          <p> ur backline</p>
          {/* <LineReady line={ownBoard.backline} /> */}
        </div>
      </div>
    </div>
  </div>
}

// todo on click you need to indicate direction? drag and drop?
function LineReady(props: { line: number[], callback: Function }) {
  return <div>
    {props.line.map((v, i) => {
      return < button onClick={props.callback(i)} >
        {v}
      </button>
    })}
  </div >
}