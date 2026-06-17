import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FileText, CheckCircle2, ArrowRight, Star, Zap, Download,
  Eye, Edit3, Layers, Award, Users, TrendingUp, Target,
  ChevronRight, Sparkles, Code2, AlignLeft
} from 'lucide-react';
import { staggerContainer, fadeInUp, slideInLeft, slideInRight, scaleUp } from '../utils/animations';

const services = [
  { icon: FileText, title: "ATS-Optimized Resume Writing", desc: "We craft your resume to beat Applicant Tracking Systems. Keywords, formatting, and impact metrics — all tuned to pass ATS scanners at top companies.", color: "from-sky-500 to-blue-600", glow: "rgba(14,165,233,0.3)" },
  { icon: Edit3, title: "Professional Rewrite", desc: "Already have a resume? Our experts do a complete overhaul — sharper language, quantified achievements, and a clean premium layout.", color: "from-violet-500 to-purple-600", glow: "rgba(139,92,246,0.3)" },
  { icon: Eye, title: "Resume Review & Feedback", desc: "Get detailed feedback from an industry expert within 48 hours. Learn exactly what's weak and how to fix it with our annotated review.", color: "from-amber-500 to-orange-500", glow: "rgba(245,158,11,0.3)" },
  { icon: Layers, title: "Role-Specific Customisation", desc: "Each company needs a different version. We create 3 tailored variants of your resume targeting FAANG, startups, and service companies.", color: "from-emerald-500 to-teal-600", glow: "rgba(16,185,129,0.3)" },
  { icon: Code2, title: "LinkedIn Profile Makeover", desc: "Your LinkedIn is your digital resume. We optimise your headline, About section, projects, and skills to 10× your recruiter visibility.", color: "from-rose-500 to-pink-600", glow: "rgba(244,63,94,0.3)" },
  { icon: AlignLeft, title: "Cover Letter Writing", desc: "A killer cover letter that tells your story, shows your passion, and makes hiring managers want to meet you before the interview.", color: "from-cyan-500 to-sky-600", glow: "rgba(6,182,212,0.3)" },
];

const beforeAfter = [
  { before: "Responsible for building features", after: "Led development of 8 React components reducing page load time by 35%", category: "Impact Metrics" },
  { before: "Worked on backend APIs", after: "Built 12 RESTful APIs (Node.js + Express) serving 50K+ daily requests", category: "Quantification" },
  { before: "Participated in team projects", after: "Collaborated with 6-member cross-functional team to deliver MVP 2 weeks ahead of schedule", category: "Teamwork Language" },
  { before: "Good at problem solving", after: "Solved 200+ LeetCode problems; top 8% on Codeforces", category: "Proof of Skill" },
];

const stats = [
  { v: "3,500+", l: "Resumes Written", icon: FileText, c: "from-sky-500 to-blue-600" },
  { v: "92%", l: "Interview Rate", icon: TrendingUp, c: "from-emerald-500 to-teal-600" },
  { v: "48 hrs", l: "Turnaround Time", icon: Zap, c: "from-amber-500 to-orange-500" },
  { v: "4.9/5", l: "Student Rating", icon: Star, c: "from-violet-500 to-purple-600" },
];

