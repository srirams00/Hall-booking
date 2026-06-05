import React from 'react';
import './CustomAlert.css';
import { FaExclamationTriangle, FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';

const CustomAlert = ({ isOpen, onClose, title, message, type = 'info' }) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="alert-icon success" />;
      case 'error':
        return <FaExclamationCircle className="alert-icon error" />;
      case 'warning':
        return <FaExclamationTriangle className="alert-icon warning" />;
      default:
        return <FaInfoCircle className="alert-icon info" />;
    }
  };

  return (
    <div className="custom-alert-overlay" onClick={onClose}>
      <div className={`custom-alert-box ${type}`} onClick={(e) => e.stopPropagation()}>
        <div className="custom-alert-header">
          {getIcon()}
          <h3>{title || 'Notification'}</h3>
        </div>
        <div className="custom-alert-body">
          <p>{message}</p>
        </div>
        <div className="custom-alert-footer">
          <button className={`custom-alert-btn btn-${type}`} onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
