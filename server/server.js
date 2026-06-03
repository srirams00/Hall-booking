const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Hall = require('./models/Hall');
require('dotenv').config();

const app = express();

// Seed function for default halls
const seedHalls = async () => {
  try {
    const count = await Hall.countDocuments();
    if (count === 0) {
      const defaultHalls = [
        {
          title: "Jubilee Building",
          capacity: "500 Guests",
          ac: true,
          description: "A magnificent grand hall perfect for large college events, conferences, and celebrations with modern infrastructure.",
          amenities: ["Projector", "Sound System", "AC", "chair Access"],
          image: "jubilee"
        },
        {
          title: "ComAV Auditorium",
          capacity: "150 Guests",
          ac: true,
          description: "Intimate auditorium suitable for seminars, workshops, and small-scale events with excellent acoustics.",
          amenities: ["Projector", "Sound System", "AC", "Stage"],
          image: "comAV"
        },
        {
          title: "Lawley Hall",
          capacity: "1000 Guests",
          ac: false,
          description: "Spacious open-air venue ideal for outdoor festivals, cultural events, and large gatherings.",
          amenities: ["Sound System", "Stage", "Open-Air"],
          image: "lawley"
        },
        {
          title: "Board Room",
          capacity: "300 Guests",
          ac: true,
          description: "Executive meeting space with conference facilities, perfect for corporate events and formal gatherings.",
          amenities: ["WiFi", "Projector", "Sound System", "AC", "Conference Table"],
          image: "board_room"
        },
        {
          title: "Sail Auditorium",
          capacity: "300 Guests",
          ac: true,
          description: "Modern venue with state-of-the-art facilities suitable for exhibitions, product launches, and networking events.",
          amenities: ["Projector", "Sound System", "AC", "Display Boards"],
          image: "sail"
        },
        {
          title: "Toulouse Arena",
          capacity: "2000 Guests",
          ac: false,
          description: "Massive outdoor arena designed for mega events, concerts, and large-scale sports events.",
          amenities: ["Sound System", "Stage", "Open-Air", "Seating"],
          image: "toulouse"
        },
        {
          title: "Balam",
          capacity: "300 Guests",
          ac: true,
          description: "Modern venue with state-of-the-art facilities suitable for exhibitions, product launches, and networking events.",
          amenities: ["Projector", "Sound System", "AC", "Display Boards"],
          image: "sail"
        },
        {
          title: "Marian Hall",
          capacity: "300 Guests",
          ac: true,
          description: "Modern venue with state-of-the-art facilities suitable for exhibitions, product launches, and networking events.",
          amenities: ["Projector", "Sound System", "AC", "Display Boards"],
          image: "marian"
        },
        {
          title: "MCA AV",
          capacity: "300 Guests",
          ac: true,
          description: "Modern venue with state-of-the-art facilities suitable for exhibitions, product launches, and networking events.",
          amenities: ["Projector", "Sound System", "AC", "Display Boards"],
          image: "MCA"
        },
        {
          title: "Sequirera",
          capacity: "300 Guests",
          ac: true,
          description: "Modern venue with state-of-the-art facilities suitable for exhibitions, product launches, and networking events.",
          amenities: ["Projector", "Sound System", "AC", "Display Boards"],
          image: "sail"
        },
        {
          title: "TV.AV Hall",
          capacity: "300 Guests",
          ac: true,
          description: "Modern venue with state-of-the-art facilities suitable for exhibitions, product launches, and networking events.",
          amenities: ["Projector", "Sound System", "AC", "Display Boards"],
          image: "TV"
        },
        {
          title: "KPJ Hall",
          capacity: "300 Guests",
          ac: true,
          description: "Modern venue with state-of-the-art facilities suitable for exhibitions, product launches, and networking events.",
          amenities: ["Projector", "Sound System", "AC", "Display Boards"],
          image: "sail"
        }
      ];
      await Hall.insertMany(defaultHalls);
      console.log('✓ Default halls seeded successfully');
    }
  } catch (err) {
    console.error('✗ Seeding halls failed:', err.message);
  }
};

// Connect Database
connectDB().then(() => {
  seedHalls();
});

// Init Middleware
app.use(cors());
app.use(express.json());

// Define API Routes
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/halls', require('./routes/hallRoutes'));

// Default API Ping
app.get('/ping', (req, res) => res.send('API Running...'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`✓ Backend server started on port ${PORT}`));
