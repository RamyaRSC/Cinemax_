import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; //Import the Font Awesome CSS
import './NavbarStyles.css';


const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbarContainer'>
        <div className='rightSide'>
          <div className='logo'>
              <h1>LOGO</h1>
          </div>

          <div className="search-container">
            <input type="text" name="search" placeholder="Search..." className="search-input" />
              <a href="#" className="search-btn">
                <i className="fas fa-search"></i>      
              </a>
          </div>
        </div>

        <ul className='nav-menu'>
            <li><a href='/home'>Home</a></li>
            <li><a href='/movie'>Movie</a></li>
            <li><a href='/about'>About</a></li>
            <li><a href='/register'>SignIn</a></li>
        </ul>

      </div>
    </div>
  )
}

export default Navbar