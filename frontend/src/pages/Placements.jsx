import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { staggerContainer, fadeInUp, slideInLeft, slideInRight, scaleUp } from '../utils/animations';
import { Briefcase, TrendingUp, Users, Target, Building, ChevronRight, CheckCircle2, Star, Award, ArrowRight, Zap, Globe } from 'lucide-react';

const stats = [
  { label: "Students Placed", value: "2,500+", icon: Users, color: "from-sky-400 to-blue-500", glow: "rgba(14,165,233,0.35)" },
  { label: "Highest Package", value: "₹42 LPA", icon: TrendingUp, color: "from-amber-400 to-orange-500", glow: "rgba(245,158,11,0.35)" },
  { label: "Average Package", value: "₹8.5 LPA", icon: Award, color: "from-emerald-400 to-teal-500", glow: "rgba(16,185,129,0.35)" },
  { label: "Hiring Partners", value: "150+", icon: Building, color: "from-rose-400 to-pink-500", glow: "rgba(244,63,94,0.35)" },
];

const processSteps = [
  { title: "Skill Assessment", desc: "We map your technical strengths and identify gaps, then create a personalised learning roadmap.", icon: Target, color: "from-violet-500 to-indigo-600", num: "01" },
  { title: "Industry Training", desc: "Intensive hands-on training with the latest tech stacks, guided by practicing engineers.", icon: Briefcase, color: "from-sky-500 to-blue-600", num: "02" },
  { title: "Mock Interviews", desc: "10+ simulated technical and HR interviews with expert evaluators and real-time feedback.", icon: Users, color: "from-emerald-500 to-teal-600", num: "03" },
  { title: "Final Placement", desc: "Direct referrals and interview scheduling with 150+ top partner companies across India.", icon: CheckCircle2, color: "from-amber-500 to-orange-600", num: "04" },
];

const companies = [
  { name: "Google", logo: "https://www.google.com/favicon.ico", pkg: "₹42 LPA" },
  { name: "Amazon", logo: "https://www.amazon.com/favicon.ico", pkg: "₹32 LPA" },
  { name: "Microsoft", logo: "https://www.microsoft.com/favicon.ico", pkg: "₹28 LPA" },
  { name: "TCS Digital", logo: "https://www.tcs.com/favicon.ico", pkg: "₹12 LPA" },
  { name: "Infosys", logo: "https://www.infosys.com/favicon.ico", pkg: "₹10 LPA" },
  { name: "Wipro", logo: "https://www.wipro.com/favicon.ico", pkg: "₹9 LPA" },
];

const testimonials = [
  { name: "Aarav Sharma", role: "SDE @ Google", img: "https://i.pravatar.cc/150?img=11", text: "Edufordge's placement cell completely transformed my career. The mock interviews were game-changers. I went from 0 offers to 3 FAANG interviews in 6 months.", pkg: "₹42 LPA" },
  { name: "Priya Patel", role: "Data Analyst @ Amazon", img: "https://i.pravatar.cc/150?img=5", text: "The industry-aligned training made me confident from Day 1. The mentors guided me through every step of the placement journey.", pkg: "₹28 LPA" },
  { name: "Rohan Singh", role: "Frontend Dev @ Zomato", img: "https://i.pravatar.cc/150?img=12", text: "100% placement assistance isn't just a tagline here. They stood by me until I landed my dream role. Highly recommend!", pkg: "₹18 LPA" },
];

// 3D Tilt card
const TiltStatCard = ({ stat }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 20 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      variants={scaleUp}
      className="perspective-1000 cursor-default"
    >
      <div
        className="relative p-8 rounded-3xl bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 overflow-hidden group hover:border-slate-500/80 transition-all duration-500"
        style={{ boxShadow: `0 0 0 rgba(0,0,0,0)` }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = `0 20px 50px ${stat.glow}`}
        onMouseLeave={e => e.currentTarget.style.boxShadow = `0 0 0 rgba(0,0,0,0)`}
      >
        {/* Animated glow blob */}
        <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-25 blur-2xl transition-all duration-700 group-hover:scale-150`} />

        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`} style={{ transform: "translateZ(20px)" }}>
          <stat.icon size={24} className="text-white" />
        </div>
        <div className={`text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-2 tracking-tight`} style={{ transform: "translateZ(15px)" }}>
          {stat.value}
        </div>
        <p className="text-slate-400 font-medium text-sm" style={{ transform: "translateZ(10px)" }}>{stat.label}</p>

        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      </div>
    </motion.div>
  );
};

