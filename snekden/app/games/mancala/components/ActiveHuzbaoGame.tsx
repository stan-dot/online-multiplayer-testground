import { useState } from 'react';
import { GAME_INITIAL_STATS } from '../data/startingStats';
import { HuzbaoGameState } from '../types/boardTypes';
import { PlayerSignature } from '../engine/types/PlayerSignature';
import { generateBoard } from '../generateBoard';
import { BoardGeneratorVariant } from '../types/BoardGeneratorVariant';
import { PlayingArea } from './PlayingArea';
import { StatusDisplay } from './StatusDisplay';

export function ActiveHuzbaoGame(props: {
  variant: BoardGeneratorVariant;
  opponent: PlayerSignature;
  self: PlayerSignature;
}) {
  const newGame: HuzbaoGameState = {
    ownBoard: generateBoard(props.variant),
    opponentBoard: generateBoard(props.variant),
    stats: GAME_INITIAL_STATS,
  };

  const [game, setGame] = useState(newGame);
  return (
    <div id="huzbao-holder">
      <StatusDisplay game={game} />
      <PlayingArea game={game} opponent={props.opponent} self={props.self} />
    </div>
  );
}
