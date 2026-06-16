import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, FileText, Newspaper, Grip } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/animations';

const blogsData = [
  {
    id: 1,
    type: 'NEWS',
    title: 'OpenAI Releases GPT-5 with Native Reasoning and Real-Time Code Execution',
    author: { name: 'Prof. Hardik Patel', initials: 'PH', date: '25 Feb 2026' },
    description: 'GPT-5 launched with native reasoning, 1M-token context, and real-time code execution — setting a new bar for AI capabilities.',
    category: 'AI',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 2,
    type: 'NEWS',
    title: 'Massive Ransomware Attack Hits 200+ Indian Banks — RBI Issues Emergency Advisory',
    author: { name: 'Prof. Sandip Jadav', initials: 'PS', date: '19 Feb 2026' },
    description: 'LockBit 4.0 ransomware hits 200+ Indian banks; RBI and CERT-In issue emergency advisories urging immediate patching.',
    category: 'CYBERSECURITY',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 3,
    type: 'NEWS',
    title: "India Becomes World's Third-Largest Data Analytics Market, Crosses $50 Billion",
    author: { name: 'Prof. Hardik Vyas', initials: 'PH', date: '12 Feb 2026' },
    description: 'NASSCOM report: India overtakes UK as third-largest analytics market at $50B, with 35% YoY growth in data analytics hiring.',
    category: 'DATA ANALYTICS',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 4,
    type: 'BLOG',
    title: 'Understanding Zero-Trust Architecture: Why Indian Enterprises Can No Longer Wait',
    author: { name: 'Prof. Sandip Jadav', initials: 'PS', date: '22 Feb 2026' },
    description: "The castle-and-moat model is dead. Here's why Zero Trust Architecture is now a survival requirement for Indian enterprises.",
    category: 'CYBERSECURITY',
    image: null
  },
  {
    id: 5,
    type: 'BLOG',
    title: "The Rise of Small Language Models: Why Bigger Isn't Always Better in AI",
    author: { name: 'Prof. Hardik Patel', initials: 'PH', date: '16 Feb 2026' },
    description: 'While GPT-5 grabs headlines, small language models are quietly revolutionizing real-world AI deployment — especially in India.',
    category: 'AI',
    image: null
  },
  {
    id: 6,
    type: 'BLOG',
    title: 'Real-Time Data Pipelines: How Apache Kafka and Flink Are Powering Modern Analytics',
    author: { name: 'Prof. Hardik Vyas', initials: 'PH', date: '8 Feb 2026' },
    description: "Batch processing is dead for modern analytics. Here's how Apache Kafka and Flink power the real-time data pipelines behind industry leaders.",
    category: 'DATA ANALYTICS',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 7,
    type: 'NEWS',
    title: 'Google DeepMind Open-Sources New Quantum Error Correction Framework',
    author: { name: 'Dr. Anita Desai', initials: 'AD', date: '5 Feb 2026' },
    description: 'A major breakthrough in quantum computing as DeepMind releases a robust error correction framework for the developer community.',
    category: 'QUANTUM COMPUTING',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 8,
    type: 'BLOG',
    title: 'Why Rust is Replacing C++ in High-Performance Trading Systems',
    author: { name: 'Rahul Sharma', initials: 'RS', date: '2 Feb 2026' },
    description: 'An in-depth look at how top quantitative trading firms are migrating legacy C++ infrastructure to Rust for memory safety and speed.',
    category: 'SOFTWARE ENGINEERING',
    image: null
  },
  {
    id: 9,
    type: 'NEWS',
    title: 'New SEBI Regulations Mandate AI-Driven Fraud Detection for Brokers',
    author: { name: 'Prof. Sandip Jadav', initials: 'PS', date: '28 Jan 2026' },
    description: 'Starting Q3 2026, all major Indian stockbrokers must implement certified AI models for real-time market manipulation detection.',
    category: 'FINTECH',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 10,
    type: 'BLOG',
    title: 'Mastering Kubernetes: 5 Common Anti-Patterns to Avoid',
    author: { name: 'Prof. Hardik Patel', initials: 'PH', date: '15 Jan 2026' },
    description: 'Are you over-provisioning your clusters? Avoid these 5 common Kubernetes anti-patterns that skyrocket cloud costs.',
    category: 'CLOUD NATIVE',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=60'
  }
];

