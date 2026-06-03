import { useState } from "react";
import "./AdminDashboard.css";
import logo from "../assets/logo.png";
import { jsPDF } from "jspdf";
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

  // Report States
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(String(today.getMonth() + 1).padStart(2, "0"));
  const [selectedYear, setSelectedYear] = useState(String(today.getFullYear()));

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

  // Monthly Report Calculations
  const monthlyBookings = bookings.filter((b) => {
    if (!b.date) return false;
    const parts = b.date.split("-");
    if (parts.length < 2) return false;
    return parts[0] === selectedYear && parts[1] === selectedMonth;
  });

  const totalBookingsCount = monthlyBookings.length;
  const approvedBookingsCount = monthlyBookings.filter((b) => b.status === "Approved").length;
  const pendingBookingsCount = monthlyBookings.filter((b) => b.status === "Pending").length;
  const rejectedBookingsCount = monthlyBookings.filter((b) => b.status === "Rejected").length;

  // Most and Least Used Halls calculations
  let mostUsedHallName = "N/A";
  let leastUsedHallName = "N/A";
  let maxCount = -1;
  let minCount = Infinity;
  const hallCounts = {};

  // Pre-fill with dynamic halls list
  halls.forEach((h) => {
    hallCounts[h.title] = 0;
  });

  // Calculate approved counts
  monthlyBookings
    .filter((b) => b.status === "Approved")
    .forEach((b) => {
      if (!b.hallName) return;
      const matchedHall = halls.find(
        (h) => h.title.trim().toLowerCase() === b.hallName.trim().toLowerCase()
      );
      const normalizedName = matchedHall ? matchedHall.title : b.hallName.trim();
      hallCounts[normalizedName] = (hallCounts[normalizedName] || 0) + 1;
    });

  const hallKeys = Object.keys(hallCounts);
  if (hallKeys.length > 0 && monthlyBookings.filter(b => b.status === "Approved").length > 0) {
    hallKeys.forEach((name) => {
      const count = hallCounts[name];
      if (count > maxCount) {
        maxCount = count;
        mostUsedHallName = name;
      }
      if (count < minCount) {
        minCount = count;
        leastUsedHallName = name;
      }
    });
  }

  // Peak Booking Time Slots
  let peakBookingTime = "N/A";
  let maxSlotCount = 0;
  const slotCounts = {};
  monthlyBookings.forEach((b) => {
    if (b.timeSlots) {
      b.timeSlots.forEach((slot) => {
        slotCounts[slot] = (slotCounts[slot] || 0) + 1;
      });
    }
  });
  Object.keys(slotCounts).forEach((slot) => {
    if (slotCounts[slot] > maxSlotCount) {
      maxSlotCount = slotCounts[slot];
      peakBookingTime = slot;
    }
  });

  const downloadPDFReport = () => {
    const doc = new jsPDF();
    
    // Theme colors
    const primaryColor = "#1e293b"; // Slate Dark
    const accentColor = "#3b82f6"; // Blue
    const textColor = "#0f172a";
    const lightGrey = "#f8fafc";
    const borderGrey = "#cbd5e1";
    
    const monthNames = {
      "01": "January", "02": "February", "03": "March", "04": "April",
      "05": "May", "06": "June", "07": "July", "08": "August",
      "09": "September", "10": "October", "11": "November", "12": "December"
    };
    
    const reportMonthName = monthNames[selectedMonth] || "Selected Month";
    
    // Header
    doc.setFillColor(primaryColor);
    doc.rect(0, 0, 210, 42, "F");
    
    doc.setTextColor("#ffffff");
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(20);
    doc.text("St. Joseph's College (Autonomous)", 15, 18);
    
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor("#94a3b8");
    doc.text("Administrative Resource & Venue Allocation Portal", 15, 26);
    doc.text("CONFIDENTIAL REPORT", 15, 34);
    
    doc.setFontSize(11);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor("#ffffff");
    doc.text(`Monthly Bookings Analysis: ${reportMonthName} ${selectedYear}`, 195, 22, { align: "right" });
    
    // Statistics Section
    doc.setTextColor(primaryColor);
    doc.setFontSize(13);
    doc.setFont("Helvetica", "bold");
    doc.text("1. Monthly Allocation Performance Summary", 15, 54);
    doc.setDrawColor(borderGrey);
    doc.line(15, 56, 195, 56);
    
    doc.setFillColor(lightGrey);
    doc.rect(15, 62, 180, 52, "F");
    doc.rect(15, 62, 180, 52, "S");
    
    doc.setFontSize(10);
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(textColor);
    
    // Stats Columns
    doc.text(`Total Requested Events:    ${totalBookingsCount}`, 22, 74);
    doc.text(`Approved Events:            ${approvedBookingsCount}`, 22, 82);
    doc.text(`Pending Actions:            ${pendingBookingsCount}`, 22, 90);
    doc.text(`Rejected Applications:       ${rejectedBookingsCount}`, 22, 98);
    
    doc.text(`Most Booked Venue:   ${mostUsedHallName} (${maxCount > 0 ? maxCount : 0} Allocations)`, 110, 74);
    doc.text(`Least Booked Venue:  ${leastUsedHallName} (${minCount !== Infinity && minCount > 0 ? minCount : 0} Allocations)`, 110, 82);
    doc.text(`Peak Usage Window:   ${peakBookingTime}`, 110, 90);
    doc.text(`Generated Date:        ${new Date().toLocaleString()}`, 110, 98);
    
    // Table Section
    doc.setTextColor(primaryColor);
    doc.setFontSize(13);
    doc.setFont("Helvetica", "bold");
    doc.text("2. Event Allocation Logs", 15, 128);
    doc.line(15, 130, 195, 130);
    
    const headers = ["ID", "Faculty Member", "Venue / Hall", "Date", "Booking Window", "Status"];
    const widths = [22, 35, 42, 23, 40, 18];
    const startX = 15;
    let startY = 138;
    
    // Draw Header Row
    doc.setFillColor(primaryColor);
    doc.rect(startX, startY, 180, 8, "F");
    doc.setTextColor("#ffffff");
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(8.5);
    
    let currentX = startX;
    headers.forEach((h, i) => {
      doc.text(h, currentX + 2, startY + 5.5);
      currentX += widths[i];
    });
    
    startY += 8;
    
    // Draw Data Rows
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(textColor);
    
    if (monthlyBookings.length === 0) {
      doc.setFillColor("#ffffff");
      doc.rect(startX, startY, 180, 10, "F");
      doc.rect(startX, startY, 180, 10, "S");
      doc.setFont("Helvetica", "italic");
      doc.text("No bookings found for the selected month.", 20, startY + 6.5);
    } else {
      monthlyBookings.forEach((b, index) => {
        if (startY > 265) {
          doc.addPage();
          startY = 20;
          
          // Draw header row on new page
          doc.setFillColor(primaryColor);
          doc.rect(startX, startY, 180, 8, "F");
          doc.setTextColor("#ffffff");
          doc.setFont("Helvetica", "bold");
          currentX = startX;
          headers.forEach((h, i) => {
            doc.text(h, currentX + 2, startY + 5.5);
            currentX += widths[i];
          });
          startY += 8;
          doc.setFont("Helvetica", "normal");
          doc.setTextColor(textColor);
        }
        
        if (index % 2 === 0) {
          doc.setFillColor("#f1f5f9");
          doc.rect(startX, startY, 180, 8, "F");
        }
        
        const fName = b.staffInformation?.name || "N/A";
        const truncatedFaculty = fName.length > 17 ? fName.substring(0, 15) + "..." : fName;
        const truncatedHall = b.hallName.length > 22 ? b.hallName.substring(0, 20) + "..." : b.hallName;
        
        const row = [
          b.id,
          truncatedFaculty,
          truncatedHall,
          b.date,
          b.timeSlots?.[0] || "N/A",
          b.status
        ];
        
        currentX = startX;
        row.forEach((cellVal, colIdx) => {
          if (colIdx === 5) {
            if (cellVal === "Approved") doc.setTextColor("#047857"); // Green
            else if (cellVal === "Rejected") doc.setTextColor("#b91c1c"); // Red
            else doc.setTextColor("#b45309"); // Yellow
            doc.setFont("Helvetica", "bold");
          } else {
            doc.setTextColor(textColor);
            doc.setFont("Helvetica", "normal");
          }
          doc.text(String(cellVal), currentX + 2, startY + 5.5);
          currentX += widths[colIdx];
        });
        
        startY += 8;
      });
    }
    
    // Page Numbers Footer
    const pages = doc.internal.getNumberOfPages();
    for (let p = 1; p <= pages; p++) {
      doc.setPage(p);
      doc.setDrawColor(borderGrey);
      doc.line(15, 280, 195, 280);
      doc.setFontSize(8);
      doc.setTextColor("#64748b");
      doc.setFont("Helvetica", "normal");
      doc.text("St. Joseph's College (Autonomous) - Confidential Booking Report", 15, 286);
      doc.text(`Page ${p} of ${pages}`, 195, 286, { align: "right" });
    }
    
    doc.save(`Hall_Allocation_Report_${reportMonthName}_${selectedYear}.pdf`);
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
          <button
            className={`tab-nav-btn ${activeTab === "reports" ? "active" : ""}`}
            onClick={() => setActiveTab("reports")}
          >
             Analytics & Reports
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

          {/* TAB 4: ANALYTICS & REPORTS */}
          {activeTab === "reports" && (
            <div className="admin-tab-section animate-fade-in">
              <div className="reports-tab-header">
                <div className="header-left">
                  <h3 className="section-title">Monthly Analytics & Booking Reports</h3>
                  <p className="section-subtitle">Generate campus venue usage statistics and download PDF logs</p>
                </div>
                <div className="reports-filters">
                  <div className="filter-group">
                    <label htmlFor="report-month">Month:</label>
                    <select
                      id="report-month"
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                      <option value="01">January</option>
                      <option value="02">February</option>
                      <option value="03">March</option>
                      <option value="04">April</option>
                      <option value="05">May</option>
                      <option value="06">June</option>
                      <option value="07">July</option>
                      <option value="08">August</option>
                      <option value="09">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                  </div>
                  <div className="filter-group">
                    <label htmlFor="report-year">Year:</label>
                    <select
                      id="report-year"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                    >
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                    </select>
                  </div>
                  <button className="download-report-btn" onClick={downloadPDFReport}>
                    📥 Download PDF Report
                  </button>
                </div>
              </div>

              {/* Monthly Stats Summary Cards */}
              <div className="reports-stats-grid">
                <div className="report-stat-card total">
                  <div className="stat-card-icon-bg">📊</div>
                  <div className="stat-card-header">Total Bookings</div>
                  <div className="stat-card-value">{totalBookingsCount}</div>
                  <div className="stat-card-footer">
                    <span>Approved: <strong>{approvedBookingsCount}</strong></span>
                    <span>Pending: <strong>{pendingBookingsCount}</strong></span>
                    <span>Rejected: <strong>{rejectedBookingsCount}</strong></span>
                  </div>
                </div>
                <div className="report-stat-card most-used">
                  <div className="stat-card-icon-bg">🔥</div>
                  <div className="stat-card-header">Most Used Venue</div>
                  <div className="stat-card-value">{mostUsedHallName}</div>
                  <div className="stat-card-footer">
                    <span>{maxCount > 0 ? `${maxCount} approved allocations` : "No bookings approved"}</span>
                  </div>
                </div>
                <div className="report-stat-card least-used">
                  <div className="stat-card-icon-bg">❄️</div>
                  <div className="stat-card-header">Least Used Venue</div>
                  <div className="stat-card-value">{leastUsedHallName}</div>
                  <div className="stat-card-footer">
                    <span>{minCount !== Infinity && minCount > 0 ? `${minCount} approved allocations` : "No bookings approved"}</span>
                  </div>
                </div>
                <div className="report-stat-card peak-time">
                  <div className="stat-card-icon-bg">⏰</div>
                  <div className="stat-card-header">Peak Usage Slot</div>
                  <div className="stat-card-value">{peakBookingTime}</div>
                  <div className="stat-card-footer">
                    <span>Most frequent booking timing</span>
                  </div>
                </div>
              </div>

              {/* Monthly Event List Table */}
              <div className="reports-table-section">
                <h4 className="sub-section-title">Event Allocation Records for Selected Month</h4>
                {monthlyBookings.length === 0 ? (
                  <div className="admin-empty-state">No bookings found for the selected period.</div>
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
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {monthlyBookings.map((b) => (
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
                              <span className={`status-badge-admin ${b.status.toLowerCase()}`}>
                                {b.status}
                              </span>
                            </td>
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
