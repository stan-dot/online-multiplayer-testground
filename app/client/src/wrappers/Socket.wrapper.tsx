import React, { ReactElement, useEffect } from 'react';
import { io, ManagerOptions, Socket, SocketOptions } from 'socket.io-client';

export const SocketContext: React.Context<Socket<any, any>> = React.createContext({} as Socket);

const socketOptions: Partial<ManagerOptions & SocketOptions> = {
  rejectUnauthorized: false,
  withCredentials: true,
  reconnection: true,
  transports: ['*', 'websockets', 'polling', 'udp', 'xhr'],
  secure: false,
};

/**
 * Connects to sockets
 * @param props children that get the provided socket
 * @returns
 */
export function SocketWrapper(props: {
  children: any;
  socket?: any;
}): ReactElement {

  useEffect(() => {
    const socket = io(document.baseURI, socketOptions);
    socket?.on('connect_error', (err: { message: any }) => {
      console.log(`connect_error due to ${err.message}`);
    });
    socket?.emit('hello');
    socket?.on('message', (message: any) => {
      /* istanbul ignore next */
      console.log('message from the backend', message);
    });
    return () => {
      socket?.off('message', (message: any) => {
        /* istanbul ignore next */
        console.log('message from the backend', message);
      });
      socket?.off('connect_error', (err: { message: any }) => {
        console.log(`connect_error due to ${err.message}`);
      });
    };
  }, []);

  const [socket, setSocket] = React.useState(props.socket || null);
  useEffect(() => {
    console.log('socket has been updated', socket);
    socket?.emit('hello', '');
  }, [socket]);

  return socket ? (
    <SocketContext.Provider value={socket} data-cy="socket-context-provider">
      {props.children}
    </SocketContext.Provider>
  ) : (
    <p>disconnected</p>
  );
}
