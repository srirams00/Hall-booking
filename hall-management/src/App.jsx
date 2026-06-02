import { useState, useEffect } from "react";
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
      } else {
        loadBookingsFallback();
      }
    } catch (err) {
      loadBookingsFallback();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchBookings();

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
      silvest7: { displayName: 'Silvest', email: 'silvest7@sjc.edu', department: 'Information Technology' },
      sriram: { displayName: 'Sriram', email: 'sriram@sjc.edu', department: 'Information Technology' }
    };

    const localUser = validUsers[username.toLowerCase()];
    const displayName = localUser ? localUser.displayName : username;
    const email = localUser ? localUser.email : `${username.toLowerCase()}@sjc.edu`;
    const department = localUser ? localUser.department : 'General Campus Staff';

    setCurrentUser(displayName);
    localStorage.setItem("hall_current_user", displayName);

    try {
      const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        // Sync directory lists from DB and fetch bookings
        await fetchBookings();
        const usersRes = await fetch(`${API_URL}/users`);
        const historyRes = await fetch(`${API_URL}/users/history`);
        if (usersRes.ok) setUsers(await usersRes.json());
        if (historyRes.ok) setLoginHistory(await historyRes.json());
      } else {
        loginFallback(displayName, email, department);
      }
    } catch (err) {
      loginFallback(displayName, email, department);
    }
    
    setCurrentView("home");
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

  const handleAdminLogin = (adminName) => {
    setCurrentAdmin(adminName);
    localStorage.setItem("hall_current_admin", adminName);
    setCurrentView("admin-dashboard");
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
        setBookings(prev => [savedBooking, ...prev]);
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
        setBookings(prev => prev.map(b => b.id === bookingId ? updatedBooking : b));
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
        />
      )}
      
      {currentView === "browse" && (
        <Browse 
          currentUser={currentUser}
          onSubmitBooking={handleNewBooking} 
          onViewChange={setCurrentView}
          bookings={bookings}
        />
      )}

      {currentView === "dashboard" && (
        <UserDashboard 
          currentUser={currentUser}
          bookings={bookings}
          onBackHome={() => setCurrentView("home")}
        />
      )}
    </div>
  );
}

export default App;
