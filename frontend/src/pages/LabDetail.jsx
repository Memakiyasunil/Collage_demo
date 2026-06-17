import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { slideInLeft, slideInRight, staggerContainer, fadeInUp } from '../utils/animations';
import { labsData } from '../data/labsData';

const LabDetail = () => {
  const { labId } = useParams();
  const lab = labsData[labId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [labId]);

  // If URL doesn't match a known lab, redirect to home
  if (!lab) {
    return <Navigate to="/" replace />;
  }

  const IconComponent = lab.icon;

  return (
    <div className="bg-slate-950 min-h-screen font-sans">
      {/* Premium Hero Section */}
      <div className="relative pt-32 pb-20 px-8 bg-[#060b14] overflow-hidden min-h-[70vh] flex items-center">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/30 via-[#060b14] to-[#060b14] pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-sky-500/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInLeft}
            className="flex flex-col items-start"
          >
            <Link to="/" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-[0.95rem] font-bold uppercase tracking-wider mb-8 transition-colors bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20">
              <ArrowLeft size={16} /> Back to Home
            </Link>
            
            <div className="w-[70px] h-[70px] bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md shadow-xl">
              <IconComponent size={32} className="text-sky-400" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-extrabold mb-6 leading-tight text-white tracking-tight">{lab.title}</h1>
            <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed max-w-xl">{lab.subtitle}</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRight}
            className="relative"
          >
            <div className="aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#060b14] via-transparent to-transparent z-10 opacity-80" />
              {lab.image ? (
                <img src={lab.image} alt={lab.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
              ) : (
                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                  <IconComponent size={64} className="text-slate-600" />
                </div>
              )}
            </div>
            
            {/* Floating decorative elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-slate-900/90 backdrop-blur-xl border border-slate-700 p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-sky-500/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="text-sky-400" size={24} />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Premium Facility</p>
                <p className="text-slate-400 text-xs">Industry Standard</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-6xl mx-auto py-16 px-8 flex flex-col gap-16 overflow-hidden">
        <motion.div 
          className="w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={slideInLeft}
        >
          <p className="text-[1.05rem] text-slate-300 leading-relaxed mb-16 max-w-4xl">
            {lab.description}
          </p>

          <h3 className="text-2xl font-extrabold text-white mb-8">What This Lab Offers</h3>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {lab.offers.map((offer, idx) => (
              <motion.div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-lg flex items-start gap-4 text-[0.9rem] text-slate-300 leading-relaxed font-medium transition-transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)]" variants={fadeInUp}>
                <CheckCircle2 className="text-indigo-400 shrink-0 mt-0.5" size={20} />
                <span>{offer}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Dynamic Context Sections */}
        <motion.div 
          className="w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={slideInLeft}
        >
          {/* Methodology (if any) */}
          {lab.methodology && (
            <div className="mb-16">
              <h3 className="text-2xl font-extrabold text-white mb-8">Our Process</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {lab.methodology.map((item, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-xl relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/10 rounded-bl-full flex items-start justify-end p-3">
                      <span className="text-indigo-500 font-extrabold text-xl group-hover:scale-110 transition-transform">{item.step}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                    {item.desc && <p className="text-slate-400 text-[0.9rem] leading-relaxed">{item.desc}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies */}
          {lab.technologies && (
            <div className="mb-16">
              <h3 className="text-2xl font-extrabold text-white mb-8">Technologies in this Lab</h3>
              <div className="flex flex-wrap gap-3">
                {lab.technologies.map((tech, idx) => (
                  <span key={idx} className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-5 py-2.5 rounded-full font-bold text-sm hover:bg-indigo-500 hover:text-white transition-all cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* TWO COLUMN MIXED METADATA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            {/* Outcomes */}
            {lab.keyOutcomes && (
              <div>
                <h3 className="text-xl font-extrabold text-white mb-6">Key Learning Outcomes</h3>
                <ul className="space-y-4 bg-white/5 border border-white/10 p-6 rounded-xl">
                  {lab.keyOutcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300 text-[0.95rem] font-medium"><CheckCircle2 className="text-amber-400 shrink-0 mt-0.5" size={20} /> {outcome}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Target Audience */}
            {lab.targetAudience && (
              <div>
                <h3 className="text-xl font-extrabold text-white mb-6">Who is this for?</h3>
                <div className="bg-gradient-to-br from-indigo-900/40 to-slate-800/40 border border-indigo-500/20 p-6 rounded-xl h-full">
                  <p className="text-slate-300 leading-relaxed text-[1rem]">
                    {lab.targetAudience}
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div 
          className="w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={slideInRight}
        >
          {/* Bottom CTA Banner */}
          <div className="bg-white/5 border border-white/10 rounded-2xl py-12 md:py-16 px-8 text-center text-white mb-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 pointer-events-none" />
            <h3 className="text-2xl md:text-[1.8rem] font-bold mb-4 relative z-10">Ready to explore the {lab.title}?</h3>
            <p className="text-white/80 mb-8 text-[1.05rem] relative z-10">Get in touch with us to schedule a visit or enroll in our lab programs.</p>
            <Link to="/contact" className="relative z-10 inline-block bg-indigo-500 text-white py-3.5 px-8 rounded-lg font-bold no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-400 hover:shadow-[0_10px_30px_rgba(99,102,241,0.3)]">Inquire Now</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LabDetail;
