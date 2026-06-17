import React from 'react';
import { motion } from 'framer-motion';
import { UserCircle2 } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../utils/animations';

const CoreTeam = () => {
  const team = [
    { name: "Dr. Ananya Sharma", role: "Dean of IT", desc: "15+ years of experience in AI research.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
    { name: "Rahul Verma", role: "Head of Operations", desc: "Former Tech Lead at top multinational companies.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80" },
    { name: "Priya Desai", role: "Student Success Director", desc: "Passionate about career development and placement.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      {/* Premium Graphic Hero Section */}
      <section className="relative pt-32 pb-24 px-8 overflow-hidden bg-[#060b14]">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1920&q=80" alt="Corporate Team Meeting" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-[#060b14]/80 to-[#060b14]/40" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <span className="text-amber-400 font-bold tracking-widest uppercase text-sm mb-4 block">Our Leadership</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight">The Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Team</span></h1>
          <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
            Meet the visionaries shaping the future of Education <span className="text-yellow-400">Forge</span>. We are driven by a commitment to excellence and student success.
          </p>
        </div>
      </section>

      <section className="py-20 px-8 bg-slate-950 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6">Our Leaders</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {team.map((member, idx) => (
              <motion.div key={idx} className="bg-slate-800/40 backdrop-blur-xl rounded-[2rem] p-10 border border-slate-700/50 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] group overflow-hidden relative" variants={fadeInUp}>
                <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-slate-700 group-hover:border-sky-500 transition-colors duration-500 relative z-10">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-sky-400 group-hover:to-indigo-400">{member.name}</h3>
                <p className="text-amber-400 font-bold tracking-wider uppercase text-sm mb-4 relative z-10">{member.role}</p>
                <p className="text-slate-400 leading-relaxed font-medium relative z-10">{member.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CoreTeam;
