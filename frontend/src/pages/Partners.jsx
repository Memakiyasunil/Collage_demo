import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, GraduationCap } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../utils/animations';

import { Link } from 'react-router-dom';
import { partnersData } from '../data/partnersData';

const themeStyles = {
  purple: {
    bg: 'bg-gradient-to-br from-purple-500 to-purple-600',
    icon: 'text-purple-600',
    check: 'text-purple-200'
  },
  blue: {
    bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
    icon: 'text-blue-600',
    check: 'text-blue-200'
  },
  orange: {
    bg: 'bg-gradient-to-br from-orange-500 to-orange-600',
    icon: 'text-orange-600',
    check: 'text-orange-200'
  },
  green: {
    bg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    icon: 'text-emerald-600',
    check: 'text-emerald-200'
  },
  pink: {
    bg: 'bg-gradient-to-br from-pink-500 to-pink-600',
    icon: 'text-pink-600',
    check: 'text-pink-200'
  },
  teal: {
    bg: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
    icon: 'text-cyan-600',
    check: 'text-cyan-200'
  }
};

const Partners = () => {
  return (
    <div className="pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto bg-slate-950 min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 pb-4 gap-4 md:gap-0">
        <div>
          <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">OUR NETWORK</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-2">Partner <span className="text-sky-400">Universities</span></h1>
        </div>
        <div className="md:max-w-[300px] text-left md:text-right">
          <p className="text-slate-500 text-[0.9rem] leading-relaxed">We partner with leading universities to bring you accredited, industry-aligned programs.</p>
        </div>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partnersData.map((partner) => {
            const theme = themeStyles[partner.colorTheme];
            return (
              <motion.div 
                key={partner.id} 
                className="bg-white/5 rounded-xl overflow-hidden shadow-lg flex flex-col border border-white/10 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(14,165,233,0.15)]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                {/* Card Top / Colored Section */}
                <div className={`p-8 text-white relative overflow-hidden min-h-[140px] ${theme.bg}`}>
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <GraduationCap size={24} className={theme.icon} />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{partner.name}</h3>
                  <p className="text-[0.85rem] font-medium opacity-90">{partner.programCount > 0 ? `${partner.programCount} Programs Available` : 'Programs Coming Soon'}</p>
                  {/* Decorative circle in the top right corner */}
                  <div className="absolute -top-5 -right-5 w-[100px] h-[100px] rounded-full bg-white opacity-10"></div>
                </div>

                {/* Card Bottom / White Section */}
                <div className="p-8 flex flex-col grow">
                  {partner.customMessage ? (
                    <p className="text-slate-400 text-[0.9rem] italic grow mb-8">{partner.customMessage}</p>
                  ) : (
                    <ul className="list-none p-0 m-0 mb-8 grow">
                      {partner.programs.map((prog, idx) => (
                        <li key={idx} className="flex items-start gap-3 mb-3 text-[0.85rem] text-slate-300 leading-relaxed">
                          <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${theme.check}`} />
                          <span>{prog}</span>
                        </li>
                      ))}
                      {partner.moreCount > 0 && (
                        <li className="text-[0.8rem] text-slate-400 pl-7 italic mt-2">
                          +{partner.moreCount} more programs
                        </li>
                      )}
                    </ul>
                  )}

                  <Link to={`/partner/${partner.id}`} className="w-full bg-yellow-400 text-slate-900 border-none rounded-lg p-3.5 text-[0.9rem] font-bold flex justify-center items-center gap-2 transition-all duration-200 hover:bg-yellow-300 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(250,204,21,0.3)] mt-auto no-underline">
                    {partner.buttonText} <span className="font-normal">&gt;</span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Partners;
