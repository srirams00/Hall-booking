import Navbar from '../../components/Navbar/Navbar';
import './Home.css';

const Home = () => {
    return(
        <div className="home-page">
            <Navbar />
            <section className="hero">
                <div className="hero-content">
                    <span className="badge">St. Joseph's campus</span>
                    <h1 className="hero-title">
                        Campus Resource & <br />
                        <span>Hall Allocation Portal</span>
                    </h1>
                    <p className="hero-subtitle">
                        Streamlined booking system for classrooms, auditoriums, and laboratories. 
                        Request and manage campus venues with real-time availability tracking.
                    </p>

                    <div className="search-container">
                        <input 
                        type="text" 
                        placeholder="Search for Auditorium, or Lab..." 
                        className="search-input"
                        />
                        <button className="search-button">Search</button>
                    </div>

                    <div className="stats">
                        <div className="stat-card">
                            <h3>12</h3>
                            <p>Venues</p>
                        </div>
                        <div className="stat-card">
                            <h3>24/7</h3>
                            <p>Access</p>
                        </div>
                    </div>
                </div>
        </section>
        <section className='hall'>
            <div className="hall-container">
                <div className="hall-title">
                    <h2 >Campus Halls</h2>
                    <p>
                        Browse all available halls
                    </p>
                </div> 
                <div className="hall-filter">
                    <div className="filter-tabs">
                        <button className="tab-item">All</button>
                        <button className="tab-item">Available</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
    );
};

export default Home;