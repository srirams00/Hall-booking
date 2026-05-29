import "./browse.css";

import { useState } from "react";

import Availability from "../../components/avalibility/Availability.jsx";
import Box from "../../components/card-for-hall/box";
import jubee from "../../assets/halls/jubilee.JPG";
import comAV from "../../assets/halls/comAV.JPG";
import lawley from "../../assets/halls/lawley.JPG";
import board_room from "../../assets/halls/Board-Room.JPG";
import sail from "../../assets/halls/sail.JPG";
import toulouse from "../../assets/halls/toulouse.JPG";

// Hall data with complete information
const hallsData = [
  {
    id: 1,
    image: jubee,
    title: "JUBILEE BUILDING",
    location: "Chennai, Tamil Nadu",
    capacity: "500 Guests",
    ac: true,
    description: "A magnificent grand hall perfect for large college events, conferences, and celebrations with modern infrastructure.",
    amenities: [ "Projector",  "Sound System", "AC", "chair Access"],
    bookedSlots: [
      { date: "2026-05-30", slots: ["11:00 AM - 12:30 PM"] },
      { date: "2026-05-31", slots: ["2:00 PM - 4:00 PM", "4:00 PM - 6:00 PM"] },
      { date: "2026-06-02", slots: ["12:30 PM - 2:00 PM"] },
    ],
  },
  {
    id: 2,
    image: comAV,
    title: "COMAV AUDITORIUM",
    location: "Chennai, Tamil Nadu",
    capacity: "150 Guests",
    ac: true,
    description: "Intimate auditorium suitable for seminars, workshops, and small-scale events with excellent acoustics.",
    amenities: [ "Projector", "Sound System", "AC", "Stage"],
    bookedSlots: [
      { date: "2026-05-30", slots: ["4:00 PM - 6:00 PM"] },
    ],
  },
  {
    id: 3,
    image: lawley,
    title: "LAWLEY HALL",
    location: "Chennai, Tamil Nadu",
    capacity: "1000 Guests",
    ac: false,
    description: "Spacious open-air venue ideal for outdoor festivals, cultural events, and large gatherings.",
    amenities: [ "Sound System", "Stage", "Open-Air"],
    bookedSlots: [
      { date: "2026-05-29", slots: ["11:00 AM - 12:30 PM", "12:30 PM - 2:00 PM"] },
      { date: "2026-06-01", slots: ["2:00 PM - 4:00 PM"] },
    ],
  },
  {
    id: 4,
    image: board_room,
    title: "BOARD ROOM",
    location: "Coimbatore, Tamil Nadu",
    capacity: "300 Guests",
    ac: true,
    description: "Executive meeting space with conference facilities, perfect for corporate events and formal gatherings.",
    amenities: ["WiFi", "Projector", "Sound System", "AC", "Conference Table"],
    bookedSlots: [
      { date: "2026-05-29", slots: ["11:00 AM - 12:30 PM", "12:30 PM - 2:00 PM", "2:00 PM - 4:00 PM", "4:00 PM - 6:00 PM"] },
      { date: "2026-05-30", slots: ["11:00 AM - 12:30 PM", "12:30 PM - 2:00 PM", "2:00 PM - 4:00 PM"] },
      { date: "2026-05-31", slots: ["11:00 AM - 12:30 PM", "2:00 PM - 4:00 PM", "4:00 PM - 6:00 PM"] },
    ],
  },
  {
    id: 5,
    image: sail,
    title: "SAIL",
    location: "Coimbatore, Tamil Nadu",
    capacity: "300 Guests",
    ac: true,
    description: "Modern venue with state-of-the-art facilities suitable for exhibitions, product launches, and networking events.",
    amenities: ["Projector",  "Sound System", "AC", "Display Boards"],
    bookedSlots: [
      { date: "2026-05-31", slots: ["11:00 AM - 12:30 PM"] },
      { date: "2026-06-02", slots: ["4:00 PM - 6:00 PM"] },
    ],
  },
  {
    id: 6,
    image: toulouse,
    title: "TOULOUSE ARENA",
    location: "Coimbatore, Tamil Nadu",
    capacity: "20000 Guests",
    ac: false,
    description: "Massive outdoor arena designed for mega events, concerts, and large-scale sports events.",
    amenities: [ "Sound System", "Stage", "Open-Air", "Seating"],
    bookedSlots: [
      { date: "2026-05-29", slots: ["11:00 AM - 12:30 PM", "12:30 PM - 2:00 PM", "2:00 PM - 4:00 PM", "4:00 PM - 6:00 PM"] },
      { date: "2026-05-30", slots: ["12:30 PM - 2:00 PM", "2:00 PM - 4:00 PM", "4:00 PM - 6:00 PM"] },
      { date: "2026-05-31", slots: ["11:00 AM - 12:30 PM", "12:30 PM - 2:00 PM", "2:00 PM - 4:00 PM", "4:00 PM - 6:00 PM"] },
    ],
  },
  {
    id: 7,
    image: sail,
    title: "BALAM",
    location: "Coimbatore, Tamil Nadu",
    capacity: "300 Guests",
    ac: true,
    description: "Modern venue with state-of-the-art facilities suitable for exhibitions, product launches, and networking events.",
    amenities: ["Projector",  "Sound System", "AC", "Display Boards"],
    bookedSlots: [
      { date: "2026-05-31", slots: ["11:00 AM - 12:30 PM"] },
      { date: "2026-06-02", slots: ["4:00 PM - 6:00 PM"] },
    ],
  },
   {
    id: 8,
    image: sail,
    title: "Marian",
    location: "Coimbatore, Tamil Nadu",
    capacity: "300 Guests",
    ac: true,
    description: "Modern venue with state-of-the-art facilities suitable for exhibitions, product launches, and networking events.",
    amenities: ["Projector",  "Sound System", "AC", "Display Boards"],
    bookedSlots: [
      { date: "2026-05-31", slots: ["11:00 AM - 12:30 PM"] },
      { date: "2026-06-02", slots: ["4:00 PM - 6:00 PM"] },
    ],
  },
   {
    id: 9,
    image: sail,
    title: "MCA AV",
    location: "Coimbatore, Tamil Nadu",
    capacity: "300 Guests",
    ac: true,
    description: "Modern venue with state-of-the-art facilities suitable for exhibitions, product launches, and networking events.",
    amenities: ["Projector",  "Sound System", "AC", "Display Boards"],
    bookedSlots: [
      { date: "2026-05-31", slots: ["11:00 AM - 12:30 PM"] },
      { date: "2026-06-02", slots: ["4:00 PM - 6:00 PM"] },
    ],
  },
   {
    id: 10,
    image: sail,
    title: "SEQUIRERA",
    location: "Coimbatore, Tamil Nadu",
    capacity: "300 Guests",
    ac: true,
    description: "Modern venue with state-of-the-art facilities suitable for exhibitions, product launches, and networking events.",
    amenities: ["Projector",  "Sound System", "AC", "Display Boards"],
    bookedSlots: [
      { date: "2026-05-31", slots: ["11:00 AM - 12:30 PM"] },
      { date: "2026-06-02", slots: ["4:00 PM - 6:00 PM"] },
    ],
  },
  {
    id: 11,
    image: sail,
    title: "TV.AV Hall",
    location: "Coimbatore, Tamil Nadu",
    capacity: "300 Guests",
    ac: true,
    description: "Modern venue with state-of-the-art facilities suitable for exhibitions, product launches, and networking events.",
    amenities: ["Projector",  "Sound System", "AC", "Display Boards"],
    bookedSlots: [
      { date: "2026-05-31", slots: ["11:00 AM - 12:30 PM"] },
      { date: "2026-06-02", slots: ["4:00 PM - 6:00 PM"] },
    ],
  },
];

const Browse = () => {
  const [selectedHall, setSelectedHall] = useState(null);

  return (
    <div className="browse-container">
      <div className="venue-grid">
        {hallsData.map((hall) => (
          <Box
            key={hall.id}
            image={hall.image}
            title={hall.title}
            location={hall.location}
            capacity={hall.capacity}
            ac={hall.ac}
            onViewAvailability={() => setSelectedHall(hall)}
          />
        ))}
      </div>

      {/* MODAL */}
      {selectedHall && (
        <Availability
          hallData={selectedHall}
          closeModal={() => setSelectedHall(null)}
        />
      )}
    </div>

  );
};

export default Browse;