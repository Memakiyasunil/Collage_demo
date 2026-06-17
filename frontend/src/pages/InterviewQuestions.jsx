import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeInUp, slideInLeft, slideInRight } from '../utils/animations';
import { ChevronDown, Code, Server, Database, Users, HelpCircle, Zap, BookOpen, ArrowRight, Search } from 'lucide-react';

const categories = [
  { id: 'frontend', name: 'Frontend Dev', icon: Code, color: 'from-sky-500 to-blue-600', glow: 'rgba(14,165,233,0.3)', count: 3 },
  { id: 'backend', name: 'Backend Dev', icon: Server, color: 'from-emerald-500 to-teal-600', glow: 'rgba(16,185,129,0.3)', count: 3 },
  { id: 'dsa', name: 'Data Structures', icon: Database, color: 'from-amber-500 to-orange-600', glow: 'rgba(245,158,11,0.3)', count: 3 },
  { id: 'hr', name: 'HR / Behavioral', icon: Users, color: 'from-fuchsia-500 to-purple-600', glow: 'rgba(192,38,211,0.3)', count: 3 },
];

const questionsData = {
  frontend: [
    {
      q: "Explain the Virtual DOM in React and how it improves performance.",
      a: "The Virtual DOM is a lightweight in-memory copy of the actual DOM. React keeps a virtual tree of UI components. When state changes, React creates a new virtual DOM, diffs it against the previous one (reconciliation), and only applies the minimal set of real DOM updates needed. This avoids costly full-page re-renders and makes React apps feel snappy.",
      difficulty: "Mid",
      tag: "React",
    },
    {
      q: "What is CSS Flexbox and how does it differ from CSS Grid?",
      a: "Flexbox is a one-dimensional layout model — it lays items in a row or a column. Grid is two-dimensional — it places items in both rows and columns simultaneously. Use Flexbox for component-level layout (navbar, card content), and Grid for page-level layout (overall page structure).",
      difficulty: "Basic",
      tag: "CSS",
    },
    {
      q: "What are React Hooks and when were they introduced?",
      a: "React Hooks (introduced in v16.8) let you use state and lifecycle features in function components. Key hooks: useState (local state), useEffect (side effects like data fetching), useContext (global state), useMemo/useCallback (performance), useRef (DOM access/mutable values).",
      difficulty: "Mid",
      tag: "React",
    },
  ],
  backend: [
    {
      q: "Explain RESTful API architecture and its core principles.",
      a: "REST (Representational State Transfer) is an architectural style using HTTP. Core constraints: Stateless (each request is self-contained), Client-Server separation, Cacheable, Uniform Interface (standard HTTP methods GET/POST/PUT/DELETE), Layered System. Resources are identified by URLs; representations are typically JSON.",
      difficulty: "Mid",
      tag: "APIs",
    },
    {
      q: "What is the difference between SQL and NoSQL databases?",
      a: "SQL databases (MySQL, PostgreSQL) are relational, table-based, use fixed schemas, support ACID transactions, and scale vertically. NoSQL databases (MongoDB, Cassandra, Redis) are non-relational, store data as documents/key-value/graph, have flexible schemas, and scale horizontally. Choose SQL for complex joins; NoSQL for high-velocity, unstructured data.",
      difficulty: "Basic",
      tag: "Databases",
    },
    {
      q: "What is middleware in Express.js and how does it work?",
      a: "Middleware are functions that execute in the request-response cycle between the client and the final route handler. They have access to (req, res, next). Types: application-level, router-level, error-handling, built-in (express.json()), and third-party (cors, helmet). Call next() to pass control to the next middleware.",
      difficulty: "Mid",
      tag: "Node.js",
    },
  ],
  dsa: [
    {
      q: "What is the time complexity of Binary Search and when can you use it?",
      a: "Binary Search has O(log n) time complexity and O(1) space. It works ONLY on sorted arrays by repeatedly halving the search space. Key variants: searching for a value, finding insertion position, finding first/last occurrence. Always ask in interviews: 'is the array sorted?' before proposing it.",
      difficulty: "Basic",
      tag: "Searching",
    },
    {
      q: "Explain a Hash Table and describe a collision resolution strategy.",
      a: "A Hash Table maps keys to values using a hash function to compute an array index. Collision strategies: (1) Separate Chaining — each bucket holds a linked list of entries; (2) Open Addressing (Linear Probing) — probe the next slot on collision. Average O(1) for get/put; worst case O(n) with many collisions. JavaScript's Map uses a hash table internally.",
      difficulty: "Mid",
      tag: "Data Structures",
    },
    {
      q: "What is Dynamic Programming? Explain with an example.",
      a: "DP is an optimization technique that breaks a problem into overlapping subproblems, solves each once, and stores results (memoization/tabulation). Classic example: Fibonacci — naive recursion is O(2^n); with memoization it's O(n). Key signs you need DP: optimal substructure + overlapping subproblems. Common problems: Knapsack, LCS, Coin Change.",
      difficulty: "Hard",
      tag: "Algorithms",
    },
  ],
  hr: [
    {
      q: "Tell me about yourself.",
      a: "Structure: Current role/education → 2-3 key technical skills → a notable achievement → why you're excited about this opportunity. Keep it under 2 minutes. Tailor it to the company — mention tech they use, products you admire. End with a forward-looking statement: 'That's why this role at [company] is the perfect next step.'",
      difficulty: "Basic",
      tag: "Intro",
    },
    {
      q: "Why do you want to work at this company?",
      a: "Research the company before the interview. Reference: (1) a specific product/feature you use/admire, (2) their tech stack or engineering blog, (3) their culture or recent news. Avoid generic answers. Example: 'I've been using your recommendation engine and I read your ML blog post on embeddings — I'd love to work on problems at that scale.'",
      difficulty: "Basic",
      tag: "Motivation",
    },
    {
      q: "Describe a time you faced a difficult technical challenge and how you solved it.",
      a: "Use the STAR method: Situation (context), Task (your responsibility), Action (specific steps you took — be detailed about your individual contribution), Result (measurable outcome). Choose a challenge that shows problem-solving, collaboration, and learning. Mention what you'd do differently in hindsight.",
      difficulty: "Mid",
      tag: "STAR Method",
    },
  ],
};

