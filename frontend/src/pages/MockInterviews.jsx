import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Mic, Video, Code, Database, Server, Users, Star, CheckCircle2,
  ArrowRight, ChevronDown, Zap, Target, Award, Clock, BookOpen,
  HelpCircle, MessageSquare, ChevronRight
} from 'lucide-react';
import { staggerContainer, fadeInUp, slideInLeft, slideInRight, scaleUp } from '../utils/animations';

const mockTypes = [
  { icon: Code, title: "Technical Mock Interview", desc: "1-hour live coding session with a practicing engineer from a top company. DSA problems, system design, and code review.", color: "from-sky-500 to-blue-600", glow: "rgba(14,165,233,0.3)", duration: "60 min", level: "All Levels" },
  { icon: MessageSquare, title: "HR & Behavioral Round", desc: "Simulated HR interview using STAR method. Covers 'Tell me about yourself', conflict resolution, leadership stories, and salary negotiation.", color: "from-violet-500 to-purple-600", glow: "rgba(139,92,246,0.3)", duration: "45 min", level: "All Levels" },
  { icon: Server, title: "System Design Interview", desc: "Advanced mock for senior/SDE-II candidates. Design distributed systems like Netflix, Uber, or WhatsApp with a principal engineer.", color: "from-amber-500 to-orange-500", glow: "rgba(245,158,11,0.3)", duration: "75 min", level: "Intermediate+" },
  { icon: Video, title: "Full Loop Simulation", desc: "5-round full interview simulation matching exactly what FAANG companies run — from phone screen to final on-site round.", color: "from-emerald-500 to-teal-600", glow: "rgba(16,185,129,0.3)", duration: "3 hrs", level: "FAANG Prep" },
];

const categories = [
  { id: 'dsa', name: 'DSA & Algorithms', icon: Code, color: 'from-sky-500 to-blue-600', glow: 'rgba(14,165,233,0.3)' },
  { id: 'system', name: 'System Design', icon: Server, color: 'from-amber-500 to-orange-500', glow: 'rgba(245,158,11,0.3)' },
  { id: 'hr', name: 'HR & Behavioral', icon: Users, color: 'from-violet-500 to-purple-600', glow: 'rgba(139,92,246,0.3)' },
  { id: 'database', name: 'Database / SQL', icon: Database, color: 'from-emerald-500 to-teal-600', glow: 'rgba(16,185,129,0.3)' },
];

