const members = require("../utils/updateMembers");

const addMember = members.addMember;
const removeMember = members.removeMember;

function workspaceSockets(io, socket) {
  socket.on("join-workspace", async ({ workspaceId, name }) => {
    socket.join(workspaceId);
    console.log(`Socket ${socket.id} joined workspace ${workspaceId}`);

    io.to(workspaceId).emit(
      "update-members",
      await addMember(workspaceId, socket.id, name)
    );
  });

  socket.on("leave-workspace", async () => {
    const workspaceId = socket.workspaceId;
    socket.leave(workspaceId);
    console.log(`Socket ${socket.id} left workspace ${socket.workspaceId}`);
    socket
      .to(workspaceId)
      .emit("update-members", await removeMember(socket.id, workspaceId));
  });

  socket.on("disconnect", async () => {
    const workspaceId = socket.workspaceId;

    socket
      .to(workspaceId)
      .emit("update-members", await removeMember(socket.id));

    console.log(`User ${socket.id} disconnected`);
  });
}

module.exports = workspaceSockets;
