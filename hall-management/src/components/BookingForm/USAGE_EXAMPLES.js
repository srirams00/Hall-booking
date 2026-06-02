/**
 * EXAMPLE USAGE: How to use the Hall Booking Form System
 * 
 * This file shows complete examples of how to integrate and use
 * the Availability and BookingForm components in your application.
 */

// =====================================================================
// EXAMPLE 1: Basic Integration in App.jsx
// =====================================================================

import React, { useState } from 'react';
import Availability from './components/avalibility/Availability';

export default function App() {
  const [showAvailability, setShowAvailability] = useState(false);

  // Sample hall data - this would typically come from an API
  const hallData = {
    id: 1,
    title: "Conference Hall A",
    capacity: "150 people",
    ac: true,
    description: "State-of-the-art conference hall with modern amenities and comfortable seating for up to 150 people.",
    image: "/halls/conference-a.jpg",
    amenities: ["Projector", "Sound System", "WiFi", "Parking", "AC"],
    bookedSlots: [
      {
        date: "2024-12-25",
        slots: ["11:00 AM - 12:30 PM", "2:00 PM - 4:00 PM"]
      },
      {
        date: "2024-12-26",
        slots: ["4:00 PM - 6:00 PM"]
      }
    ]
  };

  return (
    <div className="app-container">
      <h1>College Hall Booking System</h1>
      
      <button 
        className="book-btn"
        onClick={() => setShowAvailability(true)}
      >
        Book {hallData.title}
      </button>

      {showAvailability && (
        <Availability
          hallData={hallData}
          closeModal={() => setShowAvailability(false)}
        />
      )}
    </div>
  );
}

// =====================================================================
// EXAMPLE 2: Multiple Halls with Hall Selection
// =====================================================================

import React, { useState } from 'react';
import Availability from './components/avalibility/Availability';

export default function HallBookingPage() {
  const [selectedHall, setSelectedHall] = useState(null);

  const halls = [
    {
      id: 1,
      title: "Conference Hall A",
      capacity: "150 people",
      ac: true,
      description: "Modern conference hall with latest technology",
      image: "/halls/conference-a.jpg",
      amenities: ["Projector", "Sound System", "WiFi"],
      bookedSlots: []
    },
    {
      id: 2,
      title: "Seminar Hall B",
      capacity: "80 people",
      ac: true,
      description: "Intimate seminar hall for smaller gatherings",
      image: "/halls/seminar-b.jpg",
      amenities: ["Whiteboard", "WiFi", "Refreshment Counter"],
      bookedSlots: []
    },
    {
      id: 3,
      title: "Auditorium C",
      capacity: "500 people",
      ac: false,
      description: "Large auditorium for major events",
      image: "/halls/auditorium-c.jpg",
      amenities: ["Stage", "Projector", "Sound System"],
      bookedSlots: []
    }
  ];

  return (
    <div className="halls-grid">
      {halls.map((hall) => (
        <div key={hall.id} className="hall-card">
          <img src={hall.image} alt={hall.title} />
          <h3>{hall.title}</h3>
          <p>{hall.capacity}</p>
          <button onClick={() => setSelectedHall(hall)}>
            Book Now
          </button>
        </div>
      ))}

      {selectedHall && (
        <Availability
          hallData={selectedHall}
          closeModal={() => setSelectedHall(null)}
        />
      )}
    </div>
  );
}

// =====================================================================
// EXAMPLE 3: With Loading State and API Integration
// =====================================================================

import React, { useState, useEffect } from 'react';
import Availability from './components/avalibility/Availability';

