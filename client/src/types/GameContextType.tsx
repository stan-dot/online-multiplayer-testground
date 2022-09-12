import { createContext } from 'react';
import { CanvasInterface } from "../wrappers/CanvasContextWrapper";
import { Socket } from "socket.io-client";


export type GameContextType = {
  canvasContext?: CanvasInterface;
  socketInterface?: Socket;
  socialInterface?: any; // todo when lens
  nftInterface?: any; // todo when nfts ready
  fsInterface?: any; // todo when filesystem downloads of data ready
};

export const GameContext = createContext({} as GameContextType);
