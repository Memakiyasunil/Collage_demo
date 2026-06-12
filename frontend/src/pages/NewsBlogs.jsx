import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  }
];

const NewsBlogs = () => {
  const [filter, setFilter] = useState('ALL');

  const filteredData = blogsData.filter(item => {
    if (filter === 'ALL') return true;
    return item.type === filter;
  });

  return (
    <div className="bg-slate-950 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 pt-32 pb-16 px-8 text-center border-b border-white/10 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/20 via-transparent to-transparent pointer-events-none" />
        <h4 className="text-sky-300 font-bold tracking-widest text-sm uppercase mb-4">UPDATES</h4>
        <h1 className="text-5xl font-extrabold text-white mb-6">News & Blogs</h1>
        <p className="text-blue-100 max-w-2xl mx-auto text-lg leading-relaxed">
          Everything happening at Education Forge plus insights from our experts.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-8 mt-12">
        {/* Filter Tabs */}
        <div className="flex gap-4 mb-12 flex-wrap">
          <button
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all duration-200 ${filter === 'ALL' ? 'bg-sky-500 text-white shadow-md' : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'}`}
            onClick={() => setFilter('ALL')}
          >
            <Grip size={18} /> All Updates
          </button>
          <button
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all duration-200 ${filter === 'BLOG' ? 'bg-sky-500 text-white shadow-md' : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'}`}
            onClick={() => setFilter('BLOG')}
          >
            <FileText size={18} /> Blogs
          </button>
          <button
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all duration-200 ${filter === 'NEWS' ? 'bg-sky-500 text-white shadow-md' : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'}`}
            onClick={() => setFilter('NEWS')}
          >
            <Newspaper size={18} /> News
          </button>
        </div>

        {/* Grid */}
        <motion.div
          key={filter}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {filteredData.map((item) => (
            <motion.div
              key={item.id}
              className="bg-white/5 rounded-2xl overflow-hidden shadow-sm border border-white/10 flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(14,165,233,0.15)] group"
              variants={fadeInUp}
            >
              {item.image && (
                <div className="relative h-56 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-sky-500 text-white text-[0.65rem] font-bold px-3 py-1.5 rounded-full tracking-wider">
                      {item.type}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-8 flex flex-col grow">
                {!item.image && (
                  <div className="mb-4">
                    <span className="bg-sky-500 text-white text-[0.65rem] font-bold px-3 py-1.5 rounded-full tracking-wider">
                      {item.type}
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-6 leading-tight group-hover:text-sky-400 transition-colors">
                  {item.title}
                </h3>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-sm shrink-0">
                    {item.author.initials}
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">{item.author.name}</h5>
                    <p className="text-xs text-slate-400 font-medium">{item.author.date}</p>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-8 grow">
                  {item.description}
                </p>

                <div className="flex justify-between items-center mt-auto pt-6 border-t border-white/10">
                  <span className="text-sky-400 font-bold flex items-center gap-1 text-sm cursor-pointer group-hover:gap-2 transition-all">
                    {item.type === 'BLOG' ? 'Read Article' : 'Read More'} <ArrowRight size={16} />
                  </span>
                  <span className="text-[0.65rem] font-bold text-slate-300 bg-white/5 px-2 py-1 rounded tracking-wider uppercase border border-white/10">
                    {item.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default NewsBlogs;
