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
import marian from "../../assets/halls/marian-hall.JPG";
import MCA from "../../assets/halls/MCA.JPG";
import TV from "../../assets/halls/Tv-Av.JPG";

const hallsData = [
  {
    id: 1,
    image: jubee,
    title: "Jubilee Building",
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
    title: "ComAV Auditorium",
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
    title: "Lawley Hall",
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
    title: "Board Room",
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
    title: "Sail Auditorium",
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
    title: "Toulouse Arena",
    capacity: "2000 Guests",
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
    title: "Balam",
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
    image: marian,
    title: "Marian Hall",
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
    image: MCA,
    title: "MCA AV",
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
    title: "Sequirera",
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
    image: TV,
    title: "TV.AV Hall",
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
    id: 12,
    image: sail,
    title: "KPJ Hall",
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

const imageMap = {
  "jubilee": jubee,
  "comAV": comAV,
  "lawley": lawley,
  "board_room": board_room,
  "sail": sail,
  "toulouse": toulouse,
  "marian": marian,
  "MCA": MCA,
  "TV": TV
};

const getHallImage = (imageName) => {
  if (!imageName) return sail;
  if (imageMap[imageName]) return imageMap[imageName];
  return imageName;
};

const Browse = ({ currentUser, onSubmitBooking, onViewChange, bookings, halls = [] }) => {
  const [selectedHall, setSelectedHall] = useState(null);

  const activeHalls = halls.length > 0 ? halls : hallsData;

  return (
    <div className="browse-container">
      <div className="venue-grid">
        {activeHalls.map((hall) => (
          <Box
            key={hall._id || hall.id}
            image={getHallImage(hall.image)}
            title={hall.title}
            capacity={hall.capacity}
            ac={hall.ac}
            onViewAvailability={() => setSelectedHall({
              ...hall,
              image: getHallImage(hall.image)
            })}
          />
        ))}
      </div>

      {/* MODAL */}
      {selectedHall && (
        <Availability
          hallData={selectedHall}
          closeModal={() => setSelectedHall(null)}
          onSubmitBooking={onSubmitBooking}
          currentUser={currentUser}
          onViewChange={onViewChange}
          bookings={bookings}
        />
      )}
    </div>

  );
};

export default Browse;