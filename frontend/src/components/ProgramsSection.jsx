import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Book, Code, Shield, Cpu, Database, Cloud, Clock, CheckCircle, ChevronRight, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { CourseContext } from '../context/CourseContext';
import { fadeInUp, staggerContainer, floatAnimation, scaleUp } from '../utils/animations';
import GlassIcon from './GlassIcon';

const ICONS = [Book, Code, Shield, Cpu, Database, Cloud];

const uniClasses = {
  'uni-blue': 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
  'uni-orange': 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
  'uni-green': 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  'uni-purple': 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
};

// 3D Tilt Card Component
const TiltCard = ({ children, isLight }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="perspective-1000 w-full"
    >
      <motion.div 
        style={{ transform: "translateZ(30px)" }}
        className={`relative rounded-[2rem] overflow-hidden flex flex-col transition-colors transition-shadow duration-300 group ${
          isLight 
          ? 'bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_30px_60px_-15px_rgba(249,115,22,0.15)] hover:border-orange-200' 
          : 'bg-slate-800/40 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-slate-700/50 hover:border-amber-500/30'
        }`}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const ProgramsSection = ({ theme = 'dark', limit = null }) => {
  const { courses } = useContext(CourseContext);
  const [activeTab, setActiveTab] = useState('UG');
  const containerRef = useRef(null);

  // Filter courses by tab
  const ugPrograms = courses.filter(c => c.type === 'UG');
  const pgPrograms = courses.filter(c => c.type === 'PG');
  const intPrograms = courses.filter(c => c.type === 'INT');

  let currentPrograms = ugPrograms;
  if (activeTab === 'PG') currentPrograms = pgPrograms;
  if (activeTab === 'INT') currentPrograms = intPrograms;

  if (limit) {
    currentPrograms = currentPrograms.slice(0, limit);
  }

  const isLight = theme === 'light';

  // Scroll logic for the timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end 80%"]
  });

  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className={`py-24 px-4 md:px-8 relative overflow-hidden ${isLight ? 'bg-[#f8f5f2]' : 'bg-[#0b1120]'}`}>
      {/* Abstract Backgrounds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {isLight ? (
          <>
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-200/50 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[100px]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          </>
        ) : (
          <>
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-sky-900/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          </>
        )}
      </div>

      <div className="text-center mb-16 relative z-10 max-w-4xl mx-auto">
        <motion.div variants={floatAnimation} initial="hidden" animate="visible" className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md mb-6 shadow-sm border ${isLight ? 'bg-orange-100 border-orange-200' : 'bg-slate-800/50 border-slate-700/50'}`}>
          <Sparkles className={`w-4 h-4 ${isLight ? 'text-orange-500' : 'text-sky-400 animate-pulse'}`} />
          <span className={`text-sm font-bold tracking-widest uppercase ${isLight ? 'text-orange-600' : 'text-sky-300'}`}>OUR PROGRAMS</span>
        </motion.div>
        
        <h2 className={`text-5xl md:text-6xl font-extrabold mb-6 tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Cutting-Edge</span> IT Specializations
        </h2>
        <p className={`text-lg max-w-3xl mx-auto mb-12 leading-relaxed font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          Follow the path to success. Explore our industry-aligned programs designed to prepare you for the most in-demand tech careers.
        </p>
        
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {[
            { id: 'UG', label: 'UG Programs', count: ugPrograms.length },
            { id: 'PG', label: 'PG Programs', count: pgPrograms.length },
            { id: 'INT', label: 'Integrated Programs', count: intPrograms.length }
          ].map((tab) => (
            <button 
              key={tab.id}
              className={`py-3 px-8 rounded-full font-bold cursor-pointer flex items-center gap-3 transition-all duration-300 ${
                activeTab === tab.id 
                ? (isLight ? 'bg-slate-900 text-white shadow-xl hover:-translate-y-1' : 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 shadow-[0_10px_25px_-5px_rgba(251,191,36,0.4)] hover:-translate-y-1') 
                : (isLight ? 'bg-white text-slate-600 border border-slate-200 hover:border-orange-300 hover:text-orange-600' : 'bg-slate-800/50 border border-slate-700 text-slate-300 hover:bg-slate-700')
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label} 
              <span className={`text-xs py-1 px-3 rounded-full font-black ${
                activeTab === tab.id 
                ? (isLight ? 'bg-white/20 text-white' : 'bg-black/20 text-slate-900') 
                : (isLight ? 'bg-slate-100 text-slate-500' : 'bg-slate-700 text-slate-300')
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div 
        key={activeTab}
        ref={containerRef}
        className="max-w-7xl mx-auto relative z-10 pt-10 pb-20"
      >
        {/* The Timeline Track */}
        <div className={`absolute left-[36px] md:left-1/2 top-0 bottom-0 w-1.5 -translate-x-1/2 rounded-full ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`}>
          <motion.div 
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-amber-400 via-orange-500 to-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]"
            style={{ height: timelineHeight }}
          />
        </div>

        <div className="flex flex-col gap-16 md:gap-24 relative">
          {currentPrograms.map((prog, index) => {
            const IconComponent = ICONS[prog.iconIndex] || Book;
            const isLeft = index % 2 === 0;

            return (
              <motion.div 
                key={prog.id} 
                initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 50 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
                className={`relative flex items-center w-full ${isLeft ? 'md:justify-start' : 'md:justify-end'} justify-start`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[36px] md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0b1120] border-4 border-slate-700 z-20 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-slate-500 rounded-full transition-colors duration-300"></div>
                </div>

                {/* Card Container */}
                <div className={`w-[calc(100%-80px)] md:w-[calc(50%-60px)] ml-auto md:ml-0 ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}`}>
                  <TiltCard isLight={isLight}>
                    
                    {/* Header area */}
                    <div className={`p-8 pb-6 flex justify-between items-start ${isLight ? 'bg-slate-50' : 'bg-slate-800/50'}`}>
                      <GlassIcon 
                        icon={IconComponent} 
                        colorClass={isLight ? 'text-orange-500' : 'text-amber-400'} 
                        bgClass={isLight ? 'bg-orange-500/10' : 'bg-amber-500/10'} 
                      />
                      <span className={`py-1.5 px-4 rounded-full text-xs font-black tracking-widest uppercase ${isLight ? 'bg-slate-200/50 text-slate-700' : 'bg-slate-700 text-slate-200'}`}>
                        {prog.type}
                      </span>
                    </div>
                    
                    <div className="p-8 pt-6 grow flex flex-col relative z-10">
                      <h3 className={`text-2xl font-bold mb-4 leading-snug transition-colors duration-300 ${isLight ? 'text-slate-900 group-hover:text-orange-600' : 'text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-orange-500'}`}>
                        {prog.title}
                      </h3>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {prog.universities.map((uni, idx) => (
                          <span key={idx} className={`text-[0.75rem] font-bold py-1 px-3 rounded-full flex items-center gap-1 ${uniClasses[uni.class] || (isLight ? 'bg-slate-100 text-slate-600 border border-slate-200' : 'bg-slate-700 border border-slate-600 text-slate-300')}`}>
                            {uni.name}
                          </span>
                        ))}
                      </div>
                      
                      <p className={`text-[0.95rem] leading-relaxed mb-8 grow font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        {prog.description}
                      </p>
                    
                      <div className={`pt-6 flex justify-between items-center text-sm font-bold mt-auto ${isLight ? 'border-t border-slate-100 text-slate-500' : 'border-t border-slate-700/50 text-slate-400'}`}>
                        <div className="flex gap-5">
                          <div className="flex items-center gap-2">
                            <Clock size={16} className={isLight ? 'text-slate-400' : 'text-slate-500'} /> {prog.duration}
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle size={16} className={isLight ? 'text-slate-400' : 'text-slate-500'} /> {prog.eligibility}
                          </div>
                        </div>
                        
                        <Link to={`/course/${prog.id}`} className={`font-black no-underline flex items-center gap-1 transition-all duration-300 group-hover:translate-x-1 ${isLight ? 'text-orange-600 hover:text-orange-700' : 'text-amber-400 hover:text-amber-300'}`}>
                          Details <ChevronRight size={18} />
                        </Link>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              </motion.div>
            );
          })}
        </div>

        {limit && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-20 relative z-20"
          >
            <Link to="/courses" className="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-extrabold py-4 px-10 rounded-full hover:shadow-[0_10px_30px_rgba(245,158,11,0.4)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
              View All Programs <ChevronRight size={20} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProgramsSection;
