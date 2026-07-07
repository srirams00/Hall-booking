import { useState } from 'react';
import './BookingForm.css';
import CustomAlert from '../CustomAlert/CustomAlert';

const BookingForm = ({ hallName, selectedDate, selectedSlots, onClose, onSuccess, currentUser }) => {
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

  // Form State
  const [formData, setFormData] = useState({
    staffName: '',
    staffId: '',
    department: '',
    emailId: '',
    phoneNumber: '',
    eventTitle: '',
    expectedAudience: '',
  });

  const [errors, setErrors] = useState({});

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Phone validation - only numbers
  const phoneRegex = /^[0-9]{10}$/;

  // Validate individual field
  const validateField = (name, value) => {
    let error = '';

    if (!value.trim()) {
      error = 'This field is required';
    } else if (name === 'emailId' && !emailRegex.test(value)) {
      error = 'Please enter a valid email address';
    } else if (name === 'phoneNumber' && !phoneRegex.test(value)) {
      error = 'Phone number must be exactly 10 digits';
    } else if (name === 'expectedAudience') {
      const audience = parseInt(value);
      if (isNaN(audience) || audience <= 0) {
        error = 'Please enter a valid number';
      }
    }

    return error;
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Special handling for phone number - only allow digits
    if (name === 'phoneNumber') {
      if (value === '' || /^[0-9]*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }

    // Special handling for audience count - only allow numbers
    if (name === 'expectedAudience') {
      if (value === '' || /^[0-9]*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle input blur for validation
  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if form is complete
  const isFormComplete = () => {
    return (
      formData.staffName.trim() !== '' &&
      formData.staffId.trim() !== '' &&
      formData.department.trim() !== '' &&
      formData.emailId.trim() !== '' &&
      formData.phoneNumber.trim() !== '' &&
      formData.eventTitle.trim() !== '' &&
      formData.expectedAudience.trim() !== '' &&
      Object.values(errors).every((error) => error === '')
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Create booking object
    const bookingObject = {
      hallName,
      date: selectedDate,
      timeSlots: selectedSlots,
      staffInformation: {
        name: formData.staffName,
        staffId: formData.staffId,
        department: formData.department,
        emailId: formData.emailId,
        phoneNumber: formData.phoneNumber,
      },
      eventInformation: {
        title: formData.eventTitle,
        expectedAudience: parseInt(formData.expectedAudience),
      },
      bookingDate: new Date().toISOString(),
    };


    // Success message
    const bookingId = Math.random().toString(36).substr(2, 9).toUpperCase();
    triggerAlert(
      "Booking Confirmed",
      `Booking confirmed successfully!\n\nBooking ID: ${bookingId}\n\nCheck console for booking details.`,
      "success",
      () => {
        // Reset form and close
        setFormData({
          staffName: '',
          staffId: '',
          department: '',
          emailId: '',
          phoneNumber: '',
          eventTitle: '',
          expectedAudience: '',
        });
        setErrors({});

        if (onSuccess) {
          onSuccess(bookingObject);
        }
      }
    );
  };

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div className="booking-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="booking-close-btn" onClick={onClose} title="Close">
          ✖
        </button>

        {/* Header */}
        <div className="booking-header">
          <h2>Complete Your Booking</h2>
          <p>Please provide the required information to finalize your hall booking</p>
        </div>

        {/* Main Content */}
        <div className="booking-form-wrapper">
          {/* Left Section - Booking Summary */}
          <div className="booking-summary-section">
            <div className="summary-card">
              <h3>Booking Summary</h3>

              <div className="summary-item-group">
                <div className="summary-item">
                  <div>
                    <p className="summary-label">Hall Name</p>
                    <p className="summary-value">{hallName}</p>
                  </div>
                </div>

                <div className="summary-item">
                  <div>
                    <p className="summary-label">Selected Date</p>
                    <p className="summary-value">
                      {new Date(selectedDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="summary-item">
                  <div>
                    <p className="summary-label">Time Slots</p>
                    <div className="time-slots-summary">
                      {selectedSlots.map((slot, index) => (
                        <p key={index} className="summary-value">
                          {slot}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-info">
                <p>
                  <strong>Note:</strong> Please ensure all information is accurate before
                  submitting.
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Booking Form */}
          <form className="booking-form" onSubmit={handleSubmit}>
            {/* Faculty Information Section */}
            <div className="form-section-booking">
              <h3 className="section-title">Faculty Information</h3>

              <div className="form-group">
                <label htmlFor="hallName" className="form-label-booking">
                  Venue / Hall Name
                </label>
                <input
                  type="text"
                  id="hallName"
                  value={hallName}
                  readOnly
                  className="form-input-booking readonly-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="staffName" className="form-label-booking">
                  <span className="required-asterisk">*</span> Faculty Name
                </label>
                <input
                  type="text"
                  id="staffName"
                  name="staffName"
                  value={formData.staffName}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder="Enter Faculty full name"
                  className={`form-input-booking ${errors.staffName ? 'error' : ''}`}
                />
                {errors.staffName && <p className="error-message">{errors.staffName}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="staffId" className="form-label-booking">
                  <span className="required-asterisk">*</span> Faculty ID
                </label>
                <input
                  type="text"
                  id="staffId"
                  name="staffId"
                  value={formData.staffId}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder="e.g., FAC-2026-001"
                  className={`form-input-booking ${errors.staffId ? 'error' : ''}`}
                />
                {errors.staffId && <p className="error-message">{errors.staffId}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="department" className="form-label-booking">
                  <span className="required-asterisk">*</span> Department
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder="e.g., Computer Science"
                  className={`form-input-booking ${errors.department ? 'error' : ''}`}
                />
                {errors.department && <p className="error-message">{errors.department}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="emailId" className="form-label-booking">
                  <span className="required-asterisk">*</span> Faculty Email ID
                </label>
                <input
                  type="email"
                  id="emailId"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder="faculty.email@sjc.edu"
                  className={`form-input-booking ${errors.emailId ? 'error' : ''}`}
                />
                {errors.emailId && <p className="error-message">{errors.emailId}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber" className="form-label-booking">
                  <span className="required-asterisk">*</span> Faculty Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder="10-digit phone number"
                  maxLength="10"
                  className={`form-input-booking ${errors.phoneNumber ? 'error' : ''}`}
                />
                {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
              </div>
            </div>

            {/* Event Information Section */}
            <div className="form-section-booking">
              <h3 className="section-title">Event Information</h3>

              <div className="form-group">
                <label htmlFor="eventTitle" className="form-label-booking">
                  <span className="required-asterisk">*</span> Event Title
                </label>
                <input
                  type="text"
                  id="eventTitle"
                  name="eventTitle"
                  value={formData.eventTitle}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder="e.g., Annual Conference, Workshop"
                  className={`form-input-booking ${errors.eventTitle ? 'error' : ''}`}
                />
                {errors.eventTitle && <p className="error-message">{errors.eventTitle}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="expectedAudience" className="form-label-booking">
                  <span className="required-asterisk">*</span> Expected Audience Count
                </label>
                <input
                  type="number"
                  id="expectedAudience"
                  name="expectedAudience"
                  value={formData.expectedAudience}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder="Number of expected attendees"
                  className={`form-input-booking ${errors.expectedAudience ? 'error' : ''}`}
                />
                {errors.expectedAudience && (
                  <p className="error-message">{errors.expectedAudience}</p>
                )}
              </div>
            </div>

            {/* Buttons Section */}
            <div className="form-buttons">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button
                type="submit"
                className={`submit-btn ${!isFormComplete() ? 'disabled' : ''}`}
                disabled={!isFormComplete()}
              >
                Submit Booking
              </button>
            </div>
          </form>
        </div>
      </div>
      <CustomAlert
        isOpen={alertConfig.isOpen}
        onClose={alertConfig.onClose}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
      />
    </div>
  );
};

export default BookingForm;
