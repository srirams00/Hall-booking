import { useState } from "react";
import "./AdminDashboard.css";
import logo from "../assets/logo.png";
import jubee from "../assets/halls/jubilee.JPG";
import comAV from "../assets/halls/comAV.JPG";
import lawley from "../assets/halls/lawley.JPG";
import board_room from "../assets/halls/Board-Room.JPG";
import sail from "../assets/halls/sail.JPG";
import toulouse from "../assets/halls/toulouse.JPG";
import marian from "../assets/halls/marian-hall.JPG";
import MCA from "../assets/halls/MCA.JPG";
import TV from "../assets/halls/Tv-Av.JPG";

const AdminDashboard = ({
  currentAdmin,
  bookings,
  users,
  loginHistory,
  onLogout,
  onUpdateBookingStatus,
  onDeleteUser,
  halls = [],
  onAddHall,
  onEditHall,
  onDeleteHall,
  onBackHome,
}) => {
  const [activeTab, setActiveTab] = useState("bookings"); // "bookings", "users", or "halls"
  const [showRejectReasonFor, setShowRejectReasonFor] = useState(null); // bookingId
  const [rejectionReasonText, setRejectionReasonText] = useState("");
  const [selectedBookingDetails, setSelectedBookingDetails] = useState(null);

  // Add Hall States
  const [showAddHallModal, setShowAddHallModal] = useState(false);
  const [addTitle, setAddTitle] = useState("");
  const [addCapacity, setAddCapacity] = useState("");
  const [addAc, setAddAc] = useState(true);
  const [addDescription, setAddDescription] = useState("");
  const [addAmenities, setAddAmenities] = useState("");
  const [addImage, setAddImage] = useState("sail");
  const [addCustomImage, setAddCustomImage] = useState("");

  // Edit Hall States
  const [showEditHallModalFor, setShowEditHallModalFor] = useState(null); // hall object
  const [editTitle, setEditTitle] = useState("");
  const [editCapacity, setEditCapacity] = useState("");
  const [editAc, setEditAc] = useState(true);
  const [editDescription, setEditDescription] = useState("");
  const [editAmenities, setEditAmenities] = useState("");
  const [editImage, setEditImage] = useState("sail");
  const [editCustomImage, setEditCustomImage] = useState("");

  const imageMap = {
    "jubilee": jubee,
    "comAV": comAV,
    "lawley": lawley,
    "board_room": board_room,
    "sail": sail,
    "toulouse": toulouse,
    "marian": marian,
    "MCA": MCA,
    "TV": TV
  };

  const getHallImage = (imageName) => {
    if (!imageName) return sail;
    if (imageMap[imageName]) return imageMap[imageName];
    return imageName;
  };

  const openAddHallModal = () => {
    setAddTitle("");
    setAddCapacity("");
    setAddAc(true);
    setAddDescription("");
    setAddAmenities("");
    setAddImage("sail");
    setAddCustomImage("");
    setShowAddHallModal(true);
  };

  const submitAddHall = (e) => {
    e.preventDefault();
    const finalImage = addImage === "custom" ? addCustomImage : addImage;
    const splitAmenities = addAmenities.split(",").map(a => a.trim()).filter(a => a !== "");
    onAddHall({
      title: addTitle,
      capacity: addCapacity,
      ac: addAc,
      description: addDescription,
      image: finalImage,
      amenities: splitAmenities
    });
    setShowAddHallModal(false);
  };

  const openEditHallModal = (hall) => {
    setEditTitle(hall.title);
    setEditCapacity(hall.capacity);
    setEditAc(hall.ac);
    setEditDescription(hall.description);
    setEditAmenities(hall.amenities ? hall.amenities.join(", ") : "");
    if (imageMap[hall.image]) {
      setEditImage(hall.image);
      setEditCustomImage("");
    } else {
      setEditImage("custom");
      setEditCustomImage(hall.image);
    }
    setShowEditHallModalFor(hall);
  };

  const submitEditHall = (e) => {
    e.preventDefault();
    const finalImage = editImage === "custom" ? editCustomImage : editImage;
    const splitAmenities = editAmenities.split(",").map(a => a.trim()).filter(a => a !== "");
    onEditHall(showEditHallModalFor._id, {
      title: editTitle,
      capacity: editCapacity,
      ac: editAc,
      description: editDescription,
      image: finalImage,
      amenities: splitAmenities
    });
    setShowEditHallModalFor(null);
  };

  const confirmDeleteHall = (hallId, hallTitle) => {
    if (window.confirm(`⚠️ Are you sure you want to delete venue "${hallTitle}"?\n\nThis will remove the venue permanently from booking registries.`)) {
      onDeleteHall(hallId);
    }
  };

  // Calculate statistics
  const pendingRequests = bookings.filter((b) => b.status === "Pending").length;
  const approvedBookings = bookings.filter((b) => b.status === "Approved").length;
  const totalUsers = users.length;

  const handleRejectClick = (bookingId) => {
    if (showRejectReasonFor === bookingId) {
      setShowRejectReasonFor(null);
      setRejectionReasonText("");
    } else {
      setShowRejectReasonFor(bookingId);
      setRejectionReasonText("");
    }
  };

  const submitRejection = (bookingId, reason) => {
    onUpdateBookingStatus(bookingId, "Rejected", reason);
    setShowRejectReasonFor(null);
    setRejectionReasonText("");
  };

  const confirmUserDeletion = (userId, userName) => {
    if (window.confirm(`⚠️ Are you sure you want to delete user "${userName}"?\n\nThis will remove them from the system and terminate any active sessions.`)) {
      onDeleteUser(userId);
    }
  };

  return (
    <div className="admin-portal-wrapper">
      {/* Admin Navbar */}
      <nav className="admin-navbar">
        <div className="admin-nav-container">
          <div className="admin-nav-logo">
            <img src={logo} alt="SJC Logo" />
            <div className="admin-logo-text">
              <h3>St. Joseph's College (Autonomous)</h3>
              <span>Administrative Resource Portal</span>
            </div>
          </div>
          <div className="admin-profile-section">
            <button className="admin-back-btn" onClick={onBackHome}>
              ← Back to Home
            </button>
            <div className="admin-info">
              <span className="admin-label">Logged in as Administrator</span>
              <span className="admin-name">{currentAdmin || "Principal / Dean"}</span>
            </div>
            <button className="admin-logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Layout Container */}
      <main className="admin-dashboard-container">
        {/* Header Stats Row */}
        <section className="admin-stats-row">
          <div className="admin-stat-card pending">
            <div className="stat-value">{pendingRequests}</div>
            <div className="stat-label">Pending Requests</div>
          </div>
          <div className="admin-stat-card approved">
            <div className="stat-value">{approvedBookings}</div>
            <div className="stat-label">Approved Slots</div>
          </div>
          <div className="admin-stat-card users-count">
            <div className="stat-value">{totalUsers}</div>
            <div className="stat-label">Active Users</div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className="admin-tabs-nav">
          <button
            className={`tab-nav-btn ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
             Request Booking ({pendingRequests} Pending)
          </button>
          <button
            className={`tab-nav-btn ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
             Registered Users & Audit Trail
          </button>
          <button
            className={`tab-nav-btn ${activeTab === "halls" ? "active" : ""}`}
            onClick={() => setActiveTab("halls")}
          >
             Manage Campus Venues ({halls.length})
          </button>
        </div>

        {/* Tab Content Panel */}
        <div className="admin-tab-content-panel">
          {/* TAB 1: BOOKING REQUESTS */}
          {activeTab === "bookings" && (
            <div className="admin-tab-section">
              <h3 className="section-title">Campus Venue Booking Requests</h3>
              {bookings.length === 0 ? (
                <div className="admin-empty-state">No bookings found in database.</div>
              ) : (
                <div className="table-responsive">
                  <table className="admin-data-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Venue / Hall</th>
                        <th>Applicant Details</th>
                        <th>Event Description</th>
                        <th>Date & Slots</th>
                        <th>Status / Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b) => (
                        <tr key={b.id} onClick={() => setSelectedBookingDetails(b)} className="clickable-row">
                          <td>
                            <span className="monospace-tag">{b.id}</span>
                          </td>
                          <td>
                            <strong className="hall-name-label">{b.hallName}</strong>
                          </td>
                          <td>
                            {b.staffInformation ? (
                              <div className="details-col">
                                <span className="p-name"><strong>{b.staffInformation.name}</strong></span>
                                <span className="p-desc">ID: {b.staffInformation.staffId}</span>
                                <span className="p-desc">Dept: {b.staffInformation.department}</span>
                                <span className="p-desc">{b.staffInformation.emailId}</span>
                              </div>
                            ) : (
                              "N/A"
                            )}
                          </td>
                          <td>
                            {b.eventInformation ? (
                              <div className="details-col">
                                <span className="event-title-span">"{b.eventInformation.title}"</span>
                                <span className="p-desc">Audience: {b.eventInformation.expectedAudience}</span>
                              </div>
                            ) : (
                              "N/A"
                            )}
                          </td>
                          <td>
                            <div className="date-slots-col">
                              <span className="booking-date-value">
                                {new Date(b.date).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                              <div className="slots-wrapper-admin">
                                {b.timeSlots && b.timeSlots.map((slot, idx) => (
                                  <span key={idx} className="slot-pill">
                                    {slot}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </td>
                          <td>
                            {b.status === "Pending" ? (
                              <div className="actions-wrapper" onClick={(e) => e.stopPropagation()}>
                                <button
                                  className="approve-action-btn"
                                  onClick={(e) => { e.stopPropagation(); onUpdateBookingStatus(b.id, "Approved"); }}
                                >
                                  ✓ Approve
                                </button>
                                <div className="reject-container" onClick={(e) => e.stopPropagation()}>
                                  <button
                                    className="reject-action-btn"
                                    onClick={(e) => { e.stopPropagation(); handleRejectClick(b.id); }}
                                  >
                                    ✗ Reject
                                  </button>
                                  {showRejectReasonFor === b.id && (
                                    <div className="rejection-reasons-dropdown custom-rejection-box" onClick={(e) => e.stopPropagation()}>
                                      <p className="reject-dropdown-header">Rejection Description:</p>
                                      <textarea
                                        className="reject-reason-input"
                                        placeholder="Enter rejection reason..."
                                        value={rejectionReasonText}
                                        onChange={(e) => setRejectionReasonText(e.target.value)}
                                        rows={3}
                                      />
                                      <div className="reject-dropdown-actions">
                                        <button
                                          className="confirm-reject-btn"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            submitRejection(b.id, rejectionReasonText.trim() || "Rejected by Administrator");
                                          }}
                                        >
                                          Reject
                                        </button>
                                        <button
                                          className="cancel-reject-btn"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setShowRejectReasonFor(null);
                                            setRejectionReasonText("");
                                          }}
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="status-display-admin">
                                <span className={`status-badge-admin ${b.status.toLowerCase()}`}>
                                  {b.status}
                                </span>
                                {b.status === "Rejected" && b.rejectionReason && (
                                  <span className="rejection-reason-text">
                                    ({b.rejectionReason})
                                  </span>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ACTIVE USERS & HISTORY */}
          {activeTab === "users" && (
            <div className="admin-tab-section users-tab-split">
              {/* Left Column: Registered Users */}
              <div className="users-split-column">
                <h3 className="section-title">Registered Active Users</h3>
                {users.length === 0 ? (
                  <p className="empty-txt">No users currently registered in session.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="admin-data-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Department / Email</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u) => (
                          <tr key={u.id}>
                            <td><span className="monospace-tag">{u.id}</span></td>
                            <td><strong>{u.username}</strong></td>
                            <td>
                              <div className="details-col">
                                <span>{u.department}</span>
                                <span className="p-desc">{u.email}</span>
                              </div>
                            </td>
                            <td>
                              <button
                                className="delete-user-btn"
                                onClick={() => confirmUserDeletion(u.id, u.username)}
                              >
                                Delete User
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Right Column: Login History */}
              <div className="users-split-column">
                <h3 className="section-title">User Login Audit History</h3>
                {loginHistory.length === 0 ? (
                  <p className="empty-txt">No login records recorded yet.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="admin-data-table">
                      <thead>
                        <tr>
                          <th>Username</th>
                          <th>Email Address</th>
                          <th>Timestamp</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loginHistory.map((h, i) => (
                          <tr key={i}>
                            <td><strong>{h.username}</strong></td>
                            <td><span className="p-desc">{h.email}</span></td>
                            <td className="timestamp-cell">{h.timestamp}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* TAB 3: MANAGE HALLS */}
          {activeTab === "halls" && (
            <div className="admin-tab-section">
              <div className="halls-tab-header">
                <h3 className="section-title">Campus Venues & Halls Registry</h3>
                <button className="add-venue-btn" onClick={openAddHallModal}>
                  + Add New Venue
                </button>
              </div>

              {halls.length === 0 ? (
                <div className="admin-empty-state">No halls currently configured.</div>
              ) : (
                <div className="admin-halls-grid">
                  {halls.map((hall) => (
                    <div key={hall._id} className="admin-hall-card">
                      <div className="hall-card-image-wrapper">
                        <img src={getHallImage(hall.image)} alt={hall.title} />
                        <span className={`hall-card-badge ${hall.ac ? 'ac' : 'non-ac'}`}>
                          {hall.ac ? 'AC' : 'Non-AC'}
                        </span>
                      </div>
                      <div className="hall-card-info">
                        <h4>{hall.title}</h4>
                        <span className="hall-card-capacity">Capacity: {hall.capacity}</span>
                        <p className="hall-card-desc">{hall.description}</p>
                        <div className="hall-card-amenities">
                          {hall.amenities?.map((amenity, idx) => (
                            <span key={idx} className="amenity-pill">{amenity}</span>
                          ))}
                        </div>
                        <div className="hall-card-actions">
                          <button className="edit-hall-btn" onClick={() => openEditHallModal(hall)}>
                            Edit Details
                          </button>
                          <button className="delete-hall-btn" onClick={() => confirmDeleteHall(hall._id, hall.title)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Booking Details Modal */}
      {selectedBookingDetails && (
        <div className="admin-modal-overlay" onClick={() => setSelectedBookingDetails(null)}>
          <div className="admin-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>Booking Reference: <span className="mono-ref">{selectedBookingDetails.id}</span></h2>
              <button className="admin-modal-close" onClick={() => setSelectedBookingDetails(null)}>✖</button>
            </div>
            
            <div className="admin-modal-body">
              <div className="modal-info-grid">
                {/* Faculty Card */}
                <div className="modal-info-card">
                  <h3>Faculty Details</h3>
                  <div className="info-row">
                    <span className="info-label">Name</span>
                    <span className="info-value"><strong>{selectedBookingDetails.staffInformation?.name || 'N/A'}</strong></span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">ID</span>
                    <span className="info-value">{selectedBookingDetails.staffInformation?.staffId || 'N/A'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Department</span>
                    <span className="info-value">{selectedBookingDetails.staffInformation?.department || 'N/A'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email ID</span>
                    <span className="info-value">{selectedBookingDetails.staffInformation?.emailId || 'N/A'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Phone Number</span>
                    <span className="info-value">{selectedBookingDetails.staffInformation?.phoneNumber || 'N/A'}</span>
                  </div>
                </div>

                {/* Event Card */}
                <div className="modal-info-card">
                  <h3>Event & Venue Details</h3>
                  <div className="info-row">
                    <span className="info-label">Venue / Hall</span>
                    <span className="info-value text-highlight">{selectedBookingDetails.hallName}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Event Title</span>
                    <span className="info-value">"{selectedBookingDetails.eventInformation?.title || 'N/A'}"</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Expected Audience</span>
                    <span className="info-value">{selectedBookingDetails.eventInformation?.expectedAudience || 'N/A'} Attendees</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Date Requested</span>
                    <span className="info-value">
                      {new Date(selectedBookingDetails.date).toLocaleDateString("en-US", {
                        weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Time Slots</span>
                    <span className="info-value time-badge-highlight">{selectedBookingDetails.timeSlots?.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="modal-status-section">
                <h3>Allocation Status</h3>
                <div className="status-display-wrapper">
                  <span className={`status-badge-large ${selectedBookingDetails.status.toLowerCase()}`}>
                    {selectedBookingDetails.status}
                  </span>
                  {selectedBookingDetails.status === "Rejected" && selectedBookingDetails.rejectionReason && (
                    <div className="reason-display-box">
                      <strong>Rejection Description:</strong>
                      <p>"{selectedBookingDetails.rejectionReason}"</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="admin-modal-footer">
              <button className="modal-close-btn" onClick={() => setSelectedBookingDetails(null)}>Close View</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Hall Modal */}
      {showAddHallModal && (
        <div className="admin-modal-overlay" onClick={() => setShowAddHallModal(false)}>
          <div className="admin-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>Add New Venue / Hall</h2>
              <button className="admin-modal-close" onClick={() => setShowAddHallModal(false)}>✖</button>
            </div>
            <form onSubmit={submitAddHall} className="admin-modal-form">
              <div className="admin-modal-body">
                <div className="form-grid-2col">
                  <div className="form-group-admin">
                    <label>Venue Title / Name*</label>
                    <input type="text" required value={addTitle} onChange={(e) => setAddTitle(e.target.value)} placeholder="e.g., Marian Hall" />
                  </div>
                  <div className="form-group-admin">
                    <label>Capacity*</label>
                    <input type="text" required value={addCapacity} onChange={(e) => setAddCapacity(e.target.value)} placeholder="e.g., 300 Guests" />
                  </div>
                </div>

                <div className="form-grid-2col">
                  <div className="form-group-admin">
                    <label>AC Type*</label>
                    <select value={addAc ? "AC" : "Non-AC"} onChange={(e) => setAddAc(e.target.value === "AC")}>
                      <option value="AC">Air Conditioned (AC)</option>
                      <option value="Non-AC">Non-Air Conditioned (Non-AC)</option>
                    </select>
                  </div>
                  <div className="form-group-admin">
                    <label>Preloaded Image*</label>
                    <select value={addImage} onChange={(e) => setAddImage(e.target.value)}>
                      <option value="sail">Sail Auditorium (Default)</option>
                      <option value="jubilee">Jubilee Building</option>
                      <option value="comAV">ComAV Auditorium</option>
                      <option value="lawley">Lawley Hall</option>
                      <option value="board_room">Board Room</option>
                      <option value="toulouse">Toulouse Arena</option>
                      <option value="marian">Marian Hall</option>
                      <option value="MCA">MCA AV</option>
                      <option value="TV">TV.AV Hall</option>
                      <option value="custom">Custom Image URL</option>
                    </select>
                  </div>
                </div>

                {addImage === "custom" && (
                  <div className="form-group-admin">
                    <label>Custom Image URL*</label>
                    <input type="text" required value={addCustomImage} onChange={(e) => setAddCustomImage(e.target.value)} placeholder="e.g., http://sjc.edu/images/myhall.jpg" />
                  </div>
                )}

                <div className="form-group-admin">
                  <label>Amenities (Comma-separated)*</label>
                  <input type="text" required value={addAmenities} onChange={(e) => setAddAmenities(e.target.value)} placeholder="e.g., Projector, Sound System, AC, WiFi" />
                </div>

                <div className="form-group-admin">
                  <label>Description*</label>
                  <textarea required value={addDescription} onChange={(e) => setAddDescription(e.target.value)} placeholder="Enter details about this venue's size, suitability, and location..." rows={4} />
                </div>
              </div>
              
              <div className="admin-modal-footer">
                <button type="button" className="modal-cancel-btn" onClick={() => setShowAddHallModal(false)}>Cancel</button>
                <button type="submit" className="modal-submit-btn">Add Venue</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Hall Modal */}
      {showEditHallModalFor && (
        <div className="admin-modal-overlay" onClick={() => setShowEditHallModalFor(null)}>
          <div className="admin-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>Edit Venue: {showEditHallModalFor.title}</h2>
              <button className="admin-modal-close" onClick={() => setShowEditHallModalFor(null)}>✖</button>
            </div>
            <form onSubmit={submitEditHall} className="admin-modal-form">
              <div className="admin-modal-body">
                <div className="form-grid-2col">
                  <div className="form-group-admin">
                    <label>Venue Title / Name*</label>
                    <input type="text" required value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="e.g., Marian Hall" />
                  </div>
                  <div className="form-group-admin">
                    <label>Capacity*</label>
                    <input type="text" required value={editCapacity} onChange={(e) => setEditCapacity(e.target.value)} placeholder="e.g., 300 Guests" />
                  </div>
                </div>

                <div className="form-grid-2col">
                  <div className="form-group-admin">
                    <label>AC Type*</label>
                    <select value={editAc ? "AC" : "Non-AC"} onChange={(e) => setEditAc(e.target.value === "AC")}>
                      <option value="AC">Air Conditioned (AC)</option>
                      <option value="Non-AC">Non-Air Conditioned (Non-AC)</option>
                    </select>
                  </div>
                  <div className="form-group-admin">
                    <label>Preloaded Image*</label>
                    <select value={editImage} onChange={(e) => setEditImage(e.target.value)}>
                      <option value="sail">Sail Auditorium</option>
                      <option value="jubilee">Jubilee Building</option>
                      <option value="comAV">ComAV Auditorium</option>
                      <option value="lawley">Lawley Hall</option>
                      <option value="board_room">Board Room</option>
                      <option value="toulouse">Toulouse Arena</option>
                      <option value="marian">Marian Hall</option>
                      <option value="MCA">MCA AV</option>
                      <option value="TV">TV.AV Hall</option>
                      <option value="custom">Custom Image URL</option>
                    </select>
                  </div>
                </div>

                {editImage === "custom" && (
                  <div className="form-group-admin">
                    <label>Custom Image URL*</label>
                    <input type="text" required value={editCustomImage} onChange={(e) => setEditCustomImage(e.target.value)} placeholder="e.g., http://sjc.edu/images/myhall.jpg" />
                  </div>
                )}

                <div className="form-group-admin">
                  <label>Amenities (Comma-separated)*</label>
                  <input type="text" required value={editAmenities} onChange={(e) => setEditAmenities(e.target.value)} placeholder="e.g., Projector, Sound System, AC, WiFi" />
                </div>

                <div className="form-group-admin">
                  <label>Description*</label>
                  <textarea required value={editDescription} onChange={(e) => setEditDescription(e.target.value)} placeholder="Enter details about this venue's size, suitability, and location..." rows={4} />
                </div>
              </div>
              
              <div className="admin-modal-footer">
                <button type="button" className="modal-cancel-btn" onClick={() => setShowEditHallModalFor(null)}>Cancel</button>
                <button type="submit" className="modal-submit-btn">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
