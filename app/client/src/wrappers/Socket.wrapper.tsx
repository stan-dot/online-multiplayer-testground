import React, { ReactElement, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { socketUrl, socketOptions } from '../utils/socketOptions';

export const SocketContext: React.Context<Socket<any, any>> = React.createContext({} as Socket);

/**
 * Connects to sockets
 * @param props children that get the provided socket
 * @returns
 */
export function SocketWrapper(props: {
  children: any;
  socket?: any;
}): ReactElement {
  const [socket, setSocket] = React.useState(props.socket || null);

  useEffect(() => {
    const socket = io(socketUrl, socketOptions);
    socket?.on('connect_error', (err: { message: any }) => {
      console.log(`connect_error due to ${err.message}`);
    });
    socket?.emit('hello');
    socket?.on('message', (message: any) => {
      /* istanbul ignore next */
      console.log('message from the backend', message);
    });
    setSocket(socket);
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

  useEffect(() => {
    console.log('socket has been updated', socket);
    socket?.emit('hello', '');
  }, [socket]);

  return socket ? (
    <SocketContext.Provider value={socket} data-cy="socket-context-provider">
      {props.children}
    </SocketContext.Provider>
  ) : (
    <div>
      <h4>disconnected</h4>
      {props.children}
    </div>
  );
}
