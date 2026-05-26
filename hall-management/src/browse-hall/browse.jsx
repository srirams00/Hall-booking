import React from "react";
import "./browse.css";

import {
  FaLocationDot,
  FaDollarSign,
  FaUsers,
  FaCalendar,
  FaChevronDown,
  FaStar,
  FaMagnifyingGlass,
} from "react-icons/fa6";

const venues = [
  {
    id: 1,
    name: "Grand Ballroom Palace",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Sri Muthaiayya Mahal",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Garden Vista Venue",
    image:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Crystal Conference Hall",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Sri Muthaiayya Mahal",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Grand Ballroom Palace",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Garden Vista Venue",
    image:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Crystal Conference Hall",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop",
  },
];

const Browse = () => {
  return (
    <div className="browse-container">
      {/* NAVBAR */}

      <nav className="navbar">
        <div className="logo">
          Venue<span>Hub</span>
        </div>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/">Browse Venues</a>
          <a href="/">About us</a>
          <a href="/">Contact</a>
          <a href="/">Login</a>

          <button className="signup-btn">Signup</button>
        </div>
      </nav>

      {/* FILTERS */}

      <div className="filter-container">
        <div className="filter-box">
          <div className="filter-left">
            <FaLocationDot />
            <span>All Locations</span>
          </div>

          <FaChevronDown />
        </div>

        <div className="filter-box">
          <div className="filter-left">
            <FaDollarSign />
            <span>Any Price</span>
          </div>

          <FaChevronDown />
        </div>

        <div className="filter-box">
          <div className="filter-left">
            <FaUsers />
            <span>Any Capacity</span>
          </div>

          <FaChevronDown />
        </div>

        <div className="filter-box">
          <div className="filter-left">
            <FaCalendar />
            <span>All Events</span>
          </div>

          <FaChevronDown />
        </div>

        <div className="filter-box">
          <div className="filter-left">
            <FaStar />
            <span>All Amenities</span>
          </div>

          <FaChevronDown />
        </div>
      </div>

      {/* SEARCH */}

      <div className="search-section">
        <p>
          Showing <strong>24</strong> results for your criteria
        </p>

        <div className="search-box">
          <FaMagnifyingGlass />
          <input type="text" placeholder="Search venues..." />
        </div>
      </div>

      {/* CARDS */}

      <div className="venue-grid">
        {venues.map((venue) => (
          <div className="card" key={venue.id}>
            <img src={venue.image} alt={venue.name} />

            <div className="card-content">
              <h3>{venue.name}</h3>

              <div className="location">
                <FaLocationDot />
                <span>Midtown Manhattan, Tamil Nadu</span>
              </div>

              <div className="rating">
                <FaStar className="star-icon" />
                <span>4.8 (121 reviews)</span>
              </div>

              <div className="price">
                ₹8000 <span>/day</span>
              </div>

              <div className="tags">
                <span className="tag">200 Guests</span>
                <span className="tag">50 Parking</span>
              </div>

              <button className="view-btn">View Availability</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;