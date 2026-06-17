import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, TrendingUp, Award, BookOpen, Briefcase, Code, Star, ChevronRight, Building2, GraduationCap, Cpu } from 'lucide-react';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight, scaleUp } from '../utils/animations';

const caseStudies = [
  {
    id: 1,
    category: 'Corporate Training',
    tag: 'AI & ML',
    tagColor: 'from-violet-500 to-purple-600',
    client: 'TechCorp India',
    title: 'Training 500+ Engineers in Advanced AI Techniques',
    result: '40% productivity boost in 90 days',
    desc: 'TechCorp India partnered with us to upskill their entire engineering division in Machine Learning and AI. Through a customised 12-week intensive bootcamp, we transformed their team from basic Python users to confident ML practitioners.',
    stats: [{ v: '500+', l: 'Employees Trained' }, { v: '90', l: 'Days Duration' }, { v: '40%', l: 'Productivity Gain' }],
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80',
    icon: Cpu,
    featured: true,
  },
  {
    id: 2,
    category: 'Alumni Journey',
    tag: 'Full Stack',
    tagColor: 'from-sky-500 to-blue-600',
    client: 'Priya Sharma',
    title: 'From Fresher to Senior Dev at Google in 2 Years',
    result: '₹42 LPA package secured',
    desc: 'Priya enrolled in our Full Stack Web Development program with zero coding experience. After 6 months of intensive training with live projects, she cracked interviews at 3 FAANG companies.',
    stats: [{ v: '6', l: 'Months Program' }, { v: '₹42L', l: 'Annual Package' }, { v: '3', l: 'FAANG Offers' }],
    img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80',
    icon: Code,
    featured: false,
  },
  {
    id: 3,
    category: 'College Partnership',
    tag: 'Managed Campus',
    tagColor: 'from-emerald-500 to-teal-600',
    client: 'GLS University',
    title: 'Transforming GLS University Placement Rate to 94%',
    result: '3× improvement in placements',
    desc: 'GLS University collaborated with us on our Managed Campus program. We revamped their curriculum, set up industry labs, and launched aggressive placement drives resulting in record-breaking placement stats.',
    stats: [{ v: '94%', l: 'Placement Rate' }, { v: '150+', l: 'Hiring Companies' }, { v: '3×', l: 'Improvement' }],
    img: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80',
    icon: Building2,
    featured: false,
  },
  {
    id: 4,
    category: 'Bootcamp Success',
    tag: 'Data Science',
    tagColor: 'from-amber-500 to-orange-600',
    client: 'Rahul Mehta',
    title: 'Career Switcher Lands Data Scientist Role at Amazon',
    result: '280% salary increase in 8 months',
    desc: 'Rahul was a mechanical engineer who wanted to switch careers. Our Data Science bootcamp, combined with project mentorship and placement support, helped him land a role as Data Scientist at Amazon.',
    stats: [{ v: '8', l: 'Months Journey' }, { v: '280%', l: 'Salary Hike' }, { v: '1st', l: 'Interview Cracked' }],
    img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80',
    icon: TrendingUp,
    featured: false,
  },
  {
    id: 5,
    category: 'Faculty Development',
    tag: 'FDP Program',
    tagColor: 'from-rose-500 to-pink-600',
    client: 'GTU Affiliated Colleges',
    title: 'Upskilling 300 Faculty Members Across Gujarat',
    result: 'Improved student outcomes by 60%',
    desc: 'We ran a comprehensive Faculty Development Program for GTU affiliated colleges, focusing on modern pedagogy, AI tools, and research methodology. Faculty went back to their classrooms equipped with 21st-century teaching skills.',
    stats: [{ v: '300+', l: 'Faculty Trained' }, { v: '45', l: 'Colleges Covered' }, { v: '60%', l: 'Better Outcomes' }],
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80',
    icon: GraduationCap,
    featured: false,
  },
  {
    id: 6,
    category: 'Internship Program',
    tag: 'Placement Support',
    tagColor: 'from-cyan-500 to-sky-600',
    client: 'IT Department, ABC College',
    title: '100% Internship Placement for a 200-Student Batch',
    result: 'All students placed before graduation',
    desc: 'Through our Corporate Connect program, we partnered with 80+ companies to create guaranteed internship opportunities for an entire graduating batch, giving every student valuable industry exposure.',
    stats: [{ v: '100%', l: 'Placed' }, { v: '200', l: 'Students' }, { v: '80+', l: 'Companies' }],
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
    icon: Briefcase,
    featured: false,
  },
];

const categories = ['All', 'Corporate Training', 'Alumni Journey', 'College Partnership', 'Bootcamp Success', 'Faculty Development', 'Internship Program'];

