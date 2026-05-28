import { useState } from 'react';
import './Home.css';
import Box from '../components/card-for-hall/box';
import Availability from '../components/avalibility/Availability';

import jubee from '../assets/halls/jubilee.JPG';
import comAV from '../assets/halls/comAV.JPG';
import lawley from '../assets/halls/lawley.JPG';
import board_room from '../assets/halls/Board-Room.JPG';

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
                        <div className="stat-card">
                            <h3>24/7</h3>
                            <p>Access</p>
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
                </div>
            </section>

            {selectedHall && (
                <Availability
                  image={selectedHall.image}
                  title={selectedHall.title}
                  location={selectedHall.location}
                  guests={selectedHall.guests}
                  isBooked={selectedHall.isBooked}
                  closeModal={() => setSelectedHall(null)}
                />
            )}
        </div>
    );
};

export default Home;