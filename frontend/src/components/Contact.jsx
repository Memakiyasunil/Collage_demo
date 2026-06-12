import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { slideInLeft, slideInRight, fadeInUp } from '../utils/animations';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    university: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', city: '', university: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClasses = "w-full px-4 py-3 border border-white/20 rounded-lg text-[0.95rem] text-white transition-all duration-200 bg-white/10 focus:outline-none focus:border-sky-500 focus:bg-white/15 focus:ring-[3px] focus:ring-sky-500/10 placeholder-slate-400";
  const labelClasses = "block text-xs font-bold text-slate-400 mb-2 tracking-wide uppercase";

  return (
    <div className="bg-slate-950 min-h-screen pb-20 font-sans">
      {/* Top Banner */}
      <motion.div
        className="bg-slate-900 py-12 pt-32 border-b border-white/10 mb-12 border-t-4 border-t-sky-500 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-8 relative z-10 text-center">
          <span className="text-xs font-bold tracking-widest text-sky-400 uppercase mb-4 block">CONTACT</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">Get in Touch</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Have questions? Fill out the form below or reach us through any of our contact channels.
          </p>
        </div>
      </motion.div>

      <section className="overflow-hidden" id="contact">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-8 items-start relative z-10">
          {/* Contact Info (Left Side) */}
          <motion.div 
            className="lg:flex-[0_0_350px] flex flex-col sm:flex-row sm:flex-wrap lg:flex-col gap-6 w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={slideInLeft}
          >
            <div className="bg-white/5 p-6 rounded-xl flex gap-4 items-start shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/10 flex-1 sm:basis-[calc(50%-0.75rem)] lg:basis-auto">
              <div className="w-10 h-10 bg-sky-500/10 rounded-lg flex items-center justify-center shrink-0 text-sky-400">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="text-[0.95rem] font-bold text-white mb-1">Visit Us</h3>
                <p className="text-[0.85rem] text-slate-400 leading-relaxed">18, Vitthal Plaza, 4th Floor, Opp. GEB Office, Dehgam Road, Nava Naroda, Ahmedabad 382330<br/>Mon-Sat, 9 AM - 6 PM</p>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-xl flex gap-4 items-start shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/10 flex-1 sm:basis-[calc(50%-0.75rem)] lg:basis-auto">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center shrink-0 text-emerald-400">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="text-[0.95rem] font-bold text-white mb-1">Call Us</h3>
                <p className="text-[0.85rem] text-slate-400 leading-relaxed">+91 93775 77596<br/>+91 93775 77597</p>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-xl flex gap-4 items-start shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/10 flex-1 sm:basis-[calc(50%-0.75rem)] lg:basis-auto">
              <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center shrink-0 text-pink-400">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="text-[0.95rem] font-bold text-white mb-1">Email Us</h3>
                <p className="text-[0.85rem] text-slate-400 leading-relaxed">info@educationforce.com<br/>We reply within 24 hours</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form (Right Side) */}
          <motion.div 
            className="flex-1 w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={slideInRight}
          >
            <div className="bg-white/5 p-6 lg:p-10 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/10">
              <h2 className="text-2xl font-extrabold text-white mb-1">Send Us a Message</h2>
              <p className="text-sm text-slate-400 mb-8">Fill in your details and our team will reach out to you within 24 hours.</p>
              
              {isSubmitted && <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 p-4 rounded-lg mb-6 font-medium text-sm text-center">Thank you! Your message has been sent successfully.</div>}

              <form onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row gap-0 sm:gap-6">
                  <div className="mb-6 flex-1">
                    <label className={labelClasses}>FULL NAME <span className="text-pink-500">*</span></label>
                    <input type="text" name="name" required placeholder="e.g. Rahul Sharma" value={formData.name} onChange={handleChange} className={inputClasses} />
                  </div>
                  <div className="mb-6 flex-1">
                    <label className={labelClasses}>EMAIL ADDRESS</label>
                    <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} className={inputClasses} />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-0 sm:gap-6">
                  <div className="mb-6 flex-1">
                    <label className={labelClasses}>MOBILE NUMBER <span className="text-pink-500">*</span></label>
                    <input type="tel" name="phone" required placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} className={inputClasses} />
                  </div>
                  <div className="mb-6 flex-1">
                    <label className={labelClasses}>CITY</label>
                    <input type="text" name="city" placeholder="Your city" value={formData.city} onChange={handleChange} className={inputClasses} />
                  </div>
                </div>

                <div className="mb-6">
                  <label className={labelClasses}>SELECT UNIVERSITY</label>
                  <div className="relative">
                    <select name="university" value={formData.university} onChange={handleChange} className={`${inputClasses} appearance-none cursor-pointer pr-10`}>
                      <option value="" className="bg-slate-800 text-white">Select a university (optional)</option>
                      <option value="Gandhinagar University" className="bg-slate-800 text-white">Gandhinagar University</option>
                      <option value="Vidhyadeep University" className="bg-slate-800 text-white">Vidhyadeep University</option>
                      <option value="Shreyarth University" className="bg-slate-800 text-white">Shreyarth University</option>
                      <option value="Rai University" className="bg-slate-800 text-white">Rai University</option>
                      <option value="Monark University" className="bg-slate-800 text-white">Monark University</option>
                      <option value="The New Progressive College" className="bg-slate-800 text-white">The New Progressive College</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className={labelClasses}>YOUR MESSAGE</label>
                  <textarea name="message" rows="4" placeholder="Tell us how we can help you..." value={formData.message} onChange={handleChange} className={inputClasses}></textarea>
                </div>

                <button type="submit" className="w-full bg-sky-600 text-white border-none rounded-lg p-4 text-base font-semibold cursor-pointer flex items-center justify-center gap-2 transition-colors hover:bg-sky-500">
                  <Send size={16} /> Submit Enquiry
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
