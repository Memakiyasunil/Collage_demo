import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.jpg';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const NavItem = ({ path, label, dropdown }) => {
    const active = isActive(path) || (dropdown && dropdown.some(d => isActive(d.path)));
    const [isHovered, setIsHovered] = useState(false);

    return (
      <li 
        className="relative group/navitem z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {path ? (
          <Link to={path} className={`relative flex items-center gap-1 px-4 py-2 text-sm font-bold transition-colors duration-300 ${active ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
            <span className="relative z-10">{label}</span>
            {active && (
              <motion.div
                layoutId="nav-pill-active"
                className="absolute inset-0 bg-sky-500/20 rounded-full -z-0 border border-sky-500/30 shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.8 }}
              />
            )}
          </Link>
        ) : (
          <div className={`relative flex items-center gap-1 px-4 py-2 text-sm font-bold cursor-pointer transition-colors duration-300 ${active ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
            <span className="relative z-10 flex items-center gap-1">
              {label} 
              <motion.div
                animate={{ rotate: isHovered ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <ChevronDown size={14} className={`mt-[2px] ${active ? 'opacity-100 text-sky-300' : 'opacity-70 group-hover/navitem:opacity-100 group-hover/navitem:text-sky-400'} transition-all`} />
              </motion.div>
            </span>
            {active && (
              <motion.div
                layoutId="nav-pill-active"
                className="absolute inset-0 bg-sky-500/20 rounded-full -z-0 border border-sky-500/30 shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.8 }}
              />
            )}

            {dropdown && (
              <AnimatePresence>
                {isHovered && (
                  <motion.div 
                    className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-700 shadow-[0_20px_40px_rgba(0,0,0,0.5)] rounded-2xl py-3 min-w-[240px] overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 to-transparent pointer-events-none" />
                      
                      {dropdown.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05, type: "spring", stiffness: 300 }}
                        >
                          <Link
                            to={item.path}
                            className="flex items-center px-6 py-3 text-slate-300 text-sm font-semibold transition-all duration-200 hover:bg-slate-800/80 hover:text-yellow-400 group/link relative z-10"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mr-3 opacity-0 scale-0 group-hover/link:opacity-100 group-hover/link:scale-100 transition-all duration-300"></span>
                            <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">{item.label}</span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        )}
      </li>
    );
  };

  return (
    <div className="fixed top-0 inset-x-0 z-[100] flex justify-center p-6 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
        className="pointer-events-auto bg-[#0b1120]/80 backdrop-blur-2xl border border-slate-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] rounded-full px-8 py-3 flex items-center justify-between w-full max-w-7xl relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-transparent to-indigo-500/10 pointer-events-none rounded-full" />

        <Link to="/" className="flex items-center gap-3 relative z-10 group">
          <div className="relative">
            <div className="absolute inset-0 bg-sky-500 blur-md opacity-20 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500 rounded-full" />
            <img src={logo} alt="Edufordge Logo" className="h-10 w-10 object-cover rounded-full border border-white/20 relative z-10 group-hover:border-white/40 transition-all duration-700 group-hover:rotate-[360deg]" />
          </div>
          <span className="text-xl font-extrabold tracking-tight transition-all duration-300">
            <span className="text-white group-hover:text-slate-200 transition-colors">Edu</span><span className="text-yellow-400 group-hover:text-yellow-300 transition-colors">fordge</span>
          </span>
        </Link>

        <ul className="flex items-center gap-1 hidden lg:flex">
          <NavItem path="/" label="Home" />
          <NavItem label="About" dropdown={[
            { path: '/about', label: 'About Us' },
            { path: '/vision', label: 'Vision & Mission' },
            { path: '/core-team', label: 'Core Team' }
          ]} />
          <NavItem label="Programs" dropdown={[
            { path: '/courses', label: 'Integrate Programs' },
            { path: '/courses', label: 'UG Programs' },
            { path: '/courses', label: 'PG Programs' }
          ]} />
          <NavItem label="Services" dropdown={[
            { path: '/all-services', label: 'All Professional Services' },
            { path: '/services/managed-campus', label: 'Managed Campus' },
            { path: '/services/corporate-connect', label: 'Corporate Connect' },
            { path: '/services/student-acquisition', label: 'Student Acquisition' }
          ]} />
          <NavItem label="Student Services" dropdown={[
            { path: '/services/teaching', label: 'Teaching' },
            { path: '/services/training', label: 'Training' },
            { path: '/services/bootcamps', label: 'Bootcamps' },
            { path: '/services/knowledge-sharing', label: 'Knowledge Sharing' },
            { path: '/services/faculty-provision', label: 'Faculty Provision' }
          ]} />
          <NavItem path="/partners" label="Partners" />
          <NavItem path="/news" label="News & Blogs" />
          <NavItem path="/careers" label="Careers" />
        </ul>

        <div className="relative z-10 hidden md:block">
          <Link to="/contact" className="relative group overflow-hidden bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-[0_4px_15px_rgba(250,204,21,0.2)] hover:shadow-[0_4px_25px_rgba(250,204,21,0.5)] hover:-translate-y-0.5 flex items-center justify-center border border-amber-300">
            <span className="absolute inset-0 w-full h-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Inquire Now</span>
          </Link>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
