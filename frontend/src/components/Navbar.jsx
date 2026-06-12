import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import logo from '../assets/logo.jpg';

const Navbar = () => {
  const location = useLocation();

  const getNavLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300 cursor-pointer relative group/navlink ${
      isActive ? 'text-sky-500' : 'text-gray-600 hover:text-sky-500'
    }`;
  };

  const NavUnderline = ({ active }) => (
    <span 
      className={`absolute bottom-0.5 left-1/2 h-[2px] bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-300 -translate-x-1/2 rounded-sm ${
        active ? 'w-[calc(100%-2rem)]' : 'w-0 group-hover/navlink:w-[calc(100%-2rem)]'
      }`}
    ></span>
  );

  return (
    <nav className="bg-white/85 backdrop-blur-md shadow-sm sticky top-0 z-[100] border-b border-white/30">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 py-4">
        <Link to="/" className="flex items-center gap-2 text-indigo-950 transition-transform duration-200 hover:scale-105">
          <img src={logo} alt="Education Force Logo" className="h-10 w-auto object-contain" />
          <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">Education Force</span>
        </Link>
        
        <ul className="flex gap-2 items-center">
          <li>
            <Link to="/" className={getNavLinkClass('/')}>
              Home
              <NavUnderline active={location.pathname === '/'} />
            </Link>
          </li>
          
          <li className="relative group/dropdown">
            <span className={`${getNavLinkClass('#')} group-hover/dropdown:text-blue-700 group-hover/dropdown:border group-hover/dropdown:border-blue-700`}>
              About <ChevronDown size={14} className="text-gray-400 mt-[2px]" />
              <NavUnderline active={false} />
            </span>
            <div className="absolute top-full left-0 bg-white min-w-[200px] shadow-lg rounded-lg border border-gray-200 py-2 opacity-0 invisible translate-y-2 transition-all duration-200 z-[1000] mt-2 group-hover/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:translate-y-0">
              <Link to="/about" className="block px-5 py-3 text-gray-600 text-sm font-medium transition-colors duration-200 hover:bg-gray-100 hover:text-blue-700">About Us</Link>
              <Link to="/about" className="block px-5 py-3 text-gray-600 text-sm font-medium transition-colors duration-200 hover:bg-gray-100 hover:text-blue-700">Vision & Mission</Link>
              <Link to="/about" className="block px-5 py-3 text-gray-600 text-sm font-medium transition-colors duration-200 hover:bg-gray-100 hover:text-blue-700">Core Team</Link>
            </div>
          </li>
          
          <li className="relative group/dropdown">
            <span className={`${getNavLinkClass('#')} group-hover/dropdown:text-blue-700 group-hover/dropdown:border group-hover/dropdown:border-blue-700`}>
              Programs <ChevronDown size={14} className="text-gray-400 mt-[2px]" />
              <NavUnderline active={false} />
            </span>
            <div className="absolute top-full left-0 bg-white min-w-[200px] shadow-lg rounded-lg border border-gray-200 py-2 opacity-0 invisible translate-y-2 transition-all duration-200 z-[1000] mt-2 group-hover/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:translate-y-0">
              <Link to="/courses" className="block px-5 py-3 text-gray-600 text-sm font-medium transition-colors duration-200 hover:bg-gray-100 hover:text-blue-700">Integrate Programs</Link>
              <Link to="/courses" className="block px-5 py-3 text-gray-600 text-sm font-medium transition-colors duration-200 hover:bg-gray-100 hover:text-blue-700">UG Programs</Link>
              <Link to="/courses" className="block px-5 py-3 text-gray-600 text-sm font-medium transition-colors duration-200 hover:bg-gray-100 hover:text-blue-700">PG Programs</Link>
            </div>
          </li>
          
          <li className="relative group/dropdown">
            <span className={`${getNavLinkClass('#')} group-hover/dropdown:text-blue-700 group-hover/dropdown:border group-hover/dropdown:border-blue-700`}>
              Services <ChevronDown size={14} className="text-gray-400 mt-[2px]" />
              <NavUnderline active={false} />
            </span>
            <div className="absolute top-full left-0 bg-white min-w-[200px] shadow-lg rounded-lg border border-gray-200 py-2 opacity-0 invisible translate-y-2 transition-all duration-200 z-[1000] mt-2 group-hover/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:translate-y-0">
              <Link to="/services/managed-campus" className="block px-5 py-3 text-gray-600 text-sm font-medium transition-colors duration-200 hover:bg-gray-100 hover:text-blue-700">Managed Campus</Link>
              <Link to="/services/corporate-connect" className="block px-5 py-3 text-gray-600 text-sm font-medium transition-colors duration-200 hover:bg-gray-100 hover:text-blue-700">Corporate Connect</Link>
              <Link to="/services/student-acquisition" className="block px-5 py-3 text-gray-600 text-sm font-medium transition-colors duration-200 hover:bg-gray-100 hover:text-blue-700">Student Acquisition</Link>
            </div>
          </li>
          
          <li>
            <Link to="/partners" className={getNavLinkClass('/partners')}>
              Partners
              <NavUnderline active={location.pathname === '/partners'} />
            </Link>
          </li>
          <li>
            <Link to="/news" className={getNavLinkClass('/news')}>
              News & Blogs
              <NavUnderline active={location.pathname === '/news'} />
            </Link>
          </li>
          <li>
            <Link to="/careers" className={getNavLinkClass('/careers')}>
              Careers
              <NavUnderline active={location.pathname === '/careers'} />
            </Link>
          </li>
          <li>
            <Link to="/contact" className={getNavLinkClass('/contact')}>
              Contact
              <NavUnderline active={location.pathname === '/contact'} />
            </Link>
          </li>
        </ul>
        
        <div>
          <Link to="/contact" className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(14,165,233,0.4)] inline-block">
            Inquire Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
