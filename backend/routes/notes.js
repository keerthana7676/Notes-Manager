const express = require('express');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

router.use(verifyToken);

router.post('/',
  body('title').trim().notEmpty().withMessage('Title required'),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const note = new Note({
        user: req.user._id,
        title: req.body.title,
        description: req.body.description || ''
      });
      await note.save();
      res.status(201).json(note);
    } catch (err) { next(err); }
  }
);

router.get('/', async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    if (!note.user.equals(req.user._id)) return res.status(403).json({ message: 'Not allowed' });

    if (req.body.title !== undefined) note.title = req.body.title;
    if (req.body.description !== undefined) note.description = req.body.description;
    await note.save();
    res.json(note);
  } catch (err) { next(err); }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id, // ensures user can only delete their own
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ message: "Server error while deleting note" });
  }
});

module.exports = router;