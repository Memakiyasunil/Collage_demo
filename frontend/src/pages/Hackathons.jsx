import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp, slideInLeft, slideInRight, scaleUp } from '../utils/animations';
import { Code2, Trophy, Clock, Users, ArrowRight, Zap, Star, Calendar, Gift, ChevronRight, Flame } from 'lucide-react';

const hackathons = [
  {
    id: 1,
    title: "Global AI Challenge 2026",
    date: "Aug 15 – 17, 2026",
    prize: "₹5,00,000",
    participants: "1,200+",
    status: "Upcoming",
    statusColor: "from-sky-500 to-blue-600",
    theme: "Artificial Intelligence & ML",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80",
    gradient: "from-sky-900/40 to-blue-900/40",
    glow: "rgba(14,165,233,0.25)",
    accentBorder: "border-sky-500/40",
    perks: ["Industry Mentors", "Live Demo Day", "Job Fast-track"],
  },
  {
    id: 2,
    title: "Web3 Innovate Fest",
    date: "Sep 05 – 06, 2026",
    prize: "₹3,00,000",
    participants: "800+",
    status: "Registration Open",
    statusColor: "from-fuchsia-500 to-purple-600",
    theme: "Blockchain & Decentralisation",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80",
    gradient: "from-fuchsia-900/40 to-purple-900/40",
    glow: "rgba(192,38,211,0.25)",
    accentBorder: "border-fuchsia-500/40",
    perks: ["VC Networking", "Global Judges", "Internship Offers"],
  },
  {
    id: 3,
    title: "FinTech Appathon",
    date: "Oct 10 – 12, 2026",
    prize: "₹4,50,000",
    participants: "1,500+",
    status: "Upcoming",
    statusColor: "from-emerald-500 to-teal-600",
    theme: "Financial Technology",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    gradient: "from-emerald-900/40 to-teal-900/40",
    glow: "rgba(16,185,129,0.25)",
    accentBorder: "border-emerald-500/40",
    perks: ["NBFC Sponsorship", "Real Dataset Access", "₹4.5L in Prizes"],
  },
];

const pastWinners = [
  { team: "Code Ninjas", project: "AI Health Monitor", award: "1st — Global AI Challenge", img: "https://i.pravatar.cc/100?img=11" },
  { team: "Byte Busters", project: "DeFi Wallet", award: "2nd — Web3 Fest", img: "https://i.pravatar.cc/100?img=5" },
  { team: "Null Pointers", project: "Smart City Traffic", award: "1st — Smart City Hack", img: "https://i.pravatar.cc/100?img=33" },
];

const whyJoin = [
  { icon: Trophy, title: "₹15L+ in Prizes", desc: "Compete for massive cash rewards and sponsored goodies every season.", color: "from-amber-500 to-orange-500" },
  { icon: Users, title: "Network with Peers", desc: "Collaborate with the brightest minds from top colleges across India.", color: "from-sky-500 to-blue-600" },
  { icon: Flame, title: "Get Hired Fast", desc: "Top performers get direct referrals and fast-track interviews at our partner companies.", color: "from-rose-500 to-pink-600" },
  { icon: Code2, title: "Build Real Projects", desc: "Create production-grade solutions that you can showcase in your portfolio.", color: "from-violet-500 to-indigo-600" },
];

