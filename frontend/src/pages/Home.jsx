import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import PartnerLogos from '../components/PartnerLogos';
import ProgramsSection from '../components/ProgramsSection';
import Features from '../components/Features';
import { Users } from 'lucide-react';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from '../utils/animations';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Hero />
      
      {/* About Section Snippet */}
      <section className="py-20 px-8 bg-slate-50 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="w-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInLeft}
            >
              <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Bridging Knowledge with Technology</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Founded in 2015, Education Force was born from a simple yet powerful vision: to make world-class IT education accessible to every aspiring student. We recognize the growing gap between traditional education and the rapidly evolving technology industry.
              </p>
              <button className="bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_15px_-3px_rgba(37,99,235,0.4)] mt-4">Read Our Story</button>
            </motion.div>
            <motion.div 
              className="w-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInRight}
            >
              <div className="bg-slate-200 rounded-2xl h-[400px] flex items-center justify-center w-full transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl">
                <Users size={64} color="#9ca3af" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <PartnerLogos />
      <ProgramsSection />
      <Features />

      {/* Stats Counter */}
      <motion.section 
        className="py-20 px-8 bg-gradient-to-br from-[#101c40] to-[#1c3b82] text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '5000+', label: 'Students Enrolled' },
              { number: '100+', label: 'Industry Partners' },
              { number: '50+', label: 'Expert Trainers' },
              { number: '10+', label: 'Years Experience' }
            ].map((stat, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <h3 className="text-4xl md:text-[3.5rem] font-extrabold text-blue-300 mb-2">{stat.number}</h3>
                <p className="text-[1.1rem] font-medium text-slate-200">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
