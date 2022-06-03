import React, { ComponentType, lazy, LazyExoticComponent, Suspense } from 'react';
import { Socket } from "socket.io-client";
import { Game } from "../types/Game";
import { GameCard } from "../types/GameCard";
import { GameContext, GameContextType } from "../types/GameContextType";
import { correctSocket } from "../utils/correctSocket";
import { SocketContext } from "../wrappers/Socket.wrapper";
import { CanvasContext, CanvasInterface } from "./CanvasWrapper";

export const GameField = (props: { gameCard: GameCard }) => {

  const usesSockets: boolean = Boolean(props.gameCard.options?.usesSockets);
  const socket: Socket = React.useContext(SocketContext);
  const earlyReturn: boolean = usesSockets && !correctSocket(socket);
  if (earlyReturn) {
    return <p>Connection to the server error</p>
  }
  const canvasInterface: CanvasInterface = React.useContext(CanvasContext);
  const context: GameContextType = {
    canvasContext: props.gameCard.options?.usesCanvas ? canvasInterface : undefined,
    socketInterface: usesSockets ? socket : undefined
  };

  console.log('loading the game', props.gameCard.componentName);
  const Game: LazyExoticComponent<ComponentType<Game>> =
    lazy(() => import(`../games/${props.gameCard.folder}/${props.gameCard.componentName}`));
  return (
    <div id="currentGame">
      <Suspense fallback={
        <div>
          <p>{props.gameCard.componentName}</p> is Loading...
        </div>
      }>
        <GameContext.Provider value={context}>
          <section>
            <Game />
          </section>
        </GameContext.Provider>
      </Suspense>
    </div>
  );
}

