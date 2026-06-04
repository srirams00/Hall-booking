import { useState } from "react";
import "./About.css";
import lawley from "../assets/halls/lawley.JPG";
import board_room from "../assets/halls/Board-Room.JPG";
import toulouse from "../assets/halls/toulouse.JPG";
import jubilee from "../assets/halls/jubilee.JPG";
import sail from "../assets/halls/sail.JPG";

function About({ onViewChange }) {
  const [activeTab, setActiveTab] = useState("heritage"); // "heritage" or "landmarks"

  const landmarkHalls = [
    {
      title: "Lawley Hall",
      est: "1905–1907",
      image: lawley,
      tag: "Heritage Landmark",
      desc: "Lawley Hall was opened by the Governor of Madras, Sir Arthur Lawley, and completed by 1907. Standing as a symbol of colonial-era architecture, it is one of the landmark structures that earned the college its Special Heritage Status from the Government of India."
    },
    {
      title: "Jubilee Building",
      est: "1997",
      image: jubilee,
      tag: "Academic Hub",
      desc: "Built to commemorate a century and a half of educational excellence, the Jubilee Building represents modern campus infrastructure, housing department offices, interactive classrooms, and multi-functional resource venues."
    },
    {
      title: "Toulouse Arena",
      est: "2023–2024",
      image: toulouse,
      tag: "Modern Megastructure",
      desc: "Named in honour of the Toulouse Province of France (from where the founding Jesuit fathers sailed to India in 1844), this modern arena boasts vast seating capacity, advanced acoustic systems, and dynamic event staging."
    },
    {
      title: "Sail Auditorium",
      est: "Modern Era",
      image: sail,
      tag: "Executive Venue",
      desc: "An echo of educational discipline meeting state-of-the-art corporate setups. Sail Hall is designed for keynotes, workshops, and international conferences, carrying the college motto in a highly modern setting."
    }
  ];

  const timelineMilestones = [
    {
      year: "1844",
      title: "Foundation of SJC",
      desc: "Established by Jesuit Fathers in Tiruchirappalli, initiating a long legacy of academic excellence in Southern India."
    },
    {
      year: "1907",
      title: "Constructing the Landmarks",
      desc: "Completed construction of the majestic Lawley Hall and Digby Hall, solidifying SJC's heritage presence."
    },
    {
      year: "1939–1942",
      title: "The Great Expansion",
      desc: "Witnessed a flurry of construction including hostel blocks, dining halls, Bertram Building, and the Lawley Wing extension."
    },
    {
      year: "2016",
      title: "Special Heritage Status",
      desc: "Recognized as one of only twelve colleges in India to receive the prestigious Special Heritage Status from the Government."
    },
    {
      year: "2024",
      title: "Futuristic Enhancements",
      desc: "Inaugurated Toulouse Arena, launching SJC into a new era of modernized learning and resource allocation."
    }
  ];

  return (
    <section className="about-page-wrapper animate-fade-in">
      {/* Hero Banner */}
      <div className="about-hero-banner" style={{ backgroundImage: `url(${board_room})` }}>
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <span className="about-hero-badge">Est. 1844</span>
          <h1>Our Campus & Venues</h1>
          <p>Discover the rich heritage and modern facilities of St. Joseph's College (Autonomous)</p>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="about-tabs-container">
        <button 
          className={`about-tab-btn ${activeTab === "heritage" ? "active" : ""}`}
          onClick={() => setActiveTab("heritage")}
        >
          📜 Our Heritage & History
        </button>
        <button 
          className={`about-tab-btn ${activeTab === "landmarks" ? "active" : ""}`}
          onClick={() => setActiveTab("landmarks")}
        >
          🏰 Majestic Landmarks
        </button>
      </div>

      {/* Tab Contents */}
      <div className="about-tab-content">
        {/* Heritage Tab */}
        {activeTab === "heritage" && (
          <div className="heritage-section animate-fade-in">
            <div className="heritage-intro">
              <div className="intro-text">
                <h2>A Legacy of Educational Excellence</h2>
                <p>
                  St. Joseph’s College, Tiruchirappalli (Trichy) is one of the oldest educational institutions in India. Established by the Jesuits in 1844, SJC has nurtured generations of scholars, researchers, and leaders.
                </p>
                <p>
                  Over nearly two centuries, the campus has evolved to merge historical heritage with cutting-edge spaces. With landmarks like Lawley Hall standing alongside modern creations like the Toulouse Arena, the college is a living monument to architectural and academic growth.
                </p>
              </div>
              <div className="intro-image">
                <img src={board_room} alt="SJC Board Room" />
                <span className="image-caption">Executive Board Room</span>
              </div>
            </div>

            {/* Historical Timeline */}
            <div className="timeline-container">
              <h2 className="timeline-title">Historical Milestones</h2>
              <div className="timeline-tree">
                {timelineMilestones.map((item, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-year">{item.year}</div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-card">
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Landmarks Tab */}
        {activeTab === "landmarks" && (
          <div className="landmarks-section animate-fade-in">
            <h2>Campus Landmarks & Venues</h2>
            <p className="landmarks-subtitle">Explore SJC's heritage and modern facilities available for reservation</p>

            <div className="landmarks-grid">
              {landmarkHalls.map((hall, idx) => (
                <div key={idx} className="landmark-card">
                  <div className="card-image-wrapper">
                    <img src={hall.image} alt={hall.title} />
                    <span className="card-tag">{hall.tag}</span>
                  </div>
                  <div className="card-info">
                    <div className="card-header-row">
                      <h3>{hall.title}</h3>
                      <span className="card-est">{hall.est}</span>
                    </div>
                    <p>{hall.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Explore CTA Section */}
      <div className="about-cta-section">
        <h2>Ready to book a venue?</h2>
        <p>Browse our live directory, check real-time availability, and secure allocation for your department events.</p>
        <button className="about-cta-btn" onClick={() => onViewChange && onViewChange("browse")}>
          Explore Campus Venues
        </button>
      </div>
    </section>
  );
}

export default About;