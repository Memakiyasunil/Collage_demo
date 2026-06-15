import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import logo from '../assets/logo.jpg';
import { SiteContext } from '../context/SiteContext';

const Footer = () => {
  const { footerData } = useContext(SiteContext);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b1120] text-slate-400 relative text-sm border-t border-slate-800/50 mt-10">
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-50"></div>
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 lg:gap-8 relative z-10">
        {/* Column 1: Brand Info */}
        <div className="footer-col brand-col">
          <Link to="/" className="flex items-center gap-4 mb-8 group">
            <div className="relative">
              <div className="absolute inset-0 bg-sky-500 blur-md opacity-20 group-hover:opacity-60 transition-opacity duration-500 rounded-2xl" />
              <img src={logo} alt="Eduforcetech Logo" className="h-14 w-auto object-contain bg-slate-900 rounded-2xl p-2 border border-slate-700 relative z-10 group-hover:border-sky-500/50 transition-colors" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-slate-200 transition-colors">
              Eduforge<span className="text-yellow-400 group-hover:text-yellow-300">tech</span>
            </span>
          </Link>
          <p className="leading-relaxed mb-8 max-w-sm text-[0.95rem] font-medium text-slate-400">
            {footerData.description}
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-slate-800/80 border border-slate-700/50 rounded-xl flex items-center justify-center text-slate-300 transition-all duration-300 hover:bg-sky-500 hover:text-white hover:border-sky-400 hover:-translate-y-1 hover:shadow-[0_10px_20px_-5px_rgba(14,165,233,0.4)] group">
              <FaFacebookF size={18} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="w-10 h-10 bg-slate-800/80 border border-slate-700/50 rounded-xl flex items-center justify-center text-slate-300 transition-all duration-300 hover:bg-pink-500 hover:text-white hover:border-pink-400 hover:-translate-y-1 hover:shadow-[0_10px_20px_-5px_rgba(236,72,153,0.4)] group">
              <FaInstagram size={18} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="w-10 h-10 bg-slate-800/80 border border-slate-700/50 rounded-xl flex items-center justify-center text-slate-300 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:border-blue-500 hover:-translate-y-1 hover:shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)] group">
              <FaLinkedinIn size={18} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="w-10 h-10 bg-slate-800/80 border border-slate-700/50 rounded-xl flex items-center justify-center text-slate-300 transition-all duration-300 hover:bg-red-500 hover:text-white hover:border-red-400 hover:-translate-y-1 hover:shadow-[0_10px_20px_-5px_rgba(239,68,68,0.4)] group">
              <FaYoutube size={18} className="group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-white text-base font-extrabold mb-8 tracking-wider uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-500"></span> Quick Links
          </h4>
          <ul className="flex flex-col gap-4">
            {['About Us', 'Vision & Mission', 'Core Team', 'Programs', 'Life @ Eduforgetech', 'Contact'].map((link, i) => (
              <li key={i}>
                <Link to="#" className="text-slate-400 font-medium transition-all duration-200 hover:text-sky-400 hover:translate-x-1 flex items-center gap-2 group">
                  <span className="text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity text-xs">▸</span> {link}
                </Link>
              </li>
            ))}
            <li className="mt-4">
              <button className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 px-6 py-2.5 rounded-xl font-bold transition-all duration-300 hover:shadow-[0_4px_15px_rgba(250,204,21,0.3)] hover:-translate-y-0.5 border border-amber-300 w-full md:w-auto">
                Subscribe to Newsletter
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Programs */}
        <div>
          <h4 className="text-white text-base font-extrabold mb-8 tracking-wider uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Programs
          </h4>
          <ul className="flex flex-col gap-4">
            {['AI & Machine Learning', 'Cyber Security & DF', 'Data Analytics', 'Web & Mobile App', 'BCA', 'BBA'].map((link, i) => (
              <li key={i}>
                <Link to="/courses" className="text-slate-400 font-medium transition-all duration-200 hover:text-indigo-400 hover:translate-x-1 flex items-center gap-2 group">
                  <span className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity text-xs">▸</span> {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact Us */}
        <div>
          <h4 className="text-white text-base font-extrabold mb-8 tracking-wider uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span> Contact Us
          </h4>
          <div className="flex gap-4 mb-6 items-start group">
            <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center shrink-0 border border-slate-700/50 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 transition-colors">
              <MapPin className="text-orange-400" size={18} />
            </div>
            <p className="leading-relaxed font-medium pt-1 text-slate-400 group-hover:text-slate-300 transition-colors">{footerData.address}</p>
          </div>
          <div className="flex gap-4 mb-6 items-start group">
            <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center shrink-0 border border-slate-700/50 group-hover:border-sky-500/50 group-hover:bg-sky-500/10 transition-colors">
              <Phone className="text-sky-400" size={18} />
            </div>
            <p className="leading-relaxed font-medium pt-1 text-slate-400 group-hover:text-slate-300 transition-colors">
              {footerData.phone1}
              {footerData.phone2 && <><br />{footerData.phone2}</>}
            </p>
          </div>
          <div className="flex gap-4 mb-6 items-start group">
            <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center shrink-0 border border-slate-700/50 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-colors">
              <Mail className="text-emerald-400" size={18} />
            </div>
            <p className="leading-relaxed font-medium pt-1 text-slate-400 group-hover:text-slate-300 transition-colors">{footerData.email}</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/50 bg-[#0f172a] relative z-10">
        <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="font-medium text-slate-500">&copy; {new Date().getFullYear()} Education <span className="text-yellow-500 font-bold">Forge</span> Charitable Foundation. All rights reserved.</p>
          <div className="flex gap-8 font-medium">
            <Link to="#" className="text-slate-500 hover:text-sky-400 transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-slate-500 hover:text-sky-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <button 
        className="absolute left-8 -top-7 w-14 h-14 bg-gradient-to-tr from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-[0_10px_20px_-5px_rgba(250,204,21,0.5)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_-5px_rgba(250,204,21,0.6)] z-20 border border-amber-300 group" 
        onClick={scrollToTop}
      >
        <ArrowUp size={24} className="text-slate-900 group-hover:animate-bounce" />
      </button>
    </footer>
  );
};

export default Footer;
