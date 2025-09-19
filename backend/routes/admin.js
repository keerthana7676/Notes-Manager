const express = require('express');
const User = require('../models/User');
const Note = require('../models/Note');
const { verifyToken, requireAdmin } = require('../middleware/auth');
const router = express.Router();

router.use(verifyToken, requireAdmin);

router.get('/users', async (req, res, next) => {
  try {
    const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) { next(err); }
});

router.get('/notes', async (req, res, next) => {
  try {
    const notes = await Note.find().populate('user', 'email name').sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) { next(err); }
});

router.delete('/notes/:id', async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    await note.remove();
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
});

module.exports = router;