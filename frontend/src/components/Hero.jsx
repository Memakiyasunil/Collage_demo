import React from 'react';
import { GraduationCap, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { slideInLeft, slideInRight, staggerContainer, fadeInUp } from '../utils/animations';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 mt-12 md:mt-0">

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center text-white max-w-5xl mx-auto"
        >

          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-6 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-blue-300 font-medium tracking-wide">
              🎓 Admissions Open 2026-2027
            </span>
          </motion.div>


          {/* Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-6">
            <div className="flex justify-center flex-wrap gap-x-4 md:gap-x-6">
              <motion.span variants={fadeInUp} className="inline-block">Transform</motion.span>
              <motion.span variants={fadeInUp} className="inline-block">Your</motion.span>
            </div>
            <div className="flex justify-center flex-wrap gap-x-4 md:gap-x-6 text-[#fbbf24] glow-yellow mt-2">
              <motion.span variants={fadeInUp} className="inline-block">Future</motion.span>
              <motion.span variants={fadeInUp} className="inline-block">With</motion.span>
              <motion.span variants={fadeInUp} className="inline-block">IT</motion.span>
            </div>
            <div className="flex justify-center flex-wrap gap-x-4 md:gap-x-6 mt-2">
              <motion.span variants={fadeInUp} className="inline-block">Education</motion.span>
            </div>
          </h1>


          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Explore industry-oriented courses from top universities.
            Build your career with expert guidance, practical skills,
            and placement assistance.
          </motion.p>


          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-5 justify-center mb-16"
          >
            <button className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold hover:bg-yellow-300 transition-all duration-300 hover:scale-105">
              Explore Programs
            </button>

            <button className="border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
              Contact Us
            </button>
          </motion.div>


          {/* Statistics Cards */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
              <h2 className="text-4xl font-black text-yellow-400">
                5000+
              </h2>
              <p className="text-gray-300 mt-2">
                Happy Students
              </p>
            </div>


            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
              <h2 className="text-4xl font-black text-yellow-400">
                30+
              </h2>
              <p className="text-gray-300 mt-2">
                Professional Courses
              </p>
            </div>


            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
              <h2 className="text-4xl font-black text-yellow-400">
                100%
              </h2>
              <p className="text-gray-300 mt-2">
                Career Support
              </p>
            </div>
          </motion.div>


        </motion.div>

      </div>

    </section>
  );
};

export default Hero;
