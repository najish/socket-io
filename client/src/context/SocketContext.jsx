import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext(null);

export const SocketProvider = ({ children, token }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!token) return;

    const newSocket = io('http://localhost:5000', {
      auth: { token }, // send token for handshake auth
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