const questionsData = {
  dsa: [
    { q: "Given an array of integers, find the two numbers that add up to a target. Return their indices.", a: "Use a hash map. For each element, check if (target - element) exists in the map. If yes, return both indices. Otherwise, add the element to the map. Time: O(n), Space: O(n). This is LeetCode #1 — Two Sum.", d: "Easy", tag: "Hash Map" },
    { q: "Reverse a linked list iteratively and recursively.", a: "Iteratively: Use three pointers (prev, curr, next). Traverse forward, reversing each link. Return prev. Recursively: Base case is null or single node. Reverse the rest, then point next.next = curr and curr.next = null. Both O(n).", d: "Easy", tag: "Linked List" },
    { q: "Find the longest substring without repeating characters.", a: "Sliding window with a hash set. Use left and right pointers. Expand right, add char to set. If duplicate, shrink left until no duplicate. Track max window size. O(n) time, O(min(n,m)) space.", d: "Medium", tag: "Sliding Window" },
  ],
  system: [
    { q: "Design a URL shortening service like bit.ly.", a: "Components: API layer, Base62 encoding service, Redis cache, SQL/NoSQL DB. Hash the original URL → Base62 encode → store mapping. Redirect: lookup short URL in cache first, then DB. Handle collision with retry. Scale: CDN for redirects, read replicas, rate limiting.", d: "Medium", tag: "System Design" },
    { q: "How would you design a real-time chat system like WhatsApp?", a: "Use WebSockets for real-time bidirectional communication. Message broker (Kafka) for reliability. Each user connects to a chat server. Messages stored in Cassandra for scale. Use consistent hashing for server assignment. Handle offline: push notifications + message queue.", d: "Hard", tag: "System Design" },
    { q: "Design a content delivery network (CDN).", a: "PoP servers at geographic locations. DNS-based routing directs users to nearest PoP. Cache popular assets with TTL. Cache invalidation: versioned URLs or purge API. Origin pull vs push. Handle cold start: first request pulls from origin, subsequent from cache.", d: "Hard", tag: "Distributed Systems" },
  ],
  hr: [
    { q: "Tell me about yourself.", a: "Structure: Current role/study → 2-3 relevant strengths → key achievement with numbers → why this role excites you. Keep it 90 seconds. Example: 'I'm a final-year CS student at XYZ. I specialise in backend development and have built 3 production APIs serving 10K users. I'm drawn to this role because of your distributed systems challenges...'", d: "Basic", tag: "Introduction" },
    { q: "Describe a time you failed. What did you learn?", a: "Use STAR. Choose a genuine failure — not a fake weakness. Show self-awareness, what you specifically did differently, and the tangible improvement that resulted. Interviewers want growth mindset, not perfection. Avoid blaming others.", d: "Medium", tag: "STAR Method" },
    { q: "How do you handle tight deadlines and conflicting priorities?", a: "Demonstrate prioritisation framework: urgency vs impact matrix. Show stakeholder communication skills. Give a specific example where you navigated competing demands. Mention tools (Jira, Trello) and outcome. Avoid saying 'I just work harder'.", d: "Medium", tag: "Soft Skills" },
  ],
  database: [
    { q: "What is the difference between INNER JOIN and LEFT JOIN?", a: "INNER JOIN returns only rows where there is a match in BOTH tables. LEFT JOIN returns ALL rows from the left table, and matching rows from the right table. If no match, right side returns NULL. Use LEFT JOIN when you want all records from one table regardless of match status.", d: "Basic", tag: "SQL" },
    { q: "Explain database indexing and when NOT to use it.", a: "An index creates a B-tree data structure on a column enabling O(log n) lookups instead of O(n) full table scan. Don't use indexes on: small tables (full scan is fine), columns with low cardinality (e.g., boolean), columns rarely used in WHERE clauses, tables with frequent INSERT/UPDATE (index maintenance cost).", d: "Medium", tag: "Indexing" },
    { q: "What are database transactions and ACID properties?", a: "A transaction is a sequence of operations treated as a single unit. ACID: Atomicity (all or nothing), Consistency (valid state to valid state), Isolation (concurrent transactions don't interfere), Durability (committed data survives crashes). Implemented via write-ahead logging and locking mechanisms.", d: "Medium", tag: "Transactions" },
  ],
};

const difficultyConfig = {
  "Easy": "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  "Basic": "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  "Medium": "text-amber-400 bg-amber-500/10 border-amber-500/20",
  "Hard": "text-rose-400 bg-rose-500/10 border-rose-500/20",
};

