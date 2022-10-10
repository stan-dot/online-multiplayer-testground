import React, { ComponentType, lazy, LazyExoticComponent, Suspense } from 'react';
import { Socket } from "socket.io-client";
import { Game } from "../types/Game";
import { GameCard } from "../types/GameCard";
import { GameContext, GameContextType } from "../types/GameContextType";
import { correctSocket } from "../utils/correctSocket";
import { SocketContext } from "../wrappers/Socket.wrapper";
import { ProvidedCanvas } from "./ProvidedCanvas";

export const GameField = (props: { gameCard: GameCard }): JSX.Element => {
  const card: GameCard = props.gameCard;

  if (card.options?.usesCanvas) {
    return <>
      <ProvidedCanvas
        height={card.options?.canvasHeight ?? undefined}
        width={card.options?.canvasWidth ?? undefined}
        gameCard={props.gameCard}
      />
    </>
  }

  const usesSockets: boolean = Boolean(card.options?.usesSockets);
  const socket: Socket = React.useContext(SocketContext);
  const earlyReturn: boolean = usesSockets && !correctSocket(socket);

  if (earlyReturn) return <p>Connection to the server error</p>

  const context: GameContextType = {
    socketInterface: usesSockets ? socket : undefined
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

