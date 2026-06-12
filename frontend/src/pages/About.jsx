import React from 'react';
import { motion } from 'framer-motion';
import { slideInLeft, slideInRight } from '../utils/animations';

const About = () => {
  return (
    <div className="min-h-screen bg-slate-950 font-sans pt-24">
      <section className="py-20 px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="w-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInLeft}
            >
              <h2 className="text-4xl font-extrabold text-white mb-6">Vision & Mission</h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Our vision is to be the global leader in providing accessible, high-quality IT and management education. We strive to create an ecosystem where innovation thrives and students are equipped with real-world skills.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Our mission is to bridge the gap between academia and industry by offering updated curriculum, expert mentorship, and hands-on project experience.
              </p>
            </motion.div>
            
            <motion.div 
              className="w-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInRight}
            >
              <div className="bg-white/5 border border-white/10 rounded-2xl h-[400px] flex items-center justify-center w-full transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(14,165,233,0.15)]">
                <span className="text-slate-500">Image Placeholder</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
