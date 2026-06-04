import { useState } from 'react';
<<<<<<< HEAD
import { FaRegUser } from 'react-icons/fa';
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import React from 'react';
=======
import { FaRegUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiLock } from 'react-icons/fi';
>>>>>>> a502a62c9accd9c6f9973acf21ac23d178c73529
import logo from '../../assets/sjcbanner.png';
import './adminlogin.css';

const Adminlogin = ({ onBackHome, onAdminLoginSuccess }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const success = await onAdminLoginSuccess(userId.trim(), password);
      if (!success) {
        setError('Invalid Administrator Credentials. Access denied.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    }
  };

  return (
    <div className="login-page-container" onContextMenu={(e) => e.preventDefault()}>
      {/* Back button */}
      <button 
        onClick={onBackHome} 
        className="login-back-btn"
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

              <div className="input-field-group password-field-group">
                <input 
<<<<<<< HEAD
                  type={showPassword ? 'text' : 'password'} 
=======
                  type={showPassword ? "text" : "password"} 
>>>>>>> a502a62c9accd9c6f9973acf21ac23d178c73529
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  style={{ paddingRight: "45px" }}
                />
                <FiLock className="field-icon" />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
<<<<<<< HEAD
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
=======
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
>>>>>>> a502a62c9accd9c6f9973acf21ac23d178c73529
                </button>
              </div>

              <button type="submit" className="login-submit-btn">Login</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default React.memo(Adminlogin);