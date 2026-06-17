import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users, Code, Cpu, Database, Globe, Shield, Layers, Smartphone,
  Star, ArrowRight, Zap, Calendar, MessageSquare, Github, Twitter,
  Linkedin, Award, TrendingUp, BookOpen, Play, ChevronRight, Heart, Flame
} from 'lucide-react';
import { staggerContainer, fadeInUp, slideInLeft, slideInRight, scaleUp } from '../utils/animations';

const communities = [
  {
    id: 1, name: "Full Stack Developers Guild", members: "4,200+", activity: "Very Active", icon: Globe,
    color: "from-sky-500 to-blue-600", glow: "rgba(14,165,233,0.3)", border: "border-sky-500/30",
    img: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?auto=format&fit=crop&w=800&q=80",
    tags: ["React", "Node.js", "MongoDB", "DevOps"],
    perks: ["Weekly code reviews", "Project collabs", "Job board access"],
    leads: ["Arjun V.", "Priya M."],
  },
  {
    id: 2, name: "AI & Machine Learning Circle", members: "3,100+", activity: "Very Active", icon: Cpu,
    color: "from-violet-500 to-purple-600", glow: "rgba(139,92,246,0.3)", border: "border-violet-500/30",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "TensorFlow", "LLMs", "MLOps"],
    perks: ["Paper reading sessions", "Kaggle team competitions", "Research sharing"],
    leads: ["Kavya R.", "Nikhil S."],
  },
  {
    id: 3, name: "Data Science & Analytics Club", members: "2,800+", activity: "Active", icon: Database,
    color: "from-emerald-500 to-teal-600", glow: "rgba(16,185,129,0.3)", border: "border-emerald-500/30",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "SQL", "Tableau", "Statistics"],
    perks: ["Real dataset projects", "Dashboard contests", "Industry mentors"],
    leads: ["Rohan P.", "Sneha K."],
  },
  {
    id: 4, name: "Cyber Security Warriors", members: "1,900+", activity: "Active", icon: Shield,
    color: "from-rose-500 to-pink-600", glow: "rgba(244,63,94,0.3)", border: "border-rose-500/30",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    tags: ["Ethical Hacking", "CTF", "Kali Linux", "OWASP"],
    perks: ["Monthly CTF competitions", "Bug bounty mentoring", "Cert study groups"],
    leads: ["Aditya G.", "Megha J."],
  },
  {
    id: 5, name: "Cloud & DevOps Engineers", members: "2,200+", activity: "Very Active", icon: Layers,
    color: "from-cyan-500 to-sky-600", glow: "rgba(6,182,212,0.3)", border: "border-cyan-500/30",
    img: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80",
    tags: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    perks: ["Cloud credits pool", "Infra project teams", "Cert study groups"],
    leads: ["Rahul T.", "Ananya B."],
  },
  {
    id: 6, name: "Mobile App Creators", members: "1,600+", activity: "Active", icon: Smartphone,
    color: "from-amber-500 to-orange-500", glow: "rgba(245,158,11,0.3)", border: "border-amber-500/30",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    tags: ["React Native", "Flutter", "Firebase", "App Store"],
    perks: ["App launch support", "UI/UX workshops", "Startup idea network"],
    leads: ["Vikram D.", "Ishita R."],
  },
];

const upcomingEvents = [
  { title: "React Advanced Patterns Workshop", community: "Full Stack Guild", date: "July 20, 2026", type: "Workshop", color: "from-sky-500 to-blue-600", attendees: 245 },
  { title: "LLM Hackathon — Build with Gemini", community: "AI & ML Circle", date: "Aug 2-3, 2026", type: "Hackathon", color: "from-violet-500 to-purple-600", attendees: 380 },
  { title: "Live CTF Challenge — Beginner Friendly", community: "Cyber Warriors", date: "July 28, 2026", type: "Competition", color: "from-rose-500 to-pink-600", attendees: 178 },
  { title: "AWS Solution Architect Study Session", community: "Cloud Engineers", date: "July 25, 2026", type: "Study Group", color: "from-cyan-500 to-sky-600", attendees: 120 },
];

