import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Book, Code, Shield, Cpu, Database, Cloud, Clock, CheckCircle, ChevronRight, Sparkles } from 'lucide-react';
import { CourseContext } from '../context/CourseContext';
import GlassIcon from './GlassIcon';

const ICONS = [Book, Code, Shield, Cpu, Database, Cloud];

const FeaturedPrograms = () => {
  const { courses } = useContext(CourseContext);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const featuredPrograms = courses.slice(0, 10);

  return (
    <section className="py-24 px-4 md:px-8 bg-[#0b1120] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-sky-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md mb-6 shadow-sm border bg-slate-800/50 border-slate-700/50"
          >
            <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
            <span className="text-sm font-bold tracking-widest uppercase text-sky-300">OUR PROGRAMS</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-white"
          >
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Programs</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto text-slate-400 font-medium leading-relaxed"
          >
            Kickstart your IT career with our most popular, industry-aligned specializations.
          </motion.p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 gap-y-12 relative">
          {featuredPrograms.map((prog, index) => {
            const IconComponent = ICONS[prog.iconIndex] || Book;
            const isHovered = hoveredIndex === index;

            return (
              <div 
                key={prog.id}
                className="relative h-[200px] w-full flex items-end justify-center group z-10 hover:z-50"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Expanding Card */}
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    layout: { type: "spring", stiffness: 300, damping: 25 },
                    opacity: { duration: 0.5, delay: index * 0.1 } 
                  }}
                  style={{
                    height: isHovered ? '480px' : '200px', // 1/2 shown initially, full height on hover
                    width: '100%'
                  }}
                  className={`absolute bottom-0 rounded-[2rem] overflow-hidden flex flex-col bg-slate-800/60 backdrop-blur-2xl border transition-colors duration-500 ${
                    isHovered ? 'border-amber-500/50 shadow-[0_30px_60px_-15px_rgba(245,158,11,0.3)] z-20' : 'border-slate-700/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-10'
                  }`}
                >
                  {/* Always Visible Header (Top 1/2) */}
                  <motion.div layout className="p-8 pb-4 shrink-0 flex flex-col justify-center h-[200px] relative z-10 border-b border-white/5">
                    <div className="flex justify-between items-start mb-4">
                      <GlassIcon 
                        icon={IconComponent} 
                        colorClass="text-amber-400" 
                        bgClass="bg-amber-500/10" 
                      />
                      <span className="py-1.5 px-4 rounded-full text-[0.7rem] font-black tracking-widest uppercase bg-slate-900/50 text-slate-300 border border-slate-700/50">
                        {prog.type}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold leading-snug text-white group-hover:text-amber-400 transition-colors duration-300">
                      {prog.title}
                    </h3>

                    {/* Gradient overlay to indicate more content below when not hovered */}
                    {!isHovered && (
                      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-slate-800/80 to-transparent z-20"></div>
                    )}
                  </motion.div>
                  
                  {/* Expanded Content (Hidden initially, revealed on hover) */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="p-8 pt-4 grow flex flex-col relative z-10 bg-slate-900/30"
                      >
                        <p className="text-[0.95rem] leading-relaxed mb-8 grow font-medium text-slate-300 line-clamp-4">
                          {prog.description}
                        </p>
                      
                        <div className="pt-6 flex justify-between items-center text-sm font-bold mt-auto border-t border-slate-700/50 text-slate-400">
                          <div className="flex gap-4">
                            <div className="flex items-center gap-1.5">
                              <Clock size={16} className="text-slate-500" /> {prog.duration}
                            </div>
                          </div>
                          
                          <Link to={`/course/${prog.id}`} className="font-black no-underline flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors duration-300 hover:translate-x-1">
                            Explore <ChevronRight size={18} />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Decorative background shape that grows on hover */}
                  <div className={`absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-[80px] transition-all duration-700 ease-out pointer-events-none ${isHovered ? 'bg-amber-500/20 opacity-100' : 'bg-sky-500/10 opacity-0'}`}></div>
                </motion.div>
              </div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-16"
        >
          <Link to="/courses" className="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-extrabold py-4 px-10 rounded-full hover:shadow-[0_10px_30px_rgba(245,158,11,0.4)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
            Explore All Programs <ChevronRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedPrograms;
