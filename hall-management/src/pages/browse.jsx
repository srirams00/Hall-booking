import "./browse.css";

import Card from "../components/card-for-hall/box"

const Browse = () => {
  return (
    <div className="browse-container">

      <div className="venue-grid">
      
        
        <Card
          image="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop"
          title="Grand Ballroom Palace"
          location="Chennai, Tamil Nadu"
          rating="4.8 (121 reviews)"
          price="8000"
          guests="200 Guests"
          parking="50 Parking"
        />

        <Card
          image="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop"
          title="Sri Muthaiayya Mahal"
          location="Madurai, Tamil Nadu"
          rating="4.7 (98 reviews)"
          price="7000"
          guests="150 Guests"
          parking="40 Parking"
        />

        <Card
          image="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1200&auto=format&fit=crop"
          title="Garden Vista Venue"
          location="Coimbatore, Tamil Nadu"
          rating="4.9 (150 reviews)"
          price="9000"
          guests="300 Guests"
          parking="80 Parking"
        />

      </div>
    </div>
  );
};

export default Browse;