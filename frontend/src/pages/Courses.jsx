import React from 'react';
import { motion } from 'framer-motion';
import ProgramsSection from '../components/ProgramsSection';
import { fadeInUp } from '../utils/animations';

const Courses = () => {
  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      {/* Premium Hero Graphic */}
      <div className="relative pt-32 pb-20 px-8 bg-[#060b14] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920&q=80" alt="Students Learning" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-[#060b14]/80 to-[#060b14]/40" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <span className="text-amber-400 font-bold tracking-widest uppercase text-sm mb-4 block">Academic Excellence</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Programs</span></h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium">
              Industry-aligned curriculum designed to transform beginners into highly-skilled professionals ready for the modern workforce.
            </p>
          </motion.div>
        </div>
      </div>

      <ProgramsSection />
    </div>
  );
};

export default Courses;