const templates = [
  { name: "FAANG Premium", desc: "Clean, minimal, data-driven layout preferred by Google, Meta, and Amazon recruiters.", img: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=500&q=80", badge: "Most Downloaded", color: "from-sky-500 to-blue-600" },
  { name: "Startup Ready", desc: "Creative and bold layout for product companies, startups, and design-forward organisations.", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=500&q=80", badge: "Trending", color: "from-violet-500 to-purple-600" },
  { name: "Classic Professional", desc: "Timeless, formal layout for IT services, banking, and government sector applications.", img: "https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?auto=format&fit=crop&w=500&q=80", badge: "Universal", color: "from-emerald-500 to-teal-600" },
];

const ResumeBuilding = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-[#060b14] font-sans text-white overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-8 min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1920&q=80"
            alt="Resume Building" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060b14]/60 to-[#060b14]" />
        </div>
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-emerald-600/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-8">
              <Sparkles size={14} className="text-emerald-400" />
              <span className="text-emerald-300 text-sm font-bold tracking-widest uppercase">ATS-Optimized Resume Writing</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6">
              A Resume That<br />Gets You
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400"> Hired</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-slate-300 leading-relaxed mb-10 max-w-xl">
              92% of our resumes land interview callbacks within 2 weeks. We combine industry expertise with ATS science to build the resume that gets you shortlisted — every time.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex gap-4 flex-wrap">
              <Link to="/contact" className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-sky-500 text-white font-bold px-10 py-4 rounded-xl shadow-[0_10px_30px_rgba(16,185,129,0.3)] flex items-center gap-2">
                <span className="relative z-10 flex items-center gap-2">Get My Resume Built <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
              <a href="#before-after" className="bg-slate-800/60 backdrop-blur-md border border-slate-700 text-white font-bold px-10 py-4 rounded-xl hover:-translate-y-1 hover:bg-slate-700/60 transition-all">
                See Before & After
              </a>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="hidden lg:grid grid-cols-2 gap-5">
            {stats.map((s, i) => (
              <motion.div key={i} variants={scaleUp}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
                className="group relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/60 p-7 rounded-3xl overflow-hidden cursor-default transition-all duration-400"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${s.c} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.c} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <s.icon size={22} className="text-white" />
                </div>
                <div className={`text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${s.c} mb-1`}>{s.v}</div>
                <div className="text-slate-400 text-sm font-medium">{s.l}</div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BEFORE & AFTER ───────────────────────────────── */}
      <section id="before-after" className="py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-14">
            <motion.span variants={fadeInUp} className="text-emerald-400 font-bold tracking-widest uppercase text-sm mb-4 block">Real Transformations</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Before vs <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">After</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 text-xl max-w-2xl mx-auto">See how we transform weak resume lines into interview-winning impact statements.</motion.p>
          </motion.div>

          <div className="flex flex-col gap-5">
            {beforeAfter.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-slate-700/60 hover:border-emerald-500/30 transition-all duration-400 hover:shadow-[0_15px_40px_rgba(16,185,129,0.15)]"
              >
                <div className="bg-rose-900/20 border-r border-slate-700/60 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="text-rose-400 text-xs font-bold uppercase tracking-wider">Before</span>
                  </div>
                  <p className="text-slate-300 font-medium">{item.before}</p>
                </div>
                <div className="bg-emerald-900/20 p-6 relative">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">After</span>
                    <span className="ml-auto text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">{item.category}</span>
                  </div>
                  <p className="text-white font-semibold leading-relaxed">{item.after}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-14">
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Our Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">Services</span>
            </motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div key={i} variants={fadeInUp}
                whileHover={{ y: -8, boxShadow: `0 25px 50px ${s.glow}` }}
                className="group relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 p-8 rounded-3xl overflow-hidden cursor-default transition-all duration-400"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <s.icon size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{s.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{s.desc}</p>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TEMPLATES ────────────────────────────────────── */}
      <section className="py-20 px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-14">
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">Templates</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {templates.map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12, type: "spring" }}
                whileHover={{ y: -8, boxShadow: "0 25px 50px rgba(0,0,0,0.5)" }}
                className="group bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-[2rem] overflow-hidden cursor-default transition-all duration-400"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  <span className={`absolute top-4 left-4 bg-gradient-to-r ${t.color} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>{t.badge}</span>
                </div>
                <div className="p-7">
                  <h3 className="text-white font-bold text-lg mb-2">{t.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{t.desc}</p>
                  <button className={`w-full bg-gradient-to-r ${t.color} text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 hover:-translate-y-0.5 transition-all`}>
                    <Download size={16} /> Use Template
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResumeBuilding;
