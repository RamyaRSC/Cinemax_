import React, {useState} from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; //Import the Font Awesome CSS
import './NavbarStyles.css';
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const [nav, setNav] = useState(false)
  const handleNav = () => setNav(!nav)
  const { loginWithRedirect , isAuthenticated , logout , user} = useAuth0();

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

        <ul className={nav ? 'nav-menu active' : 'nav-menu'}>
            <li><a href='/home'>Home</a></li>
            <li><a href='/movie'>Movie</a></li>
            <li><a href='/about'>About</a></li>
            <li><a href='/register'>SignIn</a></li>
            <li><a href='/Contact'>Contact</a></li>
            {
              isAuthenticated &&
              (<li><p>
                {user.name}
              </p></li>)
            }
            {
              isAuthenticated ? (
              <li>
                <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                  Log Out
                </button>
              </li>) : 
              (<li>
                  <a onClick={() => loginWithRedirect()}>Log In</a>
              </li>)
            }
        </ul> 

        <div className="menu-bars" onClick={handleNav}>
          <i className="fa fa-bars 2x"></i>
        </div>
      </div>
    </div>
  )
}

export default Navbar