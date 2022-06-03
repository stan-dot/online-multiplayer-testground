import React from "react";
import { Socket } from "socket.io-client";
import { GameContext, GameContextType } from "../../types/GameContextType";

export function readContext() {
  const gameInterface: GameContextType = React.useContext(GameContext)!;
  const renderingContext: CanvasRenderingContext2D = gameInterface.canvasContext?.renderingContext!;
  const canvas: HTMLCanvasElement = gameInterface.canvasContext?.canvas!;
  const socket: Socket = gameInterface.socketInterface!;
  return { socket, renderingContext, canvas };
}
