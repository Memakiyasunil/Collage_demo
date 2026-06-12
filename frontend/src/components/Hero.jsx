import React, { useState } from 'react';
import { GraduationCap, ArrowRight, Check, FileDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { slideInLeft, slideInRight, staggerContainer, fadeInUp } from '../utils/animations';

const Hero = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    university: '',
    city: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inquiry details:", formData);
    setIsSubmitted(true);
    
    // Trigger download of brochure
    const link = document.createElement('a');
    link.href = '/brochure.pdf';
    link.download = 'brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', phone: '', email: '', university: '', city: '' });
  };

  const inputClasses = "w-full px-5 py-4 bg-white/10 border border-white/10 rounded-lg text-white text-sm outline-none transition-all duration-200 focus:bg-white/15 focus:border-blue-500 placeholder-slate-400";

  return (
    <section className="bg-gradient-to-b from-slate-900 to-slate-950 min-h-[calc(100vh-80px)] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-8 pt-32 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 w-full items-center relative z-10">
        
        {/* Left Content */}
        <motion.div 
          className="text-white lg:pr-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-8 text-slate-300" variants={fadeInUp}>
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            <GraduationCap size={16} />
            <span>Admissions Open 2026-27</span>
          </motion.div>
          
          <motion.h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight" variants={fadeInUp}>
            Transform Your Future<br />
            with <span className="text-sky-400">Cutting-Edge IT<br/>Education</span>
          </motion.h1>
          
          <motion.p className="text-lg leading-relaxed text-slate-300 mb-10 max-w-[90%]" variants={fadeInUp}>
            Explore 30+ industry-aligned programs across 5 top<br className="hidden md:block" />
            universities. Get expert career guidance, detailed fee<br className="hidden md:block" />
            structure, and scholarship information — absolutely free.
          </motion.p>
          
          <motion.div className="flex gap-4 mb-12" variants={fadeInUp}>
            <button className="flex items-center gap-2 bg-sky-500 text-white px-6 py-3.5 rounded-lg font-semibold transition-transform duration-200 hover:scale-105 hover:bg-sky-600">
              Explore Programs <ArrowRight size={18} />
            </button>
            <button className="bg-white/10 text-white px-6 py-3.5 rounded-lg font-semibold border border-white/10 transition-transform duration-200 hover:scale-105 hover:bg-white/20">
              Inquire Now
            </button>
          </motion.div>
          
          <motion.div className="flex gap-6 flex-wrap" variants={fadeInUp}>
            <div className="flex items-center gap-2 text-sm text-slate-200 font-medium">
              <Check size={16} className="text-emerald-500" />
              <span>Free Career Counselling</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-200 font-medium">
              <Check size={16} className="text-emerald-500" />
              <span>Fee Structure & Scholarships</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-200 font-medium">
              <Check size={16} className="text-emerald-500" />
              <span>Callback in 24 Hours</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Content - Form */}
        <motion.div 
          className="flex lg:justify-end justify-center"
          initial="hidden"
          animate="visible"
          variants={slideInRight}
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 lg:p-10 w-full max-w-lg text-center shadow-2xl">
            <div className="bg-sky-500/20 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-6">
              <FileDown size={20} className="text-sky-400" />
            </div>
            <h3 className="text-white text-2xl font-bold mb-2">Download Free Brochure</h3>
            <p className="text-sky-400 text-sm mb-8">Get detailed fee structure, curriculum & placement info</p>
            
            <form className="flex flex-col gap-4 text-left" onSubmit={handleSubmit}>
              {isSubmitted && <div className="text-[#4CAF50] bg-[#e8f5e9] p-3 rounded-md mb-2 text-sm font-medium border border-[#4CAF50] text-center">Thank you! Brochure downloading...</div>}
              <div>
                <input type="text" name="name" placeholder="Your Name *" required value={formData.name} onChange={handleChange} className={inputClasses} />
              </div>
              <div>
                <input type="tel" name="phone" placeholder="Mobile Number *" required value={formData.phone} onChange={handleChange} className={inputClasses} />
              </div>
              <div>
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className={inputClasses} />
              </div>
              <div className="relative">
                <select name="university" value={formData.university} onChange={handleChange} className={`${inputClasses} appearance-none cursor-pointer pr-10`}>
                  <option value="" disabled className="bg-slate-800 text-white">Select University</option>
                  <option value="Gandhinagar University" className="bg-slate-800 text-white">Gandhinagar University</option>
                  <option value="Vidhyadeep University" className="bg-slate-800 text-white">Vidhyadeep University</option>
                  <option value="Shreyarth University" className="bg-slate-800 text-white">Shreyarth University</option>
                  <option value="Rai University" className="bg-slate-800 text-white">Rai University</option>
                  <option value="Monark University" className="bg-slate-800 text-white">Monark University</option>
                  <option value="The New Progressive College" className="bg-slate-800 text-white">The New Progressive College</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
              <div>
                <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className={inputClasses} />
              </div>
              
              <button type="submit" className="flex items-center justify-center gap-2 bg-sky-500 text-white p-4 rounded-lg font-semibold mt-2 transition-colors duration-200 hover:bg-sky-600">
                <FileDown size={18} />
                Download Brochure & Get Callback
              </button>
            </form>
            
            <p className="mt-6 text-xs text-slate-400">
              Your information is 100% secure and never shared
            </p>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default Hero;
