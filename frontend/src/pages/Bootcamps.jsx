import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Rocket, Code2, Cpu, Database, Globe, Smartphone, Shield,
  Zap, Clock, Users, Award, Star, CheckCircle2, ArrowRight,
  Play, ChevronRight, BookOpen, Target, TrendingUp, Trophy,
  Calendar, DollarSign, Laptop, Layers, Flame
} from 'lucide-react';
import { staggerContainer, fadeInUp, slideInLeft, slideInRight, scaleUp } from '../utils/animations';

/* ── DATA ───────────────────────────────────────────────────── */
const bootcamps = [
  {
    id: 1,
    title: "Full Stack Web Dev",
    duration: "12 Weeks",
    level: "Beginner → Pro",
    seats: "30 Seats",
    price: "₹24,999",
    badge: "🔥 Bestseller",
    badgeColor: "from-orange-500 to-red-600",
    accent: "from-sky-500 to-blue-600",
    glow: "rgba(14,165,233,0.3)",
    border: "border-sky-500/30",
    icon: Globe,
    img: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?auto=format&fit=crop&w=900&q=80",
    tags: ["React", "Node.js", "MongoDB", "Express", "REST APIs", "Deployment"],
    outcomes: ["Junior Full Stack Developer", "Freelance Web Dev", "₹6–12 LPA starting package"],
    nextBatch: "July 15, 2026",
    rating: 4.9,
    students: 842,
    desc: "Go from absolute zero to deploying production-grade full stack apps. Build 5+ real projects that go straight into your portfolio.",
  },
  {
    id: 2,
    title: "AI & Machine Learning",
    duration: "10 Weeks",
    level: "Intermediate",
    seats: "25 Seats",
    price: "₹34,999",
    badge: "⚡ New Batch",
    badgeColor: "from-violet-500 to-purple-700",
    accent: "from-violet-500 to-purple-600",
    glow: "rgba(139,92,246,0.3)",
    border: "border-violet-500/30",
    icon: Cpu,
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=900&q=80",
    tags: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "LLMs", "MLOps"],
    outcomes: ["ML Engineer", "AI Researcher", "₹12–22 LPA starting package"],
    nextBatch: "Aug 1, 2026",
    rating: 4.8,
    students: 534,
    desc: "Master the fundamentals of AI — from classical ML to deploying LLM-powered applications. Industry-led by engineers from Google & Meta.",
  },
  {
    id: 3,
    title: "Data Science & Analytics",
    duration: "8 Weeks",
    level: "Beginner",
    seats: "35 Seats",
    price: "₹19,999",
    badge: "📊 Top Rated",
    badgeColor: "from-emerald-500 to-teal-600",
    accent: "from-emerald-500 to-teal-500",
    glow: "rgba(16,185,129,0.3)",
    border: "border-emerald-500/30",
    icon: Database,
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    tags: ["Python", "Pandas", "SQL", "PowerBI", "Tableau", "Statistics"],
    outcomes: ["Data Analyst", "Business Analyst", "₹7–14 LPA starting package"],
    nextBatch: "July 20, 2026",
    rating: 4.9,
    students: 1241,
    desc: "Turn raw data into business decisions. Learn data wrangling, visualization, statistics, and storytelling with data — fully hands-on.",
  },
  {
    id: 4,
    title: "Cyber Security",
    duration: "10 Weeks",
    level: "Intermediate",
    seats: "20 Seats",
    price: "₹29,999",
    badge: "🔒 High Demand",
    badgeColor: "from-rose-500 to-pink-600",
    accent: "from-rose-500 to-pink-500",
    glow: "rgba(244,63,94,0.3)",
    border: "border-rose-500/30",
    icon: Shield,
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80",
    tags: ["Ethical Hacking", "Penetration Testing", "CTF", "Network Security", "OWASP", "SOC"],
    outcomes: ["Security Analyst", "Penetration Tester", "₹10–18 LPA starting package"],
    nextBatch: "Aug 10, 2026",
    rating: 4.7,
    students: 367,
    desc: "Learn ethical hacking, penetration testing, and security operations. Train on real-world CTF challenges and get certified for the industry.",
  },
  {
    id: 5,
    title: "Mobile App Dev",
    duration: "8 Weeks",
    level: "Beginner → Mid",
    seats: "25 Seats",
    price: "₹22,999",
    badge: "📱 Trending",
    badgeColor: "from-amber-500 to-orange-500",
    accent: "from-amber-500 to-orange-500",
    glow: "rgba(245,158,11,0.3)",
    border: "border-amber-500/30",
    icon: Smartphone,
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80",
    tags: ["React Native", "Expo", "Flutter", "Firebase", "App Store Publish", "REST APIs"],
    outcomes: ["Mobile Developer", "App Freelancer", "₹7–15 LPA starting package"],
    nextBatch: "Aug 5, 2026",
    rating: 4.8,
    students: 489,
    desc: "Build cross-platform iOS + Android apps from scratch. Launch your own app on the Play Store before the bootcamp ends.",
  },
  {
    id: 6,
    title: "Cloud & DevOps",
    duration: "10 Weeks",
    level: "Intermediate",
    seats: "20 Seats",
    price: "₹27,999",
    badge: "☁️ Industry Pick",
    badgeColor: "from-cyan-500 to-sky-600",
    accent: "from-cyan-500 to-sky-500",
    glow: "rgba(6,182,212,0.3)",
    border: "border-cyan-500/30",
    icon: Layers,
    img: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=900&q=80",
    tags: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "GitHub Actions"],
    outcomes: ["DevOps Engineer", "Cloud Architect", "₹12–20 LPA starting package"],
    nextBatch: "Sept 1, 2026",
    rating: 4.8,
    students: 298,
    desc: "Master the cloud stack — from containerisation to cloud infrastructure. Prepare for AWS/Azure certifications with real project labs.",
  },
];

