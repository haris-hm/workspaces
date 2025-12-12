function noteSockets(io, socket) {
  // Create a note
  socket.on("note-created", ({ workspaceId, note }) => {
    socket.to(workspaceId).emit("note-created", note);
  });

  // Update a note
  socket.on("note-updated", ({ workspaceId, note }) => {
    const modifiedNote = {
      ...note,
      updatedAt: new Date().toISOString(),
    };
    socket.to(workspaceId).emit("note-updated", modifiedNote);
  });

  // Delete a note
  socket.on("note-deleted", ({ workspaceId, noteId }) => {
    socket.to(workspaceId).emit("note-deleted", noteId);
  });
}

module.exports = noteSockets;