const Hackathons = () => {
  return (
    <div className="min-h-screen bg-[#060b14] font-sans overflow-hidden text-white">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-8 min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80"
            alt="Hackathon" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060b14]/60 to-[#060b14]" />
        </div>
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-fuchsia-600/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 mb-8">
              <Zap size={14} className="text-fuchsia-400" />
              <span className="text-fuchsia-300 text-sm font-bold tracking-widest uppercase">Code. Compete. Conquer.</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6 tracking-tight">
              Unleash Your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-500">
                Inner Hacker
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-slate-300 leading-relaxed mb-10 max-w-xl">
              Solve real-world problems, win massive prizes, and get spotted by top tech companies looking for exceptional talent.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex gap-4 flex-wrap">
              <button className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-bold px-10 py-4 rounded-xl hover:-translate-y-1 transition-all shadow-[0_10px_30px_rgba(6,182,212,0.3)]">
                <span className="relative z-10 flex items-center gap-2">Register Now <Zap size={18} className="group-hover:rotate-12 transition-transform" /></span>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>
              <button className="bg-slate-800/60 backdrop-blur-md border border-slate-700 text-white font-bold px-10 py-4 rounded-xl hover:-translate-y-1 hover:bg-slate-700/60 transition-all">
                View Past Events
              </button>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={slideInRight} className="hidden lg:block relative">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.5)] group">
              <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"
                alt="Hackathon Team" className="w-full h-[540px] object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060b14]/60 to-transparent" />
            </div>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-8 bg-slate-900/90 backdrop-blur-xl border border-fuchsia-500/30 px-6 py-4 rounded-2xl shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <Trophy size={20} className="text-amber-400" />
                <div>
                  <p className="text-white font-bold">₹15L+ in Prizes</p>
                  <p className="text-slate-400 text-sm">This Season</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── WHY JOIN ─────────────────────────────────────── */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {whyJoin.map((item, i) => (
              <motion.div key={i} variants={scaleUp}
                className="group relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 p-7 rounded-3xl hover:-translate-y-2 hover:border-slate-500 transition-all duration-400 overflow-hidden cursor-default"
                whileHover={{ boxShadow: "0 20px 50px rgba(0,0,0,0.4)" }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <item.icon size={24} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── UPCOMING HACKATHONS ──────────────────────────── */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-14">
            <motion.span variants={fadeInUp} className="text-fuchsia-400 font-bold tracking-widest uppercase text-sm mb-4 block">Events Calendar</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">Hackathons</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 text-xl max-w-2xl mx-auto">Mark your calendars. The next big challenge is just around the corner.</motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hackathons.map((hack, i) => (
              <motion.div
                key={hack.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, type: "spring", stiffness: 80 }}
                whileHover={{ y: -8, boxShadow: `0 25px 60px ${hack.glow}` }}
                className={`group bg-slate-800/40 backdrop-blur-xl border ${hack.accentBorder} rounded-[2rem] overflow-hidden transition-all duration-500 cursor-pointer`}
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={hack.image} alt={hack.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${hack.gradient}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  <span className={`absolute top-4 left-4 bg-gradient-to-r ${hack.statusColor} text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg`}>
                    {hack.status}
                  </span>
                </div>
                <div className="p-8">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{hack.theme}</p>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-fuchsia-400 transition-all duration-300">
                    {hack.title}
                  </h3>

                  <div className="space-y-2.5 mb-6">
                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                      <Calendar size={15} className="text-slate-500" /> {hack.date}
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Trophy size={15} className="text-amber-400" />
                      <span className="font-bold text-amber-400">{hack.prize} Prize Pool</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                      <Users size={15} className="text-slate-500" /> {hack.participants} Registered
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {hack.perks.map((perk, j) => (
                      <span key={j} className="text-xs font-medium text-slate-300 bg-slate-700/60 px-3 py-1 rounded-full border border-slate-600">
                        {perk}
                      </span>
                    ))}
                  </div>

                  <button className={`w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r ${hack.statusColor} hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg flex items-center justify-center gap-2`}>
                    Register Now <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAST WINNERS ─────────────────────────────────── */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
              <motion.div variants={slideInLeft} className="lg:w-1/3">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-[0_10px_30px_rgba(245,158,11,0.3)]">
                  <Trophy size={32} className="text-white" />
                </div>
                <h3 className="text-3xl font-extrabold text-white mb-4">Hall of Fame</h3>
                <p className="text-slate-400 leading-relaxed">Celebrating the brilliant minds who conquered our toughest challenges.</p>
              </motion.div>
              <motion.div variants={slideInRight} className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-5">
                {pastWinners.map((w, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
                    className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl transition-all duration-300 cursor-default group"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <img src={w.img} alt={w.team} className="w-10 h-10 rounded-full object-cover border-2 border-amber-500/30" />
                      <div className="text-sky-400 font-bold">{w.team}</div>
                    </div>
                    <div className="text-white font-semibold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-fuchsia-400 transition-all">{w.project}</div>
                    <div className="text-slate-400 text-sm flex items-center gap-2">
                      <Star size={12} className="text-amber-400 fill-amber-400" /> {w.award}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Hackathons;
