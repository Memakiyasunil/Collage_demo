import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import PartnerLogos from '../components/PartnerLogos';
import FeaturedPrograms from '../components/FeaturedPrograms';
import Features from '../components/Features';
import CardSwap from '../components/CardSwap';
import JourneySection from '../components/JourneySection';
import { Users } from 'lucide-react';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from '../utils/animations';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <Hero />

      {/* About Section Snippet */}
      <section className="py-20 px-8 bg-slate-950 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-900/20 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              className="w-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInLeft}
            >
              <h2 className="text-4xl font-extrabold text-white mb-6">Bridging Knowledge with Technology</h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Founded in 2015, Education <span className="text-yellow-400">Forge</span> was born from a simple yet powerful vision: to make world-class IT education accessible to every aspiring student. We recognize the growing gap between traditional education and the rapidly evolving technology industry.
              </p>
              <button className="bg-yellow-400 text-slate-900 py-3 px-8 rounded-lg font-bold transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-[0_10px_15px_-3px_rgba(250,204,21,0.4)] mt-4">Read Our Story</button>
            </motion.div>
            <motion.div
              className="w-full flex justify-center items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInRight}
            >
              <CardSwap 
                cards={[
                  {
                    id: 1,
                    bgClass: "bg-gradient-to-br from-indigo-900 to-slate-900",
                    content: (
                      <>
                        <div>
                          <span className="bg-sky-500/20 text-sky-400 px-4 py-1 rounded-full text-xs font-bold tracking-widest">FEATURED</span>
                          <h3 className="text-3xl font-extrabold text-white mt-4 mb-2">B.Tech in CS</h3>
                          <p className="text-slate-300 font-medium leading-relaxed">Master full-stack development, AI, and cloud infrastructure with our flagship program.</p>
                        </div>
                        <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-8">
                          <span className="text-slate-400 text-sm font-bold">4 Years</span>
                          <button className="bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-lg font-bold transition-colors pointer-events-none">Explore</button>
                        </div>
                      </>
                    )
                  },
                  {
                    id: 2,
                    bgClass: "bg-gradient-to-br from-orange-900 to-slate-900",
                    content: (
                      <>
                        <div>
                          <span className="bg-orange-500/20 text-orange-400 px-4 py-1 rounded-full text-xs font-bold tracking-widest">TOP RATED</span>
                          <h3 className="text-3xl font-extrabold text-white mt-4 mb-2">MCA Specialization</h3>
                          <p className="text-slate-300 font-medium leading-relaxed">Advance your career with master-level courses in Machine Learning and Data Science.</p>
                        </div>
                        <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-8">
                          <span className="text-slate-400 text-sm font-bold">2 Years</span>
                          <button className="bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded-lg font-bold transition-colors pointer-events-none">Explore</button>
                        </div>
                      </>
                    )
                  },
                  {
                    id: 3,
                    bgClass: "bg-gradient-to-br from-emerald-900 to-slate-900",
                    content: (
                      <>
                        <div>
                          <span className="bg-emerald-500/20 text-emerald-400 px-4 py-1 rounded-full text-xs font-bold tracking-widest">NEW</span>
                          <h3 className="text-3xl font-extrabold text-white mt-4 mb-2">Cyber Security</h3>
                          <p className="text-slate-300 font-medium leading-relaxed">Learn ethical hacking and network defense from industry professionals.</p>
                        </div>
                        <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-8">
                          <span className="text-slate-400 text-sm font-bold">1 Year</span>
                          <button className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-lg font-bold transition-colors pointer-events-none">Explore</button>
                        </div>
                      </>
                    )
                  }
                ]}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <JourneySection />

      <PartnerLogos />
      <FeaturedPrograms />
      <Features />

      {/* Stats Counter */}
      <motion.section
        className="py-24 px-8 bg-slate-900 border-t border-b border-white/5 text-white relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-sky-900/20 via-slate-900 to-slate-900 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: '5000+', label: 'Students Enrolled', color: 'from-sky-400 to-blue-500' },
              { number: '100+', label: 'Industry Partners', color: 'from-emerald-400 to-teal-500' },
              { number: '50+', label: 'Expert Trainers', color: 'from-purple-400 to-pink-500' },
              { number: '10+', label: 'Years Experience', color: 'from-yellow-400 to-orange-500' }
            ].map((stat, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(14,165,233,0.15)] hover:bg-white/10 group">
                <h3 className={`text-4xl md:text-5xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3 drop-shadow-sm group-hover:scale-105 transition-transform duration-300`}>{stat.number}</h3>
                <p className="text-[0.95rem] font-semibold text-slate-300 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
