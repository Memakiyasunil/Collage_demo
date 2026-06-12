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
            <Link to="/contact" className="relative z-10 inline-block bg-sky-600 text-white py-3.5 px-8 rounded-lg font-semibold no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-500 hover:shadow-[0_10px_30px_rgba(14,165,233,0.3)]">Contact Us</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceDetail;
