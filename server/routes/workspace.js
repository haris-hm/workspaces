const express = require("express");
const router = express.Router();
const newWorkspaceCode = require("../utils/codes").newWorkspaceCode;
const Workspace = require("../models/Workspace");

// GET a specific workspace by code
router.get("/:code", async (req, res) => {
  try {
    const workspace = await Workspace.findOne({ code: req.params.code });

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    res.json(workspace);
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
