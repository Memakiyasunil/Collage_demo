import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { slideInLeft, slideInRight } from '../utils/animations';

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

  const inputClasses = "w-full px-4 py-3 border border-slate-200 rounded-lg text-[0.95rem] text-slate-700 transition-all duration-200 bg-slate-50 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-[3px] focus:ring-blue-500/10 placeholder-slate-300";
  const labelClasses = "block text-xs font-bold text-slate-500 mb-2 tracking-wide uppercase";

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Top Banner */}
      <div className="bg-blue-900 py-20 px-8 text-center text-white">
        <span className="text-xs font-bold tracking-widest text-blue-300 uppercase mb-4 block">CONTACT</span>
        <h1 className="text-5xl font-extrabold mb-4">Get in Touch</h1>
        <p className="text-lg text-blue-200 max-w-2xl mx-auto">
          Have questions? Fill out the form below or reach us through any of our contact channels.
        </p>
      </div>

      <section className="overflow-hidden" id="contact">
      <div className="max-w-6xl -mt-12 mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-8 items-start relative z-10">
        {/* Contact Info (Left Side) */}
        <motion.div 
          className="lg:flex-[0_0_350px] flex flex-col sm:flex-row sm:flex-wrap lg:flex-col gap-6 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={slideInLeft}
        >
            <div className="bg-white p-6 rounded-xl flex gap-4 items-start shadow-sm border border-slate-100 flex-1 sm:basis-[calc(50%-0.75rem)] lg:basis-auto">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 text-blue-500">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="text-[0.95rem] font-bold text-slate-900 mb-1">Visit Us</h3>
                <p className="text-[0.85rem] text-slate-500 leading-relaxed">18, Vitthal Plaza, 4th Floor, Opp. GEB Office, Dehgam Road, Nava Naroda, Ahmedabad 382330<br/>Mon-Sat, 9 AM - 6 PM</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl flex gap-4 items-start shadow-sm border border-slate-100 flex-1 sm:basis-[calc(50%-0.75rem)] lg:basis-auto">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 text-blue-500">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="text-[0.95rem] font-bold text-slate-900 mb-1">Call Us</h3>
                <p className="text-[0.85rem] text-slate-500 leading-relaxed">+91 93775 77596<br/>+91 93775 77597</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl flex gap-4 items-start shadow-sm border border-slate-100 flex-1 sm:basis-[calc(50%-0.75rem)] lg:basis-auto">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 text-blue-500">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="text-[0.95rem] font-bold text-slate-900 mb-1">Email Us</h3>
                <p className="text-[0.85rem] text-slate-500 leading-relaxed">info@educationforce.com<br/>We reply within 24 hours</p>
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
            <div className="bg-white p-6 lg:p-10 rounded-xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Send Us a Message</h2>
              <p className="text-sm text-slate-500 mb-8">Fill in your details and our team will reach out to you within 24 hours.</p>
              
              {isSubmitted && <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 font-medium text-sm">Thank you! Your message has been sent successfully.</div>}

              <form onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row gap-0 sm:gap-6">
                  <div className="mb-6 flex-1">
                    <label className={labelClasses}>FULL NAME <span className="text-red-500">*</span></label>
                    <input type="text" name="name" required placeholder="e.g. Rahul Sharma" value={formData.name} onChange={handleChange} className={inputClasses} />
                  </div>
                  <div className="mb-6 flex-1">
                    <label className={labelClasses}>EMAIL ADDRESS</label>
                    <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} className={inputClasses} />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-0 sm:gap-6">
                  <div className="mb-6 flex-1">
                    <label className={labelClasses}>MOBILE NUMBER <span className="text-red-500">*</span></label>
                    <input type="tel" name="phone" required placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} className={inputClasses} />
                  </div>
                  <div className="mb-6 flex-1">
                    <label className={labelClasses}>CITY</label>
                    <input type="text" name="city" placeholder="Your city" value={formData.city} onChange={handleChange} className={inputClasses} />
                  </div>
                </div>

                <div className="mb-6">
                  <label className={labelClasses}>SELECT UNIVERSITY</label>
                  <select name="university" value={formData.university} onChange={handleChange} className={`${inputClasses} appearance-none cursor-pointer`}>
                    <option value="">Select a university (optional)</option>
                    <option value="Gandhinagar University">Gandhinagar University</option>
                    <option value="Vidhyadeep University">Vidhyadeep University</option>
                    <option value="Shreyarth University">Shreyarth University</option>
                    <option value="Rai University">Rai University</option>
                    <option value="Monark University">Monark University</option>
                    <option value="The New Progressive College">The New Progressive College</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className={labelClasses}>YOUR MESSAGE</label>
                  <textarea name="message" rows="4" placeholder="Tell us how we can help you..." value={formData.message} onChange={handleChange} className={inputClasses}></textarea>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white border-none rounded-lg p-4 text-base font-semibold cursor-pointer flex items-center justify-center gap-2 transition-colors hover:bg-blue-700">
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
