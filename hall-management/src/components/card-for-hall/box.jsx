import "./box.css";

const Card = (props) => {
  return (
    <div className="browse-card">
      <img src={props.image} alt={props.title} />

      <div className="card-content">
        <h3>{props.title}</h3>

        <p className="location">{props.location}</p>

        <p className="rating">⭐ {props.rating}</p>

        <h2 className="price">
          ₹{props.price}
          <span>/day</span>
        </h2>

        <div className="tags">
          <span>{props.guests}</span>
          <span>{props.parking}</span>
        </div>

        <button>View Availability</button>
      </div>
    </div>
  );
};

export default Card;