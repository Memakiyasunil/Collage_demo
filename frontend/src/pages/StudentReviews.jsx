import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeInUp, slideInLeft, slideInRight, scaleUp } from '../utils/animations';
import { Star, Quote, Building2, Filter, ChevronLeft, ChevronRight, Users, Award, TrendingUp } from 'lucide-react';

const reviews = [
  {
    id: 1, name: "Vikram Malhotra", course: "B.Tech Computer Science", company: "Google India",
    image: "https://i.pravatar.cc/200?img=11", pkg: "₹42 LPA", rating: 5, category: "FAANG",
    text: "The curriculum here is perfectly aligned with industry standards. The placement cell conducted mock interviews that exactly matched what Google asked. From Day 1 at Google, I felt completely prepared.",
    featured: true,
  },
  {
    id: 2, name: "Anjali Desai", course: "MCA Specialization", company: "Microsoft",
    image: "https://i.pravatar.cc/200?img=5", pkg: "₹28 LPA", rating: 5, category: "FAANG",
    text: "I was skeptical about finding a product-based company role off-campus. Edufordge's corporate connect program made it possible. The mentors are incredibly supportive and genuinely invested in your growth.",
    featured: false,
  },
  {
    id: 3, name: "Karan Singh", course: "Full Stack Bootcamp", company: "Zomato",
    image: "https://i.pravatar.cc/200?img=33", pkg: "₹18 LPA", rating: 5, category: "Startup",
    text: "Intensive, rigorous, and completely worth every rupee. From knowing zero React to building production-grade apps in 4 months. The instructors push you to your limits in the best way possible.",
    featured: false,
  },
  {
    id: 4, name: "Priya Sharma", course: "Cyber Security", company: "Palo Alto Networks",
    image: "https://i.pravatar.cc/200?img=9", pkg: "₹32 LPA", rating: 5, category: "FAANG",
    text: "The hands-on labs and ethical hacking challenges gave me the practical exposure that textbooks simply can't. The CTF competitions kept us sharp. Best learning experience of my life, hands down.",
    featured: false,
  },
  {
    id: 5, name: "Rahul Verma", course: "B.Tech IT", company: "TCS Digital",
    image: "https://i.pravatar.cc/200?img=60", pkg: "₹12 LPA", rating: 4, category: "IT Services",
    text: "Great faculty and an amazing campus environment. The technical fests and hackathons really helped build my resume and network. I walked into my TCS Digital interview with confidence.",
    featured: false,
  },
  {
    id: 6, name: "Sneha Reddy", course: "Data Science Masters", company: "Amazon",
    image: "https://i.pravatar.cc/200?img=20", pkg: "₹26 LPA", rating: 5, category: "FAANG",
    text: "The transition from academics to corporate was seamless thanks to the intensive interview prep. The Data Science curriculum is cutting-edge, and the project work directly reflects real Amazon problems.",
    featured: false,
  },
];

const filterOptions = ['All', 'FAANG', 'Startup', 'IT Services'];

const overallStats = [
  { v: "4.9/5", l: "Average Rating", icon: Star, color: "from-amber-400 to-orange-500" },
  { v: "500+", l: "Reviews Collected", icon: Users, color: "from-sky-400 to-blue-500" },
  { v: "₹42L", l: "Highest Package", icon: TrendingUp, color: "from-emerald-400 to-teal-500" },
  { v: "100%", l: "Would Recommend", icon: Award, color: "from-violet-400 to-indigo-500" },
];