const Placements = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="min-h-screen bg-[#060b14] font-sans overflow-hidden text-white">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-8 min-h-[90vh] flex items-center overflow-hidden">
        {/* BG Layers */}
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80"
            alt="Placements" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060b14] via-[#060b14]/80 to-[#060b14]/60" />
        </div>
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-sky-600/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-300 text-sm font-bold tracking-widest uppercase">100% Placement Assistance</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6 tracking-tight">
              Launch Your Career<br />with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-emerald-400 to-indigo-500"> Top IT Giants</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-slate-300 leading-relaxed mb-10 max-w-xl">
              We bridge the gap between academia and industry. Our dedicated placement cell ensures you don't just graduate — you get hired at companies you dream of.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex gap-4 flex-wrap">
              <button className="group relative overflow-hidden bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-bold px-10 py-4 rounded-xl hover:-translate-y-1 transition-all shadow-[0_10px_30px_rgba(14,165,233,0.3)]">
                <span className="relative z-10 flex items-center gap-2">View Placements <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>
              <button className="bg-slate-800/60 backdrop-blur-md border border-slate-700 text-white font-bold px-10 py-4 rounded-xl hover:-translate-y-1 hover:bg-slate-700/60 transition-all">
                Book Counseling
              </button>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={slideInRight} className="relative hidden lg:block">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.5)] group">
              <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80"
                alt="Career Success" className="w-full h-[560px] object-cover group-hover:scale-105 transition-transform duration-1000 ease-out opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060b14] via-[#060b14]/20 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-8 bg-slate-900/90 backdrop-blur-xl border border-slate-700 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Building size={24} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-white font-bold">150+ Companies</p>
                <p className="text-emerald-400 text-sm font-medium">Hiring Actively</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -top-6 -right-6 bg-slate-900/90 backdrop-blur-xl border border-amber-500/30 px-6 py-4 rounded-2xl shadow-2xl"
            >
              <p className="text-amber-400 font-extrabold text-2xl">₹42 LPA</p>
              <p className="text-slate-400 text-sm">Highest Package 2024</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {stats.map((stat, i) => <TiltStatCard key={i} stat={stat} />)}
          </motion.div>
        </div>
      </section>

      {/* ── COMPANIES STRIP ──────────────────────────────── */}
      <section className="py-10 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center text-slate-500 text-sm font-bold uppercase tracking-widest mb-8">
            Our Students Work At
          </motion.p>
          <div className="flex gap-4 flex-wrap justify-center">
            {companies.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="flex items-center gap-3 bg-slate-800/50 border border-slate-700/60 px-6 py-3 rounded-2xl cursor-default hover:border-slate-500 hover:bg-slate-800/80 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300"
              >
                <Globe size={16} className="text-slate-400" />
                <span className="text-white font-bold">{c.name}</span>
                <span className="text-emerald-400 text-sm font-medium">{c.pkg}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLACEMENT PROCESS ────────────────────────────── */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="text-center mb-16">
            <motion.span variants={fadeInUp} className="text-amber-400 font-bold tracking-widest uppercase text-sm mb-4 block">How It Works</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-white mb-4">Our Placement <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Process</span></motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 text-xl max-w-2xl mx-auto">A proven 4-step methodology to ensure you are ready for Day 1 on the job.</motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft} className="relative">
              <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] group">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                  alt="Interview Training" className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060b14]/60 to-transparent" />
              </div>
            </motion.div>

            <div className="flex flex-col gap-5">
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, type: "spring", stiffness: 80 }}
                  className="group flex gap-5 bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 p-6 rounded-2xl hover:-translate-y-1 hover:border-slate-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] transition-all duration-400 cursor-default"
                >
                  <div className={`shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    <step.icon size={26} className="text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-slate-600 text-xs font-black">{step.num}</span>
                      <h3 className="text-white font-bold text-lg">{step.title}</h3>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-12">
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-white mb-4">Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Success Stories</span></motion.h2>
          </motion.div>

          {/* Tab Pills */}
          <div className="flex justify-center gap-3 mb-10">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeTestimonial === i
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                  : 'bg-slate-800/60 border border-slate-700 text-slate-400 hover:text-white'}`}
              >
                <img src={t.img} alt={t.name} className="w-6 h-6 rounded-full object-cover" />
                {t.name.split(' ')[0]}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 md:p-14 grid grid-cols-1 lg:grid-cols-3 gap-10 items-center shadow-2xl"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur opacity-40 animate-pulse" />
                  <img src={testimonials[activeTestimonial].img} alt={testimonials[activeTestimonial].name}
                    className="relative w-24 h-24 rounded-full object-cover border-4 border-amber-500/30" />
                </div>
                <h4 className="text-white font-extrabold text-xl">{testimonials[activeTestimonial].name}</h4>
                <p className="text-amber-400 font-semibold text-sm mt-1">{testimonials[activeTestimonial].role}</p>
                <div className="mt-4 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
                  <span className="text-emerald-400 font-extrabold text-lg">{testimonials[activeTestimonial].pkg}</span>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="flex gap-1 text-amber-400 mb-5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <p className="text-2xl text-slate-200 font-medium leading-relaxed italic">
                  "{testimonials[activeTestimonial].text}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="py-24 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/30 via-[#060b14] to-emerald-900/20" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-extrabold text-white mb-6">
              Ready to Kickstart<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">Your Dream Career?</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 text-xl mb-10">Join 2,500+ alumni who have already transformed their futures.</motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group relative overflow-hidden bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-bold px-12 py-5 rounded-xl hover:-translate-y-1 transition-all shadow-[0_10px_40px_rgba(14,165,233,0.35)] text-lg flex items-center gap-2 justify-center">
                Enroll Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Placements;
