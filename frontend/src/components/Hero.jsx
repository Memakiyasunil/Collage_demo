import React from 'react';
import { GraduationCap, ArrowRight, Check, Star, Code, Briefcase } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { slideInLeft, slideInRight, staggerContainer, fadeInUp, floatAnimation, rotateIn } from '../utils/animations';

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <section className="relative min-h-[100vh] flex items-center pt-32 pb-16 overflow-hidden bg-[#0b1120]">

      {/* Advanced Background Constructive Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <motion.div style={{ y: y1 }} className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen"></motion.div>
        <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[100px] mix-blend-screen"></motion.div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-left"
          >
            {/* Floating Badge */}
            <motion.div
              variants={slideInLeft}
              className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-full px-5 py-2 mb-8 shadow-xl"
            >
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </div>
              <span className="text-slate-300 text-sm font-bold tracking-wide">
                Admissions Open 2026-2027
              </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight flex flex-col">
              <div className="flex flex-wrap overflow-hidden">
                {["Transform", "Your"].map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 * i }}
                    className="mr-4 inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
              
              <div className="flex flex-wrap overflow-hidden mt-2 relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 relative flex flex-wrap">
                  {["Future", "With", "IT"].map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 + 0.1 * i }}
                      className="mr-4 inline-block"
                    >
                      {word}
                    </motion.span>
                  ))}
                  <motion.svg 
                    className="absolute w-full h-4 -bottom-2 left-0 text-amber-500 z-[-1]" 
                    preserveAspectRatio="none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
                  >
                    <path d="M0 50 Q 50 100 100 50" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
                  </motion.svg>
                </span>
              </div>
              
              <div className="flex flex-wrap overflow-hidden mt-2">
                {["Education"].map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 + 0.1 * i }}
                    className="mr-4 inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed mb-10 font-medium"
            >
              Explore industry-oriented courses from top universities.
              Build your career with expert guidance, practical skills,
              and 100% placement assistance.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5 mb-16">
              <button className="relative overflow-hidden group bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(251,191,36,0.5)]">
                <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                  Explore Programs
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
              </button>

              <button className="relative overflow-hidden group bg-slate-800/50 backdrop-blur-md border border-slate-700 px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800 hover:shadow-xl hover:border-slate-600">
                <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                  Book Counseling
                </span>
              </button>
            </motion.div>

            {/* Social Proof */}
            <motion.div variants={fadeInUp} className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1,2,3,4].map((i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-[#0b1120] bg-slate-700 flex items-center justify-center overflow-hidden z-[${5-i}]`}>
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Student" loading="lazy" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-sm font-medium text-slate-400">
                <span className="text-white font-bold">5,000+</span> students enrolled
              </div>
            </motion.div>
          </motion.div>

          {/* Right Constructive UI Grid */}
          <motion.div 
            className="relative hidden lg:block h-[600px] w-full"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Center Main Card */}
            <motion.div 
              variants={rotateIn}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-[420px] bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-700/50 z-20 flex flex-col justify-between"
            >
              <div className="w-full h-48 bg-slate-700 rounded-2xl overflow-hidden mb-6 relative group">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" alt="Students" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Full Stack Bootcamp</h3>
                <p className="text-sm text-slate-400 leading-relaxed">Master MERN stack with 10+ live projects and 100% placement guarantee.</p>
              </div>
            </motion.div>

            {/* Floating Element 1 - Top Right */}
            <motion.div 
              variants={floatAnimation}
              className="absolute top-10 right-0 w-64 bg-slate-800/80 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border border-slate-700/50 z-30"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <Code size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold">Practical Learning</h4>
                  <p className="text-xs text-slate-400 mt-1">Industry-aligned curriculum</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Element 2 - Bottom Left */}
            <motion.div 
              variants={floatAnimation}
              style={{ animationDelay: '2s' }}
              className="absolute bottom-10 left-0 w-56 bg-slate-800/80 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border border-slate-700/50 z-30"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold">Job Ready</h4>
                  <p className="text-xs text-slate-400 mt-1">Placement Assistance</p>
                </div>
              </div>
            </motion.div>
            
            {/* Decorative Ring */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-slate-700/30 border-dashed z-10 animate-[spin_40s_linear_infinite]" 
            />

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
