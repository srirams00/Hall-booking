import './Navbar.css';
import logo from '../../assets/logo.png'

const Navbar = () => {
    return (
         <nav className='navbar'>
                <div className='nav-container'>
                    <div className='nav-logo'>
                        <img src={logo} alt="" className='nav-image'/>
                        <div className='nav-name'>
                            <h4 className='nav-title'>St. Joseph's College (Autonomous)</h4>
                            <h6 className='nav-subtitle'>Tiruchirapppalli, Tamil Nadu, India.</h6>
                        </div>
                    </div>
                    
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