function noteSockets(io, socket) {
  // Create a note
  socket.on("note-created", ({ workspaceId, note }) => {
    io.to(workspaceId).emit("note-created", note);
  });

  // Update a note
  socket.on("note-updated", ({ workspaceId, note }) => {
    io.to(workspaceId).emit("note-updated", note);
  });

  // Delete a note
  socket.on("note-deleted", ({ workspaceId, noteId }) => {
    io.to(workspaceId).emit("note-deleted", noteId);
  });
}

module.exports = noteSockets;
