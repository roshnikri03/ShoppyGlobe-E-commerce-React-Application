import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartTotalCount } from '../redux/cartSlice';
import { selectSearchQuery, setSearchQuery } from '../redux/searchSlice';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const cartTotalCount = useSelector(selectCartTotalCount);
  const searchQuery = useSelector(selectSearchQuery);

  const isHomePage = location.pathname === '/';

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🌐</span>
          <span className="logo-text">ShoppyGlobe</span>
        </Link>

        {isHomePage && (
          <div className="search-bar-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              className="header-search-input"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button 
                className="clear-search-btn" 
                onClick={() => dispatch(setSearchQuery(''))}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        )}

        <nav className="nav-menu">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>
          <NavLink 
            to="/cart" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Cart
          </NavLink>
          <NavLink 
            to="/checkout" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Checkout
          </NavLink>

          <Link to="/cart" className="cart-btn" aria-label={`Shopping cart with ${cartTotalCount} items`}>
            <svg 
              className="cart-svg-icon" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2.5" 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
            {cartTotalCount > 0 && (
              <span className="cart-badge pulse-badge">
                {cartTotalCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
