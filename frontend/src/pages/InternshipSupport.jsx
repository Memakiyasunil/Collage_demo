import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Briefcase, Building2, MapPin, Clock, Star, ArrowRight, CheckCircle2,
  Zap, Users, TrendingUp, Award, Search, Filter, Globe, Code, Cpu,
  Database, Shield, Layers, ChevronRight, Calendar, DollarSign
} from 'lucide-react';
import { staggerContainer, fadeInUp, slideInLeft, slideInRight, scaleUp } from '../utils/animations';

const stats = [
  { v: "1,200+", l: "Students Placed in Internships", icon: Users, c: "from-sky-500 to-blue-600", glow: "rgba(14,165,233,0.3)" },
  { v: "80+", l: "Partner Companies", icon: Building2, c: "from-violet-500 to-purple-600", glow: "rgba(139,92,246,0.3)" },
  { v: "₹25K/mo", l: "Average Stipend", icon: DollarSign, c: "from-emerald-500 to-teal-600", glow: "rgba(16,185,129,0.3)" },
  { v: "85%", l: "Convert to Full-Time", icon: TrendingUp, c: "from-amber-500 to-orange-500", glow: "rgba(245,158,11,0.3)" },
];

const internships = [
  {
    id: 1, company: "Google India", role: "Software Engineering Intern", domain: "Full Stack", stipend: "₹80K/mo",
    duration: "3 Months", location: "Bangalore / Remote", deadline: "July 30, 2026",
    tags: ["React", "Python", "Cloud"], icon: Globe, color: "from-sky-500 to-blue-600",
    img: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=800&q=80",
    badge: "🔥 Hot", badgeColor: "from-orange-500 to-red-600",
  },
  {
    id: 2, company: "Amazon Dev Centre", role: "Data Science Intern", domain: "Data Science", stipend: "₹70K/mo",
    duration: "6 Months", location: "Hyderabad", deadline: "Aug 5, 2026",
    tags: ["Python", "ML", "SQL"], icon: Database, color: "from-amber-500 to-orange-500",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    badge: "⭐ Top Pick", badgeColor: "from-amber-500 to-yellow-600",
  },
  {
    id: 3, company: "Razorpay", role: "Frontend Engineering Intern", domain: "Frontend", stipend: "₹45K/mo",
    duration: "3 Months", location: "Bangalore", deadline: "July 25, 2026",
    tags: ["React", "TypeScript", "CSS"], icon: Code, color: "from-violet-500 to-purple-600",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    badge: "✅ Open", badgeColor: "from-emerald-500 to-teal-600",
  },
  {
    id: 4, company: "Zomato Tech", role: "ML Engineering Intern", domain: "AI/ML", stipend: "₹60K/mo",
    duration: "6 Months", location: "Gurgaon / Remote", deadline: "Aug 15, 2026",
    tags: ["PyTorch", "MLOps", "APIs"], icon: Cpu, color: "from-rose-500 to-pink-600",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=800&q=80",
    badge: "🤖 AI Role", badgeColor: "from-violet-500 to-purple-700",
  },
  {
    id: 5, company: "Palo Alto Networks", role: "Cybersecurity Intern", domain: "Security", stipend: "₹55K/mo",
    duration: "4 Months", location: "Chennai", deadline: "Aug 20, 2026",
    tags: ["Ethical Hacking", "SOC", "Linux"], icon: Shield, color: "from-rose-500 to-red-600",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    badge: "🔒 High Demand", badgeColor: "from-rose-500 to-pink-600",
  },
  {
    id: 6, company: "Microsoft India", role: "Cloud Infra Intern", domain: "Cloud", stipend: "₹65K/mo",
    duration: "3 Months", location: "Noida / Remote", deadline: "Sept 1, 2026",
    tags: ["Azure", "Kubernetes", "DevOps"], icon: Layers, color: "from-cyan-500 to-sky-600",
    img: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80",
    badge: "☁️ Cloud", badgeColor: "from-cyan-500 to-sky-600",
  },
];

const processSteps = [
  { num: "01", title: "Apply & Profile Review", desc: "Submit your application. Our team reviews your skills, GPA, and bootcamp projects to match you with the right companies.", icon: Search, color: "from-sky-500 to-blue-600" },
  { num: "02", title: "Pre-Internship Training", desc: "Get 2-week intensive preparation — resume polish, aptitude tests, company-specific mock rounds.", icon: Award, color: "from-violet-500 to-purple-600" },
  { num: "03", title: "Company Shortlisting", desc: "We shortlist you for 3–5 companies based on your domain, skills, and preference. You choose.", icon: Filter, color: "from-amber-500 to-orange-500" },
  { num: "04", title: "Interview & Offer", desc: "Attend company interviews with our mentors on standby. Most students get an offer within 2 weeks.", icon: CheckCircle2, color: "from-emerald-500 to-teal-600" },
];

const filterOptions = ['All', 'Full Stack', 'Data Science', 'Frontend', 'AI/ML', 'Security', 'Cloud'];

