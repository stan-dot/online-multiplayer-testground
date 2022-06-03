import { Socket } from "socket.io-client";

export function correctSocket(socket: Socket): boolean {
  if (Object.getOwnPropertyNames(socket).length === 0 || socket === null || socket === undefined || !!!socket) {
    return false;
  }
  return true;
}
