import "./About.css";
import lawley from "../assets/halls/lawley.JPG";
import board_room from "../assets/halls/Board-Room.JPG";
import toulouse from "../assets/halls/toulouse.JPG";
import jubilee from "../assets/halls/jubilee.JPG";
import sail from "../assets/halls/sail.JPG";

function About({ onViewChange }) {
  return (
    <section className="about">

      <div className="about-header">
        <h1>About Our Halls</h1>
        <p>
          St. Joseph’s College Hall Booking Platform
        </p>
      </div>

      <div className="about-container">

        <div className="about-content">

          <h2>Modern Event Spaces</h2>
          <div className="about-image">
          <img
            src={board_room}
            alt="Hall"
          />
        </div>

          <p>
        St. Joseph’s College in Tiruchirappalli (Trichy) is one of the oldest 
        educational institutions in India, established in 1844 by
        the Jesuits. Over time, as the college expanded,
        many important halls and buildings were constructed 
        to support academics, researchand student activities.
        The campus includes facilities such as Marian Hall,
        Josephine Hall, Auditorium, Conference Halls, and
        Open Air Theatre with professional infrastructure
        and spacious seating arrangements.
          </p>

        <div className="about-content">
          <p>
           <h2> Expansion phase (1930s–1940s)</h2>

Between 1939 and 1942, the college went through a major construction boom. During this period:
New hostel blocks were built
Dining halls and kitchen facilities were added
Additional halls and buildings supported growing student strength

This period marked the transformation of the college into a full-fledged campus with multiple functional halls for student life and academics.
          </p>
          </div>
          <p>
           <h2> Lawley hall (1905–1907)</h2>
                
        <div className="about-image">
          <img
            src={lawley}
            alt="Hall"
          />
        </div>
Lawley Hall was opened by the Governor of Madras, Sir Arthur Lawley, for whom it is named, and completed by 1907. This is one of the two majestic landmark buildings of the college.
From 1939–42, the College witnessed a flurry of construction including a Lawley wing projection (extension to Lawley Hall).
Lawley Hall stands as a symbol of the colonial-era architecture and the Jesuit commitment to education. In 2016, the college was one of only
 twelve colleges in India to be given Special Heritage Status by the Government of India. Lawley Hall, as one of the oldest buildings on campus, is very much part of that heritage legacy.
 </p>
 <p>
           <h2> Jubilee building (1997)</h2>
<div className="about-image">
          <img
            src={jubilee}
            alt="Hall"
          />
        </div>
Between 1939 and 1942, the college went through a major construction boom. During this period:
New hostel blocks were built
Dining halls and kitchen facilities were added
Additional halls and buildings supported growing student strength
The Jubilee Building is part of a long tradition of named heritage structures at SJC. The College completed construction of two majestic buildings Lawley Hall and Digby Hall by 1907. From 1939–42, the College witnessed a flurry of construction activities including the Lawley wing projection, the first two blocks of the New Hostel, the Sacred Heart Hostel, 
the Brothers Hostel, the boarders' kitchen and dining halls, the Bellarmine Hall and Guest House, and the Bertram Building.
This period marked the transformation of the college into a full-fledged campus with multiple functional halls for student life and academics.
          </p>
          <p>
           <h2> Toulousee arena (2023–2024)</h2>
<div className="about-image">
          <img
            src={toulouse}
            alt="Hall"
          />
        </div>
 Rising magnificently within the ancient and hallowed grounds of St. 
 Joseph's College, Trichy, the Toulouse Arena stands as a proud symbol of the institution's leap into the modern era.
  Named in honour of the Toulouse Province of France, from where the founding Jesuit fathers sailed to India nearly two centuries ago,
   this grand arena beautifully carries the weight of history in its very name. Its modern architecture  with spacious interiors, state-of-the-art
    acoustics, and a vast seating capacity.</p>
          
          <p>
           <h2> Sail hall</h2>
<div className="about-image">
          <img
            src={sail}
            alt="Hall"
          />
        </div>
  The echo of old corridors gives way to the hum of modern acoustics, designed to carry every word of a lecture or keynote with crystal clarity. 
  Yet, even within its contemporary walls,
   the spirit of the institution lingers — in the Jesuit motto carved near its entrance,
   in the discipline of the students who fill its seats, and in the values passed down through generations. It is a space where history does not compete with modernity, but rather, inspires it.</p>
   <button onClick={() => onViewChange && onViewChange("browse") }>
  Explore
</button>
        </div>

      </div>

    </section>
  );
}

export default About;