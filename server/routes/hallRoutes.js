const express = require('express');
const router = express.Router();
const Hall = require('../models/Hall');

// Get all halls
router.get('/', async (req, res) => {
  try {
    const halls = await Hall.find();
    res.json(halls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a hall
router.post('/', async (req, res) => {
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
    res.status(400).json({ message: err.message });
  }
});

// Update a hall
router.put('/:id', async (req, res) => {
  try {
    const hall = await Hall.findById(req.params.id);
    if (!hall) return res.status(404).json({ message: 'Hall not found' });
    
    if (req.body.title !== undefined) hall.title = req.body.title;
    if (req.body.capacity !== undefined) hall.capacity = req.body.capacity;
    if (req.body.ac !== undefined) hall.ac = !!req.body.ac;
    if (req.body.description !== undefined) hall.description = req.body.description;
    if (req.body.image !== undefined) hall.image = req.body.image;
    if (req.body.amenities !== undefined) hall.amenities = req.body.amenities;
    
    const updatedHall = await hall.save();
    res.json(updatedHall);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a hall
router.delete('/:id', async (req, res) => {
  try {
    const hall = await Hall.findById(req.params.id);
    if (!hall) return res.status(404).json({ message: 'Hall not found' });
    await hall.deleteOne();
    res.json({ message: 'Hall deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
