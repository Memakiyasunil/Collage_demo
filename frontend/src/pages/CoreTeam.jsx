import React from 'react';
import { motion } from 'framer-motion';
import { UserCircle2 } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../utils/animations';

const CoreTeam = () => {
  const team = [
    { name: "Dr. Ananya Sharma", role: "Dean of IT", desc: "15+ years of experience in AI research." },
    { name: "Rahul Verma", role: "Head of Operations", desc: "Former Tech Lead at top multinational companies." },
    { name: "Priya Desai", role: "Student Success Director", desc: "Passionate about career development and placement." }
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <section className="bg-slate-900 pt-32 pb-24 px-8 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/20 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-indigo-500" />
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="text-xs font-extrabold text-sky-400 tracking-[0.2em] uppercase mb-6 block">LEADERSHIP</span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">Core Team</h1>
          <p className="text-xl text-slate-300 font-light leading-relaxed">
            Meet the minds shaping the future of Education <span className="text-yellow-400">Forge</span>.
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
              <motion.div key={idx} className="bg-white/5 rounded-xl p-10 border border-white/10 text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(14,165,233,0.15)]" variants={fadeInUp}>
                <div className="w-16 h-16 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mx-auto mb-6"><UserCircle2 size={48} /></div>
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-sky-400 font-semibold mb-4">{member.role}</p>
                <p className="text-slate-400 leading-relaxed">{member.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CoreTeam;
