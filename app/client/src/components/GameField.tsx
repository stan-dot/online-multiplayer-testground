import { Game } from "../types/Game";
import React, { ComponentType, createContext, lazy, LazyExoticComponent, Suspense } from 'react';
import { GameCard } from "../types/GameCard";

export type GameContext = {
  renderingContext?: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  socialInterface?: any,
  nftInterface?: any,
  fsInterface?: any,
}

export const gameContext = createContext({} as GameContext);

export const GameField = (props: { gameCard: GameCard }) => {
  // const [currentGame, setCurrentGame] = React.useState({} as Game);
  const Game: LazyExoticComponent<ComponentType<Game>> =
    lazy(() => import(`../games/${props.gameCard.folder}/${props.gameCard.componentName}`));
  return (
    <div id="currentGame">
      <Suspense fallback={
        <div>
          <p>{props.gameCard.componentName}</p> is Loading...
        </div>
      }>
        <section>
          <Game />
        </section>
      </Suspense>
    </div>
  );
}
