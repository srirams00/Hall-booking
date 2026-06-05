import "./About.css";
import lawley from "../assets/halls/lawley.JPG";
import board_room from "../assets/halls/Board-Room.JPG";
import toulouse from "../assets/halls/toulouse.jpg";
import jubilee from "../assets/halls/jubilee.JPG";
import sail from "../assets/halls/sail.jpg";

function About({ onViewChange }) {
  const halls = [
    {
      title: "Modern Event Spaces",
      image: board_room,
      desc: "St. Joseph’s College in Tiruchirappalli (Trichy) is one of the oldest educational institutions in India, established in 1844 by the Jesuits. Over time, as the college expanded, many important halls and buildings were constructed to support academics, research, and student activities. The campus includes facilities such as Marian Hall, Josephine Hall, Auditorium, Conference Halls, and Open Air Theatre with professional infrastructure and spacious seating arrangements."
    },
    {
      title: "Lawley hall (1905–1907)",
      image: lawley,
      desc: "Lawley Hall was opened by the Governor of Madras, Sir Arthur Lawley, for whom it is named, and completed by 1907. This is one of the two majestic landmark buildings of the college. From 1939–42, the College witnessed a flurry of construction including a Lawley wing projection (extension to Lawley Hall). Lawley Hall stands as a symbol of colonial-era architecture and the Jesuit commitment to education. In 2016, the college was one of only twelve colleges in India to be given Special Heritage Status by the Government of India. Lawley Hall, as one of the oldest buildings on campus, is very much part of that heritage legacy."
    },
    {
      title: "Jubilee building (1997)",
      image: jubilee,
      desc: "The Jubilee Building is part of a long tradition of named heritage structures at SJC. The College completed construction of two majestic buildings Lawley Hall and Digby Hall by 1907. From 1939–42, the College witnessed a flurry of construction activities including the Lawley wing projection, the first two blocks of the New Hostel, the Sacred Heart Hostel, the Brothers Hostel, the boarders' kitchen and dining halls, the Bellarmine Hall and Guest House, and the Bertram Building. This period marked the transformation of the college into a full-fledged campus with multiple functional halls for student life and academics."
    },
    {
      title: "Toulousee arena (2023–2024)",
      image: toulouse,
      desc: "Rising magnificently within the ancient and hallowed grounds of St. Joseph's College, Trichy, the Toulouse Arena stands as a proud symbol of the institution's leap into the modern era. Named in honour of the Toulouse Province of France, from where the founding Jesuit fathers sailed to India nearly two centuries ago, this grand arena beautifully carries the weight of history in its very name. Its modern architecture features spacious interiors, state-of-the-art acoustics, and a vast seating capacity."
    },
    {
      title: "Sail hall",
      image: sail,
      desc: "The echo of old corridors gives way to the hum of modern acoustics, designed to carry every word of a lecture or keynote with crystal clarity. Yet, even within its contemporary walls, the spirit of the institution lingers — in the Jesuit motto carved near its entrance, in the discipline of the students who fill its seats, and in the values passed down through generations. It is a space where history does not compete with modernity, but rather, inspires it."
    }
  ];

  return (
    <section className="about">
      <div className="about-header">
        <h1>About Our Halls</h1>
        <p>St. Joseph’s College Hall Booking Platform</p>
      </div>

      <div className="about-container">
        {/* Intro History (Full-Width) */}
        <div className="about-intro-section">
          <h2>Expansion phase (1930s–1940s)</h2>
          <p>
            Between 1939 and 1942, the college went through a major construction boom. 
            During this period, new hostel blocks were built, dining halls and kitchen 
            facilities were added, and additional halls and buildings supported growing 
            student strength. This period marked the transformation of the college into 
            a full-fledged campus with multiple functional halls for student life and academics.
          </p>
        </div>

        {/* Halls 2-Column Grid */}
        <div className="about-halls-grid">
          {halls.map((hall, idx) => (
            <div key={idx} className="about-grid-card">
              <div className="about-card-image">
                <img src={hall.image} alt={hall.title} />
              </div>
              <div className="about-card-content">
                <h3>{hall.title}</h3>
                <p>{hall.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="about-actions">
          <button className="explore-btn" onClick={() => onViewChange && onViewChange("browse")}>
            Explore
          </button>
        </div>
      </div>
    </section>
  );
}

export default About;