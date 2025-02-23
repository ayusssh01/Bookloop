import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";  // Added useLocation
import { useAuth } from "../context/AuthContext";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();  // Get current location

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <button className="hamburger-btn" onClick={toggleSidebar}>
            <FiMenu size={35} />
          </button>
        </div>
        <div className="tagline">
          BOOKLOOP - Give a Book, Gain a World !!
        </div>
        <ul className="nav-links">
          <li>
            <Link 
              to="/" 
              className={`nav-item ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link 
                  to="/profilePath" 
                  className={`nav-item ${isActive('/profilePath') ? 'active' : ''}`}
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link 
                  to="/library" 
                  className={`nav-item ${isActive('/library') ? 'active' : ''}`}
                >
                  Library
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  className="nav-item" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link 
                  to="/login" 
                  className={`nav-item ${isActive('/login') ? 'active' : ''}`}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link 
                  to="/register" 
                  className={`nav-item ${isActive('/register') ? 'active' : ''}`}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay ${isSidebarOpen ? 'show' : ''}`}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <div className={`slidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="slidebar-header">
          <button className="close-btn" onClick={toggleSidebar}>
            <IoMdClose size={24} />
          </button>
        </div>
        
        <div className="slidebar-content">
          <ul className="slidebar-menu">
            {user ? (
              <>
                <li>
                  <Link 
                    to="/" 
                    className={isActive('/') ? 'active' : ''} 
                    onClick={toggleSidebar}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/profilePath" 
                    className={isActive('/profilePath') ? 'active' : ''} 
                    onClick={toggleSidebar}
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin" 
                    className={isActive('/admin') ? 'active' : ''} 
                    onClick={toggleSidebar}
                  >
                    Admin Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/donateBooks" 
                    className={isActive('/donateBooks') ? 'active' : ''} 
                    onClick={toggleSidebar}
                  >
                    Donate Books
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/receiverDashboard" 
                    className={isActive('/receiverDashboard') ? 'active' : ''} 
                    onClick={toggleSidebar}
                  >
                    Receive Books
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/leaderboard" 
                    className={isActive('/leaderboard') ? 'active' : ''} 
                    onClick={toggleSidebar}
                  >
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/library" 
                    className={isActive('/library') ? 'active' : ''} 
                    onClick={toggleSidebar}
                  >
                    Library
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/reviewPath" 
                    className={isActive('/reviewPath') ? 'active' : ''} 
                    onClick={toggleSidebar}
                  >
                    Reviews / Ratings
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/helpSupport" 
                    className={isActive('/helpSupport') ? 'active' : ''} 
                    onClick={toggleSidebar}
                  >
                    Help & Support
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/about" 
                    className={isActive('/about') ? 'active' : ''} 
                    onClick={toggleSidebar}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/" 
                    className="nav-item"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                      toggleSidebar();
                    }}
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link 
                    to="/" 
                    className={isActive('/') ? 'active' : ''} 
                    onClick={toggleSidebar}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/login" 
                    className={isActive('/login') ? 'active' : ''} 
                    onClick={toggleSidebar}
                  >
                    Login / Register
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/leaderboard" 
                    className={isActive('/leaderboard') ? 'active' : ''} 
                    onClick={toggleSidebar}
                  >
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/about" 
                    className={isActive('/about') ? 'active' : ''} 
                    onClick={toggleSidebar}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className={isActive('/contact') ? 'active' : ''} 
                    onClick={toggleSidebar}
                  >
                    Contact Us
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;