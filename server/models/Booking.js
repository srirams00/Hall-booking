const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  hallName: { type: String, required: true },
  date: { type: String, required: true },
  timeSlots: [{ type: String, required: true }],
  staffInformation: {
    name: { type: String, required: true },
    staffId: { type: String, required: true },
    department: { type: String, required: true },
    emailId: { type: String, required: true },
    phoneNumber: { type: String, required: true }
  },
  eventInformation: {
    title: { type: String, required: true },
    expectedAudience: { type: Number, required: true }
  },
  bookingDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  rejectionReason: { type: String, default: '' }
});

module.exports = mongoose.model('Booking', BookingSchema);
