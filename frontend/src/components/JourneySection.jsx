import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../utils/animations';
import { UserPlus, School, Briefcase, ArrowRight } from 'lucide-react';

const JourneySection = () => {
  const steps = [
    {
      id: 1,
      title: "Enroll & Register",
      desc: "Join as a student or job seeker looking to upskill and find employment.",
      icon: UserPlus,
      color: "text-sky-400",
      bg: "bg-sky-500/10",
      border: "border-sky-500/30",
    },
    {
      id: 2,
      title: "Train at Top Institutes",
      desc: "Select from our partnered ITIs and training centers to get industry-ready skills.",
      icon: School,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
    },
    {
      id: 3,
      title: "Get Placed",
      desc: "Secure your dream job. We bridge the gap between you and top tech companies.",
      icon: Briefcase,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
    }
  ];

  return (
    <section className="py-24 px-8 bg-[#0b1120] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-sky-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/50 mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
            <span className="text-yellow-400 text-sm font-bold tracking-widest uppercase">How It Works</span>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Your Journey to Success
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-lg text-slate-400 max-w-2xl mx-auto">
            From enrollment to employment. We provide the complete pipeline to transform unemployed youth into highly skilled IT professionals.
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-1 bg-gradient-to-r from-sky-500/20 via-yellow-500/20 to-emerald-500/20 -translate-y-1/2 rounded-full">
            <motion.div 
              className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-sky-400 via-yellow-400 to-emerald-400 opacity-50"
              initial={{ scaleX: 0, transformOrigin: "left" }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  key={step.id} 
                  variants={fadeInUp}
                  className="relative group"
                >
                  <div className={`bg-slate-900/80 backdrop-blur-xl border ${step.border} p-10 rounded-[2rem] text-center transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] hover:bg-slate-800/80`}>
                    
                    {/* Step Number Badge */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0b1120] border-2 border-slate-700 flex items-center justify-center text-white font-bold text-xl z-20 group-hover:border-white/20 group-hover:scale-110 transition-transform">
                      {step.id}
                    </div>

                    <div className={`w-24 h-24 mx-auto rounded-3xl ${step.bg} flex items-center justify-center mb-8 relative group-hover:scale-110 transition-transform duration-500`}>
                      <div className="absolute inset-0 bg-white/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <Icon size={40} className={step.color} strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-lg">
                      {step.desc}
                    </p>
                  </div>

                  {/* Arrow for mobile view */}
                  {idx < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-6">
                      <ArrowRight className="text-slate-600 rotate-90" size={32} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        
        {/* CTA Button */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <button className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-200 transition-colors shadow-xl inline-flex items-center gap-2 group">
            Start Your Journey 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default JourneySection;
