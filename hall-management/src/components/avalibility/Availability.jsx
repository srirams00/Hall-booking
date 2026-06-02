import "./Availability.css";
import React, { useState, useEffect, useCallback } from "react";
import BookingForm from "../BookingForm/BookingForm";

const Availability = ({ hallData, closeModal, onSubmitBooking, currentUser, onViewChange, bookings = [] }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [nextDates, setNextDates] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const timeSlots = [
    "11:00 AM - 12:30 PM",
    "12:30 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
  ];

  useEffect(() => {
    const dates = [];
    const today = new Date(); 
    
    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNextDates(dates);
    if (dates.length > 0) {
      setSelectedDate(dates[0].toISOString().split("T")[0]);
    }
  }, []);

  const isSlotBooked = (date, slot) => {
    const bookedDate = hallData.bookedSlots.find(
      (b) => b.date === date
    );
    if (bookedDate && bookedDate.slots.includes(slot)) {
      return true;
    }

    return bookings.some(
      (b) =>
        b.hallName.toLowerCase() === hallData.title.toLowerCase() &&
        b.date === date &&
        b.status === "Approved" &&
        b.timeSlots &&
        b.timeSlots.includes(slot)
    );
  };

  const handleDateSelect = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    setSelectedDate(dateStr);
    setSelectedSlots([]); // Reset slots when date changes
  };

  // Handle slot selection/deselection
  const handleSlotSelect = (slot) => {
    if (isSlotBooked(selectedDate, slot)) return;

    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  // Handle continue booking
  const handleContinueBooking = () => {
    if (selectedSlots.length === 0) return;
    
    if (!currentUser) {
      alert("⚠️ Only logged-in faculty and staff members can request hall bookings. Please log in to proceed.");
      if (onViewChange) {
        onViewChange("login");
      }
      closeModal();
      return;
    }
    
    setShowBookingForm(true);
  };

  // Handle close booking form
  const handleCloseBookingForm = () => {
    setShowBookingForm(false);
  };

  // Handle booking success
  const handleBookingSuccess = (bookingObject) => {
    setShowBookingForm(false);
    setSelectedDate(null);
    setSelectedSlots([]);
    closeModal();
    if (onSubmitBooking) {
      onSubmitBooking(bookingObject);
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          {/* Close Button */}
          <button className="close-btn" onClick={closeModal} title="Close">
            ✖
          </button>

          {/* Hall Image */}
          <div className="modal-image-container">
            <img src={hallData.image} alt={hallData.title} className="modal-hall-image" />
          </div>

          {/* Hall Information Section */}
          <div className="hall-info-section">
            <h2 className="hall-title">{hallData.title}</h2>

            <div className="capacity-info">
              <span className="info-item">
                <strong> Capacity:</strong> {hallData.capacity}
              </span>
              <span className="info-item" style={{ fontWeight: 600 }}>
                {hallData.ac ? "AC" : "Non-AC"}
              </span>
            </div>

            <p className="hall-description">{hallData.description}</p>

            <div className="amenities-section">
              <h4>Amenities</h4>
              <div className="amenities-list">
                {hallData.amenities.map((amenity, index) => (
                  <span key={index} className="amenity-badge">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="date-selection-section">
            <h4>Select Date</h4>
            <div className="dates-container">
              {nextDates.map((date, index) => {
                const dateStr = date.toISOString().split("T")[0];
                const isSelected = selectedDate === dateStr;

                return (
                  <button
                    key={index}
                    className={`date-btn ${isSelected ? "selected" : ""}`}
                    onClick={() => handleDateSelect(date)}
                  >
                    <span className="date-day">{date.getDate()}</span>
                    <span className="date-month">{date.toLocaleDateString("en-US", { month: "short" })}</span>
                    <span className="date-weekday">{date.toLocaleDateString("en-US", { weekday: "short" })}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="time-slot-section">
            <h4>Select Time Slot(s)</h4>
            <div className="slots-container">
              {timeSlots.map((slot, index) => {
                const booked = isSlotBooked(selectedDate, slot);
                const selected = selectedSlots.includes(slot);

                return (
                  <button
                    key={index}
                    className={`slot-btn ${booked ? "booked" : ""} ${selected ? "selected" : ""}`}
                    onClick={() => handleSlotSelect(slot)}
                    disabled={booked}
                  >
                    <span className="slot-time">{slot}</span>
                    {booked && <span className="booked-label">Booked</span>}
                  </button>
                );
              })}
            </div>
            {selectedSlots.length > 0 && (
              <p className="selected-slots-info">
                ✓ Selected: {selectedSlots.length} slot(s)
              </p>
            )}
          </div>

          {/* Buttons Section */}
          <div className="modal-buttons">
            <button className="close-button" onClick={closeModal}>
              Close
            </button>
            <button
              className={`continue-button ${selectedSlots.length === 0 ? "disabled" : ""}`}
              onClick={handleContinueBooking}
              disabled={selectedSlots.length === 0}
            >
              {currentUser ? "Continue Booking" : "Login to Book"}
            </button>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <BookingForm
          hallName={hallData.title}
          selectedDate={selectedDate}
          selectedSlots={selectedSlots}
          onClose={handleCloseBookingForm}
          onSuccess={handleBookingSuccess}
          currentUser={currentUser}
        />
      )}
    </>
  );
};

export default React.memo(Availability);