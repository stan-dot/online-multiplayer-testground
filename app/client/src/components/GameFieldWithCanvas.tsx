import React, { ComponentType, lazy, LazyExoticComponent, ReactElement, Suspense } from 'react';
import { Socket } from "socket.io-client";
import { Game } from "../types/Game";
import { GameCard } from "../types/GameCard";
import { GameContext, GameContextType } from "../types/GameContextType";
import { correctSocket } from "../utils/correctSocket";
import { CanvasContext, CanvasInterface } from "../wrappers/CanvasContextWrapper";
import { SocketContext } from "../wrappers/Socket.wrapper";

export const GameFieldWithCanvas = (props: { gameCard: GameCard }): ReactElement => {
  const card: GameCard = props.gameCard;
  let context: GameContextType = {} as GameContextType;

  // wrong call check
  if (!card.options?.usesCanvas) return <p>Component error</p>

  // PROVIDING SOCKETS
  const usesSockets: boolean = Boolean(card.options?.usesSockets);
  const socket: Socket = React.useContext(SocketContext);
  const earlyReturn: boolean = usesSockets && !correctSocket(socket);
  if (earlyReturn) {
    return <p>Connection to the server error</p>
  }
  context.socketInterface = usesSockets ? socket : undefined

  // PROVIDING CANVAS INTERFACE
  const canvasInterface: CanvasInterface = React.useContext(CanvasContext);
  context.canvasContext = canvasInterface ?? undefined;

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

