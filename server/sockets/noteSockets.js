function noteSockets(io, socket) {
  // Create a note
  socket.on("note-created", ({ workspaceId, note }) => {
    socket.to(workspaceId).emit("note-created", note);
  });

  // Update a note
  socket.on("note-updated", ({ workspaceId, note }) => {
    socket.to(workspaceId).emit("note-updated", note);
  });

  // Delete a note
  socket.on("note-deleted", ({ workspaceId, noteId }) => {
    socket.to(workspaceId).emit("note-deleted", noteId);
  });
}

module.exports = noteSockets;
