import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { slideInLeft, slideInRight, staggerContainer, fadeInUp } from '../utils/animations';
import { servicesData } from '../data/servicesData';

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const service = servicesData[serviceId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  // If URL doesn't match a known service, redirect to home
  if (!service) {
    return <Navigate to="/" replace />;
  }

  const IconComponent = service.icon;

  return (
    <div className="bg-slate-950 min-h-screen font-sans">
      {/* Top Blue Header Section */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 pt-32 pb-16 px-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/20 via-transparent to-transparent pointer-events-none" />
        <motion.div 
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 text-[0.9rem] font-medium no-underline mb-8 transition-colors hover:text-white">
            <ArrowLeft size={16} /> All Services
          </Link>
          
          <div>
            <div className="w-[50px] h-[50px] bg-white/10 border border-white/20 rounded-xl flex items-center justify-center mb-6">
              <IconComponent size={24} color="white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2">{service.title}</h1>
            <p className="text-lg md:text-[1.1rem] text-white/80 font-normal">{service.subtitle}</p>
          </div>
        </motion.div>
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
            {service.description}
          </p>

          <h3 className="text-2xl font-extrabold text-white mb-8">What We Offer</h3>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {service.offers.map((offer, idx) => (
              <motion.div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-lg flex items-start gap-4 text-[0.9rem] text-slate-300 leading-relaxed font-medium transition-transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(14,165,233,0.15)]" variants={fadeInUp}>
                <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
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
          {/* TEACHING & FACULTY - Process / Methodology */}
          {(service.methodology || service.selectionProcess) && (
            <div className="mb-16">
              <h3 className="text-2xl font-extrabold text-white mb-8">Our Process</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(service.methodology || service.selectionProcess).map((item, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-xl relative overflow-hidden group hover:border-sky-500/50 transition-colors">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-sky-500/10 rounded-bl-full flex items-start justify-end p-3">
                      <span className="text-sky-500 font-extrabold text-xl group-hover:scale-110 transition-transform">{item.step}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{item.title || item.action}</h4>
                    {item.desc && <p className="text-slate-400 text-[0.9rem] leading-relaxed">{item.desc}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TRAINING - Technologies */}
          {service.technologies && (
            <div className="mb-16">
              <h3 className="text-2xl font-extrabold text-white mb-8">Technologies We Cover</h3>
              <div className="flex flex-wrap gap-3">
                {service.technologies.map((tech, idx) => (
                  <span key={idx} className="bg-sky-500/10 border border-sky-500/30 text-sky-400 px-5 py-2.5 rounded-full font-bold text-sm hover:bg-sky-500 hover:text-slate-900 transition-all cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* BOOTCAMPS - Curriculum Highlights */}
          {service.curriculumHighlights && (
            <div className="mb-16">
              <h3 className="text-2xl font-extrabold text-white mb-8">Curriculum Highlights</h3>
              <div className="space-y-4">
                {service.curriculumHighlights.map((curr, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-lg flex items-center gap-6 hover:bg-white/10 transition-colors">
                    <span className="bg-yellow-400 text-slate-900 px-4 py-1.5 rounded font-extrabold text-sm min-w-[110px] text-center shadow-sm">{curr.week}</span>
                    <span className="text-slate-300 font-medium text-[1.05rem]">{curr.focus}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TWO COLUMN MIXED METADATA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            {/* Outcomes */}
            {(service.keyOutcomes || service.careerOutcomes) && (
              <div>
                <h3 className="text-xl font-extrabold text-white mb-6">Key Outcomes</h3>
                <ul className="space-y-4 bg-white/5 border border-white/10 p-6 rounded-xl">
                  {(service.keyOutcomes || service.careerOutcomes).map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300 text-[0.95rem] font-medium"><CheckCircle2 className="text-yellow-400 shrink-0 mt-0.5" size={20} /> {outcome}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Target Audience / Alignment */}
            {(service.targetAudience || service.industryAlignment) && (
              <div>
                <h3 className="text-xl font-extrabold text-white mb-6">Target Alignment</h3>
                <div className="bg-gradient-to-br from-sky-900/40 to-indigo-900/40 border border-sky-500/20 p-6 rounded-xl h-full">
                  <p className="text-slate-300 leading-relaxed text-[1rem]">
                    {service.targetAudience || service.industryAlignment}
                  </p>
                </div>
              </div>
            )}
            
            {/* Platforms / Prerequisites */}
            {(service.platformsUsed || service.prerequisites) && (
              <div>
                <h3 className="text-xl font-extrabold text-white mb-6">{service.platformsUsed ? 'Platforms Used' : 'Prerequisites'}</h3>
                <ul className="space-y-4 bg-white/5 border border-white/10 p-6 rounded-xl">
                  {(service.platformsUsed || service.prerequisites).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300 text-[0.95rem] font-medium"><CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} /> {item}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Domains / Expertise */}
            {(service.guestSpeakerDomains || service.facultyDomains) && (
              <div>
                <h3 className="text-xl font-extrabold text-white mb-6">Expertise Domains</h3>
                <div className="flex flex-wrap gap-2">
                  {(service.guestSpeakerDomains || service.facultyDomains).map((domain, idx) => (
                    <span key={idx} className="bg-white/10 border border-white/5 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">{domain}</span>
                  ))}
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
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-indigo-500/10 pointer-events-none" />
            <h3 className="text-2xl md:text-[1.8rem] font-bold mb-4 relative z-10">Interested in this service?</h3>
            <p className="text-white/80 mb-8 text-[1.05rem] relative z-10">Get in touch with us to discuss how we can help your institution.</p>
            <Link to="/contact" className="relative z-10 inline-block bg-yellow-400 text-slate-900 py-3.5 px-8 rounded-lg font-bold no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-[0_10px_30px_rgba(250,204,21,0.3)]">Contact Us</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceDetail;
