import { useState, useEffect } from "react";
import About from "./pages/About";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Browse from "./pages/browse/browse";
import LoginPage from "./components/Login/Login";
import Adminlogin from "./components/Admin login/adminlogin";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem("hall_current_user") || null;
  });

  const [currentAdmin, setCurrentAdmin] = useState(() => {
    return localStorage.getItem("hall_current_admin") || null;
  });

  const [currentView, setCurrentView] = useState(() => {
    if (window.location.pathname === "/admin") {
      return localStorage.getItem("hall_current_admin") ? "admin-dashboard" : "admin";
    }
    return "home";
  });

  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [loginHistory, setLoginHistory] = useState([]);
  const [halls, setHalls] = useState([]);

  // Loaders with local storage fallbacks
  const loadBookingsFallback = () => {
    const saved = localStorage.getItem("hall_bookings");
    if (saved) {
      setBookings(JSON.parse(saved));
    } else {
      const initial = [
        {
          id: "BK-A8B9C2",
          hallName: "Jubilee Building",
          date: "2026-06-03",
          timeSlots: ["11:00 AM - 12:30 PM"],
          staffInformation: {
            name: "Santhosh",
            staffId: "STF-102",
            department: "Computer Science",
            emailId: "santhosh@sjc.edu",
            phoneNumber: "9876543210"
          },
          eventInformation: {
            title: "AI & ML Workshop",
            expectedAudience: 120
          },
          bookingDate: new Date().toISOString(),
          status: "Approved"
        },
        {
          id: "BK-D5E6F1",
          hallName: "Board Room",
          date: "2026-06-04",
          timeSlots: ["2:00 PM - 4:00 PM"],
          staffInformation: {
            name: "Marian",
            staffId: "STF-105",
            department: "Information Technology",
            emailId: "marian@sjc.edu",
            phoneNumber: "9876543211"
          },
          eventInformation: {
            title: "Department Board Meeting",
            expectedAudience: 25
          },
          bookingDate: new Date().toISOString(),
          status: "Pending"
        }
      ];
      setBookings(initial);
      localStorage.setItem("hall_bookings", JSON.stringify(initial));
    }
  };

  const loadHallsFallback = () => {
    const saved = localStorage.getItem("hall_halls");
    if (saved) {
      setHalls(JSON.parse(saved));
    } else {
      const initial = [
        {
          _id: "hall-1",
          title: "Jubilee Building",
          capacity: "500 Guests",
          ac: true,
          description: "A magnificent grand hall perfect for large college events, conferences, and celebrations with modern infrastructure.",
          amenities: ["Projector", "Sound System", "AC", "chair Access"],
          image: "jubilee"
        },
        {
          _id: "hall-2",
          title: "ComAV Auditorium",
          capacity: "150 Guests",
          ac: true,
          description: "Intimate auditorium suitable for seminars, workshops, and small-scale events with excellent acoustics.",
          amenities: ["Projector", "Sound System", "AC", "Stage"],
          image: "comAV"
        },
        {
          _id: "hall-3",
          title: "Lawley Hall",
          capacity: "1000 Guests",
          ac: false,
          description: "Spacious open-air venue ideal for outdoor festivals, cultural events, and large gatherings.",
          amenities: ["Sound System", "Stage", "Open-Air"],
          image: "lawley"
        },
        {
          _id: "hall-4",
          title: "Board Room",
          capacity: "300 Guests",
          ac: true,
          description: "Executive meeting space with conference facilities, perfect for corporate events and formal gatherings.",
          amenities: ["WiFi", "Projector", "Sound System", "AC", "Conference Table"],
          image: "board_room"
        },
        {
          _id: "hall-5",
          title: "Sail Auditorium",
          capacity: "300 Guests",
          ac: true,
          description: "Modern venue with state-of-the-art facilities suitable for exhibitions, product launches, and networking events.",
          amenities: ["Projector", "Sound System", "AC", "Display Boards"],
          image: "sail"
        },
        {
          _id: "hall-6",
          title: "Toulouse Arena",
          capacity: "2000 Guests",
          ac: false,
          description: "Massive outdoor arena designed for mega events, concerts, and large-scale sports events.",
          amenities: ["Sound System", "Stage", "Open-Air", "Seating"],
          image: "toulouse"
        },
        {
          _id: "hall-7",
          title: "Balam",
          capacity: "300 Guests",
          ac: true,
          description: "Modern venue with state-of-the-art facilities suitable for exhibitions, product launches, and networking events.",
          amenities: ["Projector", "Sound System", "AC", "Display Boards"],
          image: "sail"
        },
        {
          _id: "hall-8",
          title: "Marian Hall",
          capacity: "300 Guests",
          ac: true,
          description: "Modern venue with state-of-the-art facilities suitable for exhibitions, product launches, and networking events.",
          amenities: ["Projector", "Sound System", "AC", "Display Boards"],
          image: "marian"
        },
        {
          _id: "hall-9",
          title: "MCA AV",
          capacity: "300 Guests",
          ac: true,
          description: "Modern venue with state-of-the-art facilities suitable for exhibitions, product launches, and networking events.",
          amenities: ["Projector", "Sound System", "AC", "Display Boards"],
          image: "MCA"
        },
        {
          _id: "hall-10",
          title: "Sequirera",
          capacity: "300 Guests",
          ac: true,
          description: "Modern venue with state-of-the-art facilities suitable for exhibitions, product launches, and networking events.",
          amenities: ["Projector", "Sound System", "AC", "Display Boards"],
          image: "sail"
        },
        {
          _id: "hall-11",
          title: "TV.AV Hall",
          capacity: "300 Guests",
          ac: true,
          description: "Modern venue with state-of-the-art facilities suitable for exhibitions, product launches, and networking events.",
          amenities: ["Projector", "Sound System", "AC", "Display Boards"],
          image: "TV"
        },
        {
          _id: "hall-12",
          title: "KPJ Hall",
          capacity: "300 Guests",
          ac: true,
          description: "Modern venue with state-of-the-art facilities suitable for exhibitions, product launches, and networking events.",
          amenities: ["Projector", "Sound System", "AC", "Display Boards"],
          image: "sail"
        }
      ];
      setHalls(initial);
      localStorage.setItem("hall_halls", JSON.stringify(initial));
    }
  };

  const loadUsersFallback = () => {
    const saved = localStorage.getItem("hall_users");
    if (saved) {
      setUsers(JSON.parse(saved));
    } else {
      const initial = [
        { id: "USR-001", username: "Santhosh", email: "santhosh@sjc.edu", department: "Computer Science" },
        { id: "USR-002", username: "Marian", email: "marian@sjc.edu", department: "Information Technology" }
      ];
      setUsers(initial);
      localStorage.setItem("hall_users", JSON.stringify(initial));
    }
  };

  const loadHistoryFallback = () => {
    const saved = localStorage.getItem("hall_login_history");
    if (saved) {
      setLoginHistory(JSON.parse(saved));
    } else {
      const initial = [
        { username: "Santhosh", email: "santhosh@sjc.edu", timestamp: "06/02/2026, 11:30:15 AM" },
        { username: "Marian", email: "marian@sjc.edu", timestamp: "06/02/2026, 11:45:20 AM" }
      ];
      setLoginHistory(initial);
      localStorage.setItem("hall_login_history", JSON.stringify(initial));
    }
  };

  // Fetch initial data from Express API with fallback
  const fetchBookings = async () => {
    try {
      const bookingsRes = await fetch(`${API_URL}/bookings`);
      if (bookingsRes.ok) {
        const data = await bookingsRes.json();
        setBookings(data);
        localStorage.setItem("hall_bookings", JSON.stringify(data));
      } else {
        loadBookingsFallback();
      }
    } catch (err) {
      loadBookingsFallback();
    }
  };

  const fetchHalls = async () => {
    try {
      const hallsRes = await fetch(`${API_URL}/halls`);
      if (hallsRes.ok) {
        const data = await hallsRes.json();
        setHalls(data);
        localStorage.setItem("hall_halls", JSON.stringify(data));
      } else {
        loadHallsFallback();
      }
    } catch (err) {
      loadHallsFallback();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchBookings();
      await fetchHalls();

      try {
        const usersRes = await fetch(`${API_URL}/users`);
        if (usersRes.ok) {
          const data = await usersRes.json();
          setUsers(data);
        } else {
          loadUsersFallback();
        }
      } catch (err) {
        loadUsersFallback();
      }

      try {
        const historyRes = await fetch(`${API_URL}/users/history`);
        if (historyRes.ok) {
          const data = await historyRes.json();
          setLoginHistory(data);
        } else {
          loadHistoryFallback();
        }
      } catch (err) {
        loadHistoryFallback();
      }
    };

    fetchData();
  }, []);

  // Refetch bookings when view changes to keep dashboards/availability fresh
  useEffect(() => {
    if (currentView !== "login" && currentView !== "admin") {
      fetchBookings();
    }
  }, [currentView]);

  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.pathname === "/admin") {
        setCurrentView(localStorage.getItem("hall_current_admin") ? "admin-dashboard" : "admin");
      } else {
        setCurrentView("home");
      }
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const handleUserLogin = async (username, password) => {
    const validUsers = {
      staff: { displayName: 'Moderator', email: 'moderator@sjc.edu', department: 'Staff' }
    };

    const localUser = validUsers[username.toLowerCase()];
    const displayName = localUser ? localUser.displayName : username;
    const email = localUser ? localUser.email : `${username.toLowerCase()}@sjc.edu`;
    const department = localUser ? localUser.department : 'General Campus Staff';

    try {
      const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        setCurrentUser(displayName);
        localStorage.setItem("hall_current_user", displayName);
        // Sync directory lists from DB and fetch bookings
        await fetchBookings();
        const usersRes = await fetch(`${API_URL}/users`);
        const historyRes = await fetch(`${API_URL}/users/history`);
        if (usersRes.ok) setUsers(await usersRes.json());
        if (historyRes.ok) setLoginHistory(await historyRes.json());
        setCurrentView("home");
        return true;
      } else {
        if (username.toLowerCase() === 'staff' && password === 'sjcstaff123') {
          setCurrentUser(displayName);
          localStorage.setItem("hall_current_user", displayName);
          loginFallback(displayName, email, department);
          setCurrentView("home");
          return true;
        }
        return false;
      }
    } catch (err) {
      if (username.toLowerCase() === 'staff' && password === 'sjcstaff123') {
        setCurrentUser(displayName);
        localStorage.setItem("hall_current_user", displayName);
        loginFallback(displayName, email, department);
        setCurrentView("home");
        return true;
      }
      return false;
    }
  };

  const loginFallback = (username, email, department) => {
    if (!users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
      const newUser = {
        id: "USR-" + Math.random().toString(36).substr(2, 5).toUpperCase(),
        username,
        email,
        department
      };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem("hall_users", JSON.stringify(updatedUsers));
    }
    
    const log = {
      username,
      email,
      timestamp: new Date().toLocaleString()
    };
    const updatedHistory = [log, ...loginHistory];
    setLoginHistory(updatedHistory);
    localStorage.setItem("hall_login_history", JSON.stringify(updatedHistory));
  };

  const handleAdminLogin = async (username, password) => {
    try {
      const res = await fetch(`${API_URL}/users/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentAdmin(data.displayName);
        localStorage.setItem("hall_current_admin", data.displayName);
        setCurrentView("admin-dashboard");
        return true;
      } else {
        if (username.toLowerCase() === 'principal' && password === 'Adminsjc123') {
          setCurrentAdmin('Fr. Principal');
          localStorage.setItem("hall_current_admin", 'Fr. Principal');
          setCurrentView("admin-dashboard");
          return true;
        }
        return false;
      }
    } catch (err) {
      if (username.toLowerCase() === 'principal' && password === 'Adminsjc123') {
        setCurrentAdmin('Fr. Principal');
        localStorage.setItem("hall_current_admin", 'Fr. Principal');
        setCurrentView("admin-dashboard");
        return true;
      }
      return false;
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentAdmin(null);
    localStorage.removeItem("hall_current_user");
    localStorage.removeItem("hall_current_admin");
    setCurrentView("home");
  };

  const handleNewBooking = async (booking) => {
    const tempId = "BK-" + Math.random().toString(36).substr(2, 6).toUpperCase();
    const newBookingWithDetails = {
      ...booking,
      id: tempId,
      status: "Pending"
    };

    try {
      const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBookingWithDetails)
      });
      if (res.ok) {
        const savedBooking = await res.json();
        setBookings(prev => {
          const updated = [savedBooking, ...prev];
          localStorage.setItem("hall_bookings", JSON.stringify(updated));
          return updated;
        });
      } else {
        bookingFallback(newBookingWithDetails);
      }
    } catch (err) {
      bookingFallback(newBookingWithDetails);
    }
  };

  const bookingFallback = (newBookingWithDetails) => {
    const updated = [newBookingWithDetails, ...bookings];
    setBookings(updated);
    localStorage.setItem("hall_bookings", JSON.stringify(updated));
  };

  const handleUpdateBookingStatus = async (bookingId, status, rejectionReason = "") => {
    try {
      const res = await fetch(`${API_URL}/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, rejectionReason })
      });
      if (res.ok) {
        const updatedBooking = await res.json();
        setBookings(prev => {
          const updated = prev.map(b => b.id === bookingId ? updatedBooking : b);
          localStorage.setItem("hall_bookings", JSON.stringify(updated));
          return updated;
        });
      } else {
        updateStatusFallback(bookingId, status, rejectionReason);
      }
    } catch (err) {
      updateStatusFallback(bookingId, status, rejectionReason);
    }
  };

  const updateStatusFallback = (bookingId, status, rejectionReason) => {
    const updated = bookings.map(b => {
      if (b.id === bookingId) {
        return { ...b, status, rejectionReason };
      }
      return b;
    });
    setBookings(updated);
    localStorage.setItem("hall_bookings", JSON.stringify(updated));
  };

  const handleDeleteUser = async (userId) => {
    const userToDelete = users.find(u => u.id === userId);
    if (!userToDelete) return;

    try {
      const res = await fetch(`${API_URL}/users/${userId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setUsers(prev => prev.filter(u => u.id !== userId));
      } else {
        deleteUserFallback(userId);
      }
    } catch (err) {
      deleteUserFallback(userId);
    }

    // Force log out if the current session user got deleted
    if (currentUser && currentUser.toLowerCase() === userToDelete.username.toLowerCase()) {
      setCurrentUser(null);
      localStorage.removeItem("hall_current_user");
      if (currentView === "dashboard") {
        setCurrentView("home");
      }
    }
  };

  const deleteUserFallback = (userId) => {
    const updated = users.filter(u => u.id !== userId);
    setUsers(updated);
    localStorage.setItem("hall_users", JSON.stringify(updated));
  };

  const handleAddHall = async (hallData) => {
    try {
      const res = await fetch(`${API_URL}/halls`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hallData)
      });
      if (res.ok) {
        const newHall = await res.json();
        setHalls(prev => {
          const updated = [...prev, newHall];
          localStorage.setItem("hall_halls", JSON.stringify(updated));
          return updated;
        });
      } else {
        addHallFallback(hallData);
      }
    } catch (err) {
      addHallFallback(hallData);
    }
  };

  const addHallFallback = (hallData) => {
    const newHall = {
      ...hallData,
      _id: "hall-" + Math.random().toString(36).substr(2, 6).toUpperCase()
    };
    const updated = [...halls, newHall];
    setHalls(updated);
    localStorage.setItem("hall_halls", JSON.stringify(updated));
  };

  const handleEditHall = async (hallId, updatedFields) => {
    try {
      const res = await fetch(`${API_URL}/halls/${hallId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields)
      });
      if (res.ok) {
        const updatedHall = await res.json();
        setHalls(prev => {
          const updated = prev.map(h => h._id === hallId ? updatedHall : h);
          localStorage.setItem("hall_halls", JSON.stringify(updated));
          return updated;
        });
      } else {
        editHallFallback(hallId, updatedFields);
      }
    } catch (err) {
      editHallFallback(hallId, updatedFields);
    }
  };

  const editHallFallback = (hallId, updatedFields) => {
    const updated = halls.map(h => {
      if (h._id === hallId) {
        return { ...h, ...updatedFields };
      }
      return h;
    });
    setHalls(updated);
    localStorage.setItem("hall_halls", JSON.stringify(updated));
  };

  const handleDeleteHall = async (hallId) => {
    try {
      const res = await fetch(`${API_URL}/halls/${hallId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setHalls(prev => {
          const updated = prev.filter(h => h._id !== hallId);
          localStorage.setItem("hall_halls", JSON.stringify(updated));
          return updated;
        });
      } else {
        deleteHallFallback(hallId);
      }
    } catch (err) {
      deleteHallFallback(hallId);
    }
  };

  const deleteHallFallback = (hallId) => {
    const updated = halls.filter(h => h._id !== hallId);
    setHalls(updated);
    localStorage.setItem("hall_halls", JSON.stringify(updated));
  };

  return (
    <div className="app-container">
      {currentView !== "admin" && currentView !== "admin-dashboard" && currentView !== "login" && (
        <Navbar 
          currentView={currentView} 
          onViewChange={setCurrentView} 
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}
      
      {currentView === "admin" && (
        <Adminlogin 
          onBackHome={() => {
            window.history.pushState({}, "", "/");
            setCurrentView("home");
          }} 
          onAdminLoginSuccess={handleAdminLogin}
        />
      )}
 
      {currentView === "admin-dashboard" && (
        <AdminDashboard 
          currentAdmin={currentAdmin}
          bookings={bookings}
          users={users}
          loginHistory={loginHistory}
          onLogout={handleLogout}
          onUpdateBookingStatus={handleUpdateBookingStatus}
          onDeleteUser={handleDeleteUser}
          halls={halls}
          onAddHall={handleAddHall}
          onEditHall={handleEditHall}
          onDeleteHall={handleDeleteHall}
          onBackHome={() => {
            window.history.pushState({}, "", "/");
            setCurrentView("home");
          }}
        />
      )}
      
      {currentView === "login" && (
        <LoginPage 
          onBackHome={() => {
            setCurrentView("home");
          }} 
          onLoginSuccess={handleUserLogin}
        />
      )}
      
      {currentView === "home" && (
        <Home 
          onViewChange={setCurrentView} 
          onSubmitBooking={handleNewBooking} 
          currentUser={currentUser}
          bookings={bookings}
          halls={halls}
        />
      )}
      
      {currentView === "browse" && (
        <Browse 
          currentUser={currentUser}
          onSubmitBooking={handleNewBooking} 
          onViewChange={setCurrentView}
          bookings={bookings}
          halls={halls}
        />
      )}

      {currentView === "dashboard" && (
        <UserDashboard 
          currentUser={currentUser}
          bookings={bookings}
          onBackHome={() => setCurrentView("home")}
        />
      )}
      {currentView === "about" && (
        <About onViewChange={setCurrentView} />
      )}
    </div>
  );
}

export default App;
