import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-top-border"></div>
      
      <div className="footer-container">
        {/* Column 1: Brand Info */}
        <div className="footer-col brand-col">
          <Link to="/" className="footer-logo">
            <BrainCircuit className="logo-icon" size={32} />
            <span className="logo-text">Education Force</span>
          </Link>
          <p className="footer-desc">
            Education Force is a Section-8 non-profit organization committed to transforming IT education through industry-aligned programs and cutting-edge specializations.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-box"><FaFacebookF size={18} /></a>
            <a href="#" className="social-box"><FaInstagram size={18} /></a>
            <a href="#" className="social-box"><FaLinkedinIn size={18} /></a>
            <a href="#" className="social-box"><FaYoutube size={18} /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">QUICK LINKS</h4>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/vision">Vision & Mission</Link></li>
            <li><Link to="/core-team">Core Team</Link></li>
            <li><Link to="/courses">Programs</Link></li>
            <li><Link to="#">Life @ Education Force</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Programs */}
        <div className="footer-col">
          <h4 className="footer-heading">PROGRAMS</h4>
          <ul className="footer-links">
            <li><Link to="/courses">AI & Machine Learning</Link></li>
            <li><Link to="/courses">Cyber Security & DF</Link></li>
            <li><Link to="/courses">Data Analytics</Link></li>
            <li><Link to="/courses">Web & Mobile App</Link></li>
            <li><Link to="/courses">BCA</Link></li>
            <li><Link to="/courses">BBA</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact Us */}
        <div className="footer-col contact-col">
          <h4 className="footer-heading">CONTACT US</h4>
          <div className="footer-contact-item">
            <MapPin className="contact-icon" size={18} />
            <p>18, Vithal Plaza, 4th Floor, Opp. GEB Office, Dehgam Rd, Nava Naroda, Ahmedabad 382330</p>
          </div>
          <div className="footer-contact-item">
            <Phone className="contact-icon" size={18} />
            <p>+91 93775 77596<br/>+91 93775 77597</p>
          </div>
          <div className="footer-contact-item">
            <Mail className="contact-icon" size={18} />
            <p>info@educationforce.com</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>&copy; {new Date().getFullYear()} Education Force Charitable Foundation. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms</Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <button className="scroll-to-top" onClick={scrollToTop}>
        <ArrowUp size={20} color="#0f172a" />
      </button>
    </footer>
  );
};

export default Footer;
