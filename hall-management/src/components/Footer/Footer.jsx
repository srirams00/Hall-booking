import React from 'react';
import './Footer.css';
import footerLogo from '../../assets/footer.png';

const Footer = ({ onViewChange, currentView }) => {
  return (
    <footer className="portal-footer">
      <div className="footer-container">
        <div className="footer-left">
          <span className="developed-by-text">Developed by</span>
          <img src={footerLogo} alt="Developer Logo" className="footer-dev-logo" />
        </div>
        
        <div className="footer-right">
          <ul className="footer-links">
            <li>
              <a 
                href="#" 
                className={currentView === 'home' ? 'active' : ''} 
                onClick={(e) => { e.preventDefault(); onViewChange('home'); }}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={currentView === 'browse' ? 'active' : ''} 
                onClick={(e) => { e.preventDefault(); onViewChange('browse'); }}
              >
                Browse Venues
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={currentView === 'about' ? 'active' : ''} 
                onClick={(e) => { e.preventDefault(); onViewChange('about'); }}
              >
                About Us
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} St. Joseph's College (Autonomous). All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
