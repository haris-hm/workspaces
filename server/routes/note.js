const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// GET all notes for workspace
router.get("/", async (req, res) => {
  try {
    const workspaceId = req.query.workspaceId;
    const notes = await Note.find({ workspaceId });
    return res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all notes for workspace
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    return res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new note
router.post("/", async (req, res) => {
  try {
    const note = new Note({
      workspaceId: req.body.workspaceId,
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update note
router.put("/:id", async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      content: req.body.content,
    });
    res.status(201).json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE note
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
