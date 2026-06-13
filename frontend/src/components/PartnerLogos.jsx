import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, Building, Library, Award, GraduationCap, BookMarked } from 'lucide-react';

const partners = [
  { name: "Gandhinagar University", icon: Landmark, color: "text-blue-400", bg: "bg-blue-500/10", border: "group-hover:border-blue-500/50" },
  { name: "Vidhyadeep University", icon: Building, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "group-hover:border-emerald-500/50" },
  { name: "Shreyarth University", icon: Library, color: "text-purple-400", bg: "bg-purple-500/10", border: "group-hover:border-purple-500/50" },
  { name: "Rai University", icon: Award, color: "text-orange-400", bg: "bg-orange-500/10", border: "group-hover:border-orange-500/50" },
  { name: "Monark University", icon: GraduationCap, color: "text-rose-400", bg: "bg-rose-500/10", border: "group-hover:border-rose-500/50" },
  { name: "The New Progressive", icon: BookMarked, color: "text-amber-400", bg: "bg-amber-500/10", border: "group-hover:border-amber-500/50" },
];

const PartnerLogos = () => {
  // Duplicate array twice for smooth infinite scrolling
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-20 bg-slate-950 border-b border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 px-8">
          <span className="text-xs font-extrabold text-sky-400 tracking-[0.2em] uppercase block">
            TRUSTED BY THE BEST
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">Our Knowledge Partners & Affiliated Universities</h2>
        </div>

        {/* Marquee Container with fade masks on edges */}
        <div className="relative flex overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] py-4">
          <motion.div
            className="flex space-x-6 w-max px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          >
            {duplicatedPartners.map((partner, idx) => {
              const Icon = partner.icon;
              return (
                <div 
                  key={idx} 
                  className={`group flex items-center gap-5 bg-white/[0.03] backdrop-blur-sm border border-white/10 px-8 py-6 rounded-2xl min-w-[320px] transition-all duration-300 hover:bg-white/[0.08] ${partner.border} hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${partner.bg} ${partner.color} transition-transform duration-300 group-hover:scale-110 shadow-inner`}>
                    <Icon size={28} />
                  </div>
                  <span className="font-bold text-lg text-slate-200 group-hover:text-white transition-colors duration-300 leading-tight">
                    {partner.name}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;