const testimonials = [
  { name: "Kiran Patel", role: "SDE @ Google", img: "https://i.pravatar.cc/200?img=11", community: "Full Stack Guild", text: "The code reviews in the Full Stack Guild were honestly more valuable than any course. Real engineers tearing apart my code taught me more in a month than a year of solo projects." },
  { name: "Aarav Nair", role: "ML Engineer @ PhonePe", img: "https://i.pravatar.cc/200?img=33", community: "AI & ML Circle", text: "I found my entire interview prep group through the ML Circle. We studied together, mocked each other, and 4 of us landed ML roles at top companies within the same month." },
];

const TechnicalCommunity = () => {
  const [activeCommunity, setActiveCommunity] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="min-h-screen bg-[#060b14] font-sans text-white overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-8 min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1920&q=80"
            alt="Technical Community" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060b14]/60 to-[#060b14]" />
        </div>
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-violet-600/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        {/* Animated floating tags */}
        {["React ⚛️", "Python 🐍", "AWS ☁️", "Docker 🐳", "ML 🤖", "Kubernetes 🚢"].map((tag, i) => (
          <motion.div key={i}
            animate={{ y: [0, i % 2 === 0 ? -12 : 12, 0], rotate: [0, i % 3 === 0 ? 3 : -3, 0] }}
            transition={{ repeat: Infinity, duration: 5 + i, ease: "easeInOut", delay: i * 0.5 }}
            className="absolute hidden xl:block bg-slate-900/70 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full text-sm font-bold text-slate-300"
            style={{
              top: `${15 + (i * 12)}%`,
              right: i < 3 ? `${5 + i * 5}%` : undefined,
              left: i >= 3 ? `${2 + (i - 3) * 5}%` : undefined,
            }}
          >
            {tag}
          </motion.div>
        ))}

        <div className="max-w-7xl mx-auto relative z-10 w-full text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-500/10 border border-violet-500/30 mb-8">
              <Flame size={14} className="text-violet-400" />
              <span className="text-violet-300 text-sm font-bold tracking-widest uppercase">16,000+ Student Members</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-8xl font-extrabold leading-[1.05] mb-6 tracking-tight">
              Find Your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-sky-400">Tech Tribe</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-slate-300 leading-relaxed mb-10 max-w-3xl mx-auto">
              6 domain-specific communities. Weekly events, project collaborations, peer mentoring, and a direct line to industry professionals who help you level up.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex gap-4 justify-center flex-wrap">
              <a href="#communities" className="group relative overflow-hidden bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 text-white font-bold px-12 py-5 rounded-xl shadow-[0_10px_40px_rgba(139,92,246,0.4)] flex items-center gap-2 text-lg">
                <span className="relative z-10 flex items-center gap-2">Join a Community <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>
              <a href="#events" className="bg-slate-800/70 backdrop-blur-md border border-slate-700 text-white font-bold px-12 py-5 rounded-xl hover:-translate-y-1 hover:bg-slate-700/70 transition-all flex items-center gap-2 text-lg">
                <Calendar size={20} /> View Events
              </a>
            </motion.div>

            {/* Live stats strip */}
            <motion.div variants={fadeInUp} className="flex justify-center gap-10 mt-16 flex-wrap">
              {[["6", "Communities"], ["16K+", "Active Members"], ["200+", "Events/Year"], ["50+", "Industry Mentors"]].map(([v, l], i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">{v}</div>
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">{l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── COMMUNITIES ──────────────────────────────────── */}
      <section id="communities" className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-14">
            <motion.span variants={fadeInUp} className="text-violet-400 font-bold tracking-widest uppercase text-sm mb-4 block">Choose Your Domain</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Our Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Communities</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communities.map((com, i) => (
              <motion.div key={com.id}
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, type: "spring", stiffness: 80 }}
                whileHover={{ y: -8 }}
                onMouseEnter={() => setActiveCommunity(com.id)}
                onMouseLeave={() => setActiveCommunity(null)}
                className={`group relative bg-slate-800/40 backdrop-blur-xl border ${com.border} rounded-[1.75rem] overflow-hidden flex flex-col transition-all duration-500`}
                style={{ boxShadow: activeCommunity === com.id ? `0 30px 60px ${com.glow}` : '0 4px 20px rgba(0,0,0,0.2)' }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img src={com.img} alt={com.name}
                    className="w-full h-full object-cover"
                    animate={{ scale: activeCommunity === com.id ? 1.08 : 1 }}
                    transition={{ duration: 0.6 }}
                    style={{ opacity: 0.65 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  <div className={`absolute top-4 right-4 w-12 h-12 rounded-2xl bg-gradient-to-br ${com.color} flex items-center justify-center shadow-lg`}>
                    <com.icon size={22} className="text-white" />
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r ${com.color} text-white`}>{com.activity}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <Users size={14} className="text-violet-400" />
                      <span className="font-bold text-white">{com.members}</span> members
                    </div>
                  </div>

                  <h3 className={`text-xl font-extrabold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${com.color} transition-all duration-300`}>
                    {com.name}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {com.tags.map((t, j) => <span key={j} className="text-xs font-medium text-slate-300 bg-slate-700/60 px-3 py-1 rounded-full border border-slate-600/60">{t}</span>)}
                  </div>

                  <div className="flex flex-col gap-2 mb-6">
                    {com.perks.map((p, j) => (
                      <div key={j} className="flex items-center gap-2 text-slate-400 text-sm">
                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                        {p}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mb-5 border-t border-white/5 pt-4">
                    <span className="text-slate-500 text-xs">Led by</span>
                    {com.leads.map((l, j) => (
                      <span key={j} className="text-xs font-bold text-white bg-slate-700/60 px-3 py-1 rounded-full border border-slate-600">{l}</span>
                    ))}
                  </div>

                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className={`mt-auto w-full bg-gradient-to-r ${com.color} text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all`}
                    style={{ boxShadow: `0 8px 24px ${com.glow}` }}
                  >
                    Join Community <ChevronRight size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ──────────────────────────────── */}
      <section id="events" className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-14">
            <motion.span variants={fadeInUp} className="text-cyan-400 font-bold tracking-widest uppercase text-sm mb-4 block">Community Calendar</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Events</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((ev, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, type: "spring" }}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
                className="group bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-7 flex items-start gap-6 hover:border-slate-500 transition-all duration-400 cursor-default"
              >
                <div className={`shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${ev.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <Calendar size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${ev.color} text-white`}>{ev.type}</span>
                    <span className="text-slate-400 text-xs">{ev.community}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-cyan-400 transition-all duration-300">
                    {ev.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1.5"><Calendar size={13} className="text-cyan-400" />{ev.date}</span>
                    <span className="flex items-center gap-1.5"><Users size={13} className="text-violet-400" />{ev.attendees} attending</span>
                  </div>
                </div>
                <button className={`shrink-0 bg-gradient-to-r ${ev.color} text-white font-bold px-4 py-2 rounded-xl text-sm hover:opacity-90 hover:-translate-y-0.5 transition-all`}>
                  RSVP
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="py-20 px-8 pb-24">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-12">
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-white">
              Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Success Stories</span>
            </motion.h2>
          </motion.div>

          <div className="flex justify-center gap-3 mb-10">
            {testimonials.map((t, i) => (
              <motion.button key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTestimonial(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeTestimonial === i
                  ? 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-[0_0_25px_rgba(139,92,246,0.35)]'
                  : 'bg-slate-800/60 border border-slate-700 text-slate-400 hover:text-white'}`}
              >
                <img src={t.img} alt={t.name} className="w-6 h-6 rounded-full object-cover" />
                {t.name.split(' ')[0]}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTestimonial}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}
              className="group bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 md:p-14 grid grid-cols-1 lg:grid-cols-3 gap-10 items-center hover:border-violet-500/20 transition-all duration-500"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <div className="absolute -inset-2 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full blur-md opacity-0 group-hover:opacity-40 animate-pulse transition-opacity" />
                  <img src={testimonials[activeTestimonial].img} alt={testimonials[activeTestimonial].name}
                    className="relative w-28 h-28 rounded-full object-cover border-4 border-violet-500/30 group-hover:border-violet-500/60 transition-colors" />
                </div>
                <h4 className="text-white font-extrabold text-xl mb-1">{testimonials[activeTestimonial].name}</h4>
                <p className="text-violet-400 font-semibold text-sm mb-2">{testimonials[activeTestimonial].role}</p>
                <span className="text-xs font-bold bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full">
                  {testimonials[activeTestimonial].community}
                </span>
              </div>
              <div className="lg:col-span-2">
                <div className="flex gap-1 text-violet-400 mb-5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <p className="text-xl md:text-2xl text-slate-200 leading-relaxed font-medium italic">
                  "{testimonials[activeTestimonial].text}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default TechnicalCommunity;
