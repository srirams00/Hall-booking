import { useState, useEffect, useRef } from 'react';
import './Home.css';
import Box from '../components/card-for-hall/box';
import Availability from '../components/avalibility/Availability';
import '../components/avalibility/Availability.css';

import jubee from '../assets/halls/jubilee.JPG';
import comAV from '../assets/halls/comAV.JPG';
import lawley from '../assets/halls/lawley.JPG';
import board_room from '../assets/halls/Board-Room.JPG';
import sail from '../assets/halls/sail.JPG';
import toulouse from '../assets/halls/toulouse.JPG';
import marian from '../assets/halls/marian-hall.JPG';
import MCA from '../assets/halls/MCA.JPG';
import TV from '../assets/halls/Tv-Av.JPG';

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

const allHallsData = [
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

const Home = ({ onViewChange, onSubmitBooking, currentUser }) => {
    const [selectedHall, setSelectedHall] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const searchWrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const filteredHalls = searchQuery.trim() === ''
        ? []
        : allHallsData.filter(hall => 
            hall.title.toLowerCase().includes(searchQuery.toLowerCase())
          );

    return(
        <div className="home-page">
            <section className="hero">
                <div className="hero-bg-image" style={{ backgroundImage: `url(${lawley})` }}></div>
                <div className="hero-bg-overlay"></div>
                
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

                    <div className="search-wrapper" ref={searchWrapperRef}>
                        <div className="search-container">
                            <input 
                                type="text" 
                                placeholder="Search for Auditorium, or Lab..." 
                                className="search-input"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setShowDropdown(true);
                                }}
                                onFocus={() => setShowDropdown(true)}
                            />
                            <button 
                                className="search-button"
                                onClick={() => {
                                    if (filteredHalls.length > 0) {
                                        setSelectedHall(filteredHalls[0]);
                                        setSearchQuery('');
                                        setShowDropdown(false);
                                    }
                                }}
                            >
                                Search
                            </button>
                        </div>
                        {showDropdown && searchQuery.trim() !== '' && (
                            <div className="search-dropdown">
                                {filteredHalls.length > 0 ? (
                                    filteredHalls.map((hall) => (
                                        <div 
                                            key={hall.id} 
                                            className="search-result-item"
                                            onClick={() => {
                                                setSelectedHall(hall);
                                                setSearchQuery('');
                                                setShowDropdown(false);
                                            }}
                                        >
                                            <div className="result-info">
                                                <img src={hall.image} alt={hall.title} className="result-image" />
                                                <div className="result-details">
                                                    <span className="result-title">{hall.title}</span>
                                                    <span className="result-capacity">{hall.capacity}</span>
                                                </div>
                                            </div>
                                            <div className="result-badges">
                                                <span className={`result-badge ${hall.ac ? 'ac' : 'non-ac'}`}>
                                                    {hall.ac ? 'AC' : 'Non-AC'}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-results">No halls found matching "{searchQuery}"</div>
                                )}
                            </div>
                        )}
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
                  onSubmitBooking={onSubmitBooking}
                  currentUser={currentUser}
                  onViewChange={onViewChange}
                />
            )}
        </div>
    );
};

export default Home;