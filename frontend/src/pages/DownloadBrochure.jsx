import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Download, BookOpen, Award, CheckCircle, Cpu, GraduationCap, Briefcase, Users, FileText, Mail, Phone, ArrowRight, Star, Sparkles } from 'lucide-react';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight, scaleUp } from '../utils/animations';

const brochures = [
  {
    id: 1,
    title: 'UG Programs Brochure',
    subtitle: 'B.Tech, BCA, BBA-IT & More',
    desc: 'Comprehensive guide to all undergraduate programs, curriculum, eligibility, and fee structure.',
    pages: '32 Pages',
    size: '4.2 MB',
    icon: GraduationCap,
    color: 'from-sky-500 to-blue-600',
    glow: 'rgba(14,165,233,0.3)',
    img: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    title: 'PG Programs Brochure',
    subtitle: 'MCA, MBA-IT, M.Tech & More',
    desc: 'Detailed information on all postgraduate programs, research opportunities, and placements.',
    pages: '28 Pages',
    size: '3.8 MB',
    icon: Award,
    color: 'from-violet-500 to-purple-600',
    glow: 'rgba(124,58,237,0.3)',
    img: 'https://images.unsplash.com/photo-1530099486328-e021101a494a?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    title: 'Professional Certifications',
    subtitle: 'AI, Cloud, Cyber Security & More',
    desc: 'Industry-aligned certification programs recognized by top tech companies worldwide.',
    pages: '24 Pages',
    size: '3.2 MB',
    icon: Cpu,
    color: 'from-emerald-500 to-teal-600',
    glow: 'rgba(16,185,129,0.3)',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    title: 'Campus & Labs Overview',
    subtitle: 'Facilities, Labs & Infrastructure',
    desc: 'A visual walkthrough of our state-of-the-art campus, labs, and student facilities.',
    pages: '20 Pages',
    size: '6.1 MB',
    icon: BookOpen,
    color: 'from-amber-500 to-orange-600',
    glow: 'rgba(245,158,11,0.3)',
    img: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    title: 'Corporate Training Programs',
    subtitle: 'B2B Upskilling & FDP Solutions',
    desc: 'Custom corporate training packages for companies and faculty development programs for colleges.',
    pages: '18 Pages',
    size: '2.9 MB',
    icon: Briefcase,
    color: 'from-rose-500 to-pink-600',
    glow: 'rgba(244,63,94,0.3)',
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 6,
    title: 'Placement Report 2024-25',
    subtitle: 'Packages, Companies & Alumni Stories',
    desc: 'Our annual placement report with stats, highest packages, recruiting companies, and alumni journeys.',
    pages: '40 Pages',
    size: '5.5 MB',
    icon: Users,
    color: 'from-cyan-500 to-sky-600',
    glow: 'rgba(6,182,212,0.3)',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
  },
];

const highlights = [
  { v: '6+', l: 'Brochures Available' },
  { v: '200+', l: 'Pages of Content' },
  { v: 'Free', l: 'No Cost Downloads' },
  { v: '2026', l: 'Latest Edition' },
];

