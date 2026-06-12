import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, BrainCircuit } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <BrainCircuit className="logo-icon" size={32} />
          <span className="logo-text">Education Force</span>
        </Link>
        
        <ul className="navbar-links">
          <li>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          </li>
          
          <li className="dropdown-parent">
            <span className="nav-link">
              About <ChevronDown size={14} className="dropdown-icon" />
            </span>
            <div className="dropdown-menu">
              <Link to="/about" className="dropdown-item">About Us</Link>
              <Link to="/about" className="dropdown-item">Vision & Mission</Link>
              <Link to="/about" className="dropdown-item">Core Team</Link>
            </div>
          </li>
          
          <li className="dropdown-parent">
            <span className="nav-link">
              Programs <ChevronDown size={14} className="dropdown-icon" />
            </span>
            <div className="dropdown-menu">
              <Link to="/courses" className="dropdown-item">Integrate Programs</Link>
              <Link to="/courses" className="dropdown-item">UG Programs</Link>
              <Link to="/courses" className="dropdown-item">PG Programs</Link>
            </div>
          </li>
          
          <li className="dropdown-parent">
            <span className="nav-link">
              Services <ChevronDown size={14} className="dropdown-icon" />
            </span>
            <div className="dropdown-menu">
              <Link to="#" className="dropdown-item">Managed Campus</Link>
              <Link to="#" className="dropdown-item">Corporate Connection</Link>
              <Link to="#" className="dropdown-item">Student Acquisition</Link>
            </div>
          </li>
          
          <li><Link to="/partners" className="nav-link">Partners</Link></li>
          <li><Link to="#" className="nav-link">Life @ Education Force</Link></li>
          <li><Link to="#" className="nav-link">News & Blogs</Link></li>
          <li><Link to="#" className="nav-link">Careers</Link></li>
          <li>
            <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
              Contact
            </Link>
          </li>
        </ul>
        
        <div className="navbar-actions">
          <button className="btn-primary">Inquire Now</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
