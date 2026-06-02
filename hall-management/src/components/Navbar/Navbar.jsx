import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png'

const Navbar = ({ currentView, onViewChange, currentUser, onLogout }) => {
  const handleViewChange = useCallback((view) => {
    onViewChange && onViewChange(view);
  }, [onViewChange]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
         <nav className='navbar'>
                <div className='nav-container'>
                    <div 
                        className='nav-logo' 
                        onClick={() => handleViewChange("home")}
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={logo} alt="" className='nav-image'/>
                        <div className='nav-name'>
                            <h4 className='nav-title'>St. Joseph's College (Autonomous)</h4>
                            <h6 className='nav-subtitle'>Tiruchirapppalli, Tamil Nadu, India.</h6>
                        </div>
                    </div>
                    
                    <ul className='nav-links'>
                        <li>
                            <a 
                                href="#" 
                                className={currentView === 'home' ? 'active' : ''} 
                                onClick={(e) => { e.preventDefault(); handleViewChange("home"); }}
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#" 
                                className={currentView === 'browse' ? 'active' : ''} 
                                onClick={(e) => { e.preventDefault(); handleViewChange("browse"); }}
                            >
                                Browse Venues
                            </a>
                        </li>
                        <li><a href="#">About us</a></li>
                        {currentUser ? (
                            <li className="nav-user-menu" ref={dropdownRef}>
                                <button 
                                    className="nav-user-btn" 
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <span className="user-icon-placeholder"></span> {currentUser} ▾
                                </button>
                                {dropdownOpen && (
                                    <ul className="nav-dropdown-menu">
                                        <li onClick={() => { onViewChange("dashboard"); setDropdownOpen(false); }}>
                                            <a>Dashboard</a>
                                        </li>
                                        <li onClick={() => { onLogout(); setDropdownOpen(false); }} className="dropdown-logout">
                                            <a>Logout</a>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        ) : (
                            <li>
                                <a 
                                    href="#" 
                                    className={`nav-login ${currentView === 'login' ? 'active' : ''}`}
                                    onClick={(e) => { e.preventDefault(); handleViewChange("login"); }}
                                >
                                    Login
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
    );
};

export default React.memo(Navbar);