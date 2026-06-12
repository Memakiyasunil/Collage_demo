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
    <div className="min-h-screen bg-slate-50 font-sans">
      <section className="bg-gradient-to-br from-blue-900 to-blue-600 py-16 px-8 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold text-blue-200 tracking-widest uppercase mb-4 block">LEADERSHIP</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Core Team</h1>
          <p className="text-lg opacity-90">
            Meet the minds shaping the future of Education Force.
          </p>
        </div>
      </section>

      <section className="py-20 px-8 bg-slate-50 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Our Leaders</h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {team.map((member, idx) => (
              <motion.div key={idx} className="bg-white rounded-xl p-10 shadow-sm border border-slate-100 text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-md" variants={fadeInUp}>
                <div className="w-16 h-16 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-6"><UserCircle2 size={48} /></div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                <p className="text-slate-600 leading-relaxed">{member.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CoreTeam;
