import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Briefcase, Building2, MonitorPlay, FileCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const featuresData = [
  {
    title: 'Industry-Aligned Syllabus',
    description: 'Curriculum designed with industry experts to match real-world requirements.',
    icon: BookOpen,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    hoverBorder: 'hover:border-blue-500/30'
  },
  {
    title: 'Qualified Trainers',
    description: 'Learn from experienced professionals with deep domain expertise.',
    icon: Users,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    hoverBorder: 'hover:border-emerald-500/30'
  },
  {
    title: 'Placement Tie-ups',
    description: 'Strong industry connections ensuring excellent placement opportunities.',
    icon: Briefcase,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    hoverBorder: 'hover:border-purple-500/30'
  },
  {
    title: 'Campus Placements',
    description: 'Dedicated placement cell organizing on-campus recruitment drives.',
    icon: Building2,
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
    hoverBorder: 'hover:border-rose-500/30'
  },
  {
    title: 'Hands-on Learning',
    description: 'Project-based approach with real-world tools and technologies.',
    icon: MonitorPlay,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    hoverBorder: 'hover:border-amber-500/30'
  },
  {
    title: 'Exam Management',
    description: 'Comprehensive exam preparation and assessment framework.',
    icon: FileCheck,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    hoverBorder: 'hover:border-cyan-500/30'
  }
];

const Features = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === featuresData.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? featuresData.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 px-8 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-extrabold text-sky-400 tracking-[0.2em] uppercase mb-6 block">WHY EDUCATION <span className="text-yellow-400">FORGE</span></span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">What Makes Us Different</h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg font-light">
            We go beyond traditional education to create industry-ready professionals.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto h-[450px] md:h-[350px] flex items-center justify-center">
          <button 
            onClick={prevSlide}
            className="absolute left-0 z-20 w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full text-white backdrop-blur-md transition-colors border border-white/10 hover:border-white/30 -ml-4 md:-ml-6"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="w-full h-full relative flex items-center justify-center px-12 md:px-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={`bg-white/5 p-8 md:p-12 w-full rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] border border-white/10 ${featuresData[currentIndex].hoverBorder} transition-all duration-300 flex flex-col items-center text-center`}
              >
                <div className={`w-20 h-20 rounded-2xl ${featuresData[currentIndex].bgColor} ${featuresData[currentIndex].color} flex items-center justify-center mb-8 shadow-inner`}>
                  {React.createElement(featuresData[currentIndex].icon, { size: 40 })}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{featuresData[currentIndex].title}</h3>
                <p className="text-slate-400 leading-relaxed text-base md:text-lg max-w-2xl">{featuresData[currentIndex].description}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button 
            onClick={nextSlide}
            className="absolute right-0 z-20 w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full text-white backdrop-blur-md transition-colors border border-white/10 hover:border-white/30 -mr-4 md:-mr-6"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center mt-10 gap-3">
          {featuresData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'bg-sky-400 w-8 shadow-[0_0_10px_rgba(56,189,248,0.5)]' : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
