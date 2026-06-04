const mongoose = require('mongoose');
const Booking = require('./models/Booking');
require('dotenv').config();

const clearBookings = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in the environment variables');
    }
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✓ Connected to MongoDB.');

    console.log('Clearing all bookings from database...');
    const result = await Booking.deleteMany({});
    console.log(`✓ Success: Deleted ${result.deletedCount} bookings.`);

    process.exit(0);
  } catch (error) {
    console.error('✗ Error clearing bookings:', error.message);
    process.exit(1);
  }
};

clearBookings();
