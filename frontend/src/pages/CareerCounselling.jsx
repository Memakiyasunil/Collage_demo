import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MessageSquare, Target, Heart, Lightbulb, Users, TrendingUp,
  ArrowRight, Star, CheckCircle2, Clock, Award, BookOpen,
  ChevronDown, Globe, Zap, Calendar, Phone
} from 'lucide-react';
import { staggerContainer, fadeInUp, slideInLeft, slideInRight, scaleUp } from '../utils/animations';

const services = [
  { icon: Target, title: "Career Path Mapping", desc: "One-on-one sessions to identify your strengths, interests, and the exact career path that aligns with your personality and skills.", color: "from-sky-500 to-blue-600", glow: "rgba(14,165,233,0.3)" },
  { icon: Lightbulb, title: "Domain Selection", desc: "Confused between AI, Web Dev, Cloud, or Data Science? We run a personalised assessment to help you choose your perfect domain.", color: "from-amber-500 to-orange-500", glow: "rgba(245,158,11,0.3)" },
  { icon: TrendingUp, title: "Skill Gap Analysis", desc: "We analyse your current skill level against your target role and create a precise upskilling roadmap with timelines.", color: "from-violet-500 to-purple-600", glow: "rgba(139,92,246,0.3)" },
  { icon: Users, title: "Industry Networking", desc: "Get introduced to our network of 500+ alumni and industry professionals for mentorship, referrals, and insider guidance.", color: "from-emerald-500 to-teal-600", glow: "rgba(16,185,129,0.3)" },
  { icon: Heart, title: "Mental Wellness Support", desc: "Career anxiety is real. Our certified counselors provide emotional support and build the confidence to face high-pressure interviews.", color: "from-rose-500 to-pink-600", glow: "rgba(244,63,94,0.3)" },
  { icon: Globe, title: "Global Opportunities", desc: "Exploring abroad? We guide you on VISA processes, GRE prep strategy, and shortlisting the best universities for your profile.", color: "from-cyan-500 to-sky-600", glow: "rgba(6,182,212,0.3)" },
];