const InternshipSupport = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hovered, setHovered] = useState(null);

  const filtered = activeFilter === 'All' ? internships : internships.filter(i => i.domain === activeFilter);

  return (
    <div className="min-h-screen bg-[#060b14] font-sans text-white overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-8 min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80"
            alt="Internship" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060b14]/60 to-[#060b14]" />
        </div>
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-sky-600/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-500/10 border border-sky-500/30 mb-8">
              <Briefcase size={14} className="text-sky-400" />
              <span className="text-sky-300 text-sm font-bold tracking-widest uppercase">Student Internship Program</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6 tracking-tight">
              Your First Step<br />to a
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-500"> Dream Career</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-slate-300 leading-relaxed mb-10 max-w-xl">
              We connect you with 80+ top-tier companies for paid internships. Pre-internship training, interview prep, and guaranteed referrals included.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex gap-4 flex-wrap">
              <a href="#listings" className="group relative overflow-hidden bg-gradient-to-r from-sky-500 to-violet-600 text-white font-bold px-10 py-4 rounded-xl shadow-[0_10px_30px_rgba(14,165,233,0.3)] flex items-center gap-2">
                <span className="relative z-10 flex items-center gap-2">Browse Internships <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>
              <Link to="/contact" className="bg-slate-800/60 backdrop-blur-md border border-slate-700 text-white font-bold px-10 py-4 rounded-xl hover:-translate-y-1 hover:bg-slate-700/60 transition-all">
                Talk to Counselor
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats grid */}
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="hidden lg:grid grid-cols-2 gap-5">
            {stats.map((s, i) => (
              <motion.div key={i} variants={scaleUp}
                whileHover={{ y: -6, boxShadow: `0 20px 40px ${s.glow}` }}
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

      {/* ── PROCESS ──────────────────────────────────────── */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-14">
            <motion.span variants={fadeInUp} className="text-violet-400 font-bold tracking-widest uppercase text-sm mb-4 block">How It Works</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-white mb-4">Your Path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-500">Internship</span></motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, type: "spring", stiffness: 80 }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
                className="group relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 p-8 rounded-3xl overflow-hidden cursor-default transition-all duration-400"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className="text-slate-700 font-black text-5xl absolute top-4 right-5 select-none">{step.num}</div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 relative z-10`}>
                  <step.icon size={24} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-3 relative z-10">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed relative z-10">{step.desc}</p>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LISTINGS ─────────────────────────────────────── */}
      <section id="listings" className="py-16 px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="text-sky-400 font-bold tracking-widest uppercase text-sm mb-1">Open Roles</p>
              <h2 className="text-3xl font-extrabold text-white">Active <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-500">Internship Listings</span></h2>
            </div>
            <div className="flex gap-3 flex-wrap">
              {filterOptions.map(f => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeFilter === f
                    ? 'bg-gradient-to-r from-sky-500 to-violet-600 text-white shadow-[0_0_20px_rgba(14,165,233,0.3)]'
                    : 'bg-slate-800/60 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div key={item.id} layout
                  initial={{ opacity: 0, scale: 0.93, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35, delay: i * 0.05 }}
                  onMouseEnter={() => setHovered(item.id)} onMouseLeave={() => setHovered(null)}
                  className={`group relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-[1.75rem] overflow-hidden transition-all duration-500 flex flex-col`}
                  style={{ boxShadow: hovered === item.id ? `0 25px 60px ${item.color.includes('sky') ? 'rgba(14,165,233,0.25)' : 'rgba(139,92,246,0.2)'}` : 'none' }}
                  whileHover={{ y: -8 }}
                >
                  <div className="relative h-44 overflow-hidden">
                    <motion.img src={item.img} alt={item.company}
                      className="w-full h-full object-cover"
                      animate={{ scale: hovered === item.id ? 1.08 : 1 }}
                      transition={{ duration: 0.6 }}
                      style={{ opacity: 0.65 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                    <span className={`absolute top-4 left-4 bg-gradient-to-r ${item.badgeColor} text-white text-xs font-bold px-4 py-1.5 rounded-full`}>{item.badge}</span>
                    <div className={`absolute top-4 right-4 w-11 h-11 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                      <item.icon size={19} className="text-white" />
                    </div>
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{item.company}</p>
                    <h3 className={`text-lg font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${item.color} transition-all duration-300`}>{item.role}</h3>
                    <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
                      <div className="flex items-center gap-2 text-slate-400"><DollarSign size={13} className="text-emerald-400" /><span className="text-emerald-300 font-bold">{item.stipend}</span></div>
                      <div className="flex items-center gap-2 text-slate-400"><Clock size={13} className="text-sky-400" />{item.duration}</div>
                      <div className="flex items-center gap-2 text-slate-400"><MapPin size={13} className="text-violet-400" />{item.location}</div>
                      <div className="flex items-center gap-2 text-slate-400"><Calendar size={13} className="text-amber-400" />Due {item.deadline}</div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.tags.map((t, j) => <span key={j} className="text-xs font-medium text-slate-300 bg-slate-700/60 px-3 py-1 rounded-full border border-slate-600/60">{t}</span>)}
                    </div>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className={`mt-auto w-full bg-gradient-to-r ${item.color} text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all`}>
                      Apply Now <ChevronRight size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="py-20 px-8 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/20 via-[#060b14] to-violet-900/20" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Ready to Land Your<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-500">First Internship?</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 text-xl mb-10">Register today. Our team will reach out within 48 hours with a personalised shortlist.</motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-gradient-to-r from-sky-500 to-violet-600 text-white px-12 py-5 rounded-xl font-bold hover:-translate-y-1 transition-all shadow-[0_10px_30px_rgba(14,165,233,0.3)] flex items-center gap-2 justify-center text-lg">
                Register Now <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default InternshipSupport;
