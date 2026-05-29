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

const Browse = () => {

  const [selectedHall, setSelectedHall] = useState(null);

  return (

    <div className="browse-container">

      <div className="venue-grid">

        <Box
          image={jubee}
          title="JUBILEE BUILDING"
          location="Chennai, Tamil Nadu"
          guests="500 Guests"

          onViewAvailability={() =>
            setSelectedHall({
              image: jubee,
              title: "JUBILEE BUILDING",
              location: "Chennai, Tamil Nadu",
              guests: "500 Guests",
              isBooked: false,
            })
          }
        />

        <Box
          image={comAV}
          title="comAV"
          location="Near"
          guests="150 Guests"

          onViewAvailability={() =>
            setSelectedHall({
              image: comAV,
              title: "comAV",
              location: "Near",
              guests: "150 Guests",
              isBooked: false,
            })
          }
        />

        <Box
          image={lawley}
          title="LAWLEY HALL"
          location="Near"
          guests="1000 Guests"

          onViewAvailability={() =>
            setSelectedHall({
              image: lawley,
              title: "LAWLEY HALL",
              location: "Near",
              guests: "1000 Guests",
              isBooked: false,
            })
          }
        />

        <Box
          image={board_room}
          title="BOARD ROOM"
          location="Coimbatore, Tamil Nadu"
          guests="300 Guests"

          onViewAvailability={() =>
            setSelectedHall({
              image: board_room,
              title: "BOARD ROOM",
              location: "Coimbatore, Tamil Nadu",
              guests: "300 Guests",
              isBooked: true,
            })
          }
        />

        <Box
          image={sail}
          title="SAIL"
          location="Coimbatore, Tamil Nadu"
          guests="300 Guests"

          onViewAvailability={() =>
            setSelectedHall({
              image: sail,
              title: "SAIL",
              location: "Coimbatore, Tamil Nadu",
              guests: "300 Guests",
              isBooked: false,
            })
          }
        />

        <Box
          image={toulouse}
          title="TOULOUSE ARENA"
          location="Coimbatore, Tamil Nadu"
          guests="20000 Guests"

          onViewAvailability={() =>
            setSelectedHall({
              image: toulouse,
              title: "TOULOUSE ARENA",
              location: "Coimbatore, Tamil Nadu",
              guests: "20000 Guests",
              isBooked: true,
            })
          }
        />

      </div>

      {/* MODAL */}

      {
        selectedHall && (

          <Availability
            image={selectedHall.image}
            title={selectedHall.title}
            location={selectedHall.location}
            guests={selectedHall.guests}
            isBooked={selectedHall.isBooked}

            closeModal={() =>
              setSelectedHall(null)
            }
          />

        )
      }

    </div>

  );
};

export default Browse;