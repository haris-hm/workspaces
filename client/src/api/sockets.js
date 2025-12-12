import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3001";

/**
 * Initialize Socket.IO client with reconnection settings
 */
const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
});

// Error logging for any potential connection issues
socket.on("connect_error", (error) => {
  console.error("Socket connection error:", error.message);
});

socket.on("reconnect_failed", () => {
  console.error("Socket reconnection failed after maximum attempts");
});

/**
 * Connect to a specific workspace via WebSocket
 * @param {String} workspaceId - ID of the workspace to connect to
 * @param {String} name - Name of the user connecting
 */
function connectToWorkspace(workspaceId, name) {
  if (!socket.connected) {
    socket.connect();
  }
  socket.emit("join-workspace", { workspaceId: workspaceId, name: name });
}

/**
 * Disconnect from the WebSocket and leave the workspace
 * @param {String} name - Name of the user disconnecting
 */
function disconnectSocket(name) {
  if (socket.connected) {
    socket.emit("leave-workspace", { name: name });
    socket.disconnect();
  }
}

/**
 * Check if the socket is currently connected
 * @returns {Boolean} - Returns true if the socket is currently connected
 */
const isSocketConnected = () => socket.connected;

export { socket, connectToWorkspace, disconnectSocket, isSocketConnected };