const DownloadBrochure = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && name) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#060b14] font-sans text-white overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-8 overflow-hidden">
        {/* BG */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1920&q=80"
            alt="Download Brochure Background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060b14]/70 to-[#060b14]" />
        </div>
        {/* Glows */}
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-sky-600/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-violet-600/15 rounded-full blur-[110px] pointer-events-none" />
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 text-amber-400 font-bold tracking-widest uppercase text-sm mb-6">
              <FileText size={16} /> Resources & Downloads
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
              Download Our<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-sky-400 to-indigo-500">
                Free Brochures
              </span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-slate-300 leading-relaxed mb-10 max-w-xl">
              Access detailed guides on all our programs, campus facilities, placement stats, and corporate training packages — completely free.
            </motion.p>

            {/* Quick Stats */}
            <motion.div variants={fadeInUp} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {highlights.map((h, i) => (
                <div key={i} className="bg-slate-800/50 backdrop-blur-md border border-slate-700/60 p-4 rounded-2xl text-center">
                  <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-sky-400 mb-1">{h.v}</div>
                  <div className="text-slate-400 text-xs font-medium">{h.l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Email Capture Card */}
          <motion.div initial="hidden" animate="visible" variants={slideInRight}>
            {!submitted ? (
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/60 p-10 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-sky-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Sparkles size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Get Instant Access</h3>
                    <p className="text-slate-400 text-sm">Enter details to unlock all brochures</p>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="bg-slate-900/70 border border-slate-700 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-sky-500 transition-colors placeholder-slate-500 text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="bg-slate-900/70 border border-slate-700 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-sky-500 transition-colors placeholder-slate-500 text-sm"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number (optional)"
                    className="bg-slate-900/70 border border-slate-700 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-sky-500 transition-colors placeholder-slate-500 text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-amber-500 to-sky-500 text-white font-bold py-4 rounded-xl hover:-translate-y-0.5 transition-all shadow-[0_10px_30px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2 mt-2"
                  >
                    <Download size={18} /> Unlock All Brochures
                  </button>
                  <p className="text-slate-500 text-xs text-center">No spam. Unsubscribe at any time.</p>
                </form>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-slate-800/50 backdrop-blur-xl border border-emerald-500/30 p-10 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.4)] text-center"
              >
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-emerald-400" />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-3">You're All Set!</h3>
                <p className="text-slate-400 mb-6">All brochures are now unlocked. Click any card below to download.</p>
                <div className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-4">
                  <Mail size={15} /> Sent a copy to <span className="text-white font-bold ml-1">{email}</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── BROCHURE CARDS ──────────────────────────────── */}
      <section className="py-16 px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer} className="mb-14 text-center">
            <motion.span variants={fadeInUp} className="text-sky-400 font-bold tracking-widest uppercase text-sm mb-4 block">All Resources</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Download</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 text-lg max-w-xl mx-auto">Each brochure is carefully curated with the most up-to-date information for the 2025-26 session.</motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {brochures.map((b) => (
              <motion.div
                key={b.id}
                variants={scaleUp}
                onMouseEnter={() => setHoveredId(b.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-[1.75rem] overflow-hidden hover:-translate-y-2 hover:border-slate-600 transition-all duration-500"
                style={{ boxShadow: hoveredId === b.id ? `0 20px 50px ${b.glow}` : 'none' }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img src={b.img} alt={b.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                  <div className={`absolute top-4 right-4 bg-gradient-to-br ${b.color} w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <b.icon size={20} className="text-white" />
                  </div>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/10">{b.pages}</span>
                    <span className="bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/10">{b.size}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-sky-400 transition-all duration-300">
                    {b.title}
                  </h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">{b.subtitle}</p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{b.desc}</p>

                  <button
                    className={`w-full bg-gradient-to-r ${b.color} text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:-translate-y-0.5`}
                    style={{ boxShadow: `0 8px 20px ${b.glow}` }}
                  >
                    <Download size={16} />
                    {submitted ? 'Download Now' : 'Unlock to Download'}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BOTTOM CTA ──────────────────────────────────── */}
      <section className="py-20 px-8 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-[#060b14] to-sky-900/20" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Need a Custom Brochure<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-sky-400">for Your Institution?</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 text-xl mb-10">
              We create bespoke program documentation and proposals for colleges, universities, and corporate partners.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-gradient-to-r from-amber-500 to-sky-500 text-white px-10 py-4 rounded-xl font-bold hover:-translate-y-1 transition-all shadow-[0_10px_30px_rgba(245,158,11,0.3)] flex items-center gap-2 justify-center">
                Request Custom Material <ArrowRight size={18} />
              </Link>
              <a href="tel:+919876543210" className="bg-slate-800 border border-slate-700 text-white px-10 py-4 rounded-xl font-bold hover:-translate-y-1 hover:bg-slate-700 transition-all flex items-center gap-2 justify-center">
                <Phone size={18} /> Call Us Directly
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DownloadBrochure;
