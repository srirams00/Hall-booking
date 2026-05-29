import "./Availability.css";
import { useState, useEffect } from "react";

const Availability = ({ hallData, closeModal }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [nextDates, setNextDates] = useState([]);

  const timeSlots = [
    "11:00 AM - 12:30 PM",
    "12:30 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
  ];

  // Generate next 10 dates
  useEffect(() => {
    const dates = [];
    const today = new Date(); // Automatically gets current date
    
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

  // Format date for display
  

  // Check if a slot is booked
  const isSlotBooked = (date, slot) => {
    const bookedDate = hallData.bookedSlots.find(
      (b) => b.date === date
    );
    return bookedDate ? bookedDate.slots.includes(slot) : false;
  };

  // Handle date selection
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

    const bookingData = {
      hall: hallData.title,
      date: selectedDate,
      slots: selectedSlots,
    };

    console.log("Booking Data:", bookingData);
    alert(
      `Booking confirmed!\nHall: ${bookingData.hall}\nDate: ${bookingData.date}\nSlots: ${bookingData.slots.join(", ")}`
    );
    closeModal();
  };

  return (
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

        {/* Date Selection Section */}
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

        {/* Time Slot Selection Section */}
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
            Continue Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Availability;