const express = require('express');
const router = express.Router();
const Hall = require('../models/Hall');
const { requireAdmin } = require('../middleware/auth');

// ─── Get all halls (public — shown on homepage) ───────────────────────────────
router.get('/', async (req, res) => {
  try {
    const halls = await Hall.find();
    res.json(halls);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch halls.' });
  }
});

// ─── Create a hall (admin only) ───────────────────────────────────────────────
router.post('/', requireAdmin, async (req, res) => {
  const { title, capacity, ac, description, image, amenities } = req.body;
  const hall = new Hall({
    title,
    capacity,
    ac: !!ac,
    description,
    image: image || '',
    amenities: amenities || [],
    bookedSlots: []
  });
  try {
    const newHall = await hall.save();
    res.status(201).json(newHall);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create hall.' });
  }
});

// ─── Update a hall (admin only) ───────────────────────────────────────────────
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const hall = await Hall.findById(req.params.id);
    if (!hall) return res.status(404).json({ message: 'Hall not found.' });

    if (req.body.title !== undefined) hall.title = req.body.title;
    if (req.body.capacity !== undefined) hall.capacity = req.body.capacity;
    if (req.body.ac !== undefined) hall.ac = !!req.body.ac;
    if (req.body.description !== undefined) hall.description = req.body.description;
    if (req.body.image !== undefined) hall.image = req.body.image;
    if (req.body.amenities !== undefined) hall.amenities = req.body.amenities;

    const updatedHall = await hall.save();
    res.json(updatedHall);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update hall.' });
  }
});

// ─── Delete a hall (admin only) ───────────────────────────────────────────────
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const hall = await Hall.findById(req.params.id);
    if (!hall) return res.status(404).json({ message: 'Hall not found.' });
    await hall.deleteOne();
    res.json({ message: 'Hall deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete hall.' });
  }
});

module.exports = router;
