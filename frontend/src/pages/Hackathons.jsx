import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../utils/animations';
import { Code2, Trophy, Clock, Users, ArrowRight, Zap } from 'lucide-react';

const hackathons = [
  {
    id: 1,
    title: "Global AI Challenge 2026",
    date: "Aug 15 - 17, 2026",
    prize: "₹5,00,000",
    participants: "1200+",
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    color: "from-sky-400 to-indigo-500",
    bg: "bg-sky-500/10"
  },
  {
    id: 2,
    title: "Web3 Innovate Fest",
    date: "Sep 05 - 06, 2026",
    prize: "₹3,00,000",
    participants: "800+",
    status: "Registration Open",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    color: "from-fuchsia-400 to-purple-600",
    bg: "bg-fuchsia-500/10"
  },
  {
    id: 3,
    title: "FinTech Appathon",
    date: "Oct 10 - 12, 2026",
    prize: "₹4,50,000",
    participants: "1500+",
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    color: "from-emerald-400 to-teal-500",
    bg: "bg-emerald-500/10"
  }
];

const pastWinners = [
  { team: "Code Ninjas", project: "AI Health Monitor", award: "1st Place - AI Challenge" },
  { team: "Byte Busters", project: "DeFi Wallet", award: "2nd Place - Web3 Fest" },
  { team: "Null Pointers", project: "Smart City Traffic", award: "1st Place - Smart City Hack" }
];

const Hackathons = () => {
  return (
    <div className="min-h-screen bg-[#0b1120] font-sans pt-32 pb-20 overflow-hidden relative">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-fuchsia-600/10 blur-[150px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[150px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 mb-6">
              <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse"></span>
              <span className="text-fuchsia-300 text-sm font-bold tracking-widest uppercase">Code. Compete. Conquer.</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-tight">
              Unleash Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-500">Inner Hacker</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-400 leading-relaxed font-medium mb-10">
              Join India's most thrilling hackathons. Solve real-world problems, win massive prizes, and get noticed by top tech companies looking for their next star developer.
            </motion.p>
            
            <motion.div variants={fadeInUp}>
              <button className="bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-900 font-bold px-8 py-4 rounded-full inline-flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                Register for Next Event <Zap size={20} />
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-[3rem] blur-2xl opacity-30 animate-pulse"></div>
            <img 
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80" 
              alt="Hackathon Coding" 
              className="relative rounded-[2rem] border border-slate-700/50 shadow-2xl object-cover w-full h-[500px]"
            />
          </motion.div>
        </div>

        {/* Upcoming Hackathons */}
        <motion.div className="mb-32" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Upcoming Hackathons</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Mark your calendars. The next big challenge is just around the corner.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hackathons.map((hack, idx) => (
              <motion.div 
                key={hack.id} 
                variants={fadeInUp}
                className="bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden group hover:border-cyan-500/50 transition-colors duration-300 relative"
              >
                <div className="h-48 relative overflow-hidden">
                  <img src={hack.image} alt={hack.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-600 text-xs font-bold text-cyan-400">
                    {hack.status}
                  </div>
                </div>
                <div className="p-8 relative">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">{hack.title}</h3>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-slate-400">
                      <Clock size={18} className="text-slate-500" /> <span>{hack.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <Trophy size={18} className="text-yellow-500" /> <span className="font-bold text-yellow-400">{hack.prize}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <Users size={18} className="text-slate-500" /> <span>{hack.participants} Registered</span>
                    </div>
                  </div>
                  <button className={`w-full py-3 rounded-xl font-bold transition-all bg-slate-800 text-white hover:bg-gradient-to-r hover:${hack.color} border border-slate-700 hover:border-transparent`}>
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Past Winners Banner */}
        <motion.div 
          className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/20 rounded-[3rem] p-12 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="flex flex-col lg:flex-row gap-12 items-center justify-between relative z-10">
            <div className="lg:w-1/3">
              <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 flex items-center justify-center text-yellow-400 mb-6">
                <Trophy size={32} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Hall of Fame</h3>
              <p className="text-slate-400">Celebrating the masterminds who conquered our previous challenges.</p>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {pastWinners.map((winner, idx) => (
                <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-2xl hover:-translate-y-2 transition-transform duration-300">
                  <div className="text-sky-400 font-bold mb-1">{winner.team}</div>
                  <div className="text-white text-lg font-semibold mb-3">{winner.project}</div>
                  <div className="text-slate-400 text-sm flex items-center gap-2">
                    <Trophy size={14} className="text-yellow-500" /> {winner.award}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Hackathons;
