import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import logo from '../assets/logo.jpg';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 relative text-sm">
      <div className="h-1 bg-gradient-to-r from-sky-400 to-indigo-400"></div>
      
      <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 lg:gap-8">
        {/* Column 1: Brand Info */}
        <div className="footer-col brand-col">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <img src={logo} alt="Education Force Logo" className="h-12 w-auto object-contain bg-white rounded-md p-1" />
          </Link>
          <p className="leading-relaxed mb-6 max-w-sm">
            Education Force is a Section-8 non-profit organization committed to transforming IT education through industry-aligned programs and cutting-edge specializations.
          </p>
          <div className="flex gap-3">
            <a href="#" className="w-9 h-9 bg-white/5 border border-white/10 rounded-md flex items-center justify-center text-slate-300 transition-all duration-200 hover:bg-sky-400 hover:text-white hover:border-sky-400"><FaFacebookF size={18} /></a>
            <a href="#" className="w-9 h-9 bg-white/5 border border-white/10 rounded-md flex items-center justify-center text-slate-300 transition-all duration-200 hover:bg-sky-400 hover:text-white hover:border-sky-400"><FaInstagram size={18} /></a>
            <a href="#" className="w-9 h-9 bg-white/5 border border-white/10 rounded-md flex items-center justify-center text-slate-300 transition-all duration-200 hover:bg-sky-400 hover:text-white hover:border-sky-400"><FaLinkedinIn size={18} /></a>
            <a href="#" className="w-9 h-9 bg-white/5 border border-white/10 rounded-md flex items-center justify-center text-slate-300 transition-all duration-200 hover:bg-sky-400 hover:text-white hover:border-sky-400"><FaYoutube size={18} /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-white text-[0.95rem] font-bold mb-6 tracking-wide">QUICK LINKS</h4>
          <ul className="flex flex-col gap-4">
            <li><Link to="/about" className="text-slate-400 transition-colors duration-200 hover:text-sky-400">About Us</Link></li>
            <li><Link to="/vision" className="text-slate-400 transition-colors duration-200 hover:text-sky-400">Vision & Mission</Link></li>
            <li><Link to="/core-team" className="text-slate-400 transition-colors duration-200 hover:text-sky-400">Core Team</Link></li>
            <li><Link to="/courses" className="text-slate-400 transition-colors duration-200 hover:text-sky-400">Programs</Link></li>
            <li><Link to="#" className="text-slate-400 transition-colors duration-200 hover:text-sky-400">Life @ Education Force</Link></li>
            <li><Link to="/contact" className="text-slate-400 transition-colors duration-200 hover:text-sky-400">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Programs */}
        <div>
          <h4 className="text-white text-[0.95rem] font-bold mb-6 tracking-wide">PROGRAMS</h4>
          <ul className="flex flex-col gap-4">
            <li><Link to="/courses" className="text-slate-400 transition-colors duration-200 hover:text-sky-400">AI & Machine Learning</Link></li>
            <li><Link to="/courses" className="text-slate-400 transition-colors duration-200 hover:text-sky-400">Cyber Security & DF</Link></li>
            <li><Link to="/courses" className="text-slate-400 transition-colors duration-200 hover:text-sky-400">Data Analytics</Link></li>
            <li><Link to="/courses" className="text-slate-400 transition-colors duration-200 hover:text-sky-400">Web & Mobile App</Link></li>
            <li><Link to="/courses" className="text-slate-400 transition-colors duration-200 hover:text-sky-400">BCA</Link></li>
            <li><Link to="/courses" className="text-slate-400 transition-colors duration-200 hover:text-sky-400">BBA</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact Us */}
        <div>
          <h4 className="text-white text-[0.95rem] font-bold mb-6 tracking-wide">CONTACT US</h4>
          <div className="flex gap-4 mb-6 items-start">
            <MapPin className="text-sky-400 mt-1 shrink-0" size={18} />
            <p className="leading-relaxed">18, Vithal Plaza, 4th Floor, Opp. GEB Office, Dehgam Rd, Nava Naroda, Ahmedabad 382330</p>
          </div>
          <div className="flex gap-4 mb-6 items-start">
            <Phone className="text-sky-400 mt-1 shrink-0" size={18} />
            <p className="leading-relaxed">+91 93775 77596<br/>+91 93775 77597</p>
          </div>
          <div className="flex gap-4 mb-6 items-start">
            <Mail className="text-sky-400 mt-1 shrink-0" size={18} />
            <p className="leading-relaxed">info@educationforce.com</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-slate-950">
        <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} Education Force Charitable Foundation. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-slate-400 hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <button className="absolute left-8 -top-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.2)] transition-transform duration-200 hover:-translate-y-1 z-10" onClick={scrollToTop}>
        <ArrowUp size={20} color="#0f172a" />
      </button>
    </footer>
  );
};

export default Footer;
