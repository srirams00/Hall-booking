import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Browse from "./pages/browse/browse";

function App() {
  const [currentView, setCurrentView] = useState("home"); // 'home' or 'browse'

  return (
    <div className="app-container">
      <Navbar currentView={currentView} onViewChange={setCurrentView} />
      
      {currentView === "home" ? (
        <Home onViewChange={setCurrentView} />
      ) : (
        <Browse />
      )}
    </div>
  );
}

export default App;
