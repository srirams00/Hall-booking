import "./Availability.css";
import { useState, useEffect, useMemo } from "react";
import BookingForm from "../BookingForm/BookingForm";
import CustomAlert from "../CustomAlert/CustomAlert";

const Availability = ({ hallData, closeModal, onSubmitBooking, currentUser, onViewChange, bookings = [] }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [nextDates, setNextDates] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
    onClose: null
  });

  const triggerAlert = (title, message, type = "info", onCloseCallback = null) => {
    setAlertConfig({
      isOpen: true,
      title,
      message,
      type,
      onClose: () => {
        setAlertConfig(prev => ({ ...prev, isOpen: false }));
        if (onCloseCallback) onCloseCallback();
      }
    });
  };

  // Custom time dropdown selectors state
  const [fromHour, setFromHour] = useState("09");
  const [fromMinute, setFromMinute] = useState("30");
  const [fromAmpm, setFromAmpm] = useState("AM");
  const [toHour, setToHour] = useState("12");
  const [toMinute, setToMinute] = useState("30");
  const [toAmpm, setToAmpm] = useState("PM");

  const hoursList = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  const minutesList = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];

  useEffect(() => {
    const dates = [];
    const today = new Date(); 
    
    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    
    setNextDates(dates);
    if (dates.length > 0) {
      setSelectedDate(dates[0].toISOString().split("T")[0]);
    }
  }, []);

  // Update selectedSlots based on custom From/To dropdown changes
  useEffect(() => {
    const formattedFrom = `${fromHour}:${fromMinute} ${fromAmpm}`;
    const formattedTo = `${toHour}:${toMinute} ${toAmpm}`;
    setSelectedSlots([`${formattedFrom} - ${formattedTo}`]);
  }, [fromHour, fromMinute, fromAmpm, toHour, toMinute, toAmpm]);

  // Helper: Parse "HH:MM AM/PM" or 24h "HH:MM" into total minutes from midnight
  const parseTimeToMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const cleaned = timeStr.trim();
    
    // Check 12-hour AM/PM format
    const match12 = cleaned.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
    if (match12) {
      let hours = parseInt(match12[1], 10);
      const minutes = parseInt(match12[2], 10);
      const ampm = match12[3].toUpperCase();
      if (ampm === 'PM' && hours < 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;
      return hours * 60 + minutes;
    }
    
    // Check 24-hour format
    const match24 = cleaned.match(/^(\d+):(\d+)$/);
    if (match24) {
      const hours = parseInt(match24[1], 10);
      const minutes = parseInt(match24[2], 10);
      return hours * 60 + minutes;
    }
    return 0;
  };

  // Helper: Find conflicting booking (returns booking metadata or null)
  const getConflictingBooking = (date, fromTime, toTime) => {
    if (!fromTime || !toTime) return null;
    
    const startB = parseTimeToMinutes(fromTime);
    const endB = parseTimeToMinutes(toTime);
    
    if (startB >= endB) return null;

    // 1. Check hardcoded static slots
    const bookedDate = hallData.bookedSlots && hallData.bookedSlots.find(
      (b) => b.date === date
    );
    if (bookedDate && bookedDate.slots) {
      for (const slot of bookedDate.slots) {
        const parts = slot.split(" - ");
        if (parts.length === 2) {
          const sA = parseTimeToMinutes(parts[0]);
          const eA = parseTimeToMinutes(parts[1]);
          if (sA < endB && startB < eA) {
            return {
              date,
              timeRange: slot,
              type: "Static Block"
            };
          }
        }
      }
    }

    // 2. Check dynamic database bookings that are Approved
    let conflict = null;
    bookings.forEach((b) => {
      if (
        b.hallName.toLowerCase() === hallData.title.toLowerCase() &&
        b.date === date &&
        b.status === "Approved" &&
        b.timeSlots
      ) {
        for (const slot of b.timeSlots) {
          const parts = slot.split(" - ");
          if (parts.length === 2) {
            const sA = parseTimeToMinutes(parts[0]);
            const eA = parseTimeToMinutes(parts[1]);
            if (sA < endB && startB < eA) {
              conflict = {
                date: b.date,
                timeRange: slot,
                type: "Approved Booking"
              };
            }
          }
        }
      }
    });
    return conflict;
  };

  const handleDateSelect = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    setSelectedDate(dateStr);
  };

  const fromTimeStr = `${fromHour}:${fromMinute} ${fromAmpm}`;
  const toTimeStr = `${toHour}:${toMinute} ${toAmpm}`;
  const startMins = parseTimeToMinutes(fromTimeStr);
  const endMins = parseTimeToMinutes(toTimeStr);
  const isTimeOrderInvalid = startMins >= endMins;

  // Retrieve any conflict for selected date & custom range
  const conflict = useMemo(() => getConflictingBooking(selectedDate, fromTimeStr, toTimeStr), [selectedDate, fromTimeStr, toTimeStr, bookings, hallData]);
  const isBooked = !!conflict;

  // Handle continue booking
  const handleContinueBooking = () => {
    if (isTimeOrderInvalid) {
      triggerAlert("Invalid Time Selection", "The 'From' time must be before the 'To' time.", "warning");
      return;
    }

    if (isBooked) {
      triggerAlert(
        "Conflict Detected",
        `Already a user has booked on this time and date.\n\nConflict Details:\nDate: ${conflict.date}\nTime Range: ${conflict.timeRange}`,
        "error"
      );
      return;
    }
    
    if (!currentUser) {
      triggerAlert(
        "Authentication Required",
        "Only logged-in faculty and staff members can request hall bookings. Please log in to proceed.",
        "warning",
        () => {
          if (onViewChange) {
            onViewChange("login");
          }
          closeModal();
        }
      );
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

          {/* Date Selection */}
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

          {/* Custom Time Selector Section */}
          <div className="time-slot-section">
            <h4>Select Booking Custom Time</h4>
            
            <div className="custom-time-selectors">
              <div className="time-select-group">
                <label>From:</label>
                <div className="time-dropdowns">
                  <select value={fromHour} onChange={(e) => setFromHour(e.target.value)}>
                    {hoursList.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                  <span>:</span>
                  <select value={fromMinute} onChange={(e) => setFromMinute(e.target.value)}>
                    {minutesList.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <select value={fromAmpm} onChange={(e) => setFromAmpm(e.target.value)}>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>

              <div className="time-select-group">
                <label>To:</label>
                <div className="time-dropdowns">
                  <select value={toHour} onChange={(e) => setToHour(e.target.value)}>
                    {hoursList.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                  <span>:</span>
                  <select value={toMinute} onChange={(e) => setToMinute(e.target.value)}>
                    {minutesList.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <select value={toAmpm} onChange={(e) => setToAmpm(e.target.value)}>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>
            </div>

            {isTimeOrderInvalid && (
              <div className="conflict-warning-banner">
                <strong>⚠️ Invalid Time Range</strong>
                <span>Start time must be strictly before end time.</span>
              </div>
            )}

            {isBooked && (
              <div className="conflict-warning-banner">
                <strong>Already a user has booked on time and date.</strong>
                <span>Conflict Details: {conflict.date} ({conflict.timeRange})</span>
              </div>
            )}

            {!isBooked && !isTimeOrderInvalid && (
              <p className="selected-slots-info">
                ✓ Time Range Selected: {fromTimeStr} - {toTimeStr}
              </p>
            )}
          </div>

          {/* Buttons Section */}
          <div className="modal-buttons">
            <button className="close-button" onClick={closeModal}>
              Close
            </button>
            <button
              className={`continue-button ${(isBooked || isTimeOrderInvalid) ? "disabled" : ""}`}
              onClick={handleContinueBooking}
              disabled={isBooked || isTimeOrderInvalid}
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

      <CustomAlert
        isOpen={alertConfig.isOpen}
        onClose={alertConfig.onClose}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
      />
    </>
  );
};

export default Availability;