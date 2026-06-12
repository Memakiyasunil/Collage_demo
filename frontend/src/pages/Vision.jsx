import React from 'react';
import { motion } from 'framer-motion';
import { slideInLeft, slideInRight } from '../utils/animations';

const Vision = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <section className="bg-gradient-to-br from-blue-900 to-blue-600 py-16 px-8 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold text-blue-200 tracking-widest uppercase mb-4 block">OUR VISION</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Vision & Mission</h1>
          <p className="text-lg opacity-90">
            Pioneering the future of education with innovation and excellence.
          </p>
        </div>
      </section>

      <section className="py-20 px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center" style={{ direction: 'rtl' }}>
            <motion.div 
              className="w-full" style={{ direction: 'ltr' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInRight}
            >
              <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Why Choose Us?</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                We believe that education should be accessible, practical, and aligned with industry standards. Our unique approach focuses on project-based learning.
              </p>
              <ul className="list-disc pl-6 text-slate-500 leading-relaxed space-y-2">
                <li>Industry-aligned curriculum</li>
                <li>Experienced faculty members</li>
                <li>State-of-the-art infrastructure</li>
                <li>100% Placement assistance</li>
              </ul>
            </motion.div>
            <motion.div 
              className="w-full" style={{ direction: 'ltr' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInLeft}
            >
              <div className="bg-slate-200 rounded-2xl h-[400px] flex items-center justify-center w-full transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl">
                <span className="text-gray-400">Image Placeholder</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Vision;
