const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ bookingDate: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new booking request
router.post('/', async (req, res) => {
  const booking = new Booking({
    id: req.body.id,
    hallName: req.body.hallName,
    date: req.body.date,
    timeSlots: req.body.timeSlots,
    staffInformation: req.body.staffInformation,
    eventInformation: req.body.eventInformation,
    status: 'Pending'
  });

  try {
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update booking request status (Approve/Reject)
router.patch('/:id', async (req, res) => {
  try {
    const booking = await Booking.findOne({ id: req.params.id });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (req.body.status) {
      booking.status = req.body.status;
    }
    if (req.body.rejectionReason !== undefined) {
      booking.rejectionReason = req.body.rejectionReason;
    }

    const updated = await booking.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
