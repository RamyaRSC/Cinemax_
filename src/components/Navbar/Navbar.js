import React, {useState, useEffect} from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; //Import the Font Awesome CSS
import './NavbarStyles.css';

import { checkUser, logOutUser, getUserData } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [signInChecker, setSignInChecker] = useState(false)
  const [userName, setUserName] = useState('')
  const [nav, setNav] = useState(false)
  const [query, setQuery] = useState('');
  const navigate = useNavigate()
  const handleNav = () => setNav(!nav)

  useEffect(() => {
    checkUser(setSignInChecker)
    getUserData(setUserName)
  }, [])

  const searchQueryHandler = (event) => {
    // console.log(event)
    const inputValue = event.target.value;
    // console.log(inputValue) //value you are typing in the search bar
    if (event.key === 'Enter' && inputValue.trim().length>0) {
      navigate(`/searchResult/${encodeURIComponent(inputValue)}`);
    }
  }

  return (
    <div className='navbar'>
      <div className='navbarContainer'>
        <div className='rightSide'>
          <div className='logo'>
            <h1>LOGO</h1>
          </div>

          <div className="search-container">
            <input type="text" name="search" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyUp={searchQueryHandler} className="search-input" />
              <a href="/searchResult" title="searchResult" className="search-btn">
                <i className="fas fa-search"></i>
              </a>
          </div>
        </div>
        </div>

      <div className='leftSide'>
        <ul className={nav ? 'nav-menu active' : 'nav-menu'}>
          <li><a href='/home'>Home</a></li>
          <li><a href='/movie'>Movie</a></li>
          <li><a href='/TvShow'>TV Show</a></li>
          <li><a href='/watchparty'>Watch Party</a></li>
          <li>
            {signInChecker ? <Profile userName={userName}/> : <a href='/register'>SignIn</a>}
          </li>
        </ul>

        <div className="menu-bars" onClick={handleNav}>
          <i className="fa fa-bars 2x"></i>
        </div>
      </div>
    </div>
  )
}

export default Navbar

function Profile({userName}) {
  const [profileButtonClicked, setProfileButtonClicked] = useState(false)

  return(
    <div className="profile">
      <div className='userName'>{userName}</div>
      <i class="fa fa-user" aria-hidden="true" onClick={() => setProfileButtonClicked(true)}></i>
      {profileButtonClicked ? <div className='sidePanelbg'onClick={() => setProfileButtonClicked(false)}/> : ''}
      {profileButtonClicked ? 
      <div className='sidePanel'>
        <div className='userName'>{userName}</div>
        <button onClick={()=> logOutUser()}>Log Out</button>
      </div> 
      : ''}
    </div>
  )
}