const MockInterviews = () => {
  const [activeCategory, setActiveCategory] = useState('dsa');
  const [expandedId, setExpandedId] = useState(null);
  const currentCat = categories.find(c => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-[#060b14] font-sans text-white overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-8 min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1920&q=80"
            alt="Mock Interview" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060b14]/60 to-[#060b14]" />
        </div>
        <div className="absolute top-10 right-0 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-500/10 border border-rose-500/30 mb-8">
              <Mic size={14} className="text-rose-400" />
              <span className="text-rose-300 text-sm font-bold tracking-widest uppercase">Real Industry Interviewers</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6">
              Practice Until<br />You
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-400 to-amber-400"> Can't Fail</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-slate-300 leading-relaxed mb-10 max-w-xl">
              Simulate real FAANG and startup interviews with practicing engineers. Get brutal, honest feedback and walk into your real interview already having done it a dozen times.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex gap-4 flex-wrap">
              <Link to="/contact" className="group relative overflow-hidden bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold px-10 py-4 rounded-xl shadow-[0_10px_30px_rgba(244,63,94,0.3)] flex items-center gap-2">
                <span className="relative z-10 flex items-center gap-2">Book Mock Interview <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
              <a href="#questions" className="bg-slate-800/60 backdrop-blur-md border border-slate-700 text-white font-bold px-10 py-4 rounded-xl hover:-translate-y-1 hover:bg-slate-700/60 transition-all">
                Practice Questions
              </a>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={slideInRight} className="hidden lg:block relative">
            <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.5)] group">
              <img src="https://images.unsplash.com/photo-1565688527156-f2f1fbec7e53?auto=format&fit=crop&w=1200&q=80"
                alt="Interview Session" className="w-full h-[520px] object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060b14]/60 to-transparent" />
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -bottom-6 -left-8 bg-slate-900/90 backdrop-blur-xl border border-rose-500/30 px-6 py-4 rounded-2xl shadow-2xl">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-emerald-400" />
                <div>
                  <p className="text-white font-bold">850+ Students Cracked FAANG</p>
                  <p className="text-slate-400 text-sm">After mock interview sessions</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── MOCK TYPES ───────────────────────────────────── */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-14">
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">Mock Format</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockTypes.map((m, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, type: "spring" }}
                whileHover={{ y: -8, boxShadow: `0 25px 50px ${m.glow}` }}
                className="group relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 p-7 rounded-3xl overflow-hidden cursor-default transition-all duration-400 flex flex-col"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${m.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <m.icon size={24} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-3 flex-1">{m.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">{m.desc}</p>
                <div className="flex gap-3 text-xs border-t border-white/5 pt-4">
                  <span className="bg-slate-700/60 text-slate-300 px-3 py-1.5 rounded-full border border-slate-600 flex items-center gap-1"><Clock size={11} />{m.duration}</span>
                  <span className="bg-slate-700/60 text-slate-300 px-3 py-1.5 rounded-full border border-slate-600">{m.level}</span>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className={`mt-5 w-full bg-gradient-to-r ${m.color} text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all text-sm`}>
                  Book Now <ChevronRight size={14} />
                </motion.button>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRACTICE QUESTIONS ───────────────────────────── */}
      <section id="questions" className="py-16 px-8 pb-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <div className="lg:w-72 shrink-0">
            <div className="sticky top-32">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">Practice Domain</p>
              <div className="flex flex-col gap-3">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <motion.button key={cat.id}
                      onClick={() => { setActiveCategory(cat.id); setExpandedId(null); }}
                      whileHover={{ scale: 1.02, x: 4 }} whileTap={{ scale: 0.98 }}
                      className={`group w-full flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-300 text-left ${isActive
                        ? 'bg-slate-800/80 border-slate-600' : 'bg-slate-800/20 border-slate-700/40 hover:bg-slate-800/50 hover:border-slate-600'}`}
                      style={isActive ? { boxShadow: `0 0 25px ${cat.glow}` } : {}}
                    >
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${isActive ? `bg-gradient-to-br ${cat.color} shadow-lg` : 'bg-slate-700/60'}`}>
                        <cat.icon size={20} className={isActive ? 'text-white' : 'text-slate-400'} />
                      </div>
                      <span className={`font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>{cat.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Q&A Panel */}
          <div className="flex-1">
            <motion.div key={activeCategory + 'hdr'}
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className={`flex items-center gap-4 mb-6 p-6 rounded-2xl border border-white/10 bg-slate-900/40`}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${currentCat.color} flex items-center justify-center shadow-lg`}>
                <currentCat.icon size={26} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-white">{currentCat.name}</h2>
                <p className="text-slate-400 text-sm">{questionsData[activeCategory].length} model answers — Click to reveal</p>
              </div>
            </motion.div>

            <AnimatePresence mode="popLayout">
              <motion.div key={activeCategory} className="flex flex-col gap-4">
                {questionsData[activeCategory].map((qa, idx) => {
                  const isOpen = expandedId === idx;
                  return (
                    <motion.div key={idx} layout
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className={`border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${isOpen
                        ? 'border-rose-500/50 bg-slate-800/60 shadow-[0_10px_30px_rgba(244,63,94,0.15)]'
                        : 'border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 hover:border-slate-600'}`}
                      onClick={() => setExpandedId(isOpen ? null : idx)}
                    >
                      <div className="p-6 flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <span className={`shrink-0 text-xs font-black px-3 py-1.5 rounded-full border ${difficultyConfig[qa.d] || ''}`}>{qa.d}</span>
                          <div>
                            <span className={`text-base font-semibold leading-snug ${isOpen ? 'text-rose-300' : 'text-white'}`}>{qa.q}</span>
                            <div className="mt-2"><span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-1 rounded-md font-medium">{qa.tag}</span></div>
                          </div>
                        </div>
                        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}
                          className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-700/60 text-slate-400'}`}>
                          <ChevronDown size={18} />
                        </motion.div>
                      </div>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
                            <div className="px-6 pb-6 border-t border-white/5 pt-4">
                              <div className="flex items-center gap-2 mb-3">
                                <HelpCircle size={14} className="text-rose-400" />
                                <span className="text-rose-400 text-xs font-bold uppercase tracking-wider">Model Answer</span>
                              </div>
                              <p className="text-slate-300 leading-relaxed text-[0.95rem]">{qa.a}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MockInterviews;