export default function HallBookingWithAPI() {
  const [hallData, setHallData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAvailability, setShowAvailability] = useState(false);

  useEffect(() => {
    // Fetch hall data from API
    const fetchHallData = async () => {
      try {
        const response = await fetch('/api/halls/1');
        const data = await response.json();
        setHallData(data);
      } catch (error) {
        console.error('Error fetching hall data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHallData();
  }, []);

  if (loading) {
    return <div>Loading hall information...</div>;
  }

  if (!hallData) {
    return <div>Error loading hall data</div>;
  }

  return (
    <div className="hall-booking-container">
      <div className="hall-details">
        <h1>{hallData.title}</h1>
        <p>{hallData.description}</p>
        <button 
          className="book-btn"
          onClick={() => setShowAvailability(true)}
        >
          Check Availability
        </button>
      </div>

      {showAvailability && (
        <Availability
          hallData={hallData}
          closeModal={() => setShowAvailability(false)}
        />
      )}
    </div>
  );
}

// =====================================================================
// EXAMPLE 4: Custom Hook for Hall Booking Management
// =====================================================================

import { useState, useCallback } from 'react';

function useHallBooking() {
  const [selectedHall, setSelectedHall] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = useCallback((hall) => {
    setSelectedHall(hall);
    setIsBookingOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsBookingOpen(false);
    setSelectedHall(null);
  }, []);

  const addToHistory = useCallback((booking) => {
    setBookingHistory(prev => [...prev, booking]);
  }, []);

  return {
    selectedHall,
    bookingHistory,
    isBookingOpen,
    openBooking,
    closeBooking,
    addToHistory
  };
}

// Usage of custom hook
export default function HallBookingApp() {
  const { selectedHall, openBooking, closeBooking, isBookingOpen } = useHallBooking();

  return (
    <div>
      <button onClick={() => openBooking({ title: 'Conference Hall' })}>
        Book Hall
      </button>
      {isBookingOpen && selectedHall && (
        <Availability
          hallData={selectedHall}
          closeModal={closeBooking}
        />
      )}
    </div>
  );
}

// =====================================================================
// EXAMPLE 5: Form Submission Handler (For Backend Integration)
// =====================================================================

// Add this to BookingForm.jsx handleSubmit or create a custom hook

async function submitBooking(bookingData) {
  try {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify(bookingData)
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const result = await response.json();
    
    // Success - show confirmation with booking ID
    console.log('Booking confirmed:', result);
    alert(`Booking ID: ${result.bookingId}\nConfirmation email sent to ${bookingData.staffInformation.emailId}`);
    
    return result;
  } catch (error) {
    console.error('Booking submission error:', error);
    alert('Error submitting booking. Please try again.');
    throw error;
  }
}

// =====================================================================
// EXAMPLE 6: Styling and CSS Integration
// =====================================================================

/*
If you want to add custom styling to the booking components:

In your main App.css or global stylesheet, add:

.app-container {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.book-btn {
  padding: 12px 24px;
  background: linear-gradient(135deg, #003366 0%, #0052a3 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 51, 102, 0.2);
}

.book-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 51, 102, 0.3);
}

.halls-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.hall-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.hall-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.hall-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.hall-card h3 {
  padding: 15px;
  margin: 0;
  color: #003366;
  font-size: 18px;
}

.hall-card p {
  padding: 0 15px;
  color: #666;
  font-size: 14px;
  margin: 5px 0;
}

.hall-card button {
  width: calc(100% - 30px);
  margin: 15px;
  padding: 10px;
  background: linear-gradient(135deg, #003366 0%, #0052a3 100%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.hall-card button:hover {
  background: linear-gradient(135deg, #0052a3 0%, #003d7a 100%);
  transform: scale(1.02);
}
*/

// =====================================================================
// EXAMPLE 7: State Management with Context (For Large Apps)
// =====================================================================

/*
Create HallBookingContext.js:

import React, { createContext, useContext, useState } from 'react';

const HallBookingContext = createContext();

export function HallBookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [selectedHall, setSelectedHall] = useState(null);

  const addBooking = (booking) => {
    setBookings(prev => [...prev, booking]);
  };

  const value = {
    bookings,
    selectedHall,
    setSelectedHall,
    addBooking
  };

  return (
    <HallBookingContext.Provider value={value}>
      {children}
    </HallBookingContext.Provider>
  );
}

export function useHallBooking() {
  return useContext(HallBookingContext);
}

// Usage in App.js:
import { HallBookingProvider } from './contexts/HallBookingContext';

export default function App() {
  return (
    <HallBookingProvider>
      <YourComponents />
    </HallBookingProvider>
  );
}
*/

export {};
