/**
 * Handle note-related socket events such as creation, updating, and deletion.
 * @param {object} io - The Socket.IO server instance.
 * @param {object} socket - The individual socket connection.
 */
function noteSockets(io, socket) {
  socket.on("note-created", ({ workspaceId, note }) => {
    socket.to(workspaceId).emit("note-created", note);
  });

  socket.on("note-updated", ({ workspaceId, note }) => {
    const modifiedNote = {
      ...note,
      updatedAt: new Date().toISOString(),
    };
    socket.to(workspaceId).emit("note-updated", modifiedNote);
  });

  socket.on("note-deleted", ({ workspaceId, noteId }) => {
    socket.to(workspaceId).emit("note-deleted", noteId);
  });
}

module.exports = noteSockets;
