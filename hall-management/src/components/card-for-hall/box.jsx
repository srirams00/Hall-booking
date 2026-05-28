import "./box.css";

const Box = (props) => {
  return (
    <div className="browse-card">
      <img src={props.image} alt={props.title} />

      <div className="card-content">
        <h3>{props.title}</h3>

        <p className="location">{props.location}</p>

  
        <div className="tags">
          <span>{props.guests}</span>
        
        </div>

        <button  className="card-btn" onClick={props.onViewAvailability}   >View Availability</button>
      </div>
    </div>
  );
};

export default Box;