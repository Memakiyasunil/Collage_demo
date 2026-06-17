import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ChevronRight, Search, BrainCircuit, Bot, Cloud, ShieldCheck, Database, Layout, Smartphone, Glasses, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.jpg';

const navLinks = [
  { path: "/", label: "Home" },
  { 
    label: "About", 
    type: "dropdown",
    items: [
      { path: '/about', label: 'About Us' },
      { path: '/vision', label: 'Mission & Vision' },
      { path: '/core-team', label: 'Leadership Team' },
      { path: '/contact', label: 'Contact Us' }
    ]
  },
  { 
    label: "Service", 
    type: "categorized",
    categories: [
      {
        title: "College Solutions",
        items: [
          { path: '/services/managed-campus', label: 'Managed Campus' },
          { path: '/services/student-acquisition', label: 'Student Acquisition' },
          { path: '/services/corporate-connect', label: 'Corporate Connect' },
          { path: '/courses?type=Integrated', label: 'Integrated Programs' }
        ]
      },
      {
        title: "Student Services",
        items: [
          { path: '/bootcamps', label: 'Bootcamps' },
          { path: '/internship-support', label: 'Internship Support' },
          { path: '/career-counselling', label: 'Career Counselling' },
          { path: '/resume-building', label: 'Resume Building' },
          { path: '/mock-interviews', label: 'Mock Interviews' },
          { path: '/placements', label: 'Placement Preparation' },
          { path: '/hackathons', label: 'Hackathons' },
          { path: '/technical-community', label: 'Technical Communities' }
        ]
      },
      {
        title: "Programs",
        items: [
          { path: '/courses?type=UG', label: 'Undergraduate Programs (UG)' },
          { path: '/courses?type=PG', label: 'Postgraduate Programs (PG)' },
          { path: '/courses?type=Cert', label: 'Professional Certifications' },
          { path: '/diploma-courses', label: 'Diploma Courses' },
          { path: '/industry-integrated-programs', label: 'Industry Integrated Programs' },
          { path: '/online-learning-programs', label: 'Online Learning Programs' }
        ]
      }
    ]
  },
  { 
    label: "Labs", 
    type: "megaMenu",
    items: [
      { path: '/labs/ai-ml', label: 'AI & Machine Learning Lab', desc: 'Dive deep into algorithms that learn and adapt.', icon: BrainCircuit, isNew: false },
      { path: '/labs/robotics', label: 'IoT & Robotics Lab', desc: 'Build intelligent interconnected machines.', icon: Bot, isNew: false },
      { path: '/labs/cloud', label: 'Cloud Computing Lab', desc: 'Master scalable cloud architectures.', icon: Cloud, isNew: false },
      { path: '/labs/cyber-security', label: 'Cyber Security Lab', desc: 'Learn to protect digital infrastructures.', icon: ShieldCheck, isNew: true },
      { path: '/labs/data-science', label: 'Data Science Lab', desc: 'Extract insights from complex datasets.', icon: Database, isNew: false },
      { path: '/labs/web-development', label: 'Web Development Lab', desc: 'Build modern responsive web applications.', icon: Layout, isNew: false },
      { path: '/labs/mobile-app', label: 'Mobile App Development Lab', desc: 'Create iOS and Android applications.', icon: Smartphone, isNew: true },
      { path: '/labs/ar-vr-mr-xr', label: 'AR/VR Innovation Lab', desc: 'Immerse in extended reality experiences.', icon: Glasses, isNew: false },
    ],
    popularCourses: [
      { title: "Advanced AI Certification", path: "#", badge: "Trending" },
      { title: "Cloud DevOps Bootcamp", path: "#", badge: "Bestseller" }
    ]
  },
  { path: "/partners", label: "Partners" },
  { 
    label: "Resources", 
    type: "dropdown",
    items: [
      { path: '/news', label: 'Blogs & News' },
      { path: '/case-studies', label: 'Case Studies' },
      { path: '/download-brochure', label: 'Download Brochure' },
      { path: '/faqs', label: 'FAQs' }
    ]
  },
  { path: "/careers", label: "Careers" },
  { path: "/contact", label: "Contact" }
];

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Handle scroll to make navbar sticky and change appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMobileDropdown(null);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    return () => { 
      document.body.style.overflow = 'unset'; 
      document.documentElement.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const DesktopNavItem = ({ item }) => {
    const { path, label, type, items, categories, megaMenu, popularCourses } = item;
    
    // Determine active state for parent based on children
    let active = false;
    if (path) {
      active = isActive(path);
    } else if (items) {
      active = items.some(d => isActive(d.path));
    } else if (categories) {
      active = categories.some(c => c.items.some(d => isActive(d.path)));
    }

    const [isHovered, setIsHovered] = useState(false);

    return (
      <li 
        className={`${type === 'megaMenu' || type === 'categorized' ? 'static' : 'relative'} group/navitem z-10`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {path ? (
          <Link to={path} className={`relative flex items-center gap-1 px-3 xl:px-4 py-2 text-[0.85rem] xl:text-sm font-semibold transition-colors duration-300 ${active ? 'text-white' : 'text-slate-300 hover:text-sky-300'}`}>
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
          <div className={`relative flex items-center gap-1 px-3 xl:px-4 py-2 text-[0.85rem] xl:text-sm font-semibold cursor-pointer transition-colors duration-300 ${active || isHovered ? 'text-white' : 'text-slate-300'}`}>
            <span className="relative z-10 flex items-center gap-1">
              {label} 
              <motion.div
                animate={{ rotate: isHovered ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <ChevronDown size={14} className={`mt-[2px] ${active || isHovered ? 'opacity-100 text-sky-400' : 'opacity-70'} transition-all`} />
              </motion.div>
            </span>
            {active && (
              <motion.div
                layoutId="nav-pill-active"
                className="absolute inset-0 bg-sky-500/20 rounded-full -z-0 border border-sky-500/30 shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.8 }}
              />
            )}

            {/* Dropdown Types */}
            <AnimatePresence>
              {isHovered && (
                <motion.div 
                  className={`absolute top-[calc(100%+0.5rem)] ${
                    type === 'megaMenu' || type === 'categorized' 
                      ? 'left-0 right-0 flex justify-center w-full' 
                      : 'left-0'
                  } z-[100]`}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  
                  {/* Type: Simple Dropdown */}
                  {type === 'dropdown' && (
                    <div className="bg-slate-900/95 backdrop-blur-2xl border border-slate-700/80 shadow-[0_30px_60px_rgba(0,0,0,0.6)] rounded-xl py-3 min-w-[260px] overflow-hidden relative group-hover:border-sky-500/30 transition-colors">
                      <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 to-transparent pointer-events-none" />
                      {items.map((subItem, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.03, type: "spring", stiffness: 300 }}
                        >
                          <Link
                            to={subItem.path}
                            className="flex items-center px-6 py-2.5 text-slate-300 text-[0.9rem] font-medium transition-all duration-200 hover:bg-slate-800/80 hover:text-yellow-400 group/link relative z-10"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mr-3 opacity-0 scale-0 group-hover/link:opacity-100 group-hover/link:scale-100 transition-all duration-300 shadow-[0_0_8px_rgba(14,165,233,0.8)]"></span>
                            <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">{subItem.label}</span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Type: Categorized Dropdown */}
                  {type === 'categorized' && (
                    <div className="bg-slate-900/95 backdrop-blur-2xl border border-slate-700/80 shadow-[0_30px_60px_rgba(0,0,0,0.6)] rounded-xl p-6 min-w-[850px] shrink-0 relative flex gap-8">
                      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-indigo-500/5 pointer-events-none rounded-xl" />
                      {categories.map((cat, idx) => (
                        <div key={idx} className="flex-1 relative z-10">
                          <h4 className="text-sky-400 font-bold text-xs uppercase tracking-wider mb-4 border-b border-slate-700/50 pb-2">{cat.title}</h4>
                          <div className="flex flex-col gap-1">
                            {cat.items.map((subItem, sIdx) => (
                              <Link
                                key={sIdx}
                                to={subItem.path}
                                className="text-slate-300 text-[0.9rem] font-medium py-2 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Type: Mega Menu (e.g., Labs) */}
                  {type === 'megaMenu' && (
                    <div className="bg-slate-900/95 backdrop-blur-2xl border border-slate-700/80 shadow-[0_40px_80px_rgba(0,0,0,0.7)] rounded-xl p-0 w-[1000px] shrink-0 relative flex overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-sky-500/5 pointer-events-none" />
                      
                      {/* Main Grid Area */}
                      <div className="flex-[2.5] p-8 relative z-10">
                        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                          {items.map((lab, idx) => {
                            const IconComponent = lab.icon;
                            return (
                              <Link key={idx} to={lab.path} className="group/lab flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                                <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0 group-hover/lab:scale-110 group-hover/lab:bg-sky-500/20 transition-all">
                                  <IconComponent size={20} className="text-sky-400 group-hover/lab:text-sky-300" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="text-white font-bold text-[0.95rem] group-hover/lab:text-sky-300 transition-colors">{lab.label}</h4>
                                    {lab.isNew && (
                                      <span className="bg-emerald-500/20 text-emerald-400 text-[0.65rem] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider border border-emerald-500/30">New</span>
                                    )}
                                  </div>
                                  <p className="text-slate-400 text-[0.8rem] leading-relaxed group-hover/lab:text-slate-300 transition-colors line-clamp-1">{lab.desc}</p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      {/* Sidebar Area (Popular Courses) */}
                      <div className="flex-1 bg-slate-800/40 p-8 border-l border-slate-700/50 relative z-10 flex flex-col">
                        <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                          <Star size={16} className="text-yellow-400" /> Popular in Labs
                        </h4>
                        <div className="flex flex-col gap-4">
                          {popularCourses.map((course, idx) => (
                            <Link key={idx} to={course.path} className="block group/course bg-slate-900/50 border border-slate-700/50 p-4 rounded-xl hover:border-sky-500/40 transition-colors">
                              <span className="inline-block text-[0.65rem] font-bold uppercase tracking-wider text-yellow-400 mb-1">{course.badge}</span>
                              <h5 className="text-slate-200 text-sm font-semibold group-hover/course:text-white">{course.title}</h5>
                            </Link>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </li>
    );
  };

  return (
    <>
      <div className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${scrolled ? 'p-2 md:p-4' : 'p-4 md:p-6'} pointer-events-none`}>
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          className={`pointer-events-auto mx-auto max-w-[1500px] flex items-center justify-between transition-all duration-300 ${scrolled ? 'bg-[#060b14]/90 backdrop-blur-xl border border-slate-800 shadow-[0_10px_40px_rgba(0,0,0,0.8)] rounded-2xl py-3 px-6' : 'bg-[#0b1120]/60 backdrop-blur-2xl border border-slate-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] rounded-full px-8 py-3.5'} relative`}
        >
          <div className={`absolute inset-0 bg-gradient-to-r from-sky-500/5 via-transparent to-indigo-500/5 pointer-events-none ${scrolled ? 'rounded-2xl' : 'rounded-full'}`} />

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 relative z-10 group mr-4">
            <div className="relative">
              <div className="absolute inset-0 bg-sky-500 blur-md opacity-20 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500 rounded-full" />
              <img src={logo} alt="Edufordge Logo" className="h-9 w-9 object-cover rounded-full border border-white/20 relative z-10 group-hover:border-white/40 transition-all duration-700 group-hover:rotate-[360deg]" />
            </div>
            <span className="text-xl font-extrabold tracking-tight transition-all duration-300">
              <span className="text-white group-hover:text-slate-200 transition-colors">Edu</span><span className="text-yellow-400 group-hover:text-yellow-300 transition-colors">fordge</span>
            </span>
          </Link>

          {/* Right Side: Navigation & CTA */}
          <div className="flex items-center gap-4 xl:gap-8 z-10 ml-auto">
            {/* Desktop Navigation */}
            <ul className="items-center gap-1 xl:gap-2 hidden xl:flex">
              {navLinks.map((item, idx) => (
                <DesktopNavItem key={idx} item={item} />
              ))}
            </ul>
            
            {/* Desktop CTA */}
            <div className="hidden xl:flex items-center gap-3">
              <Link to="/contact" className="relative group overflow-hidden bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 bg-[length:200%_auto] text-slate-900 px-6 py-2.5 rounded-full font-extrabold text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(250,204,21,0.25)] hover:shadow-[0_6px_25px_rgba(250,204,21,0.4)] hover:-translate-y-0.5 border border-yellow-300">
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-1.5">
                  Inquire Now <ChevronRight size={16} strokeWidth={3} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="xl:hidden p-2 text-slate-300 hover:text-white transition-colors bg-slate-800/50 rounded-lg border border-slate-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Navigation Sheet */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[90] bg-[#060b14] pt-24 pb-10 px-6 overflow-y-auto overscroll-contain xl:hidden"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent pointer-events-none" />
            
            <ul className="flex flex-col relative z-10">
              {navLinks.map((item, idx) => (
                <li key={idx} className="border-b border-slate-800/60 last:border-0">
                  {item.path ? (
                    <Link 
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-4 text-xl font-bold transition-colors ${isActive(item.path) ? 'text-sky-400' : 'text-slate-200 hover:text-white'}`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div>
                      <button 
                        onClick={() => setActiveMobileDropdown(activeMobileDropdown === idx ? null : idx)}
                        className={`w-full py-4 flex items-center justify-between text-xl font-bold transition-colors ${activeMobileDropdown === idx ? 'text-sky-400' : 'text-slate-200 hover:text-white'}`}
                      >
                        {item.label}
                        <ChevronDown 
                          className={`transition-transform duration-300 ${activeMobileDropdown === idx ? 'rotate-180 text-sky-400' : 'text-slate-500'}`} 
                        />
                      </button>
                      
                      <AnimatePresence>
                        {activeMobileDropdown === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pb-4 pl-4 border-l-2 border-slate-800 ml-2">
                              {/* Simple Dropdown Mobile */}
                              {item.type === 'dropdown' && (
                                <ul className="flex flex-col gap-3 pt-2">
                                  {item.items.map((subItem, sIdx) => (
                                    <li key={sIdx}>
                                      <Link to={subItem.path} onClick={() => setIsMobileMenuOpen(false)} className="text-[1.05rem] font-medium text-slate-400 hover:text-white block py-1">
                                        {subItem.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}

                              {/* Categorized Dropdown Mobile */}
                              {item.type === 'categorized' && (
                                <div className="flex flex-col gap-6 pt-2">
                                  {item.categories.map((cat, cIdx) => (
                                    <div key={cIdx}>
                                      <h4 className="text-sky-400 text-xs font-bold uppercase tracking-wider mb-3">{cat.title}</h4>
                                      <ul className="flex flex-col gap-3">
                                        {cat.items.map((subItem, sIdx) => (
                                          <li key={sIdx}>
                                            <Link to={subItem.path} onClick={() => setIsMobileMenuOpen(false)} className="text-[1.05rem] font-medium text-slate-400 hover:text-white block py-1">
                                              {subItem.label}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Mega Menu Mobile (Labs) */}
                              {item.type === 'megaMenu' && (
                                <ul className="flex flex-col gap-4 pt-2">
                                  {item.items.map((lab, lIdx) => (
                                    <li key={lIdx}>
                                      <Link to={lab.path} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 group/moblab">
                                        <div className="w-8 h-8 rounded-md bg-slate-800 flex items-center justify-center shrink-0">
                                          <lab.icon size={16} className="text-slate-400 group-hover/moblab:text-sky-400" />
                                        </div>
                                        <span className="text-[1.05rem] font-medium text-slate-300 group-hover/moblab:text-white">
                                          {lab.label}
                                        </span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-4 relative z-10">
              <Link 
                to="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-400 text-slate-900 px-6 py-4 rounded-xl font-extrabold text-lg flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20"
              >
                Inquire Now <ChevronRight size={20} strokeWidth={3} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
