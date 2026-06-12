import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { BookOpen, CheckCircle2, MapPin, Building, GraduationCap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { slideInLeft, slideInRight, fadeInUp } from '../utils/animations';
import { partnersData } from '../data/partnersData';

const PartnerDetail = () => {
  const { partnerId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [partnerId]);

  const partner = partnersData.find(p => p.id === partnerId);

  if (!partner) {
    return <Navigate to="/partners" replace />;
  }

  return (
    <div className="bg-slate-950 min-h-screen pb-20 font-sans">
      {/* Top Header */}
      <motion.div
        className="bg-slate-900 py-12 pt-32 border-b border-white/10 mb-12 border-t-4 border-t-sky-500 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-xs font-bold text-slate-500 tracking-widest mb-8">
            <Link to="/" className="text-slate-400 no-underline hover:text-white transition-colors">HOME</Link> / <Link to="/partners" className="text-slate-400 no-underline hover:text-white transition-colors">PARTNERS</Link> / <span>{partner.name.toUpperCase()}</span>
          </div>

          <h1 className="text-4xl md:text-[2.8rem] font-extrabold text-white mb-6 max-w-4xl leading-tight">
            {partner.name}
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl leading-relaxed">
            Discover cutting-edge programs, world-class facilities, and exceptional career opportunities at {partner.name}.
          </p>

          <button className="bg-white/10 text-white border border-white/20 rounded-full py-3 px-8 text-[0.95rem] font-semibold cursor-pointer transition-all duration-200 hover:bg-white/20">
            Apply Now &rarr;
          </button>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row gap-12 items-start overflow-hidden">
        {/* Main Content (Left) */}
        <motion.div
          className="flex-1 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={slideInLeft}
        >
          <section className="mb-16">
            <h2 className="flex items-center gap-3 text-[1.4rem] font-extrabold text-white mb-6">
              <Building size={20} className="bg-sky-500/10 p-1.5 rounded-md w-8 h-8 text-sky-400" /> University Overview
            </h2>
            <div className="text-slate-300 text-base leading-relaxed">
              <p style={{ whiteSpace: 'pre-wrap' }}>{partner.overview}</p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="flex items-center gap-3 text-[1.4rem] font-extrabold text-white mb-6">
              <BookOpen size={20} className="bg-emerald-500/10 p-1.5 rounded-md w-8 h-8 text-emerald-400" /> Programs Offered
            </h2>
            <div className="text-slate-300 text-base leading-relaxed">
              {partner.programs && partner.programs.length > 0 ? (
                <ul className="list-none p-0 m-0">
                  {partner.programs.map((prog, idx) => (
                    <li key={idx} className="flex items-start gap-3 mb-4">
                      <GraduationCap size={18} className="text-emerald-400 mt-0.5 shrink-0" />
                      <span className="-mt-0.5">{prog}</span>
                    </li>
                  ))}
                  {partner.moreCount > 0 && (
                     <li className="flex items-start gap-3 mb-4 italic text-slate-400">
                        <span>And {partner.moreCount} more programs...</span>
                     </li>
                  )}
                </ul>
              ) : (
                <p className="italic text-slate-400">{partner.customMessage || "Program details will be available soon."}</p>
              )}
            </div>
            {partner.programs && partner.programs.length > 0 && (
              <Link to="/courses" className="inline-flex items-center gap-2 mt-4 text-sky-400 hover:text-sky-300 transition-colors font-semibold">
                Explore all programs <ArrowRight size={16} />
              </Link>
            )}
          </section>

          <section className="mb-16">
            <h2 className="flex items-center gap-3 text-[1.4rem] font-extrabold text-white mb-6">
              <CheckCircle2 size={20} className="bg-pink-500/10 p-1.5 rounded-md w-8 h-8 text-pink-400" /> Campus Facilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {partner.facilities.map((facility, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-lg flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full shrink-0" />
                  <span className="text-slate-300 text-[0.9rem]">{facility}</span>
                </div>
              ))}
            </div>
          </section>
        </motion.div>

        {/* Sidebar (Right) */}
        <motion.div
          className="w-full lg:w-[400px] shrink-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={slideInRight}
        >
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.2)] mb-4">
            <h4 className="text-xs font-bold text-slate-500 tracking-widest mb-6">KEY FACTS</h4>
            <ul className="list-none p-0 m-0">
              <li className="flex justify-between py-4 border-b border-white/10 text-[0.9rem] border-l-4 border-l-sky-500 pl-4">
                <span className="text-slate-400 font-medium">Established</span>
                <span className="font-bold text-white">{partner.keyFacts.established}</span>
              </li>
              <li className="flex justify-between py-4 border-b border-white/10 text-[0.9rem] border-l-4 border-l-emerald-500 pl-4">
                <span className="text-slate-400 font-medium">Location</span>
                <span className="font-bold text-white text-right max-w-[150px]">{partner.keyFacts.location}</span>
              </li>
              <li className="flex justify-between py-4 border-b border-white/10 text-[0.9rem] border-l-4 border-l-purple-500 pl-4">
                <span className="text-slate-400 font-medium">Type</span>
                <span className="font-bold text-white text-right max-w-[150px]">{partner.keyFacts.type}</span>
              </li>
              <li className="flex justify-between py-4 border-b border-white/10 text-[0.9rem] border-l-4 border-l-orange-500 pl-4">
                <span className="text-slate-400 font-medium">Campus Size</span>
                <span className="font-bold text-white">{partner.keyFacts.campusSize}</span>
              </li>
              <li className="flex justify-between py-4 border-b border-white/10 text-[0.9rem] border-l-4 border-l-emerald-500 pl-4">
                <span className="text-slate-400 font-medium">Accreditation</span>
                <span className="font-bold text-emerald-400 text-right max-w-[150px]">{partner.keyFacts.accreditation}</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.2)] mb-4">
            <h4 className="flex items-center gap-2 text-lg font-extrabold mb-6 text-white"><MapPin size={16} className="text-sky-400" /> Visit Campus</h4>
            <p className="text-[0.9rem] text-slate-300 leading-relaxed mb-6">
              Experience the vibrant campus life and world-class infrastructure at {partner.name}. Schedule a campus tour with our counselors.
            </p>
            <button className="w-full bg-sky-600 text-white border-none rounded-lg p-4 font-bold cursor-pointer transition-colors hover:bg-sky-500">
              Schedule Campus Tour
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PartnerDetail;
