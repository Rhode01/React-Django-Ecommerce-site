import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import SearchBar from "./Search_bar/SearchBar";
const Navbar = ({ cartItems }) => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const toggleAccountMenu = () => {
    setIsAccountOpen(!isAccountOpen);
  };
  return (
    <>
      <nav className="navbar">
        <div className="navbar-menu-right">
          <div
            className="navbar-item"
            onMouseEnter={toggleAccountMenu}
            onMouseLeave={toggleAccountMenu}
          >
            <span className="navbar-item-link">
              <i className="uil uil-user"></i>
              <i className="uil uil-angle-down"></i>
            </span>
            {isAccountOpen && (
              <div className="navbar-submenu">
                <Link to="/signin" className="navbar-submenu-link">
                  Sign In
                </Link>
                <Link to="/login" className="navbar-submenu-link">
                  Login
                </Link>
              </div>
            )}
          </div>
          <div className="navbar-item">
            <Link to="/cart" className="navbar-item-link">
              <i className="uil uil-shopping-cart"></i>
            </Link>
          </div>
        </div>
      </nav>
      <SearchBar cartItems={cartItems} />
    </>
  );
};

export default Navbar;
