import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, BookOpen, GraduationCap, DollarSign, Laptop, Briefcase, MessageSquare, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from '../utils/animations';

const faqCategories = [
  { id: 'all', label: 'All Questions', icon: HelpCircle },
  { id: 'admissions', label: 'Admissions', icon: GraduationCap },
  { id: 'programs', label: 'Programs', icon: BookOpen },
  { id: 'fees', label: 'Fees & Finance', icon: DollarSign },
  { id: 'technology', label: 'Technology', icon: Laptop },
  { id: 'placement', label: 'Placements', icon: Briefcase },
];

const faqs = [
  {
    id: 1, category: 'admissions',
    q: 'When does the admissions process open for the new academic batch?',
    a: 'Admissions for the new batch typically open in March-April each year. Applications are accepted on a rolling basis until seats are filled. We highly recommend applying early to secure your preferred specialization.',
  },
  {
    id: 2, category: 'admissions',
    q: 'What are the eligibility criteria for UG and PG programs?',
    a: 'For UG programs (B.Tech, BCA, BBA-IT), students must have completed 10+2 with a minimum of 50% aggregate. For PG programs (MCA, MBA, M.Tech), a relevant bachelor\'s degree with 55% is required. Lateral entry is also available for diploma holders.',
  },
  {
    id: 3, category: 'programs',
    q: 'Are the courses recognized by UGC, AICTE, or other government bodies?',
    a: 'Yes. All our affiliated degree programs are approved by AICTE and recognized by UGC, GTU, and relevant state universities. Our professional certification tracks are also accredited by globally recognized bodies like CompTIA, AWS, and Google.',
  },
  {
    id: 4, category: 'programs',
    q: 'What is the difference between Integrated Programs and regular degree programs?',
    a: 'Our Integrated Programs (e.g., B.Tech + MBA, BCA + MCA) are designed to be completed in a shorter duration with a specialized, industry-focused curriculum. They combine the theoretical foundation of a degree with the practical depth of a postgraduate qualification.',
  },
  {
    id: 5, category: 'programs',
    q: 'Do you offer weekend or part-time courses for working professionals?',
    a: 'Absolutely! We offer flexible weekend batches for most of our professional certification and diploma courses. Our Online Learning Programs also provide fully asynchronous content so you can learn at your own pace.',
  },
  {
    id: 6, category: 'fees',
    q: 'Are there any scholarships or EMI options available for the fee payment?',
    a: 'Yes. We offer merit-based scholarships covering up to 50% of tuition fees. Additionally, we have partnerships with leading banks (HDFC, SBI, ICICI) to provide zero-cost EMI options. A single scholarship form covers all relevant programs.',
  },
  {
    id: 7, category: 'fees',
    q: 'What does the program fee typically include?',
    a: 'The program fee covers all teaching sessions, lab access, learning materials, project mentorship, hackathon participation, placement support, and your certification exam fee. There are no hidden charges.',
  },
  {
    id: 8, category: 'technology',
    q: 'What labs and technology infrastructure is available on campus?',
    a: 'Our campus features dedicated AI/ML Labs, IoT & Robotics Labs, Cloud Computing Labs, Cybersecurity Labs, AR/VR Innovation Labs, and a state-of-the-art Data Center. All labs run the latest hardware and licensed enterprise software.',
  },
  {
    id: 9, category: 'technology',
    q: 'Do students get access to cloud platforms and enterprise software?',
    a: 'Yes. Every enrolled student gets free access to AWS Educate, Microsoft Azure for Students, GitHub Education Pack, JetBrains IDEs, and more — worth over ₹50,000 in industry-standard tools.',
  },
  {
    id: 10, category: 'placement',
    q: 'What is the average and highest placement package for your students?',
    a: 'Our recent batch had an average package of ₹8.5 LPA and the highest was ₹42 LPA at a FAANG company. Over 150 companies visited our campus last year for placements and internship drives.',
  },
  {
    id: 11, category: 'placement',
    q: 'What support is provided for placements and internships?',
    a: 'Our dedicated Placement Cell runs resume workshops, aptitude training, mock technical interviews, soft skills sessions, and company-specific preparation. We also have direct tie-ups with 150+ companies for guaranteed internship opportunities.',
  },
  {
    id: 12, category: 'placement',
    q: 'Is placement assistance available after the course is completed?',
    a: 'Yes! Our alumni network and placement portal remain open to all graduates for life. We continue to share job openings, referrals, and alumni networking opportunities even after course completion.',
  },
];