const StudentReviews = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [featuredIdx, setFeaturedIdx] = useState(0);

  const filtered = activeFilter === 'All' ? reviews : reviews.filter(r => r.category === activeFilter);
  const featured = reviews[featuredIdx];

  return (
    <div className="min-h-screen bg-[#060b14] font-sans overflow-hidden text-white">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1920&q=80"
            alt="Student Reviews" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060b14]/70 to-[#060b14]" />
        </div>
        <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-8">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              <span className="text-amber-300 text-sm font-bold tracking-widest uppercase">Verified Student Reviews</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6">
              Don't Just Take<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500">
                Our Word For It
              </span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Authentic stories from students who transformed their careers. Real reviews, real results.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── OVERALL STATS ────────────────────────────────── */}
      <section className="py-10 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {overallStats.map((s, i) => (
              <motion.div
                key={i}
                variants={scaleUp}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
                className="group relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 p-6 rounded-3xl text-center overflow-hidden cursor-default transition-all duration-400"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <s.icon size={20} className="text-white" />
                </div>
                <div className={`text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${s.color} mb-1`}>{s.v}</div>
                <p className="text-slate-400 text-sm font-medium">{s.l}</p>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED SPOTLIGHT ───────────────────────────── */}
      <section className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-amber-400 font-bold tracking-widest uppercase text-sm mb-1">Spotlight</p>
              <h2 className="text-3xl font-extrabold text-white">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Review</span></h2>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                onClick={() => setFeaturedIdx(i => (i - 1 + reviews.length) % reviews.length)}
                className="w-11 h-11 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-colors"
              ><ChevronLeft size={18} /></motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                onClick={() => setFeaturedIdx(i => (i + 1) % reviews.length)}
                className="w-11 h-11 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-colors"
              ><ChevronRight size={18} /></motion.button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={featuredIdx}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35 }}
              className="group bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-4 gap-10 items-center hover:border-amber-500/20 transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            >
              <div className="flex flex-col items-center text-center lg:col-span-1">
                <div className="relative mb-4">
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity animate-pulse" />
                  <img src={featured.image} alt={featured.name}
                    className="relative w-28 h-28 rounded-full object-cover border-4 border-amber-500/40 group-hover:border-amber-500/70 transition-colors" />
                </div>
                <h4 className="text-white font-extrabold text-xl mb-1">{featured.name}</h4>
                <p className="text-amber-400 font-semibold text-sm mb-1">{featured.course}</p>
                <div className="flex items-center gap-2 text-sm bg-slate-700/50 px-3 py-1.5 rounded-full border border-slate-600 mt-2">
                  <Building2 size={13} className="text-emerald-400" />
                  <span className="text-emerald-300 font-bold">{featured.company}</span>
                </div>
                <div className="mt-3 text-emerald-400 font-extrabold text-xl">{featured.pkg}</div>
              </div>

              <div className="lg:col-span-3">
                <div className="relative">
                  <Quote size={64} className="absolute -top-4 -left-4 text-amber-500/10 group-hover:text-amber-500/20 transition-colors" />
                  <div className="flex gap-1 text-amber-400 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} fill={i < featured.rating ? "currentColor" : "none"} className={i >= featured.rating ? "text-slate-600" : ""} />
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl text-slate-200 leading-relaxed font-medium italic relative z-10">
                    "{featured.text}"
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── FILTER & GRID ────────────────────────────────── */}
      <section className="py-12 px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="text-sky-400 font-bold tracking-widest uppercase text-sm mb-1">All Reviews</p>
              <h2 className="text-3xl font-extrabold text-white">What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Alumni Say</span></h2>
            </div>
            <div className="flex gap-3 flex-wrap">
              {filterOptions.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeFilter === f
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-[0_0_20px_rgba(14,165,233,0.3)]'
                    : 'bg-slate-800/60 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'}`}
                >
                  {f === 'All' && <Filter size={14} />}
                  {f}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((review, idx) => (
                <motion.div
                  key={review.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  whileHover={{ y: -8, boxShadow: "0 25px 50px rgba(0,0,0,0.4)" }}
                  className="group relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-[1.75rem] p-8 overflow-hidden cursor-default transition-all duration-400 hover:border-amber-500/30"
                >
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                  <div className="absolute top-6 right-7">
                    <Quote size={40} className="text-slate-700 group-hover:text-amber-500/20 transition-colors duration-500" />
                  </div>

                  <div className="flex gap-1 mb-5 text-amber-400 relative z-10">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-slate-600" : ""} />
                    ))}
                    <span className={`ml-2 text-xs font-bold px-2 py-0.5 rounded-full ${
                      review.category === 'FAANG' ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' :
                        review.category === 'Startup' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' :
                          'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>{review.category}</span>
                  </div>

                  <p className="text-slate-300 leading-relaxed mb-6 relative z-10 text-[0.95rem]">
                    "{review.text}"
                  </p>

                  <div className="flex items-center gap-4 mt-auto pt-5 border-t border-white/5 relative z-10">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-20 blur-sm transition-opacity" />
                      <img src={review.image} alt={review.name}
                        className="relative w-12 h-12 rounded-full object-cover border-2 border-slate-700 group-hover:border-amber-500/50 transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-sm">{review.name}</h4>
                      <p className="text-slate-500 text-xs mb-1">{review.course}</p>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 inline-flex w-fit">
                        <Building2 size={11} /> {review.company}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-400 font-extrabold text-sm">{review.pkg}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default StudentReviews;
