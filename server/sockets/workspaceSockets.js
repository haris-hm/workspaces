function workspaceSockets(io, socket) {
  socket.on("join-workspace", (workspaceId) => {
    socket.join(workspaceId);
    console.log(`Socket ${socket.id} joined workspace ${workspaceId}`);
  });

  socket.on("leave-workspace", () => {
    socket.leave(socket.workspaceId);
    console.log(`Socket ${socket.id} left workspace ${socket.workspaceId}`);
  });
}
