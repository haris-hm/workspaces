const Workspace = require("../models/Workspace");

async function addMember(workspaceId, socketId, memberName) {
  try {
    await Workspace.findByIdAndUpdate(workspaceId, {
      $pull: {
        members: { name: memberName },
      },
    });

    const updatedWorkspace = await Workspace.findByIdAndUpdate(
      workspaceId,
      {
        $addToSet: {
          members: {
            socketId: socketId,
            name: memberName,
          },
        },
      },
      { new: true }
    );

    if (!updatedWorkspace) {
      console.error("Workspace not found:", workspaceId);
      return [];
    }

    return updatedWorkspace.members;
  } catch (err) {
    console.error("Error updating workspace to add member:", err);
    return [];
  }
}

async function removeMember(workspaceId, socketId) {
  try {
    const updatedWorkspace = await Workspace.findByIdAndUpdate(
      workspaceId,
      {
        $pull: {
          members: { socketId: socketId },
        },
      },
      { new: true }
    );

    if (!updatedWorkspace) {
      console.error("Workspace not found:", workspaceId);
      return [];
    }

    return updatedWorkspace.members;
  } catch (err) {
    console.error("Error updating workspace to remove member:", err);
    return [];
  }
}

module.exports = { addMember, removeMember };
