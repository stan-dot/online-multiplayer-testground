import { ComponentType, lazy, LazyExoticComponent, Suspense } from 'react';
import { Game } from "../types/Game";
import { GameCard } from "../types/GameCard";
import { GameContext, GameContextType } from "../types/GameContextType";

export const GameField = (props: { gameCard: GameCard }) => {
  const card: GameCard = props.gameCard;




  const context: GameContextType = {
  };

  // LOADING THE GAME
  console.log('loading the game', card.componentName);
  const Game: LazyExoticComponent<ComponentType<Game>> =
    lazy(() => import(`../games/${card.folder}/${card.componentName}`));

  return (
    <div id="gameField">
      <Suspense fallback={
        <div>
          <p>{card.componentName} is loading...</p>
        </div>
      }>
        <GameContext.Provider value={context}>
          <Game />
        </GameContext.Provider>
      </Suspense>
    </div>
  );
}

