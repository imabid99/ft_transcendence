import React, { useEffect, useContext } from "react";
import { contextdata } from "../contextApi";
import { io } from "socket.io-client";


const SocketManager = () => {
  
  const {profiles, user} :any= useContext(contextdata);
  const name = `${user?.profile.firstName} ${user?.profile.lastName}`;
  const socket = io("http://localhost:3000/Game");
  
  useEffect(() => {
      socket.on("connect", () => {console.log(name + " is Connected to server");});
      socket.on("disconnect", () => {console.log(name + " is Disconnected from server");});

    }, []);

    useEffect(() => {
        socket.on("updatePosition", (position) => {
        // Broadcast the updated position to all connected clients
        socket.emit("playerPosition", position);
      });
    }, [profiles]);

  return null; 
};

export default SocketManager;

