function noteSockets(io, socket) {
  // Create a note
  socket.on("note-created", (noteData) => {
    const workspaceId = noteData.workspaceId;
    io.to(workspaceId).emit("note-created", noteData.note);
  });

  // Update a note
  socket.on("note-updated", (noteData) => {
    const workspaceId = noteData.workspaceId;
    io.to(workspaceId).emit("note-updated", noteData.note);
  });

  // Delete a note
  socket.on("note-deleted", (noteData) => {
    const workspaceId = noteData.workspaceId;
    io.to(workspaceId).emit("note-deleted", noteData.noteId);
  });
}

module.exports = noteSockets;
