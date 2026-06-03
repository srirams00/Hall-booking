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

function parseTimeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const cleaned = timeStr.trim();
  const match12 = cleaned.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
  if (match12) {
    let hours = parseInt(match12[1], 10);
    const minutes = parseInt(match12[2], 10);
    const ampm = match12[3].toUpperCase();
    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  }
  const match24 = cleaned.match(/^(\d+):(\d+)$/);
  if (match24) {
    const hours = parseInt(match24[1], 10);
    const minutes = parseInt(match24[2], 10);
    return hours * 60 + minutes;
  }
  return 0;
}

function areSlotsOverlapping(slotA, slotB) {
  const partsA = slotA.split(" - ");
  const partsB = slotB.split(" - ");
  if (partsA.length !== 2 || partsB.length !== 2) return false;
  const startA = parseTimeToMinutes(partsA[0]);
  const endA = parseTimeToMinutes(partsA[1]);
  const startB = parseTimeToMinutes(partsB[0]);
  const endB = parseTimeToMinutes(partsB[1]);
  return startA < endB && startB < endA;
}

// Create a new booking request
router.post('/', async (req, res) => {
  const { hallName, date, timeSlots } = req.body;
  try {
    const approvedBookings = await Booking.find({
      hallName: { $regex: new RegExp(`^${hallName}$`, 'i') },
      date: date,
      status: 'Approved'
    });

    if (timeSlots && timeSlots.length > 0) {
      for (const newSlot of timeSlots) {
        for (const existingBooking of approvedBookings) {
          if (existingBooking.timeSlots) {
            for (const existingSlot of existingBooking.timeSlots) {
              if (areSlotsOverlapping(newSlot, existingSlot)) {
                return res.status(400).json({
                  message: `Already a user has booked on this time and date. (Conflict: ${existingBooking.date} from ${existingSlot})`
                });
              }
            }
          }
        }
      }
    }

    const booking = new Booking({
      id: req.body.id,
      hallName: req.body.hallName,
      date: req.body.date,
      timeSlots: req.body.timeSlots,
      staffInformation: req.body.staffInformation,
      eventInformation: req.body.eventInformation,
      status: 'Pending'
    });

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
