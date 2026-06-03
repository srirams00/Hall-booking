import { useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { FiLock } from 'react-icons/fi';
import logo from '../../assets/sjcbanner.png';
import './adminlogin.css';

const Adminlogin = ({ onBackHome, onAdminLoginSuccess }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validAdmins = [
    { username: 'principal', password: 'Adminsjc123', displayName: 'Fr. Principal' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const matched = validAdmins.find(
      a => a.username.toLowerCase() === userId.trim().toLowerCase() && a.password === password
    );

    if (matched) {
      if (onAdminLoginSuccess) {
        onAdminLoginSuccess(matched.displayName);
      }
    } else {
      setError('Invalid Administrator Credentials. Access denied.');
    }
  };

  return (
    <div className="login-page-container">
      {/* Back button */}
      <button 
        onClick={onBackHome} 
        style={{
          position: "absolute",
          top: "30px",
          left: "30px",
          background: "transparent",
          border: "none",
          color: "#007BFF",
          fontSize: "1.1rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: "'regular', sans-serif"
        }}
      >
        ← Back to Home
      </button>

      <div className="login-content-wrapper">
        
        {/* Left Branding Content Column */}
        <div className="branding-section">
          <img src={logo} alt="St. Joseph's College" className="branding-image" />
        </div>

        {/* Right Modular Input Card Layout */}
        <div className="login-card-section">
          <div className="login-card">
            <h2>Administrator Login</h2>
            {error && <div className="login-error-message">{error}</div>}
    
            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-field-group">
                <input 
                  type="text" 
                  placeholder="Admin ID" 
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required 
                />
                <FaRegUser className="field-icon" />
              </div>

              <div className="input-field-group">
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <FiLock className="field-icon" />
              </div>

              <button type="submit" className="login-submit-btn">Login</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Adminlogin;