const counselors = [
  { name: "Dr. Kavitha Rao", title: "Senior Career Counselor", exp: "12 Years", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80", speciality: "FAANG Placement & AI Careers", sessions: "2,400+", rating: 4.9 },
  { name: "Arjun Mehta", title: "Industry Career Coach", exp: "8 Years", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80", speciality: "Startup & Product Careers", sessions: "1,800+", rating: 4.8 },
  { name: "Sneha Kapoor", title: "Psychometric Counselor", exp: "10 Years", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80", speciality: "Personality & Domain Fit", sessions: "3,100+", rating: 5.0 },
];

const faqs = [
  { q: "How long is a single counseling session?", a: "Each session is 45-60 minutes. We recommend a minimum of 3 sessions for a complete career roadmap — initial assessment, roadmap creation, and follow-up review." },
  { q: "Is career counseling only for freshers?", a: "No! We work with students at all stages — from choosing their first domain in Year 1 to transitioning careers mid-way. We also help working professionals looking to switch roles." },
  { q: "Is the first session free?", a: "Yes — the first 30-minute discovery call is completely free. Use it to understand how we can help you before committing to a full session." },
  { q: "How do I book a session?", a: "Click 'Book Free Session' below, fill out a short form, and our team will confirm your preferred slot within 24 hours." },
];

const CareerCounselling = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-[#060b14] font-sans text-white overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-8 min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1920&q=80"
            alt="Career Counselling" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060b14]/60 to-[#060b14]" />
        </div>
        <div className="absolute top-10 right-0 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-8">
              <MessageSquare size={14} className="text-amber-400" />
              <span className="text-amber-300 text-sm font-bold tracking-widest uppercase">1-on-1 Career Guidance</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6">
              Clarity for Your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500">Career Journey</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-slate-300 leading-relaxed mb-10 max-w-xl">
              Don't navigate your career alone. Our certified counselors help you choose the right path, build the right skills, and land the right role — faster.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex gap-4 flex-wrap">
              <Link to="/contact" className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-10 py-4 rounded-xl shadow-[0_10px_30px_rgba(245,158,11,0.3)] flex items-center gap-2">
                <span className="relative z-10 flex items-center gap-2">Book Free Session <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
              <a href="#services" className="bg-slate-800/60 backdrop-blur-md border border-slate-700 text-white font-bold px-10 py-4 rounded-xl hover:-translate-y-1 hover:bg-slate-700/60 transition-all">
                Explore Services
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={fadeInUp} className="flex gap-6 mt-10 flex-wrap">
              {[["7,000+", "Sessions Completed"], ["4.9/5", "Avg Rating"], ["Free", "First Call"]].map(([v, l], i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">{v}</span>
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{l}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={slideInRight} className="hidden lg:block relative">
            <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.5)] group">
              <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
                alt="Counseling Session" className="w-full h-[540px] object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060b14]/60 to-transparent" />
            </div>
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -bottom-6 -left-8 bg-slate-900/90 backdrop-blur-xl border border-amber-500/30 px-6 py-4 rounded-2xl shadow-2xl">
              <div className="flex items-center gap-3">
                <Star size={18} className="text-amber-400 fill-amber-400" />
                <div>
                  <p className="text-white font-bold">4.9/5 Average Rating</p>
                  <p className="text-slate-400 text-sm">from 7,000+ sessions</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section id="services" className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-14">
            <motion.span variants={fadeInUp} className="text-amber-400 font-bold tracking-widest uppercase text-sm mb-4 block">What We Offer</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Our Counseling <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Services</span>
            </motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div key={i} variants={fadeInUp}
                whileHover={{ y: -8, boxShadow: `0 25px 50px ${s.glow}` }}
                className="group relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 p-8 rounded-3xl overflow-hidden cursor-default transition-all duration-400"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <s.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{s.desc}</p>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── COUNSELORS ───────────────────────────────────── */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-14">
            <motion.span variants={fadeInUp} className="text-violet-400 font-bold tracking-widest uppercase text-sm mb-4 block">Meet Your Mentors</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-white">
              Expert <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-sky-400">Counselors</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {counselors.map((c, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12, type: "spring", stiffness: 80 }}
                whileHover={{ y: -8, boxShadow: "0 25px 50px rgba(0,0,0,0.5)" }}
                className="group bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-[2rem] p-8 text-center overflow-hidden relative cursor-default transition-all duration-400"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative mb-6">
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity animate-pulse" />
                  <img src={c.img} alt={c.name} className="relative w-28 h-28 rounded-full object-cover mx-auto border-4 border-slate-700 group-hover:border-amber-500/50 transition-colors" />
                </div>
                <h3 className="text-white font-extrabold text-xl mb-1">{c.name}</h3>
                <p className="text-amber-400 font-semibold text-sm mb-1">{c.title}</p>
                <p className="text-slate-500 text-xs mb-4">{c.speciality}</p>
                <div className="flex justify-center gap-4 text-sm border-t border-white/5 pt-4 mb-5">
                  <div className="text-center">
                    <div className="text-white font-bold">{c.exp}</div>
                    <div className="text-slate-500 text-xs">Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-bold">{c.sessions}</div>
                    <div className="text-slate-500 text-xs">Sessions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-amber-400 font-bold flex items-center gap-1"><Star size={12} fill="currentColor" />{c.rating}</div>
                    <div className="text-slate-500 text-xs">Rating</div>
                  </div>
                </div>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-all relative z-10">
                  Book Session
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQS ─────────────────────────────────────────── */}
      <section className="py-20 px-8 pb-24">
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-12">
            <motion.h2 variants={fadeInUp} className="text-4xl font-extrabold text-white">Common <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Questions</span></motion.h2>
          </motion.div>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openFaq === i ? 'border-amber-500/50 bg-slate-800/60' : 'border-slate-700/60 bg-slate-800/30 hover:border-slate-600'}`}
              >
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left">
                  <span className={`font-semibold text-base ${openFaq === i ? 'text-amber-400' : 'text-white'}`}>{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }}
                    className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${openFaq === i ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700/60 text-slate-400'}`}>
                    <ChevronDown size={18} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
                      <div className="px-6 pb-6 border-t border-white/5 pt-4">
                        <p className="text-slate-300 leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerCounselling;
