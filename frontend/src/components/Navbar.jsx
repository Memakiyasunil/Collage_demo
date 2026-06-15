import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.jpg';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const NavItem = ({ path, label, dropdown }) => {
    const active = isActive(path) || (dropdown && dropdown.some(d => isActive(d.path)));

    return (
      <li className="relative group/navitem z-10">
        {path ? (
          <Link to={path} className={`relative flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors duration-300 ${active ? 'text-white' : 'text-slate-300 hover:text-white'}`}>
            <span className="relative z-10">{label}</span>
            {active && (
              <motion.div
                layoutId="nav-pill-active"
                className="absolute inset-0 bg-sky-500/20 rounded-full -z-0 border border-sky-500/30"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </Link>
        ) : (
          <div className={`relative flex items-center gap-1 px-4 py-2 text-sm font-medium cursor-pointer transition-colors duration-300 ${active ? 'text-white' : 'text-slate-300 hover:text-white'}`}>
            <span className="relative z-10 flex items-center gap-1">{label} <ChevronDown size={14} className="mt-[2px] opacity-70 group-hover/navitem:opacity-100 transition-opacity" /></span>
            {active && (
              <motion.div
                layoutId="nav-pill-active"
                className="absolute inset-0 bg-sky-500/20 rounded-full -z-0 border border-sky-500/30"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}

            {dropdown && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover/navitem:opacity-100 group-hover/navitem:visible transition-all duration-300">
                <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 rounded-2xl py-2 min-w-[220px] overflow-hidden relative translate-y-2 group-hover/navitem:translate-y-0 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 to-transparent pointer-events-none" />
                  {dropdown.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.path}
                      className="block px-5 py-3 text-slate-300 text-sm font-medium transition-all duration-200 hover:bg-white/5 hover:text-yellow-400 group/link relative z-10"
                    >
                      <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1.5">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </li>
    );
  };

  return (
    <div className="fixed top-0 inset-x-0 z-[100] flex justify-center p-4 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="pointer-events-auto bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-full px-8 py-3 flex items-center justify-between w-full max-w-7xl relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-transparent to-indigo-500/10 pointer-events-none rounded-full" />

        <Link to="/" className="flex items-center gap-3 relative z-10 group">
          <div className="relative">
            <div className="absolute inset-0 bg-sky-500 blur-md opacity-20 group-hover:opacity-60 transition-opacity duration-500 rounded-full" />
            <img src={logo} alt="Eduforcetech Logo" className="h-10 w-10 object-cover rounded-full border border-white/20 relative z-10" />
          </div>
          <span className="text-xl font-extrabold tracking-tight transition-all duration-300">
            <span className="text-white group-hover:text-slate-200 transition-colors">Eduforge</span><span className="text-yellow-400 group-hover:text-yellow-400/80 transition-colors">tech</span>
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
          <Link to="/contact" className="relative group overflow-hidden bg-yellow-400 text-slate-900 px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 shadow-[0_4px_15px_rgba(250,204,21,0.2)] hover:shadow-[0_4px_25px_rgba(250,204,21,0.4)] hover:-translate-y-0.5 flex items-center justify-center">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            Inquire Now
          </Link>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
