import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../utils/animations';
import { Briefcase, TrendingUp, Users, Target, Building, ChevronRight, CheckCircle2, Star } from 'lucide-react';

const stats = [
  { id: 1, label: "Students Placed", value: "2500+", icon: Users, color: "text-sky-400", bg: "bg-sky-500/10" },
  { id: 2, label: "Highest Package", value: "18.5 LPA", icon: TrendingUp, color: "text-amber-400", bg: "bg-amber-500/10" },
  { id: 3, label: "Average Package", value: "6.2 LPA", icon: Target, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { id: 4, label: "Hiring Partners", value: "150+", icon: Building, color: "text-rose-400", bg: "bg-rose-500/10" },
];

const processSteps = [
  { title: "Skill Assessment", desc: "Identify core strengths and areas for technical improvement.", icon: Target },
  { title: "Industry Training", desc: "Intensive hands-on training with modern tech stacks.", icon: Briefcase },
  { title: "Mock Interviews", desc: "Rigorous preparation with industry experts.", icon: Users },
  { title: "Final Placement", desc: "Direct interviews with top partner companies.", icon: CheckCircle2 },
];

const testimonials = [
  { name: "Aarav Sharma", role: "Software Engineer @ TechCorp", image: "https://i.pravatar.cc/150?img=11", text: "Edufordge's placement cell completely transformed my career trajectory. The mock interviews were a game changer." },
  { name: "Priya Patel", role: "Data Analyst @ Innovate", image: "https://i.pravatar.cc/150?img=5", text: "The industry-aligned training made me confident on day one of my job. I couldn't have asked for a better launchpad." },
  { name: "Rohan Singh", role: "Frontend Dev @ WebWorks", image: "https://i.pravatar.cc/150?img=12", text: "100% placement assistance isn't just a buzzword here. They stood by me until I secured my dream role." },
];

const Placements = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="min-h-screen bg-[#0b1120] font-sans pt-32 pb-20 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[150px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32">
          <motion.div 
            className="text-left relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-emerald-300 text-sm font-bold tracking-widest uppercase">100% Placement Assistance</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 tracking-tight leading-tight">
              Launch Your Career with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Top IT Giants</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl font-medium mb-10">
              We bridge the gap between academia and industry. Our dedicated placement cell ensures you don't just graduate, you get hired.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex gap-4">
              <button className="bg-sky-500 hover:bg-sky-400 text-slate-900 font-bold px-8 py-4 rounded-full inline-flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(14,165,233,0.4)]">
                View Placements <ChevronRight size={20} />
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-[3rem] blur-2xl opacity-20 animate-pulse"></div>
            <img 
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80" 
              alt="Students Collaborating" 
              className="relative rounded-[2rem] border-2 border-slate-700/50 shadow-2xl object-cover w-full h-[500px]"
            />
            
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 bg-slate-900 border border-slate-700 p-6 rounded-2xl shadow-2xl flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Building size={24} />
              </div>
              <div>
                <p className="text-white font-bold text-lg">Top Recruiters</p>
                <p className="text-slate-400 text-sm">Hiring actively</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Statistics Grid */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={stat.id}
                variants={fadeInUp}
                className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-3xl p-8 relative overflow-hidden group hover:border-slate-500/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${stat.bg} blur-2xl group-hover:blur-3xl transition-all duration-300`}></div>
                <div className={`${stat.color} mb-4`}>
                  <Icon size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-4xl font-extrabold text-white mb-2 tracking-tight">{stat.value}</h3>
                <p className="text-slate-400 font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Placement Process Timeline */}
        <div className="mb-32">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-white mb-4">Our Placement Process</motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 max-w-2xl mx-auto text-lg">A structured approach to ensure you are industry-ready.</motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <img 
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80" 
                alt="Interview Process" 
                className="rounded-[2rem] border border-slate-700 shadow-2xl object-cover w-full h-[600px]"
              />
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-[#0b1120] via-transparent to-transparent"></div>
            </motion.div>

            {/* Steps side */}
            <div className="flex flex-col gap-8 order-1 lg:order-2">
              {processSteps.map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                    className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl flex gap-6 items-start group hover:bg-slate-800/80 transition-all"
                  >
                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                      <StepIcon size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
                        <span className="text-slate-500 text-sm">0{idx + 1}</span> {step.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Success Stories Carousel */}
        <motion.div 
          className="mb-24 bg-gradient-to-br from-indigo-900/20 to-sky-900/10 border border-indigo-500/20 rounded-[3rem] p-8 md:p-16 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-400/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Student Success Stories</h2>
            <p className="text-sky-300">Hear directly from our placed candidates.</p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="flex gap-4 mb-8 justify-center">
              {testimonials.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${activeTestimonial === idx ? 'bg-sky-400 w-8' : 'bg-slate-600 hover:bg-slate-500'}`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-800/60 backdrop-blur-xl border border-slate-600/50 rounded-3xl p-8 md:p-12 text-center"
              >
                <div className="flex justify-center gap-1 text-amber-400 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <p className="text-xl md:text-3xl text-slate-200 font-medium leading-relaxed mb-10 italic">
                  "{testimonials[activeTestimonial].text}"
                </p>
                <div className="flex flex-col items-center">
                  <img 
                    src={testimonials[activeTestimonial].image} 
                    alt={testimonials[activeTestimonial].name}
                    className="w-20 h-20 rounded-full border-4 border-slate-700 mb-4"
                  />
                  <h4 className="text-white font-bold text-lg">{testimonials[activeTestimonial].name}</h4>
                  <p className="text-sky-400">{testimonials[activeTestimonial].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">Ready to kickstart your career?</h2>
          <button className="bg-sky-500 hover:bg-sky-400 text-slate-900 font-bold px-8 py-4 rounded-full inline-flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(14,165,233,0.4)]">
            Enroll Now <ChevronRight size={20} />
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default Placements;