const curriculum = [
  { week: "Week 1–2", title: "Foundations", desc: "Core programming concepts, dev environment setup, Git & GitHub.", icon: BookOpen, color: "from-sky-500 to-blue-600" },
  { week: "Week 3–5", title: "Core Frameworks", desc: "Deep-dive into the main tech stack with structured projects.", icon: Code2, color: "from-violet-500 to-purple-600" },
  { week: "Week 6–8", title: "Backend & Databases", desc: "APIs, databases, authentication, and server-side development.", icon: Database, color: "from-emerald-500 to-teal-600" },
  { week: "Week 9–10", title: "Integrations", desc: "Third-party services, payment gateways, real-time features.", icon: Layers, color: "from-amber-500 to-orange-600" },
  { week: "Week 11–12", title: "Capstone & Deploy", desc: "Build, polish, and deploy your final project to production.", icon: Rocket, color: "from-rose-500 to-pink-600" },
];

const whyUs = [
  { icon: Target, title: "Industry-Led Curriculum", desc: "Every module is designed by engineers from Google, Amazon, and Microsoft — not just academics.", color: "from-sky-500 to-blue-600" },
  { icon: Users, title: "Small Batch Sizes", desc: "Max 30 students per batch means you get real mentoring, not just recorded lectures.", color: "from-violet-500 to-purple-600" },
  { icon: Trophy, title: "Job Guarantee*", desc: "We are so confident in our program that we offer a job guarantee or full fee refund.", color: "from-amber-500 to-orange-500" },
  { icon: Laptop, title: "Live + Recorded", desc: "All sessions are live with industry mentors. Recordings available 24/7 for revision.", color: "from-emerald-500 to-teal-600" },
  { icon: Flame, title: "Real Projects", desc: "Build 5+ production projects during the bootcamp. Walk away with an industry-ready portfolio.", color: "from-rose-500 to-pink-600" },
  { icon: TrendingUp, title: "Placement Support", desc: "Resume reviews, mock interviews, and direct referrals to our 150+ company network.", color: "from-cyan-500 to-sky-600" },
];

const testimonials = [
  { name: "Priya Mehta", role: "Full Stack Dev @ Razorpay", img: "https://i.pravatar.cc/200?img=5", bootcamp: "Full Stack Web Dev", pkg: "₹16 LPA", text: "I went from a non-CS background to a Full Stack role in 4 months. The projects I built during the bootcamp are literally what got me the interview at Razorpay." },
  { name: "Aarav Shah", role: "ML Engineer @ PhonePe", img: "https://i.pravatar.cc/200?img=11", bootcamp: "AI & ML Bootcamp", pkg: "₹22 LPA", text: "The AI bootcamp is elite. We were training real models by Week 3. My capstone project was a production LLM chatbot I presented at my interview." },
  { name: "Neha Joshi", role: "Data Analyst @ Swiggy", img: "https://i.pravatar.cc/200?img=9", bootcamp: "Data Science Bootcamp", pkg: "₹12 LPA", text: "Best decision of my career. The hands-on SQL + Python combo and the Tableau dashboards I built got me placed before the bootcamp even ended!" },
];

