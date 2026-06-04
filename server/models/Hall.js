const mongoose = require('mongoose');

const HallSchema = new mongoose.Schema({
  title: { type: String, required: true },
  capacity: { type: String, required: true },
  ac: { type: Boolean, required: true },
  description: { type: String, required: true },
  image: { type: String, default: '' },
  amenities: [{ type: String }],
  bookedSlots: [
    {
      date: { type: String },
      slots: [{ type: String }]
    }
  ]
});

module.exports = mongoose.model('Hall', HallSchema);
