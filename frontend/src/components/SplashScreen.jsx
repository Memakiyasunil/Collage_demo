import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.jpg';

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    // Hold the splash screen for 2.5 seconds before triggering onComplete
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0b1120] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Background Orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-[100px]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ y: -50, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative mb-6"
        >
          <div className="absolute inset-0 bg-sky-500 blur-xl opacity-40 animate-pulse rounded-full" />
          <img 
            src={logo} 
            alt="Eduforcetech Logo" 
            className="w-32 h-32 object-cover rounded-3xl border-2 border-white/20 shadow-2xl relative z-10 bg-slate-900 p-2"
          />
        </motion.div>

        {/* Brand Name Animation */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight flex items-center gap-1"
        >
          <span className="text-white">Eduforge</span>
          <motion.span 
            className="text-yellow-400"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.6 }}
          >
            tech
          </motion.span>
        </motion.h1>

        {/* Loading Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex items-center gap-2"
        >
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} 
            transition={{ repeat: Infinity, duration: 1, delay: 0 }} 
            className="w-2.5 h-2.5 rounded-full bg-sky-400"
          />
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} 
            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} 
            className="w-2.5 h-2.5 rounded-full bg-sky-400"
          />
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} 
            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} 
            className="w-2.5 h-2.5 rounded-full bg-sky-400"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
