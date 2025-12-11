import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3001";

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
});

// Error logging for any connection issues
socket.on("connect_error", (error) => {
  console.error("Socket connection error:", error.message);
});

socket.on("reconnect_failed", () => {
  console.error("Socket reconnection failed after maximum attempts");
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

export const isSocketConnected = () => socket.connected;
