import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, GraduationCap, ArrowRight } from 'lucide-react';
import { staggerContainer, fadeInUp, scaleUp } from '../utils/animations';
import PartnerLogos from '../components/PartnerLogos';
import GlassIcon from '../components/GlassIcon';

import { Link } from 'react-router-dom';
import { partnersData } from '../data/partnersData';

const themeStyles = {
  purple: {
    bg: 'bg-gradient-to-br from-purple-500 to-purple-600',
    icon: 'text-purple-600',
    check: 'text-purple-400'
  },
  blue: {
    bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
    icon: 'text-blue-600',
    check: 'text-blue-400'
  },
  orange: {
    bg: 'bg-gradient-to-br from-orange-500 to-orange-600',
    icon: 'text-orange-600',
    check: 'text-orange-400'
  },
  green: {
    bg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    icon: 'text-emerald-600',
    check: 'text-emerald-400'
  },
  pink: {
    bg: 'bg-gradient-to-br from-pink-500 to-pink-600',
    icon: 'text-pink-600',
    check: 'text-pink-400'
  },
  teal: {
    bg: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
    icon: 'text-cyan-600',
    check: 'text-cyan-400'
  }
};

const Partners = () => {
  return (
    <div className="bg-[#0b1120] min-h-screen relative overflow-hidden pb-16">
      
      {/* Abstract Backgrounds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-sky-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      {/* Lanyard / Scrolling Logos at the top */}
      <div className="pt-24 relative z-10">
        <PartnerLogos />
      </div>

      <div className="px-4 md:px-8 max-w-7xl mx-auto mt-20 relative z-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 pb-4 gap-4 md:gap-0">
          <div>
            <span className="text-sm font-bold text-sky-400 tracking-widest uppercase mb-2 block">OUR NETWORK</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mt-2">
              Partner <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Universities</span>
            </h1>
          </div>
          <div className="md:max-w-[350px] text-left md:text-right">
            <p className="text-slate-400 text-lg leading-relaxed font-medium">We partner with leading universities to bring you accredited, industry-aligned programs.</p>
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {partnersData.map((partner) => {
            const theme = themeStyles[partner.colorTheme];
            return (
              <motion.div 
                key={partner.id} 
                variants={scaleUp}
                className="bg-slate-800/40 backdrop-blur-xl rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex flex-col border border-slate-700/50 transition-all duration-500 hover:-translate-y-3 hover:border-amber-500/30 group"
              >
                {/* Card Top / Colored Section */}
                <div className={`p-8 text-white relative overflow-hidden min-h-[160px] ${theme.bg}`}>
                  <div className="mb-6">
                    <GlassIcon 
                      icon={GraduationCap} 
                      colorClass={theme.icon.replace('text-', 'text-white drop-shadow-md ')} 
                      bgClass="bg-white/20" 
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 tracking-tight leading-snug">{partner.name}</h3>
                  <p className="text-[0.9rem] font-bold opacity-90 tracking-wide uppercase">{partner.programCount > 0 ? `${partner.programCount} Programs Available` : 'Programs Coming Soon'}</p>
                  
                  {/* Decorative circle in the top right corner */}
                  <div className="absolute -top-10 -right-10 w-[150px] h-[150px] rounded-full bg-white opacity-10 group-hover:scale-150 transition-transform duration-700 ease-out"></div>
                </div>

                {/* Card Bottom / Dark Section */}
                <div className="p-8 flex flex-col grow relative z-10">
                  {partner.customMessage ? (
                    <p className="text-slate-400 text-[0.95rem] italic grow mb-8 font-medium">{partner.customMessage}</p>
                  ) : (
                    <ul className="list-none p-0 m-0 mb-8 grow">
                      {partner.programs.map((prog, idx) => (
                        <li key={idx} className="flex items-start gap-3 mb-4 text-[0.95rem] text-slate-300 leading-relaxed font-medium group/item">
                          <CheckCircle2 size={18} className={`shrink-0 mt-0.5 ${theme.check} group-hover/item:scale-110 transition-transform`} />
                          <span className="group-hover/item:text-white transition-colors">{prog}</span>
                        </li>
                      ))}
                      {partner.moreCount > 0 && (
                        <li className="text-[0.85rem] text-slate-500 pl-7 italic mt-4 font-bold">
                          +{partner.moreCount} more programs...
                        </li>
                      )}
                    </ul>
                  )}

                  <Link to={`/partner/${partner.id}`} className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-4 text-[0.95rem] font-bold flex justify-center items-center gap-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-400 hover:to-orange-500 hover:text-slate-900 hover:-translate-y-1 hover:shadow-[0_10px_20px_-5px_rgba(251,191,36,0.4)] mt-auto no-underline group-hover:border-transparent">
                    {partner.buttonText} 
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Partners;
