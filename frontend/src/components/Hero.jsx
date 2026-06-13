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
            className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
          >
            <button className="relative overflow-hidden group bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(250,204,21,0.4)]">
              <span className="relative z-10 flex items-center gap-2">
                Explore Programs
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
            </button>

            <button className="relative overflow-hidden group border border-white/30 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-white/60 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              <span className="relative z-10 flex items-center gap-2">
                Contact Us
              </span>
            </button>
          </motion.div>


          {/* Statistics Cards */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { number: "5000+", label: "Happy Students" },
              { number: "30+", label: "Professional Courses" },
              { number: "100%", label: "Career Support" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-yellow-400/30 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-yellow-400/0 group-hover:from-yellow-400/5 group-hover:to-transparent transition-colors duration-300" />
                
                <h2 className="relative z-10 text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 drop-shadow-sm group-hover:scale-110 transition-transform duration-300 origin-left">
                  {stat.number}
                </h2>
                <p className="relative z-10 text-slate-300 mt-3 font-medium tracking-wide group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </p>
                
                <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-yellow-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </motion.div>


        </motion.div>

      </div>

    </section>
  );
};

export default Hero;
