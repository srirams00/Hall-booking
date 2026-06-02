import React from "react";
import "./box.css";

const Box = (props) => {
  return (
    <div className="browse-card">
      <img src={props.image} alt={props.title} loading="lazy" />

      <div className="card-content">
        <h3>{props.title}</h3>

        <div className="tags">
          <span className="capacity-tag">
            <strong> {props.capacity}</strong>
          </span>
          <span className={`ac-tag ${props.ac ? "ac" : "non-ac"}`}>
            {props.ac ? " AC" : "No AC"}
          </span>
        </div>

        <button className="card-btn" onClick={props.onViewAvailability}>
          View Availability
        </button>
      </div>
    </div>
  );
};

export default React.memo(Box);