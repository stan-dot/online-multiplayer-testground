import { Game } from "../types/Game";
import React, { ComponentType, createContext, lazy, LazyExoticComponent, Suspense } from 'react';
import { GameCard } from "../types/GameCard";
import { CanvasContext, CanvasInterface } from "./CanvasWrapper";
import { SocketContext } from "../wrappers/Socket.wrapper";
import { Socket } from "socket.io-client";
import { correctSocket } from "../utils/correctSocket";

export type GameContextType = {
  canvasContext?: CanvasInterface,
  socketInterface?: Socket,
  socialInterface?: any, // todo when lens
  nftInterface?: any, // todo when nfts ready
  fsInterface?: any, // todo when filesystem downloads of data ready
}

export const GameContext = createContext({} as GameContextType);

export const GameField = (props: { gameCard: GameCard }) => {

  const usesSockets: boolean = Boolean(props.gameCard.options?.usesSockets);
  const socket: Socket = React.useContext(SocketContext);
  const earlyReturn = usesSockets && !correctSocket(socket);
  if (earlyReturn) {
    return <p>Connection to the server error</p>
  }
  const canvasInterface = React.useContext(CanvasContext);
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

