import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Book, Code, Shield, Cpu, Database, Cloud, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { CourseContext } from '../context/CourseContext';
import { fadeInUp, staggerContainer } from '../utils/animations';

const ICONS = [Book, Code, Shield, Cpu, Database, Cloud];

const uniClasses = {
  'uni-blue': 'bg-sky-500/10 text-sky-400',
  'uni-orange': 'bg-orange-500/10 text-orange-400',
  'uni-green': 'bg-emerald-500/10 text-emerald-400',
  'uni-purple': 'bg-purple-500/10 text-purple-400',
};

const ProgramsSection = () => {
  const { courses } = useContext(CourseContext);
  const [activeTab, setActiveTab] = useState('UG');

  // Filter courses by tab
  const ugPrograms = courses.filter(c => c.type === 'UG');
  const pgPrograms = courses.filter(c => c.type === 'PG');
  const intPrograms = courses.filter(c => c.type === 'INT');

  let currentPrograms = ugPrograms;
  if (activeTab === 'PG') currentPrograms = pgPrograms;
  if (activeTab === 'INT') currentPrograms = intPrograms;

  return (
    <section className="py-20 px-8 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-900/10 via-transparent to-transparent pointer-events-none" />
      <div className="text-center mb-12 relative z-10">
        <h4 className="text-sky-400 text-[0.85rem] font-bold tracking-widest uppercase mb-2">OUR PROGRAMS</h4>
        <h2 className="text-4xl font-extrabold text-white mb-4"><span className="text-yellow-400">Cutting-Edge</span> IT Specializations</h2>
        <p className="text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Choose from our range of industry-aligned programs designed to prepare you for the most in-demand tech careers.
        </p>
        
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <button 
            className={`py-3 px-6 rounded-full font-semibold cursor-pointer flex items-center gap-2 transition-all duration-200 ${activeTab === 'UG' ? 'bg-yellow-400 text-slate-900 shadow-[0_4px_20px_rgba(250,204,21,0.3)]' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
            onClick={() => setActiveTab('UG')}
          >
            UG Programs <span className={`text-xs py-0.5 px-2 rounded-full font-bold bg-white/20 ${activeTab === 'UG' ? 'text-slate-900' : 'text-slate-400'}`}>{ugPrograms.length}</span>
          </button>
          <button 
            className={`py-3 px-6 rounded-full font-semibold cursor-pointer flex items-center gap-2 transition-all duration-200 ${activeTab === 'PG' ? 'bg-yellow-400 text-slate-900 shadow-[0_4px_20px_rgba(250,204,21,0.3)]' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
            onClick={() => setActiveTab('PG')}
          >
            PG Programs <span className={`text-xs py-0.5 px-2 rounded-full font-bold bg-white/20 ${activeTab === 'PG' ? 'text-slate-900' : 'text-slate-400'}`}>{pgPrograms.length}</span>
          </button>
          <button 
            className={`py-3 px-6 rounded-full font-semibold cursor-pointer flex items-center gap-2 transition-all duration-200 ${activeTab === 'INT' ? 'bg-yellow-400 text-slate-900 shadow-[0_4px_20px_rgba(250,204,21,0.3)]' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
            onClick={() => setActiveTab('INT')}
          >
            Integrated Programs <span className={`text-xs py-0.5 px-2 rounded-full font-bold bg-white/20 ${activeTab === 'INT' ? 'text-slate-900' : 'text-slate-400'}`}>{intPrograms.length}</span>
          </button>
        </div>
      </div>

      <motion.div 
        key={activeTab}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        {currentPrograms.map((prog) => {
          const IconComponent = ICONS[prog.iconIndex] || Book;

          return (
            <motion.div key={prog.id} className="bg-white/5 rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/10 flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(14,165,233,0.15)]" variants={fadeInUp}>
              <div className="bg-gradient-to-r from-sky-600/50 to-indigo-600/50 border-b border-white/10 p-6 flex justify-between items-start text-white">
                <div className="w-10 h-10 rounded-lg border border-white/30 flex items-center justify-center">
                  <IconComponent size={20} />
                </div>
                <span className="bg-white/20 py-1 px-3 rounded-full text-xs font-bold tracking-wide">{prog.type}</span>
              </div>
              
              <div className="p-6 grow flex flex-col">
                <h3 className="text-lg font-bold text-white mb-4 leading-snug">{prog.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {prog.universities.map((uni, idx) => (
                    <span key={idx} className={`text-[0.7rem] font-semibold py-1 px-2 rounded flex items-center gap-1 ${uniClasses[uni.class] || 'bg-white/10 text-slate-300'}`}>{uni.name}</span>
                  ))}
                </div>
                <p className="text-[0.85rem] text-slate-400 leading-relaxed mb-6 grow">
                  {prog.description}
                </p>
              
                <div className="pt-6 border-t border-white/10 flex justify-between items-center text-slate-400 text-sm font-medium mt-auto">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1.5">
                      <Clock size={16} /> {prog.duration}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle size={16} /> {prog.eligibility}
                    </div>
                  </div>
                  
                  <Link to={`/course/${prog.id}`} className="text-yellow-400 font-bold no-underline flex items-center gap-1 transition-colors hover:text-yellow-300">
                    Details <ChevronRight size={16} style={{ marginTop: '2px' }} />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default ProgramsSection;
