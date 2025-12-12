const Workspace = require("../models/Workspace");

async function addMember(workspaceId, socketId, memberName) {
  try {
    const updatedWorkspace = await Workspace.findByIdAndUpdate(
      workspaceId,
      {
        $addToSet: {
          members: {
            socketId: socketId,
            name: memberName,
          },
        }, // Correct syntax
      },
      { new: true } // Return updated document
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

async function removeMember(socketId, workspaceId = "") {
  try {
    let updatedWorkspace;

    if (workspaceId) {
      updatedWorkspace = await Workspace.findByIdAndUpdate(
        workspaceId,
        {
          $pull: {
            members: { socketId: socketId },
          },
        },
        { new: true }
      );
    } else {
      updatedWorkspace = await Workspace.findOneAndUpdate(
        { "members.socketId": socketId },
        {
          $pull: {
            members: { socketId: socketId },
          },
        },
        { new: true }
      );
    }

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