const NewsBlogs = () => {
  const [filter, setFilter] = useState('ALL');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const filteredData = blogsData.filter(item => {
    if (filter === 'ALL') return true;
    return item.type === filter;
  });

  return (
    <div className="bg-slate-950 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-slate-900 pt-32 pb-24 px-8 text-center border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/20 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-indigo-500" />
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="text-xs font-extrabold text-sky-400 tracking-[0.2em] uppercase mb-6 block">UPDATES</span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">News & Blogs</h1>
          <p className="text-xl text-slate-300 font-light leading-relaxed">
            Everything happening at Education <span className="text-yellow-400">Forge</span> plus insights from our experts.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        {/* Filter Tabs */}
        <div className="flex gap-4 mb-16 flex-wrap justify-center">
          <button
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all duration-200 ${filter === 'ALL' ? 'bg-emerald-500 text-slate-900 shadow-[0_4px_15px_rgba(16,185,129,0.3)]' : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'}`}
            onClick={() => setFilter('ALL')}
          >
            <Grip size={18} /> All Updates
          </button>
          <button
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all duration-200 ${filter === 'BLOG' ? 'bg-emerald-500 text-slate-900 shadow-[0_4px_15px_rgba(16,185,129,0.3)]' : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'}`}
            onClick={() => setFilter('BLOG')}
          >
            <FileText size={18} /> Blogs
          </button>
          <button
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all duration-200 ${filter === 'NEWS' ? 'bg-emerald-500 text-slate-900 shadow-[0_4px_15px_rgba(16,185,129,0.3)]' : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'}`}
            onClick={() => setFilter('NEWS')}
          >
            <Newspaper size={18} /> News
          </button>
        </div>

        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50% - 1rem)); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>

        {/* Sliding Cards Marquee */}
        <div className="relative w-full overflow-hidden h-[650px] flex items-end pb-10">
          <div className="flex gap-8 w-max animate-marquee">
            {[...filteredData, ...filteredData].map((item, index) => {
              const uniqueKey = `${item.id}-${index}`;
              const isHovered = hoveredIndex === uniqueKey;

              return (
                <div 
                  key={uniqueKey}
                  className="relative h-[280px] w-[350px] shrink-0 flex items-end justify-center group z-10 hover:z-50"
                  onMouseEnter={() => setHoveredIndex(uniqueKey)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Background Card 1 (Deepest) */}
                  <motion.div
                    className="absolute bottom-0 w-[85%] h-[240px] bg-indigo-950/80 border border-indigo-500/20 rounded-[2rem] shadow-xl backdrop-blur-sm"
                    animate={{ 
                      rotate: isHovered ? -6 : -2,
                      y: isHovered ? -25 : -8,
                      x: isHovered ? -15 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                  
                  {/* Background Card 2 (Middle) */}
                  <motion.div
                    className="absolute bottom-0 w-[92%] h-[260px] bg-sky-950/90 border border-sky-500/30 rounded-[2rem] shadow-xl backdrop-blur-md"
                    animate={{ 
                      rotate: isHovered ? 6 : 2,
                      y: isHovered ? -15 : -4,
                      x: isHovered ? 15 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />

                  {/* Main Front Card */}
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      layout: { type: "spring", stiffness: 300, damping: 25 },
                      opacity: { duration: 0.5, delay: (index % filteredData.length) * 0.1 } 
                    }}
                    style={{
                      height: isHovered ? 'auto' : '280px', 
                      width: '100%'
                    }}
                    className={`absolute bottom-0 rounded-[2rem] overflow-hidden flex flex-col bg-slate-900 border transition-colors duration-500 ${
                      isHovered ? 'border-sky-500/50 shadow-[0_30px_60px_-15px_rgba(14,165,233,0.3)] z-20' : 'border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-10'
                    }`}
                  >
                    {/* Always Visible Header Area (Top 280px) */}
                    <motion.div layout className="shrink-0 flex flex-col h-[280px] relative z-10 bg-slate-900">
                      {item.image ? (
                        <div className="relative h-40 overflow-hidden shrink-0">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                          <div className="absolute top-4 left-4">
                            <span className="bg-emerald-500 text-slate-900 text-[0.65rem] font-bold px-3 py-1.5 rounded-full tracking-wider shadow-sm">
                              {item.type}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="h-10 pt-6 px-6 shrink-0">
                          <span className="bg-emerald-500 text-slate-900 text-[0.65rem] font-bold px-3 py-1.5 rounded-full tracking-wider shadow-sm">
                            {item.type}
                          </span>
                        </div>
                      )}

                      <div className="px-6 flex-1 flex flex-col justify-center">
                        <h3 className="text-lg font-bold text-white leading-snug group-hover:text-sky-400 transition-colors line-clamp-3">
                          {item.title}
                        </h3>
                        
                        {/* Gradient overlay to indicate more content when collapsed */}
                        {!isHovered && (
                          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-900 to-transparent z-20" />
                        )}
                      </div>
                    </motion.div>
                    
                    {/* Expanded Content (Hidden initially, revealed on hover) */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="p-6 pt-2 grow flex flex-col relative z-10 bg-slate-900 border-t border-white/5"
                        >
                          <div className="flex items-center gap-3 mb-4 shrink-0">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[0.65rem] shrink-0">
                              {item.author.initials}
                            </div>
                            <div>
                              <h5 className="font-bold text-white text-xs">{item.author.name}</h5>
                              <p className="text-[0.65rem] text-slate-400 font-medium">{item.author.date}</p>
                            </div>
                          </div>

                          <p className="text-[0.85rem] leading-relaxed mb-6 grow font-medium text-slate-300 line-clamp-4">
                            {item.description}
                          </p>
                        
                          <div className="pt-4 flex justify-between items-center text-sm font-bold mt-auto border-t border-slate-700/50">
                            <span className="text-yellow-400 font-bold flex items-center gap-1 text-sm cursor-pointer hover:text-yellow-300 transition-colors hover:translate-x-1">
                              {item.type === 'BLOG' ? 'Read Article' : 'Read More'} <ArrowRight size={16} />
                            </span>
                            <span className="text-[0.65rem] font-bold text-slate-300 bg-white/5 px-2 py-1 rounded tracking-wider uppercase border border-white/10">
                              {item.category}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsBlogs;
