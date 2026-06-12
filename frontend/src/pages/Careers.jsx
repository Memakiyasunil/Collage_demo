import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, HeartPulse, Target, GraduationCap, Briefcase, FileText, Zap, Award, Users, Search } from 'lucide-react';

const jobsData = [
  { id: 1, title: 'Academic Counsellor', location: 'Ahmedabad', department: 'Counselling', type: 'Full-time', icon: <HeartPulse size={20} style={{color: '#4ade80'}} /> },
  { id: 2, title: 'Business Development Executive', location: 'Ahmedabad', department: 'Sales', type: 'Full-time', icon: <Target size={20} style={{color: '#a855f7'}} /> },
  { id: 3, title: 'Business Development Manager - Gujarat', location: 'Ahmedabad', department: 'Sales', type: 'Full-time', icon: <Target size={20} style={{color: '#a855f7'}} /> },
  { id: 4, title: 'Business Head', location: 'Ahmedabad', department: 'Sales', type: 'Full-time', icon: <Briefcase size={20} style={{color: '#f59e0b'}} /> },
  { id: 5, title: 'Faculty - MBA', location: 'Surat', department: 'Teaching', type: 'Full-time', icon: <GraduationCap size={20} style={{color: '#3b82f6'}} /> },
  { id: 6, title: 'Faculty - B.Tech', location: 'Mahesana', department: 'Teaching', type: 'Full-time', icon: <GraduationCap size={20} style={{color: '#3b82f6'}} /> },
  { id: 7, title: 'Admission Officer', location: 'Surat', department: 'Admissions', type: 'Full-time', icon: <Users size={20} style={{color: '#ec4899'}} /> },
];

const Careers = () => {
  const [activeTab, setActiveTab] = useState('All Positions');

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
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 pt-32 pb-20 px-5 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5">Join Swarnim Edutech</h1>
          <p className="text-lg md:text-xl opacity-90 leading-relaxed mb-10">
            12 open positions across 3 cities. Find your role and help<br className="hidden md:block" />
            shape the future of education.
          </p>
          
          <div className="flex justify-center items-center gap-4 text-base md:text-lg flex-wrap">
            <span><strong className="font-bold">3</strong> Locations</span>
            <span className="opacity-50">|</span>
            <span><strong className="font-bold">4</strong> Departments</span>
            <span className="opacity-50">|</span>
            <span><strong className="font-bold">12</strong> Openings</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto py-10 px-5">
        {/* Filter Tabs */}
        <div className="flex gap-8 border-b border-slate-200 mb-10 overflow-x-auto">
          {filterTabs.map((tab) => (
            <button 
              key={tab.name}
              className={`bg-transparent py-4 text-base font-semibold cursor-pointer flex items-center gap-2 whitespace-nowrap transition-colors border-b-2 ${activeTab === tab.name ? 'text-sky-400 border-sky-400' : 'text-slate-500 border-transparent hover:text-white'}`}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.name} <span className={`py-0.5 px-2 rounded-full text-xs font-bold ${activeTab === tab.name ? 'bg-sky-500/20 text-sky-400' : 'bg-white/10 text-slate-400'}`}>{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Jobs List */}
        <div className="flex flex-col gap-5 mb-16">
          {filteredJobs.map((job) => (
            <motion.div 
              key={job.id} 
              className="bg-white/5 rounded-xl p-6 flex flex-col md:flex-row md:justify-between md:items-center shadow-sm border border-white/10 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(14,165,233,0.15)]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col md:flex-row items-start gap-5">
                <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                  {job.icon}
                </div>
                <div>
                  <h3 className="text-xl text-white mb-3 font-bold">{job.title}</h3>
                  <div className="flex gap-3 flex-wrap">
                    <span className="py-1 px-3 rounded-md text-[0.85rem] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">{job.location}</span>
                    <span className="py-1 px-3 rounded-md text-[0.85rem] font-semibold bg-white/10 text-slate-300 border border-white/10">{job.department}</span>
                    <span className="py-1 px-3 rounded-md text-[0.85rem] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{job.type}</span>
                  </div>
                </div>
              </div>
              <div className="text-slate-300 hidden md:block mt-4 md:mt-0">
                <ChevronDown size={20} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-sky-900/50 to-indigo-900/50 border border-white/10 text-white rounded-2xl py-10 md:py-12 px-5 md:px-8 text-center mb-20">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">Don't see a fit?</h2>
          <p className="text-base md:text-lg opacity-80 mb-8">Send us your resume — we're always looking for talented people.</p>
          <button className="bg-yellow-400 text-slate-900 border-none py-3 px-6 rounded-lg text-base font-bold inline-flex items-center gap-2 cursor-pointer transition-all duration-200 hover:bg-yellow-300 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(250,204,21,0.3)]">
            <FileText size={18} /> Send Your Resume
          </button>
        </div>

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
