import React from 'react';
import { motion } from 'framer-motion';

const GlassIcon = ({ icon: Icon, colorClass = "text-white", bgClass = "bg-white/10", size = 28 }) => {
  return (
    <div className={`relative flex items-center justify-center w-16 h-16 rounded-[1.25rem] overflow-hidden group shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] ${bgClass}`}>
      {/* Frosted Glass Layer */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/20 rounded-[1.25rem] z-0 pointer-events-none transition-colors duration-300 group-hover:bg-white/10 group-hover:border-white/40"></div>
      
      {/* Corner Glare */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/30 to-transparent opacity-50 z-0 pointer-events-none"></div>
      
      {/* Animated Glow behind Icon */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-xl ${bgClass.replace('/10', '/50')}`}></div>
      
      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="relative z-10"
      >
        <Icon size={size} className={`${colorClass} drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]`} />
      </motion.div>
    </div>
  );
};

export default GlassIcon;
