const express = require("express");
const router = express.Router();
const newWorkspaceCode = require("../utils/codes").newWorkspaceCode;
const Workspace = require("../models/Workspace");
const Note = require("../models/Note");

// GET all notes attached to workspace
router.get("/:code", async (req, res) => {
  try {
    const workspace = await Workspace.findOne({ code: req.params.code });
    const notes = await Note.find().where("workspaceId").equals(workspace._id);
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new workspace
router.post("/", async (req, res) => {
  try {
    const currentWorkspaceIds = await Workspace.find().select("name -_id");
    const currentWorkspaceIdSet = new Set(
      currentWorkspaceIds.map((ws) => ws.name)
    );
    const workspaceCode = newWorkspaceCode(currentWorkspaceIdSet);

    const workspace = new Workspace({
      name: req.body.name,
      code: workspaceCode,
    });

    const savedWorkspace = await workspace.save();
    res.status(201).json(savedWorkspace);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
