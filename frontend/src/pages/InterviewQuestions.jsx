import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../utils/animations';
import { ChevronDown, Code, Server, Database, Users, HelpCircle } from 'lucide-react';

const categories = [
  { id: 'frontend', name: 'Frontend', icon: Code, color: 'text-sky-400', bg: 'bg-sky-500/10' },
  { id: 'backend', name: 'Backend', icon: Server, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { id: 'dsa', name: 'Data Structures', icon: Database, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { id: 'hr', name: 'HR / Behavioral', icon: Users, color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10' },
];

const questionsData = {
  frontend: [
    { q: "Explain the Virtual DOM in React.", a: "The Virtual DOM is a lightweight copy of the actual DOM. React uses it to improve performance by calculating the difference (diffing) between the new Virtual DOM and the old one, and only updating the real DOM where necessary." },
    { q: "What is CSS Flexbox?", a: "Flexbox is a one-dimensional layout model in CSS that allows responsive elements within a container to be automatically arranged depending upon viewport size." },
    { q: "What are React Hooks?", a: "Hooks are functions that let you 'hook into' React state and lifecycle features from function components (e.g., useState, useEffect)." }
  ],
  backend: [
    { q: "Explain RESTful API architecture.", a: "REST (Representational State Transfer) is an architectural style for designing networked applications. It relies on a stateless, client-server communication protocol, almost always HTTP." },
    { q: "What is the difference between SQL and NoSQL?", a: "SQL databases are relational, table-based, and have a predefined schema. NoSQL databases are non-relational, document/key-value/graph based, and have dynamic schemas for unstructured data." },
    { q: "What is middleware in Express.js?", a: "Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle." }
  ],
  dsa: [
    { q: "What is the time complexity of Binary Search?", a: "The time complexity of Binary Search is O(log n) because it halves the search space during each step." },
    { q: "Explain a Hash Table.", a: "A Hash Table is a data structure that implements an associative array abstract data type, a structure that can map keys to values. It uses a hash function to compute an index into an array of buckets or slots." },
    { q: "What is Dynamic Programming?", a: "Dynamic Programming is an algorithmic technique for solving an optimization problem by breaking it down into simpler subproblems and utilizing the fact that the optimal solution to the overall problem depends upon the optimal solution to its subproblems." }
  ],
  hr: [
    { q: "Tell me about yourself.", a: "Focus on your professional journey, highlight your technical skills relevant to the job, mention a key achievement, and explain why you are interested in this specific role." },
    { q: "Why do you want to work here?", a: "Show that you've researched the company. Mention their products, culture, or recent news, and align your own career goals with their mission." },
    { q: "Describe a time you faced a difficult challenge.", a: "Use the STAR method (Situation, Task, Action, Result) to clearly explain the context, what you did to solve it, and the positive outcome." }
  ]
};

const InterviewQuestions = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [expandedId, setExpandedId] = useState(null);

  const toggleQuestion = (idx) => {
    if (expandedId === idx) {
      setExpandedId(null);
    } else {
      setExpandedId(idx);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1120] font-sans pt-32 pb-20 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-sky-600/10 blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[150px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 mb-6">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
            <span className="text-sky-300 text-sm font-bold tracking-widest uppercase">Placement Prep</span>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Crack the <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Technical Interview</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg text-slate-400 max-w-2xl mx-auto">
            Master the most frequently asked questions by top recruiters across all major domains.
          </motion.p>
        </motion.div>

        {/* Top Image Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 relative h-64 md:h-80 rounded-[2rem] overflow-hidden border border-slate-700 shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1200&q=80" 
            alt="Interview Preparation" 
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] to-transparent"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Categories Sidebar */}
          <div className="w-full md:w-1/3">
            <div className="sticky top-32 space-y-4">
              <h3 className="text-white font-bold text-xl mb-6">Categories</h3>
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); setExpandedId(null); }}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 border ${
                      isActive 
                        ? 'bg-slate-800 border-slate-600 shadow-lg' 
                        : 'bg-transparent border-transparent hover:bg-slate-800/50 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? cat.bg : 'bg-slate-800'} ${isActive ? cat.color : 'text-slate-400'}`}>
                      <Icon size={20} />
                    </div>
                    <span className={`font-bold text-lg ${isActive ? 'text-white' : 'text-slate-400'}`}>
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Questions Accordion */}
          <div className="w-full md:w-2/3">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-800">
                <HelpCircle className="text-sky-400" size={28} />
                <h2 className="text-2xl font-bold text-white capitalize">
                  {categories.find(c => c.id === activeCategory)?.name} Questions
                </h2>
              </div>

              <div className="space-y-4">
                {questionsData[activeCategory].map((qa, idx) => {
                  const isExpanded = expandedId === idx;
                  return (
                    <motion.div 
                      key={idx}
                      initial={false}
                      className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isExpanded ? 'border-sky-500/50 bg-slate-800/50' : 'border-slate-700/50 bg-slate-800/20 hover:bg-slate-800/40'}`}
                    >
                      <button 
                        onClick={() => toggleQuestion(idx)}
                        className="w-full flex items-center justify-between p-6 text-left"
                      >
                        <span className="font-semibold text-slate-200 pr-8">{qa.q}</span>
                        <ChevronDown 
                          size={20} 
                          className={`text-slate-400 transition-transform duration-300 shrink-0 ${isExpanded ? 'rotate-180 text-sky-400' : ''}`} 
                        />
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-slate-700/50 pt-4 mt-2">
                              {qa.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InterviewQuestions;
