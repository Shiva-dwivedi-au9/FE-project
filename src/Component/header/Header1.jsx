import React, { useState } from "react";
import { ReactComponent as CloseMenu } from "../assets/x.svg";
import {Link} from 'react-router-dom'
import { ReactComponent as MenuIcon } from "../assets/menu.svg";
import SearchHeader from '../SearchHeader'
import "./header.css";

const Header = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  return (
    <div className="header">
    
      <div className="logo-nav">
      
        <div className="logo-container">
        <Link to="/"> <h3>Daily Movie Mania</h3> </Link>   
        
        </div>
        <ul className={click ? "nav-options active" : "nav-options"}>
          <li className="option" onClick={closeMobileMenu}>
          <Link to="/movies">Movies</Link> 
          </li>
          <li className="option" onClick={closeMobileMenu}>
          <Link to="/series" >Series</Link>   
          </li>
          <li className="option" onClick={closeMobileMenu}>
          <Link to="/favourite" >Favourites</Link>   
          </li>
          <li className="option" onClick={closeMobileMenu}>
          <Link to="/visited" >Visited</Link>   
          </li>
          <SearchHeader />
        </ul>
        
      </div>
      <div className="mobile-menu" onClick={handleClick}>
        {click ? (
          <CloseMenu className="menu-icon" />
        ) : (
          <MenuIcon className="menu-icon" />
        )}
      </div>
    </div>
  );
};

export default Header;
