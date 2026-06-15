import React from 'react';
import { motion } from 'framer-motion';
import { slideInLeft, slideInRight, fadeInUp } from '../utils/animations';

// Custom component to mimic the brush stroke circular graphic from the screenshot
const BrushCircle = ({ text }) => (
  <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center shrink-0">
    {/* Outer decorative strokes to simulate brush edges */}
    <div className="absolute inset-0 rounded-full border-[10px] border-orange-500/90 border-dashed animate-[spin_30s_linear_infinite]" style={{ borderRadius: '45% 55% 40% 60% / 55% 45% 60% 40%' }} />
    <div className="absolute inset-1 rounded-full border-[14px] border-amber-500/80 animate-[spin_25s_linear_infinite_reverse]" style={{ borderRadius: '50% 60% 55% 45% / 40% 50% 45% 60%' }} />
    <div className="absolute inset-3 bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-500 rounded-full shadow-[0_0_30px_rgba(249,115,22,0.4)]" style={{ borderRadius: '52% 48% 55% 45% / 48% 55% 45% 52%' }} />
    
    {/* Inner White Circle */}
    <div className="absolute inset-[16px] bg-white shadow-[inset_0_0_20px_rgba(0,0,0,0.15)] flex items-center justify-center z-10 overflow-hidden" style={{ borderRadius: '48% 52% 45% 55% / 55% 45% 52% 48%' }}>
      {/* Subtle inner gradient to give it a slightly spherical/paper feel */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.05)_100%)]" />
      <span 
        className="marker-font text-5xl md:text-[4.5rem] text-black font-black tracking-tight relative z-20" 
        style={{ transform: 'rotate(-4deg)' }}
      >
        {text}
      </span>
    </div>
    
    {/* Splatters & Accents to match the messy brush style */}
    <div className="absolute top-8 -right-3 w-3 h-6 bg-orange-600 rounded-full rotate-[30deg]" />
    <div className="absolute bottom-12 -left-4 w-4 h-8 bg-amber-500 rounded-full -rotate-12" />
    <div className="absolute -bottom-1 right-12 w-2 h-2 bg-yellow-500 rounded-full" />
    <div className="absolute top-1/3 -right-6 w-8 h-2 bg-orange-500 rounded-full rotate-45" />
    <div className="absolute top-2 left-12 w-2 h-2 bg-orange-400 rounded-full" />
  </div>
);

const Vision = () => {
  return (
    <div className="min-h-screen bg-[#1e2227] font-sans relative overflow-hidden pb-32">
      {/* Import the Permanent Marker font for the circles */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
          .marker-font { font-family: 'Permanent Marker', cursive; }
        `}
      </style>

      {/* --- BACKGROUND ELEMENTS --- */}
      {/* Large Watermark Texts */}
      <div className="absolute top-24 left-10 md:left-20 text-[8rem] md:text-[14rem] font-bold text-white/[0.03] select-none pointer-events-none tracking-tighter leading-none z-0 mix-blend-overlay">
        Vision
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] md:text-[14rem] font-bold text-white/[0.03] select-none pointer-events-none tracking-tighter leading-none z-0 mix-blend-overlay">
        Mission
      </div>
      <div className="absolute bottom-20 right-10 text-[8rem] md:text-[14rem] font-bold text-white/[0.03] select-none pointer-events-none tracking-tighter leading-none z-0 mix-blend-overlay">
        Values
      </div>

      {/* Blurred Colored Background Circles */}
      <div className="absolute top-10 -left-40 w-[40rem] h-[40rem] bg-emerald-900/30 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-10 -right-20 w-[45rem] h-[45rem] bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/4 w-[30rem] h-[30rem] bg-sky-900/20 blur-[100px] rounded-full pointer-events-none z-0" />
      
      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-40 flex flex-col gap-24">
        
        {/* Row 1: Vision Card (Left) -> Vision Circle (Right) */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center lg:justify-start"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft}
          >
            <div className="bg-[#b1b5b9] p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-xl">
              <h3 className="text-3xl font-bold text-slate-800 mb-4 border-b-2 border-slate-500/40 pb-3">Vision</h3>
              <p className="text-slate-800 text-[0.95rem] leading-relaxed font-medium">
                A leading institution to be benchmarked with design-centric research & bonafide innovation. 
                The institution to provide Competent Leaders with Global Perspective. 
                The institution to perpetuate academic excellence and promote knowledge-based spectrum. 
                The institution to enhance practical relevance of Research & Development. 
                The institution to contribute substantially to the rapid industrial and economic growth of the nation.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="w-full lg:w-1/2 flex justify-center lg:justify-end"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight}
          >
            <BrushCircle text="Vision" />
          </motion.div>
        </div>

        {/* Row 2: Mission Circle (Left) -> Mission Card (Right) */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center lg:justify-start"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft}
          >
            <BrushCircle text="Mission" />
          </motion.div>

          <motion.div 
            className="w-full lg:w-1/2 flex justify-center lg:justify-end"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight}
          >
            <div className="bg-[#b1b5b9] p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-xl">
              <h3 className="text-3xl font-bold text-slate-800 mb-4 border-b-2 border-slate-500/40 pb-3">Mission</h3>
              <p className="text-slate-800 text-[0.95rem] leading-relaxed font-medium">
                The institution to provide education par excellence and thoroughly professional training with its state-of-the-art facilities. 
                The institution to create an environment for students where they always explore, discover and apply. 
                The institution to craft, establish and sustain the futuristic infrastructure such as Technology Incubation Centre, Software Development Park, e-Training Facility, Hi-Tech Textile Design Centre. 
                The institution to build a creative bond with industries, societies, intellectual bodies that share same myopic goals and broader objectives and responsibilities. 
                The institution to establish an academic collaboration with reputed international institutions. 
                The institution to always believe in improving positive work culture and acting upon the code of conduct.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Vision;
