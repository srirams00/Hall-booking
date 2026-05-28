import "./Availability.css";

const Availability = ({
  image,
  title,
  location,
  guests,
  isBooked,
  closeModal,
}) => {

  return (

    <div className="modal-overlay">

      <div className="modal-box">

        <button
          className="close-btn"
          onClick={closeModal}
        >
          ✖
        </button>

        <img src={image} alt={title} />

        <h2>{title}</h2>

        <p>{location}</p>

        <span>{guests}</span>

        {
          isBooked ? (

            <div>

              <p className="booked-text">
                Hall Already Booked
              </p>

              <button
                className="booked-btn"
                disabled
              >
                Not Available
              </button>

            </div>

          ) : (

            <div>

              <p className="available-text">
                Hall Available
              </p>

              <button className="book-btn">
                Book Now
              </button>

            </div>

          )
        }

      </div>

    </div>

  );
};

export default Availability;