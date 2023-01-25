import { createContext } from 'react';
import { Socket } from "socket.io-client";

export type GameContextType = {
  socketInterface?: Socket;
  socialInterface?: any; // todo when lens
  nftInterface?: any; // todo when nfts ready
  fsInterface?: any; // todo when filesystem downloads of data ready
};

export const GameContext = createContext({} as GameContextType);
