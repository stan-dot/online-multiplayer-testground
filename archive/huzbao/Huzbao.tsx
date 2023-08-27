import { useState } from 'react';
import { boardVariants } from '../../snekden/app/games/mancala/data/boardVariants';
import { possibleBots } from '../../snekden/app/games/mancala/bot/bots';
import { ActiveHuzbaoGame } from '../../snekden/app/games/mancala/components/ActiveHuzbaoGame';
import {
  DEFAULT_BOARD_GENERATION,
  DEFAULT_OPPONENT,
  INITIAL_SETTINGS,
} from './defaults';
import { PlayerSignature, PlayerType } from '../../../games/mancala/engine/types/PlayerSignature';
import { MenuPicker } from './MenuPicker';

export default function Huzbao() {
  const [gameSettings, setGameSettings] = useState(INITIAL_SETTINGS);
  const [boardVariant, setBoardVariant] = useState(DEFAULT_BOARD_GENERATION);
  const [opponent, setOpponent] = useState(DEFAULT_OPPONENT);

  const selfPlayer: PlayerSignature = {
    name: 'localhost',
    id: '0',
    type: PlayerType.HUMAN,
  };

  const turnGameOn = () =>
    setGameSettings({ gameMode: gameSettings.gameMode, gameIsOn: true });

  return (
    <>
      <h2>Huzbao</h2>
      <canvas id='canvas'>does not support</canvas>
      {/* {gameSettings.gameIsOn ? ( */}
      <ActiveHuzbaoGame
        variant={boardVariant}
        self={selfPlayer}
        opponent={opponent}
      />
      {/* ) : (

      )} */}
    </>
  );
}

function PickerMenu() {
  <div id="start-menu">
    {/* <MenuPicker name='board-picker' items={boardVariants} callback={setBoardVariant} />
    <MenuPicker name='opponent-picker' items={possibleBots} callback={setOpponent} /> */}
    <button id="start-huzbao-game"
    // onClick={turnGameOn}
    >
      <p>START NEW GAME</p>
    </button>
  </div>
}