import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Browse from "./pages/browse/browse";
import LoginPage from "./components/Login/Login";
import Adminlogin from "./components/Admin login/adminlogin";

function App() {
  // Initialize view based on current URL path
  const [currentView, setCurrentView] = useState(() => {
    return window.location.pathname === "/admin" ? "admin" : "home";
  });

  // Listen to browser popstate to allow back/forward navigation in the future
  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.pathname === "/admin") {
        setCurrentView("admin");
      } else {
        setCurrentView("home");
      }
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  return (
    <div className="app-container">
      {/* Hide the main navbar on full-screen login and admin login screens */}
      {currentView !== "admin" && currentView !== "login" && (
        <Navbar currentView={currentView} onViewChange={setCurrentView} />
      )}
      
      {currentView === "admin" && (
        <Adminlogin onBackHome={() => {
          window.history.pushState({}, "", "/");
          setCurrentView("home");
        }} />
      )}
      
      {currentView === "login" && (
        <LoginPage onBackHome={() => {
          setCurrentView("home");
        }} />
      )}
      
      {currentView === "home" && (
        <Home onViewChange={setCurrentView} />
      )}
      
      {currentView === "browse" && (
        <Browse />
      )}
    </div>
  );
}

export default App;
