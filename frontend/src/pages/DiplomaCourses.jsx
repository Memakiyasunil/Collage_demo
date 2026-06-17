import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';

const DiplomaCourses = () => {
  return (
    <div className="min-h-screen bg-slate-950 font-sans flex flex-col justify-center items-center pt-32 pb-24 px-8 text-center text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-900/20 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent pointer-events-none" />
      
      <motion.div 
        className="max-w-3xl mx-auto relative z-10"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <span className="text-xs font-extrabold text-sky-400 tracking-[0.2em] uppercase mb-6 block">PROGRAMS</span>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Diploma Courses</h1>
        <p className="text-xl text-slate-300 font-light leading-relaxed mb-8">
          This page is currently under construction. Details about our comprehensive diploma courses will be available here soon.
        </p>
        <button className="bg-sky-500 hover:bg-sky-400 text-slate-900 font-bold py-3 px-8 rounded-full transition-colors">
          Return Home
        </button>
      </motion.div>
    </div>
  );
};

export default DiplomaCourses;
