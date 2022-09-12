import { useState } from 'react';
import { boardVariants } from './boardVariants';
import { possibleBots } from './bot/bots';
import { ActiveHuzbaoGame } from './components/ActiveHuzbaoGame';
import {
  DEFAULT_BOARD_GENERATION,
  DEFAULT_OPPONENT,
  INITIAL_SETTINGS,
} from './defaults';
import { PlayerSignature, PlayerType } from './engine/types/PlayerSignature';
import { MenuPicker } from './MenuPicker';

export default function Huzbao(): JSX.Element {
  const [gameSettings, setGameSettings] = useState(INITIAL_SETTINGS);
  const [boardVariant, setBoardVariant] = useState(DEFAULT_BOARD_GENERATION);
  // todo make this opponent use the true object
  const [opponent, setOpponent] = useState(DEFAULT_OPPONENT);

  // todo make self player use the higher up LENS solution
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
      {gameSettings.gameIsOn ? (
        <ActiveHuzbaoGame
          variant={boardVariant}
          self={selfPlayer}
          opponent={opponent}
        />
      ) : (
        <div id="start-menu">
          <MenuPicker name='board-picker' items={boardVariants} callback={setBoardVariant} />
          <MenuPicker name='opponent-picker' items={possibleBots} callback={setOpponent} />
          <button id="start-huzbao-game" onClick={turnGameOn}>
            <p>START NEW GAME</p>
          </button>
        </div>
      )}
    </>
  );
}

