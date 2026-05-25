import './Navbar.css';

const Navbar = () => {
    return (
         <nav className='navbar'>
                <div className='nav-container'>
                    <h3 className='nav-title'>VenueHub</h3>
                    <ul className='nav-links'>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Browse Venues</a></li>
                        <li><a href="#">About us</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#" className='nav-login'>Login</a></li>
                        <li><a href="#" className='nav-signup'>Sign up</a></li>
                    </ul>
                </div>
            </nav>
    );
};

export default Navbar;