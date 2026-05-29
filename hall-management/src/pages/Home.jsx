import { useState } from 'react';
import './Home.css';
import Box from '../components/card-for-hall/box';
import Availability from '../components/avalibility/Availability';
import '../components/avalibility/Availability.css';

import jubee from '../assets/halls/jubilee.JPG';
import comAV from '../assets/halls/comAV.JPG';
import lawley from '../assets/halls/lawley.JPG';
import board_room from '../assets/halls/Board-Room.JPG';

const featuredHalls = [
    {
        id: 1,
        image: jubee,
        title: "JUBILEE Building",
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
];

const Home = ({ onViewChange }) => {
    const [selectedHall, setSelectedHall] = useState(null);

    return(
        <div className="home-page">
            <section className="hero">
                <div className="hero-content">
                    <span className="badge">St. Joseph's campus</span>
                    <h1 className="hero-title">
                        Campus Resource & <br />
                        <span>Hall Allocation Portal</span>
                    </h1>
                    <p className="hero-subtitle">
                        Streamlined booking system for classrooms, auditoriums, and laboratories. 
                        Request and manage campus venues with real-time availability tracking.
                    </p>

                    <div className="search-container">
                        <input 
                        type="text" 
                        placeholder="Search for Auditorium, or Lab..." 
                        className="search-input"
                        />
                        <button className="search-button">Search</button>
                    </div>

                    <div className="stats">
                        <div className="stat-card">
                            <h3>12</h3>
                            <p>Venues</p>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className='hall'>
                <div className="hall-container">
                    <div className="hall-title">
                        <h2>Campus Halls</h2>
                        <p onClick={() => onViewChange && onViewChange("browse")} style={{ cursor: 'pointer', color: '#69b1ff', fontWeight: 'bold' }}>
                            Browse all available halls →
                        </p>
                    </div> 
                    <div className="hall-filter">
                        <div className="filter-tabs">
                            <button className="tab-item active">Featured</button>
                            <button className="tab-item" onClick={() => onViewChange && onViewChange("browse")}>View All</button>
                        </div>
                    </div>
                </div>
                
                <div className="venue-grid-home">
                    {featuredHalls.map((hall) => (
                        <Box
                          key={hall.id}
                          image={hall.image}
                          title={hall.title}
                          capacity={hall.capacity}
                          ac={hall.ac}
                          onViewAvailability={() => setSelectedHall(hall)}
                        />
                    ))}
                </div>
            </section>

            {selectedHall && (
                <Availability
                  hallData={selectedHall}
                  closeModal={() => setSelectedHall(null)}
                />
            )}
        </div>
    );
};

export default Home;