const FAQs = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openId, setOpenId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = faqs.filter(f => {
    const matchesCat = activeCategory === 'all' || f.category === activeCategory;
    const matchesSearch = f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#060b14] font-sans text-white overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-8 overflow-hidden">
        {/* BG Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80"
            alt="FAQ Background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060b14]/80 to-[#060b14]" />
        </div>
        {/* Glow orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-sky-600/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-600/15 rounded-full blur-[100px] pointer-events-none" />
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 text-sky-400 font-bold tracking-widest uppercase text-sm mb-6">
              <HelpCircle size={16} /> Help Center
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
              Frequently Asked
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500">
                Questions
              </span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto">
              Everything you need to know about our programs, admissions, fees, and more. Can't find what you're looking for?
              <Link to="/contact" className="text-sky-400 font-bold ml-1 hover:text-sky-300">Contact us directly.</Link>
            </motion.p>

            {/* Search Bar */}
            <motion.div variants={fadeInUp} className="relative max-w-xl mx-auto">
              <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/70 backdrop-blur-xl border border-slate-700 rounded-2xl pl-14 pr-6 py-4 text-white text-base focus:outline-none focus:border-sky-500 transition-colors placeholder-slate-500"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORY PILLS ──────────────────────────────── */}
      <section className="pb-6 px-8">
        <div className="max-w-5xl mx-auto flex gap-3 flex-wrap justify-center">
          {faqCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeCategory === cat.id
                ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-[0_0_20px_rgba(14,165,233,0.3)]'
                : 'bg-slate-800/60 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
                }`}
            >
              <cat.icon size={15} />
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── FAQ ACCORDION ───────────────────────────────── */}
      <section className="py-10 px-8 pb-24">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <HelpCircle size={48} className="text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">No results found. Try a different search term or category.</p>
              </motion.div>
            ) : (
              filtered.map((faq, i) => (
                <motion.div
                  key={faq.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className={`bg-slate-800/40 backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-300 ${openId === faq.id ? 'border-sky-500/50' : 'border-slate-700/60 hover:border-slate-600'}`}
                >
                  <button
                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  >
                    <span className={`text-base font-semibold leading-snug transition-colors ${openId === faq.id ? 'text-sky-400' : 'text-white'}`}>
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: openId === faq.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${openId === faq.id ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-700/60 text-slate-400'}`}
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 border-t border-white/5 pt-4">
                          <p className="text-slate-300 leading-relaxed text-[0.95rem]">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── STILL HAVE QUESTIONS ─────────────────────────── */}
      <section className="py-20 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/20 via-[#060b14] to-indigo-900/20" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <motion.div variants={fadeInUp} className="lg:col-span-1 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Still Have<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Questions?</span></h2>
              <p className="text-slate-400 leading-relaxed">Our counselors are available Mon–Sat, 9 AM – 7 PM to help you make the right decision.</p>
            </motion.div>
            {[
              { icon: MessageSquare, title: 'Chat with Counselor', desc: 'Start a live chat session right now', cta: 'Start Chat', color: 'from-sky-500 to-blue-600' },
              { icon: GraduationCap, title: 'Book Free Session', desc: 'Schedule a 1-on-1 guidance call', cta: 'Book Now', color: 'from-violet-500 to-indigo-600' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-8 rounded-3xl hover:-translate-y-1 transition-all duration-300 group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon size={24} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm mb-5 leading-relaxed">{item.desc}</p>
                <Link to="/contact" className={`inline-flex items-center gap-2 bg-gradient-to-r ${item.color} text-white px-5 py-2.5 rounded-full text-sm font-bold hover:-translate-y-0.5 transition-all`}>
                  {item.cta} <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQs;