/* ── ANIMATED 3D CARD ────────────────────────────────────── */
const BootcampCard = ({ bc, i }) => {
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 250, damping: 18 });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 250, damping: 18 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { x.set(0); y.set(0); setHovered(false); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, type: "spring", stiffness: 80 }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      className="perspective-1000"
    >
      <div
        className={`group relative bg-slate-800/50 backdrop-blur-xl border ${bc.border} rounded-[1.75rem] overflow-hidden transition-all duration-500 flex flex-col`}
        style={{ boxShadow: hovered ? `0 30px 60px ${bc.glow}` : '0 4px 20px rgba(0,0,0,0.3)' }}
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <motion.img
            src={bc.img} alt={bc.title}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ opacity: 0.7 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          {/* Badge */}
          <motion.span
            animate={{ y: hovered ? -2 : 0 }}
            className={`absolute top-4 left-4 bg-gradient-to-r ${bc.badgeColor} text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg`}
          >
            {bc.badge}
          </motion.span>

          {/* Next Batch */}
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
            <Calendar size={11} /> {bc.nextBatch}
          </div>

          {/* Icon */}
          <div className={`absolute top-4 right-4 w-11 h-11 rounded-2xl bg-gradient-to-br ${bc.accent} flex items-center justify-center shadow-lg`}
            style={{ transform: "translateZ(20px)" }}>
            <bc.icon size={20} className="text-white" />
          </div>
        </div>

        {/* Body */}
        <div className="p-7 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{bc.level}</span>
            <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
              <Star size={12} fill="currentColor" /> {bc.rating} ({bc.students.toLocaleString()} students)
            </div>
          </div>

          <h3 className={`text-xl font-extrabold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${bc.accent} transition-all duration-400`}>
            {bc.title}
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed mb-5">{bc.desc}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {bc.tags.slice(0, 4).map((tag, j) => (
              <span key={j} className="text-xs font-medium text-slate-300 bg-slate-700/60 px-3 py-1 rounded-full border border-slate-600/60">
                {tag}
              </span>
            ))}
            {bc.tags.length > 4 && (
              <span className="text-xs font-medium text-slate-500 px-2 py-1">+{bc.tags.length - 4} more</span>
            )}
          </div>

          {/* Meta row */}
          <div className="flex gap-4 mb-6 text-sm flex-wrap border-t border-white/5 pt-5">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock size={14} className="text-sky-400" /> {bc.duration}
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Users size={14} className="text-violet-400" /> {bc.seats}
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 ml-auto">
              <DollarSign size={14} className="text-emerald-400" />
              <span className="text-white font-extrabold text-base">{bc.price}</span>
            </div>
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`mt-auto w-full bg-gradient-to-r ${bc.accent} text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all overflow-hidden relative`}
            style={{ boxShadow: `0 8px 24px ${bc.glow}` }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Enroll Now <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/10 -translate-x-full hover:translate-x-full transition-transform duration-700" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

/* ── PAGE ────────────────────────────────────────────────── */
const Bootcamps = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen bg-[#060b14] font-sans text-white overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Parallax BG */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80"
            alt="Bootcamp Hero"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060b14]/30 via-[#060b14]/60 to-[#060b14]" />
        </motion.div>

        {/* Animated glow orbs */}
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[150px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-sky-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-fuchsia-600/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        {/* Floating code snippets */}
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 2, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-40 right-[10%] bg-slate-900/80 backdrop-blur-xl border border-violet-500/20 px-5 py-3 rounded-2xl shadow-xl hidden xl:block"
        >
          <code className="text-violet-400 text-sm font-mono">npm run bootcamp 🚀</code>
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [0, -2, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 right-[8%] bg-slate-900/80 backdrop-blur-xl border border-sky-500/20 px-5 py-3 rounded-2xl shadow-xl hidden xl:block"
        >
          <code className="text-sky-400 text-sm font-mono">{"const dream = hire();"}</code>
        </motion.div>
        <motion.div
          animate={{ y: [-8, 14, -8], rotate: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 2 }}
          className="absolute top-60 left-[5%] bg-slate-900/80 backdrop-blur-xl border border-emerald-500/20 px-5 py-3 rounded-2xl shadow-xl hidden xl:block"
        >
          <code className="text-emerald-400 text-sm font-mono">{"print('Hello, World!')"}</code>
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-8 pt-32 pb-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-500/10 border border-violet-500/30 mb-8">
                <Rocket size={14} className="text-violet-400" />
                <span className="text-violet-300 text-sm font-bold tracking-widest uppercase">Intensive Learning. Real Results.</span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6 tracking-tight">
                Launch Your Career<br />with Our
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-sky-400 to-fuchsia-500"> Bootcamps</span>
                  <motion.div
                    animate={{ scaleX: [0, 1, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", times: [0, 0.4, 0.8, 1] }}
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-violet-400 to-fuchsia-500 rounded-full origin-left"
                    style={{ width: '100%' }}
                  />
                </span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-xl text-slate-300 leading-relaxed mb-10 max-w-xl">
                6 industry-focused bootcamps. Expert mentors. Real projects. Career-changing outcomes. From zero to job-ready in as little as 8 weeks.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex gap-4 flex-wrap">
                <motion.a
                  href="#bootcamp-cards"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative overflow-hidden bg-gradient-to-r from-violet-500 via-fuchsia-500 to-sky-500 text-white font-bold px-10 py-4 rounded-xl shadow-[0_10px_40px_rgba(139,92,246,0.4)] flex items-center gap-2"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Bootcamps <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-slate-800/70 backdrop-blur-md border border-slate-700 text-white font-bold px-10 py-4 rounded-xl hover:bg-slate-700/70 transition-all flex items-center gap-2"
                >
                  <Play size={16} /> Watch Bootcamp Story
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Hero Stats Grid */}
            <motion.div
              initial="hidden" animate="visible" variants={staggerContainer}
              className="hidden lg:grid grid-cols-2 gap-5"
            >
              {[
                { v: "6", l: "Active Bootcamps", icon: Rocket, c: "from-violet-500 to-purple-600" },
                { v: "2,800+", l: "Students Placed", icon: Users, c: "from-sky-500 to-blue-600" },
                { v: "₹22 LPA", l: "Highest Package", icon: TrendingUp, c: "from-amber-500 to-orange-500" },
                { v: "94%", l: "Placement Rate", icon: Award, c: "from-emerald-500 to-teal-600" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  variants={scaleUp}
                  whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
                  className="group relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/60 p-7 rounded-3xl overflow-hidden cursor-default transition-all duration-400"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${s.c} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.c} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <s.icon size={22} className="text-white" />
                  </div>
                  <div className={`text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${s.c} mb-1 tracking-tight`}>{s.v}</div>
                  <div className="text-slate-400 text-sm font-medium">{s.l}</div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs"
        >
          <div className="w-0.5 h-8 bg-gradient-to-b from-slate-700 to-transparent" />
          Scroll Down
        </motion.div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────── */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={staggerContainer} className="text-center mb-16">
            <motion.span variants={fadeInUp} className="text-violet-400 font-bold tracking-widest uppercase text-sm mb-4 block">Why EduForge Bootcamps</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              More Than Just a <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-sky-400">Course</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 text-xl max-w-2xl mx-auto">Six reasons why 2,800+ students chose to transform their careers with us.</motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {whyUs.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -8, boxShadow: "0 25px 50px rgba(0,0,0,0.4)" }}
                className="group relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 p-8 rounded-3xl overflow-hidden cursor-default transition-all duration-400"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-400`}>
                  <item.icon size={28} className="text-white" />
                </div>
                <h3 className={`text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${item.color} transition-all duration-300`}>
                  {item.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                {/* Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BOOTCAMP CARDS ───────────────────────────────── */}
      <section id="bootcamp-cards" className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.span variants={fadeInUp} className="text-sky-400 font-bold tracking-widest uppercase text-sm mb-4 block">Choose Your Path</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-500">Bootcamps</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 text-xl max-w-2xl mx-auto">
              6 career-focused bootcamps. All mentor-led, project-based, and placement-guaranteed.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bootcamps.map((bc, i) => <BootcampCard key={bc.id} bc={bc} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── CURRICULUM TIMELINE ──────────────────────────── */}
      <section className="py-24 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-[#060b14] to-[#060b14]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div variants={slideInLeft}>
              <span className="text-fuchsia-400 font-bold tracking-widest uppercase text-sm mb-4 block">Program Structure</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                What You'll Learn<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-sky-400">Week by Week</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Every bootcamp follows a battle-tested progression — from fundamentals to fully deployed projects — designed with hiring managers.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-500 to-sky-500 text-white font-bold px-8 py-4 rounded-xl hover:-translate-y-1 transition-all shadow-[0_10px_30px_rgba(192,38,211,0.3)]">
                Download Curriculum <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div variants={slideInRight} className="relative">
              {/* Vertical line */}
              <div className="absolute left-[22px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 via-sky-500 to-emerald-500 opacity-30" />

              <div className="flex flex-col gap-6">
                {curriculum.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, type: "spring", stiffness: 80 }}
                    whileHover={{ x: 6 }}
                    className="group flex gap-5 items-start cursor-default"
                  >
                    <div className={`shrink-0 w-11 h-11 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg z-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                      <item.icon size={18} className="text-white" />
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-5 flex-1 group-hover:border-slate-500 group-hover:bg-slate-800/80 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-bold">{item.title}</h4>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-white`}>{item.week}</span>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-14">
            <motion.span variants={fadeInUp} className="text-amber-400 font-bold tracking-widest uppercase text-sm mb-4 block">Alumni Stories</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-white">
              Bootcamp Grads <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Who Made It</span>
            </motion.h2>
          </motion.div>

          {/* Tab selectors */}
          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {testimonials.map((t, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTestimonial(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeTestimonial === i
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-[0_0_25px_rgba(245,158,11,0.35)]'
                  : 'bg-slate-800/60 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
                  }`}
              >
                <img src={t.img} alt={t.name} className="w-6 h-6 rounded-full object-cover" />
                {t.name.split(' ')[0]}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="group bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 md:p-14 grid grid-cols-1 lg:grid-cols-3 gap-10 items-center shadow-2xl hover:border-amber-500/20 transition-all duration-500"
            >
              {/* Left: Person */}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-md opacity-30 group-hover:opacity-60 animate-pulse transition-opacity" />
                  <img src={testimonials[activeTestimonial].img} alt={testimonials[activeTestimonial].name}
                    className="relative w-28 h-28 rounded-full object-cover border-4 border-amber-500/30 group-hover:border-amber-500/60 transition-colors" />
                </div>
                <h4 className="text-white font-extrabold text-xl mb-1">{testimonials[activeTestimonial].name}</h4>
                <p className="text-amber-400 font-semibold text-sm mb-2">{testimonials[activeTestimonial].role}</p>
                <span className="text-xs font-bold bg-violet-500/10 border border-violet-500/20 text-violet-300 px-3 py-1 rounded-full">
                  {testimonials[activeTestimonial].bootcamp}
                </span>
                <div className="mt-4 text-emerald-400 font-extrabold text-2xl">{testimonials[activeTestimonial].pkg}</div>
              </div>

              {/* Right: Quote */}
              <div className="lg:col-span-2">
                <div className="flex gap-1 text-amber-400 mb-5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <p className="text-xl md:text-2xl text-slate-200 leading-relaxed font-medium italic">
                  "{testimonials[activeTestimonial].text}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-28 px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80"
            alt="CTA Background" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-[#060b14]/80 to-sky-900/30" />
        </div>

        {/* Animated rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.5 + i * 0.3, 1], opacity: [0.1, 0, 0.1] }}
              transition={{ repeat: Infinity, duration: 3 + i, delay: i * 0.8 }}
              className={`absolute rounded-full border border-violet-500/30`}
              style={{ width: `${200 + i * 150}px`, height: `${200 + i * 150}px`, top: `${-(100 + i * 75)}px`, left: `${-(100 + i * 75)}px` }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-500/10 border border-violet-500/30 mb-8">
              <Zap size={14} className="text-violet-400" />
              <span className="text-violet-300 text-sm font-bold tracking-widest">Limited Seats Available</span>
            </motion.div>

            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Ready to Change<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-sky-400">
                Your Career?
              </span>
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-slate-300 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Join 2,800+ students who chose bootcamp learning over traditional degrees — and landed their dream jobs months, not years, later.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#bootcamp-cards"
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden bg-gradient-to-r from-violet-500 via-fuchsia-500 to-sky-500 text-white font-bold px-12 py-5 rounded-xl shadow-[0_10px_40px_rgba(139,92,246,0.4)] flex items-center gap-2 justify-center text-lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Browse All Bootcamps <ArrowRight size={20} />
                </span>
                <div className="absolute inset-0 bg-white/10 -translate-x-full hover:translate-x-full transition-transform duration-700" />
              </motion.a>
              <Link to="/contact"
                className="bg-slate-800/80 backdrop-blur-md border border-slate-700 text-white font-bold px-12 py-5 rounded-xl hover:-translate-y-1 hover:bg-slate-700/80 transition-all flex items-center gap-2 justify-center text-lg"
              >
                Talk to a Counselor
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Bootcamps;
