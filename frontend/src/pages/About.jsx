import React from 'react';
import { motion } from 'framer-motion';
import { slideInLeft, slideInRight, staggerContainer, fadeInUp } from '../utils/animations';
import { Building2, Award, BookOpen, Users, Monitor, Globe, Network } from 'lucide-react';

const institutes = [
  {
    name: "Advanced Training Institutes (ATIs)",
    desc: "Now known as National Skill Training Institutes (NSTIs), located in major cities like Chennai, Mumbai, and Hyderabad, offering specialized vocational and instructor training.",
    icon: Building2
  },
  {
    name: "Indian Institute of Skills (IIS)",
    desc: "Premier institutes set up through government and corporate partnerships—such as IIS Ahmedabad—featuring state-of-the-art infrastructure and advanced labs.",
    icon: Award
  },
  {
    name: "NIIT Limited",
    desc: "Headquartered in Gurugram, a global leader in IT and software talent development.",
    icon: Globe
  },
  {
    name: "Don Bosco Tech Society",
    desc: "A pan-India network offering technical and vocational training to empower youth.",
    icon: Users
  },
  {
    name: "E-Max Education",
    desc: "Widely recognized for its IT, hardware, and computer software training franchises across the country.",
    icon: Monitor
  },
  {
    name: "C-DAC Centers",
    desc: "Premier institutions under the Ministry of Electronics and Information Technology, specializing in advanced computing and software technologies.",
    icon: Network
  },
  {
    name: "Industrial Training Institutes (ITIs)",
    desc: "State-governed networks (e.g., ITI Kubernagar and ITI Kubernagar in Gujarat) providing fundamental to advanced trade certifications.",
    icon: BookOpen
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-slate-950 font-sans pt-24 pb-20">
      <section className="py-20 px-8 overflow-hidden border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="w-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInLeft}
            >
              <h2 className="text-4xl font-extrabold text-white mb-6">Vision & Mission</h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Our vision is to be the global leader in providing accessible, high-quality IT and management education. We strive to create an ecosystem where innovation thrives and students are equipped with real-world skills.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Our mission is to bridge the gap between academia and industry by offering updated curriculum, expert mentorship, and hands-on project experience.
              </p>
            </motion.div>
            
            <motion.div 
              className="w-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInRight}
            >
              <div className="bg-white/5 border border-white/10 rounded-2xl h-[400px] flex items-center justify-center w-full transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(14,165,233,0.15)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-indigo-500/10" />
                <span className="text-slate-500 font-medium">Image Placeholder</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Section for Institutes */}
      <section className="py-24 px-8 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">India’s Top Technical <span className="text-yellow-400">Training Centres</span></h2>
            <p className="text-[1.05rem] text-slate-300 leading-relaxed max-w-4xl mx-auto">
              India’s top technical training centres include prestigious government-backed ITIs (Industrial Training Institutes) and advanced skill academies. These institutes provide specialized, job-oriented technical education across trades like IT, manufacturing, and engineering.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {institutes.map((inst, idx) => {
              const IconComponent = inst.icon;
              return (
                <motion.div 
                  key={idx} 
                  className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(14,165,233,0.15)] group"
                  variants={fadeInUp}
                >
                  <div className="w-12 h-12 bg-sky-500/10 text-sky-400 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sky-500 group-hover:text-slate-900 transition-colors duration-300">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 leading-tight">{inst.name}</h3>
                  <p className="text-[0.9rem] text-slate-400 leading-relaxed grow">{inst.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
