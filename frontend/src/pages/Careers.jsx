import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HeartPulse, Target, GraduationCap, Briefcase, FileText, Zap, Award, Users, Search, CheckCircle } from 'lucide-react';
import JobApplicationModal from '../components/JobApplicationModal';

const jobsData = [
  {
    id: 1,
    title: 'Academic Counsellor',
    location: 'Ahmedabad',
    department: 'Counselling',
    type: 'Full-time',
    icon: <HeartPulse size={20} style={{ color: '#4ade80' }} />,
    description: 'We are looking for an empathetic and knowledgeable Academic Counsellor to guide prospective students in choosing the right IT specialization. You will be responsible for understanding student career goals and mapping them to our course offerings.',
    requirements: ['2+ years of experience in educational counselling', 'Excellent communication and listening skills', 'Understanding of the IT industry and career paths', 'Target-driven approach']
  },
  {
    id: 2,
    title: 'Business Development Executive',
    location: 'Ahmedabad',
    department: 'Sales',
    type: 'Full-time',
    icon: <Target size={20} style={{ color: '#a855f7' }} />,
    description: 'Join our high-performing sales team to drive student enrollments and establish corporate partnerships. You will be pitching our premium IT programs to a wide audience.',
    requirements: ['1-3 years of B2C sales experience', 'Proven track record of meeting targets', 'Strong negotiation and closing skills', 'Willingness to travel locally']
  },
  {
    id: 3,
    title: 'Business Development Manager - Gujarat',
    location: 'Ahmedabad',
    department: 'Sales',
    type: 'Full-time',
    icon: <Target size={20} style={{ color: '#a855f7' }} />,
    description: 'Lead the sales operations across Gujarat. You will manage a team of executives, devise regional strategies, and be directly responsible for the revenue growth in your territory.',
    requirements: ['5+ years of sales experience (EdTech preferred)', 'Experience managing a team of 5+', 'Deep understanding of the Gujarat market', 'Strategic planning and execution capabilities']
  },
  {
    id: 4,
    title: 'Business Head',
    location: 'Ahmedabad',
    department: 'Sales',
    type: 'Full-time',
    icon: <Briefcase size={20} style={{ color: '#f59e0b' }} />,
    description: 'A leadership role responsible for the overall P&L, operations, and strategic growth of the institute. You will work closely with the founders to scale our impact.',
    requirements: ['10+ years of experience in leadership roles', 'Strong financial acumen and P&L management', 'Visionary leadership and team-building skills', 'Extensive network in the IT/Education sector']
  },
  {
    id: 5,
    title: 'Faculty - MBA',
    location: 'Surat',
    department: 'Teaching',
    type: 'Full-time',
    icon: <GraduationCap size={20} style={{ color: '#3b82f6' }} />,
    description: 'We are seeking an experienced MBA faculty member to teach management subjects to our integrated IT & Management students. Bring real-world business cases into the classroom.',
    requirements: ['Ph.D. or Master’s degree in Business Administration', '3+ years of teaching experience', 'Industry experience is highly preferred', 'Ability to design engaging curriculum']
  },
  {
    id: 6,
    title: 'Faculty - B.Tech',
    location: 'Mahesana',
    department: 'Teaching',
    type: 'Full-time',
    icon: <GraduationCap size={20} style={{ color: '#3b82f6' }} />,
    description: 'Passionate about coding? Teach B.Tech students core subjects like Data Structures, Algorithms, Web Development, and AI.',
    requirements: ['M.Tech or Ph.D. in Computer Science', 'Strong proficiency in modern programming languages', 'Previous teaching or mentoring experience', 'Active GitHub profile or portfolio is a plus']
  },
  {
    id: 7,
    title: 'Admission Officer',
    location: 'Surat',
    department: 'Admissions',
    type: 'Full-time',
    icon: <Users size={20} style={{ color: '#ec4899' }} />,
    description: 'Manage the end-to-end admission process. You will assist students with documentation, fee processing, and onboarding.',
    requirements: ['Bachelor’s degree in any field', 'High attention to detail', 'Familiarity with CRM software', 'Good interpersonal skills']
  },
];

