import "./UserDashboard.css";

const UserDashboard = ({ currentUser, bookings, onBackHome }) => {
  // Filter bookings belonging to current user (robust case-insensitive checks)
  const myBookings = bookings.filter((b) => {
    if (!b.staffInformation || !b.staffInformation.name) return false;
    const staffName = b.staffInformation.name.toLowerCase();
    const currUser = (currentUser || "").toLowerCase();
    
    // Exact match of display name
    if (staffName === currUser) return true;
    
    // Mapping matches (e.g. silvest7 username for silvest display name)
    if (currUser === "silvest" && (staffName === "silvest7" || staffName.includes("silvest"))) return true;
    if (currUser === "sriram" && (staffName === "sriram" || staffName.includes("sriram"))) return true;
    
    // Match by email if exists
    if (b.staffInformation.emailId && typeof b.staffInformation.emailId === 'string') {
      const staffEmail = b.staffInformation.emailId.toLowerCase();
      if (currUser === "silvest" && (staffEmail.includes("silvest7") || staffEmail.includes("silvest"))) return true;
      if (currUser === "sriram" && staffEmail.includes("sriram")) return true;
    }

    return false;
  });

  // Compute status statistics
  const total = myBookings.length;
  const pending = myBookings.filter((b) => b.status === "Pending").length;
  const approved = myBookings.filter((b) => b.status === "Approved").length;
  const rejected = myBookings.filter((b) => b.status === "Rejected").length;

  return (
    <div className="user-dashboard-container">
      {/* Dashboard Header Banner */}
      <header className="dashboard-header">
        <div className="header-info">
          <button className="back-btn" onClick={onBackHome}>
            ← Back to Home
          </button>
          <h2>User Dashboard</h2>
          <p className="welcome-msg">
            Logged in as: <strong>{currentUser || "Guest Staff"}</strong>
          </p>
        </div>
        <div className="user-profile-badge">
          <div className="profile-avatar">
            {(currentUser || "G").charAt(0).toUpperCase()}
          </div>
          <div className="profile-details">
            <span className="profile-role">Academic Staff Member</span>
            <span className="profile-email">
              {(currentUser || "guest").toLowerCase().replace(/\s+/g, "")}@gmail.com
            </span>
          </div>
        </div>
      </header>

      {/* Statistics Cards Row */}
      <section className="stats-row">
        <div className="stat-card total">
          <div className="stat-number">{total}</div>
          <div className="stat-label">Total Requests</div>
        </div>
        <div className="stat-card pending">
          <div className="stat-number">{pending}</div>
          <div className="stat-label">Pending Approval</div>
        </div>
        <div className="stat-card approved">
          <div className="stat-number">{approved}</div>
          <div className="stat-label">Approved</div>
        </div>
        <div className="stat-card rejected">
          <div className="stat-number">{rejected}</div>
          <div className="stat-label">Rejected</div>
        </div>
      </section>

      {/* Booking History Table Section */}
      <section className="booking-history-section">
        <h3 className="section-title">My Booking Requests</h3>
        
        {myBookings.length === 0 ? (
          <div className="no-bookings-placeholder">
            <div className="placeholder-icon"></div>
            <h4>No Booking Requests Found</h4>
            <p>You haven't requested any venue bookings yet. Head back to the Home page to browse venues and book a slot.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Venue / Hall</th>
                  <th>Event Title</th>
                  <th>Date Requested</th>
                  <th>Selected Slots</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {myBookings.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <span className="booking-id-tag">{b.id}</span>
                    </td>
                    <td>
                      <strong>{b.hallName}</strong>
                    </td>
                    <td>{b.eventInformation ? b.eventInformation.title : "N/A"}</td>
                    <td>
                      {new Date(b.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td>
                      <div className="slots-list-cell">
                        {b.timeSlots && b.timeSlots.map((slot, i) => (
                          <span key={i} className="time-slot-badge">
                            {slot}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="status-badge-container">
                        <span className={`status-badge ${b.status.toLowerCase()}`}>
                          {b.status}
                        </span>
                        {b.status === "Rejected" && b.rejectionReason && (
                          <span className="rejection-reason-tooltip" title={b.rejectionReason}>
                             {b.rejectionReason}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default UserDashboard;
