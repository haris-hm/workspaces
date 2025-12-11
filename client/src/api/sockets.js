import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3001";

export const socket = io(SOCKET_URL, {
  autoConnect: false,
});

export const connectToWorkspace = (workspaceId) => {
  if (!socket.connected) {
    socket.connect();
  }
  socket.emit("join-workspace", workspaceId);
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};
