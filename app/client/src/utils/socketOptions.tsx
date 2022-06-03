import { ManagerOptions, SocketOptions } from 'socket.io-client';

export const socketOptions: Partial<ManagerOptions & SocketOptions> = {
  rejectUnauthorized: false,
  withCredentials: true,
  reconnection: true,
  transports: ['*', 'websockets', 'polling', 'udp', 'xhr'],
  secure: false,
};
export const socketUrl: string = `wss://${window.location.hostname}:${window.location.port + 1}`;