const CaseStudies = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const filtered = activeCategory === 'All' ? caseStudies : caseStudies.filter(c => c.category === activeCategory);
  const featured = caseStudies.find(c => c.featured);

  return (
    <div className="min-h-screen bg-[#060b14] font-sans text-white overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-8 overflow-hidden min-h-[70vh] flex items-center">
        {/* BG */}
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80"
            alt="Case Studies Background" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060b14]/60 via-[#060b14]/70 to-[#060b14]" />
        </div>
        {/* Blobs */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-sky-600/15 rounded-full blur-[100px] pointer-events-none" />
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 text-amber-400 font-bold tracking-widest uppercase text-sm mb-6">
              <span className="w-8 h-px bg-amber-400" />
              Real Impact Stories
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6">
              Transforming<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-sky-400 to-indigo-500">
                Lives & Careers
              </span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-slate-300 leading-relaxed mb-10 max-w-xl">
              Discover real stories of students, colleges, and corporates who have achieved extraordinary results through our programs.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex gap-4 flex-wrap">
              <a href="#case-cards" className="bg-gradient-to-r from-violet-500 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:-translate-y-1 transition-all shadow-[0_0_30px_rgba(124,58,237,0.4)]">
                Explore Stories
              </a>
              <Link to="/contact" className="bg-slate-800/60 backdrop-blur-md border border-slate-700 text-white px-8 py-4 rounded-xl font-bold hover:-translate-y-1 hover:bg-slate-700 transition-all">
                Partner With Us
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Panel */}
          <motion.div initial="hidden" animate="visible" variants={slideInRight} className="hidden lg:grid grid-cols-2 gap-5">
            {[
              { v: '5,000+', l: 'Lives Transformed', icon: Users, c: 'from-violet-500 to-purple-600' },
              { v: '94%', l: 'Avg Placement Rate', icon: TrendingUp, c: 'from-sky-500 to-blue-600' },
              { v: '150+', l: 'Corporate Partners', icon: Building2, c: 'from-emerald-500 to-teal-600' },
              { v: '₹42L', l: 'Highest Package', icon: Award, c: 'from-amber-500 to-orange-600' },
            ].map((s, i) => (
              <motion.div
                key={i}
                variants={scaleUp}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/60 p-6 rounded-3xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.c} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <s.icon size={22} className="text-white" />
                </div>
                <div className={`text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${s.c} mb-1`}>{s.v}</div>
                <div className="text-slate-400 text-sm font-medium">{s.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED CASE STUDY ─────────────────────────── */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="mb-8"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-2">
              <Star size={16} className="text-amber-400 fill-amber-400" />
              <span className="text-amber-400 font-bold text-sm tracking-widest uppercase">Featured Story</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            variants={slideInLeft}
            className="group rounded-[2rem] overflow-hidden border border-white/10 bg-slate-800/30 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] grid grid-cols-1 lg:grid-cols-2"
          >
            <div className="relative overflow-hidden h-64 lg:h-auto min-h-[340px]">
              <img src={featured.img} alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/80 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent lg:hidden" />
              <div className={`absolute top-6 left-6 bg-gradient-to-r ${featured.tagColor} text-white text-xs font-bold px-4 py-1.5 rounded-full`}>
                {featured.tag}
              </div>
            </div>
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <span className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-3">{featured.category}</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-snug">{featured.title}</h2>
              <p className="text-slate-400 leading-relaxed mb-6 text-base">{featured.desc}</p>
              <div className="flex gap-8 mb-8 border-t border-white/10 pt-6">
                {featured.stats.map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-sky-400">{s.v}</div>
                    <div className="text-slate-400 text-xs font-medium mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="inline-flex items-center gap-2 text-violet-400 font-bold hover:text-violet-300 cursor-pointer group-inner transition-colors">
                Read Full Story <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FILTER TABS ─────────────────────────────────── */}
      <section id="case-cards" className="pt-8 pb-4 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeCategory === cat
                  ? 'bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)]'
                  : 'bg-slate-800/60 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDY CARDS ────────────────────────────── */}
      <section className="py-10 px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filtered.filter(c => !c.featured).map((cs) => (
                <motion.div
                  key={cs.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-[1.75rem] overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:border-slate-600 transition-all duration-500 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === cs.id ? null : cs.id)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={cs.img} alt={cs.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                    <div className={`absolute top-4 left-4 bg-gradient-to-r ${cs.tagColor} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
                      {cs.tag}
                    </div>
                  </div>
                  <div className="p-7">
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3 block">{cs.category}</span>
                    <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-sky-400 transition-all duration-300">
                      {cs.title}
                    </h3>
                    <p className="text-amber-400 font-semibold text-sm mb-4 flex items-center gap-2">
                      <TrendingUp size={14} /> {cs.result}
                    </p>

                    <AnimatePresence>
                      {expandedId === cs.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-slate-400 text-sm leading-relaxed mb-5">{cs.desc}</p>
                          <div className="flex gap-4 border-t border-white/10 pt-4">
                            {cs.stats.map((s, i) => (
                              <div key={i} className="text-center">
                                <div className="text-lg font-extrabold text-white">{s.v}</div>
                                <div className="text-slate-500 text-xs mt-0.5">{s.l}</div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button className="text-violet-400 text-sm font-bold flex items-center gap-1 mt-3 hover:text-violet-300 transition-colors">
                      {expandedId === cs.id ? 'Show Less' : 'Read More'} <ChevronRight size={15} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="py-20 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-[#060b14] to-indigo-900/30" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Want to Be Our<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-sky-400">Next Success Story?</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 text-xl mb-10">
              Join thousands of students and institutions who have transformed their future with us.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/courses" className="bg-gradient-to-r from-violet-500 to-indigo-600 text-white px-10 py-4 rounded-xl font-bold hover:-translate-y-1 transition-all shadow-[0_10px_30px_rgba(124,58,237,0.3)]">
                Explore Programs
              </Link>
              <Link to="/contact" className="bg-slate-800 border border-slate-700 text-white px-10 py-4 rounded-xl font-bold hover:-translate-y-1 hover:bg-slate-700 transition-all">
                Book Free Counseling
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