const difficultyConfig = {
  "Basic": { color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  "Mid": { color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  "Hard": { color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
};

const InterviewQuestions = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [expandedId, setExpandedId] = useState(null);

  const currentCat = categories.find(c => c.id === activeCategory);
  const questions = questionsData[activeCategory];

  return (
    <div className="min-h-screen bg-[#060b14] font-sans overflow-hidden text-white">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1920&q=80"
            alt="Interview Prep" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060b14]/70 to-[#060b14]" />
        </div>
        <div className="absolute top-20 left-1/3 w-96 h-96 bg-sky-600/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-600/15 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-500/10 border border-sky-500/30 mb-8">
              <Zap size={14} className="text-sky-400" />
              <span className="text-sky-300 text-sm font-bold tracking-widest uppercase">Placement Prep Hub</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6 tracking-tight">
              Crack the<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-500">
                Technical Interview
              </span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto">
              Master the most frequently asked questions by top recruiters — from FAANG to product startups — across all major domains.
            </motion.p>

            {/* Stats strip */}
            <motion.div variants={fadeInUp} className="flex justify-center gap-6 flex-wrap">
              {[
                { v: "12+", l: "Questions" },
                { v: "4", l: "Domains" },
                { v: "100%", l: "Industry-Relevant" },
                { v: "Free", l: "Access" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">{s.v}</div>
                  <div className="text-slate-500 text-xs uppercase tracking-widest font-bold">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────── */}
      <section className="py-10 px-8 pb-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">

          {/* Sidebar */}
          <div className="lg:w-72 shrink-0">
            <div className="sticky top-32">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">Select Domain</p>
              <div className="flex flex-col gap-3">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <motion.button
                      key={cat.id}
                      onClick={() => { setActiveCategory(cat.id); setExpandedId(null); }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group w-full flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-300 text-left ${isActive
                        ? `bg-slate-800/80 border-slate-600 shadow-[0_0_20px_${cat.glow}]`
                        : 'bg-slate-800/20 border-slate-700/40 hover:bg-slate-800/50 hover:border-slate-600'
                        }`}
                      style={isActive ? { boxShadow: `0 0 25px ${cat.glow}` } : {}}
                    >
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive ? `bg-gradient-to-br ${cat.color} shadow-lg` : 'bg-slate-700/60 group-hover:bg-slate-700'}`}>
                        <cat.icon size={20} className={isActive ? 'text-white' : 'text-slate-400'} />
                      </div>
                      <div>
                        <div className={`font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>{cat.name}</div>
                        <div className="text-slate-500 text-xs">{cat.count} questions</div>
                      </div>
                      {isActive && (
                        <motion.div layoutId="activeDot" className={`ml-auto w-2 h-2 rounded-full bg-gradient-to-br ${cat.color}`} />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* CTA Card */}
              <div className="mt-6 bg-gradient-to-br from-sky-900/40 to-indigo-900/40 border border-sky-500/20 p-6 rounded-2xl">
                <BookOpen size={24} className="text-sky-400 mb-3" />
                <h4 className="text-white font-bold mb-2">Need More Prep?</h4>
                <p className="text-slate-400 text-sm mb-4">Book a 1:1 mock interview with an industry expert.</p>
                <button className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold py-2.5 rounded-xl text-sm hover:-translate-y-0.5 transition-all">
                  Book Mock Interview
                </button>
              </div>
            </div>
          </div>

          {/* Questions Panel */}
          <div className="flex-1">
            {/* Panel Header */}
            <motion.div
              key={activeCategory + 'header'}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center gap-4 mb-6 p-6 rounded-2xl bg-gradient-to-r ${currentCat.color} bg-opacity-10 border border-white/10`}
              style={{ background: `linear-gradient(135deg, rgba(0,0,0,0.2), rgba(0,0,0,0.1))` }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${currentCat.color} flex items-center justify-center shadow-lg`}>
                <currentCat.icon size={26} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-white">{currentCat.name} Questions</h2>
                <p className="text-slate-400 text-sm">{currentCat.count} questions — Click to expand answers</p>
              </div>
            </motion.div>

            <AnimatePresence mode="popLayout">
              <motion.div key={activeCategory} className="flex flex-col gap-4">
                {questions.map((qa, idx) => {
                  const isOpen = expandedId === idx;
                  return (
                    <motion.div
                      key={idx}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className={`group border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${isOpen
                        ? `border-sky-500/50 bg-slate-800/60 shadow-[0_10px_30px_rgba(14,165,233,0.15)]`
                        : 'border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 hover:border-slate-600 hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)]'
                        }`}
                      onClick={() => setExpandedId(isOpen ? null : idx)}
                    >
                      <div className="p-6 flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <span className={`shrink-0 text-xs font-black px-3 py-1.5 rounded-full border ${difficultyConfig[qa.difficulty].color}`}>
                            {qa.difficulty}
                          </span>
                          <div>
                            <span className={`text-base font-semibold leading-snug transition-colors ${isOpen ? 'text-sky-300' : 'text-white group-hover:text-sky-200'}`}>
                              {qa.q}
                            </span>
                            <div className="mt-2">
                              <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-1 rounded-md font-medium">{qa.tag}</span>
                            </div>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-700/60 text-slate-400 group-hover:bg-slate-700'}`}
                        >
                          <ChevronDown size={18} />
                        </motion.div>
                      </div>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 border-t border-white/5 pt-5">
                              <div className="flex items-center gap-2 mb-3">
                                <HelpCircle size={14} className="text-sky-400" />
                                <span className="text-sky-400 text-xs font-bold uppercase tracking-wider">Model Answer</span>
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

export default InterviewQuestions;
