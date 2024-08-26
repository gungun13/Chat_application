import { createContext, useEffect, useRef } from "react";
import io from 'socket.io-client';
import React from "react";

export const SocketContext = createContext(null);

const SocketProvider = (props) => {
    const socket=useRef(io('http://localhost:5000'));
  
  useEffect(() => {
    // Connect to the socket server when the component mounts
    socket.current = io('http://localhost:5000');
  }, []);
  console.log(socket.current);

  return (
    <SocketContext.Provider value={socket}>
      {props.children} 
    </SocketContext.Provider>
  );
}

export default SocketProvider;