const Careers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All Positions');
  const [expandedJobId, setExpandedJobId] = useState(null);

  const filterTabs = [
    { name: 'All Positions', count: 12 },
    { name: 'Ahmedabad', count: 5 },
    { name: 'Mahesana', count: 3 },
    { name: 'Surat', count: 4 },
  ];

  const filteredJobs = activeTab === 'All Positions'
    ? jobsData
    : jobsData.filter(job => job.location === activeTab);

  return (
    <div className="font-sans bg-slate-950 min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#060b14] pt-32 pb-20 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-900/20 via-[#060b14] to-[#060b14] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-amber-400 font-bold tracking-widest uppercase text-sm mb-4 block">Careers at Edufordge</span>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">Shape the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Education</span></h1>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-8 max-w-lg font-medium">
              Join a team of passionate educators, technologists, and innovators. We're hiring across 3 cities to build the next generation of tech leaders.
            </p>
            <div className="flex gap-4">
              <button className="bg-sky-500 hover:bg-sky-400 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:-translate-y-1">View Open Roles</button>
            </div>
            
            <div className="flex items-center gap-6 text-base md:text-lg flex-wrap mt-12 border-t border-white/10 pt-8">
              <div><strong className="font-extrabold text-white text-2xl block mb-1">3</strong> <span className="text-slate-400 text-sm uppercase tracking-wider">Locations</span></div>
              <div className="w-px h-10 bg-white/10"></div>
              <div><strong className="font-extrabold text-white text-2xl block mb-1">4</strong> <span className="text-slate-400 text-sm uppercase tracking-wider">Departments</span></div>
              <div className="w-px h-10 bg-white/10"></div>
              <div><strong className="font-extrabold text-sky-400 text-2xl block mb-1">12</strong> <span className="text-slate-400 text-sm uppercase tracking-wider">Openings</span></div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative group">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" alt="Team Collaboration" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060b14] via-transparent to-transparent opacity-80" />
              
              {/* Floating Element */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-10 bg-slate-900/90 backdrop-blur-xl border border-slate-700 p-5 rounded-2xl shadow-2xl flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <HeartPulse className="text-emerald-400" size={24} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Great Culture</p>
                  <p className="text-slate-400 text-xs">Rated 4.8/5 on Glassdoor</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto py-10 px-4 md:px-8">
        {/* Filter Tabs */}
        <div className="flex gap-8 border-b border-slate-800 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {filterTabs.map((tab) => (
            <button
              key={tab.name}
              className={`bg-transparent py-4 text-base font-semibold cursor-pointer flex items-center gap-2 whitespace-nowrap transition-colors border-b-2 ${activeTab === tab.name ? 'text-sky-400 border-sky-400' : 'text-slate-500 border-transparent hover:text-white'}`}
              onClick={() => {
                setActiveTab(tab.name);
                setExpandedJobId(null);
              }}
            >
              {tab.name} <span className={`py-0.5 px-2 rounded-full text-xs font-bold ${activeTab === tab.name ? 'bg-sky-500/20 text-sky-400' : 'bg-white/10 text-slate-400'}`}>{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Jobs List */}
        <div className="flex flex-col gap-4 mb-20">
          {filteredJobs.map((job) => {
            const isExpanded = expandedJobId === job.id;

            return (
              <motion.div
                layout
                key={job.id}
                onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                className={`bg-slate-900/50 rounded-2xl flex flex-col shadow-sm border cursor-pointer transition-colors duration-300 overflow-hidden ${isExpanded ? 'border-sky-500/50 bg-slate-900' : 'border-white/10 hover:border-white/20 hover:bg-slate-900/80'
                  }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Always Visible Header */}
                <div className="p-6 md:px-8 flex flex-col md:flex-row md:justify-between md:items-center gap-5">
                  <div className="flex flex-col md:flex-row items-start gap-5">
                    <div className="bg-slate-800 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/5">
                      {job.icon}
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold mb-3 transition-colors ${isExpanded ? 'text-sky-400' : 'text-white'}`}>{job.title}</h3>
                      <div className="flex gap-3 flex-wrap">
                        <span className="py-1 px-3 rounded-md text-[0.75rem] uppercase tracking-wider font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">{job.location}</span>
                        <span className="py-1 px-3 rounded-md text-[0.75rem] uppercase tracking-wider font-bold bg-slate-800 text-slate-300 border border-slate-700">{job.department}</span>
                        <span className="py-1 px-3 rounded-md text-[0.75rem] uppercase tracking-wider font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{job.type}</span>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    className="text-slate-400 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-slate-800/50 ml-auto"
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </div>

                {/* Expanded Details Section */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/5"
                    >
                      <div className="p-6 md:px-8 md:py-8 bg-slate-900/30">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                          {/* Description & Requirements */}
                          <div className="md:col-span-2 space-y-6">
                            <div>
                              <h4 className="text-white font-bold mb-3 text-lg">About the Role</h4>
                              <p className="text-slate-400 leading-relaxed">{job.description}</p>
                            </div>

                            <div>
                              <h4 className="text-white font-bold mb-3 text-lg">Requirements</h4>
                              <ul className="space-y-2">
                                {job.requirements.map((req, idx) => (
                                  <li key={idx} className="flex items-start gap-3 text-slate-400">
                                    <CheckCircle size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                                    <span>{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* CTA Area */}
                          <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5 flex flex-col justify-center items-center text-center">
                            <h4 className="text-white font-bold mb-2">Ready to join us?</h4>
                            <p className="text-slate-400 text-sm mb-6">Submit your application and we'll get back to you within 48 hours.</p>
                            <button className="w-full bg-sky-500 hover:bg-sky-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] flex items-center justify-center gap-2">
                              Apply Now <ChevronDown size={16} className="-rotate-90" />
                            </button>
                          </div>

                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-sky-900/50 to-indigo-900/50 border border-white/10 text-white rounded-2xl py-10 md:py-12 px-5 md:px-8 text-center mb-20">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">Don't see a fit?</h2>
          <p className="text-base md:text-lg opacity-80 mb-8">Send us your resume — we're always looking for talented people.</p>
          <button onClick={() => setIsModalOpen(true)} className="bg-yellow-400 text-slate-900 border-none py-3 px-6 rounded-lg text-base font-bold inline-flex items-center gap-2 cursor-pointer transition-all duration-200 hover:bg-yellow-300 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(250,204,21,0.3)]">
            <FileText size={18} /> Send Your Resume
          </button>
        </div>

        <JobApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        {/* Features Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-white font-extrabold mb-10">Why Join Swarnim?</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white/5 p-8 px-5 rounded-2xl shadow-sm border border-white/10">
              <div className="bg-sky-500/10 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5">
                <Zap size={24} className="text-sky-400" />
              </div>
              <h3 className="text-lg text-white font-bold mb-3">High Impact Work</h3>
              <p className="text-slate-400 text-[0.95rem] leading-relaxed">Shape the careers of thousands of students through cutting-edge education that matters.</p>
            </div>

            <div className="bg-white/5 p-8 px-5 rounded-2xl shadow-sm border border-white/10">
              <div className="bg-sky-500/10 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5">
                <Award size={24} className="text-sky-400" />
              </div>
              <h3 className="text-lg text-white font-bold mb-3">Grow With Purpose</h3>
              <p className="text-slate-400 text-[0.95rem] leading-relaxed">Continuous learning, certifications, and a clear growth path in a fast-scaling organisation.</p>
            </div>

            <div className="bg-white/5 p-8 px-5 rounded-2xl shadow-sm border border-white/10">
              <div className="bg-sky-500/10 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5">
                <Users size={24} className="text-sky-400" />
              </div>
              <h3 className="text-lg text-white font-bold mb-3">Collaborative Culture</h3>
              <p className="text-slate-400 text-[0.95rem] leading-relaxed">A tight-knit, diverse team where every voice counts and great ideas get championed.</p>
            </div>

            <div className="bg-white/5 p-8 px-5 rounded-2xl shadow-sm border border-white/10">
              <div className="bg-sky-500/10 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5">
                <Search size={24} className="text-sky-400" />
              </div>
              <h3 className="text-lg text-white font-bold mb-3">Emerging Tech Exposure</h3>
              <p className="text-slate-400 text-[0.95rem] leading-relaxed">Work with AI, EdTech platforms, and next-gen tools that are transforming higher education.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Careers;
