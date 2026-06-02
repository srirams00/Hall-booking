import { useState } from "react";
import "./AdminDashboard.css";
import logo from "../assets/logo.png";

const AdminDashboard = ({
  currentAdmin,
  bookings,
  users,
  loginHistory,
  onLogout,
  onUpdateBookingStatus,
  onDeleteUser,
}) => {
  const [activeTab, setActiveTab] = useState("bookings"); // "bookings" or "users"
  const [showRejectReasonFor, setShowRejectReasonFor] = useState(null); // bookingId

  // Calculate statistics
  const pendingRequests = bookings.filter((b) => b.status === "Pending").length;
  const approvedBookings = bookings.filter((b) => b.status === "Approved").length;
  const totalUsers = users.length;

  const handleRejectClick = (bookingId) => {
    setShowRejectReasonFor(showRejectReasonFor === bookingId ? null : bookingId);
  };

  const submitRejection = (bookingId, reason) => {
    onUpdateBookingStatus(bookingId, "Rejected", reason);
    setShowRejectReasonFor(null);
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
                        <tr key={b.id}>
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
                              <div className="actions-wrapper">
                                <button
                                  className="approve-action-btn"
                                  onClick={() => onUpdateBookingStatus(b.id, "Approved")}
                                >
                                  ✓ Approve
                                </button>
                                <div className="reject-container">
                                  <button
                                    className="reject-action-btn"
                                    onClick={() => handleRejectClick(b.id)}
                                  >
                                    ✗ Reject
                                  </button>
                                  {showRejectReasonFor === b.id && (
                                    <div className="rejection-reasons-dropdown">
                                      <p className="reject-dropdown-header">Select Rejection Reason:</p>
                                      <button
                                        onClick={() =>
                                          submitRejection(b.id, "Hall Not Available / Conflict")
                                        }
                                      >
                                         Hall Not Available
                                      </button>
                                      <button
                                        onClick={() =>
                                          submitRejection(b.id, "Requirements Not Met / Low Priority")
                                        }
                                      >
                                         Requirements Not Met
                                      </button>
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
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
