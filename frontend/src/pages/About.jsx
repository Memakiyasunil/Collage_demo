import React from 'react';
import { motion } from 'framer-motion';
import { slideInLeft, slideInRight, staggerContainer, fadeInUp, floatAnimation, pulseAnimation } from '../utils/animations';
import { Building2, Award, BookOpen, Users, Monitor, Globe, Network, ArrowRight } from 'lucide-react';

const institutes = [
  {
    name: "Advanced Training Institutes (ATIs)",
    desc: "Now known as National Skill Training Institutes (NSTIs), located in major cities like Chennai, Mumbai, and Hyderabad, offering specialized vocational and instructor training.",
    icon: Building2,
    color: "from-blue-500 to-sky-400"
  },
  {
    name: "Indian Institute of Skills (IIS)",
    desc: "Premier institutes set up through government and corporate partnerships—such as IIS Ahmedabad—featuring state-of-the-art infrastructure and advanced labs.",
    icon: Award,
    color: "from-amber-500 to-yellow-400"
  },
  {
    name: "NIIT Limited",
    desc: "Headquartered in Gurugram, a global leader in IT and software talent development.",
    icon: Globe,
    color: "from-purple-500 to-indigo-400"
  },
  {
    name: "Don Bosco Tech Society",
    desc: "A pan-India network offering technical and vocational training to empower youth.",
    icon: Users,
    color: "from-emerald-500 to-teal-400"
  },
  {
    name: "E-Max Education",
    desc: "Widely recognized for its IT, hardware, and computer software training franchises across the country.",
    icon: Monitor,
    color: "from-rose-500 to-pink-400"
  },
  {
    name: "C-DAC Centers",
    desc: "Premier institutions under the Ministry of Electronics and Information Technology, specializing in advanced computing and software technologies.",
    icon: Network,
    color: "from-cyan-500 to-sky-400"
  },
  {
    name: "Industrial Training Institutes (ITIs)",
    desc: "State-governed networks providing fundamental to advanced trade certifications.",
    icon: BookOpen,
    color: "from-orange-500 to-amber-400"
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-[#0b1120] font-sans pt-32 pb-20 overflow-hidden relative">
      
      {/* Background Constructive Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-[150px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(0,0,0,0)_0%,#0b1120_100%)] z-0"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          className="text-center mb-24 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 mb-6">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
            <span className="text-sky-300 text-sm font-bold tracking-widest uppercase">About Us</span>
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight">
            India’s Top Technical <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Training Centres</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto font-medium">
            Discover the prestigious government-backed ITIs and advanced skill academies that provide specialized, job-oriented technical education across trades like IT, manufacturing, and engineering.
          </motion.p>
        </motion.div>

        {/* Dynamic Grid Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {institutes.map((inst, idx) => {
            const IconComponent = inst.icon;
            
            // Make the first item span 2 columns on large screens for a masonry-like broken grid look
            const isFeatured = idx === 0;

            return (
              <motion.div 
                key={idx} 
                className={`group relative rounded-3xl overflow-hidden bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-8 hover:-translate-y-2 transition-all duration-500
                  ${isFeatured ? 'lg:col-span-2 flex flex-col md:flex-row items-start md:items-center gap-8' : 'flex flex-col'}`}
                variants={fadeInUp}
              >
                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${inst.color}`}></div>
                
                {/* Icon Container with Floating effect on hover */}
                <div className={`relative z-10 shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center bg-slate-900 shadow-inner border border-slate-700 group-hover:border-transparent transition-colors duration-500 mb-6 ${isFeatured ? 'md:mb-0 md:w-24 md:h-24 md:rounded-3xl' : ''}`}>
                  <div className={`absolute inset-0 rounded-inherit opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${inst.color}`}></div>
                  <IconComponent className={`w-8 h-8 md:w-10 md:h-10 text-slate-300 group-hover:text-white transition-colors duration-300`} />
                  
                  {/* Rotating decorative border */}
                  <div className="absolute inset-[-2px] rounded-inherit border-2 border-transparent group-hover:border-white/10 border-dashed animate-[spin_10s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="relative z-10 flex-1">
                  <h3 className={`font-bold text-white mb-3 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${inst.color} transition-all duration-300
                    ${isFeatured ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                    {inst.name}
                  </h3>
                  <p className={`text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300
                    ${isFeatured ? 'text-lg md:text-xl' : 'text-base'}`}>
                    {inst.desc}
                  </p>
                </div>
                
                {/* Corner Decorative Element */}
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 group-hover:translate-y-2 transition-all duration-500 text-white/20">
                  <ArrowRight size={isFeatured ? 40 : 24} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default About;
