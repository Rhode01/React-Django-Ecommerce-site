
import React from "react";
import { Link } from "react-router-dom";
import "./SearchBar.css";
const SearchBar = ({ cartItems }) => {
  const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.Qty, 0);

  return (
    <div className="search-bar">
      <div className="search-bar-brand">Rhode Ecommerce</div>
      <div className="search-bar-panel">
        <input
          type="text"
          placeholder="What are you looking for?"
          className="search-bar-input"
        />
        <button className="search-bar-button">
          <i className="uil uil-search"></i>
        </button>
      </div>
      <div className="search-bar-cart">
        <Link to="/cart" className="cart-link">
          <i className="uil uil-shopping-cart"></i>
          <div className="cart-item-count">
            {cartItems.length === 0 ? "0" : totalItemsInCart}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SearchBar;
