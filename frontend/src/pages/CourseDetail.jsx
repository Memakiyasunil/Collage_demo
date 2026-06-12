import React, { useContext, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { BookOpen, CheckCircle2, TrendingUp, Calendar, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { CourseContext } from '../context/CourseContext';
import { slideInLeft, slideInRight, fadeInUp } from '../utils/animations';

const CourseDetail = () => {
  const { courseId } = useParams();
  const { courses } = useContext(CourseContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [courseId]);

  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  const levelStyles = {
    Entry: { bar: 'bg-indigo-500', badge: 'text-indigo-600 bg-indigo-100' },
    Mid: { bar: 'bg-emerald-500', badge: 'text-emerald-600 bg-emerald-100' },
    Senior: { bar: 'bg-amber-500', badge: 'text-amber-600 bg-amber-100' },
    Lead: { bar: 'bg-pink-500', badge: 'text-pink-600 bg-pink-100' }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      {/* Top Header */}
      <motion.div 
        className="bg-white py-12 border-b border-slate-200 mb-12 border-t-4 border-t-blue-600"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-xs font-bold text-slate-400 tracking-widest mb-8">
            <Link to="/" className="text-slate-400 no-underline hover:text-slate-600 transition-colors">HOME</Link> / <Link to="/courses" className="text-slate-400 no-underline hover:text-slate-600 transition-colors">PROGRAMS</Link> / <span>{course.type === 'PG' ? 'POSTGRADUATE' : 'UNDERGRADUATE'}</span> / <span>IT</span>
          </div>
          
          <h1 className="text-4xl md:text-[2.8rem] font-extrabold text-slate-900 mb-8 max-w-4xl leading-tight">
            {course.title.replace('Cyber Security & Cloud Technology', '')} 
            {course.title.includes('Cyber Security') && <span className="text-blue-600"> Cyber Security & Cloud Technology</span>}
          </h1>
          
          <button className="bg-slate-900 text-white border-none rounded-full py-3 px-8 text-[0.95rem] font-semibold cursor-pointer transition-colors duration-200 hover:bg-slate-800">Apply Now &rarr;</button>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row gap-12 items-start overflow-hidden">
        {/* Main Content (Left) */}
        <motion.div 
          className="flex-1 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={slideInLeft}
        >
          <section className="mb-16">
            <h2 className="flex items-center gap-3 text-[1.4rem] font-extrabold text-slate-900 mb-6">
              <BookOpen size={20} className="bg-slate-100 p-1.5 rounded-md w-8 h-8 text-blue-600" /> Program Overview
            </h2>
            <div className="text-slate-600 text-base leading-relaxed">
              <p style={{ whiteSpace: 'pre-wrap' }}>{course.overview}</p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="flex items-center gap-3 text-[1.4rem] font-extrabold text-slate-900 mb-6">
              <CheckCircle2 size={20} className="bg-slate-100 p-1.5 rounded-md w-8 h-8 text-pink-500" /> Eligibility
            </h2>
            <div className="text-slate-600 text-base leading-relaxed">
              <ul className="list-none p-0 m-0">
                {course.eligibilityChecklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 mb-4"><CheckCircle2 size={16} className="text-pink-500 mt-0.5 shrink-0" /> <span className="-mt-0.5">{item}</span></li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="flex items-center gap-3 text-[1.4rem] font-extrabold text-slate-900 mb-6">
              <TrendingUp size={20} className="bg-slate-100 p-1.5 rounded-md w-8 h-8 text-blue-600" /> Career Opportunities
            </h2>
            <p className="text-slate-400 text-[0.9rem] -mt-4 mb-6">Potential roles after completing {course.title}</p>
            
            <div className="bg-slate-50 border border-slate-200 p-4 px-6 rounded-lg flex gap-4 text-[0.85rem] text-slate-500 mb-8">
              <div className="w-5 h-5 border border-blue-500 text-blue-500 rounded-full flex items-center justify-center font-bold italic shrink-0">i</div>
              <p className="m-0">Data sourced from publicly available industry reports, job portals (Naukri, LinkedIn, Glassdoor), and market research. Figures are approximate and may vary based on location, experience, skills, and market conditions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm border-t-4 border-t-blue-500">
                <h3 className="text-3xl font-extrabold text-slate-900 mb-2">{course.careerStats.jobsInIndia}</h3>
                <p className="font-semibold text-slate-600 text-[0.9rem] mb-0">Jobs In India</p>
                <p className="text-xs text-slate-400 mt-1 mb-0">Live openings</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm border-t-4 border-t-emerald-500">
                <h3 className="text-3xl font-extrabold text-slate-900 mb-2">{course.careerStats.avgSalary}</h3>
                <p className="font-semibold text-slate-600 text-[0.9rem] mb-0">Avg. Salary (India)</p>
                <p className="text-xs text-slate-400 mt-1 mb-0">Per annum</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm border-t-4 border-t-pink-500">
                <h3 className="text-3xl font-extrabold text-slate-900 mb-2">{course.careerStats.companiesHiring}</h3>
                <p className="font-semibold text-slate-600 text-[0.9rem] mb-0">Companies Hiring</p>
                <p className="text-xs text-slate-400 mt-1 mb-0">Actively recruiting</p>
              </div>
            </div>

            <h3 className="text-xl font-extrabold mb-6 mt-8">Salary Insights</h3>
            <div className="flex flex-col gap-6">
              {course.salaryInsights.map((insight, idx) => {
                const styles = levelStyles[insight.level] || levelStyles['Entry'];
                return (
                  <div key={idx} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <div className="w-full md:w-[180px] text-[0.85rem] font-semibold text-slate-600">{insight.role}</div>
                    <div className="flex-1 bg-slate-100 h-6 rounded-full overflow-hidden w-full">
                      <div className={`h-full flex items-center pl-4 text-white text-xs font-bold rounded-full ${styles.bar}`} style={{ width: `${insight.percentage}%` }}>
                        {insight.range}
                      </div>
                    </div>
                    <div className={`text-xs font-bold py-1 px-2.5 rounded-full w-[70px] text-center ${styles.badge}`}>{insight.level}</div>
                  </div>
                );
              })}
            </div>
          </section>
        </motion.div>

        {/* Sidebar (Right) */}
        <motion.div 
          className="w-full lg:w-[400px] shrink-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={slideInRight}
        >
          <div className="bg-white rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] mb-4">
            <h4 className="text-xs font-bold text-slate-400 tracking-widest mb-6">KEY FACTS</h4>
            <ul className="list-none p-0 m-0">
              <li className="flex justify-between py-4 border-b border-slate-200 text-[0.9rem] border-l-4 border-l-blue-500 pl-4">
                <span className="text-slate-500 font-medium">Duration</span>
                <span className="font-bold text-slate-900">{course.duration}</span>
              </li>
              <li className="flex justify-between py-4 border-b border-slate-200 text-[0.9rem] border-l-4 border-l-emerald-500 pl-4">
                <span className="text-slate-500 font-medium">Eligibility</span>
                <span className="font-bold text-slate-900">{course.eligibility}</span>
              </li>
              <li className="flex justify-between py-4 border-b border-slate-200 text-[0.9rem] border-l-4 border-l-purple-500 pl-4">
                <span className="text-slate-500 font-medium">Total Seats</span>
                <span className="font-bold text-slate-900">{course.totalSeats}</span>
              </li>
              <li className="flex justify-between py-4 border-b border-slate-200 text-[0.9rem] border-l-4 border-l-orange-500 pl-4">
                <span className="text-slate-500 font-medium">Format</span>
                <span className="font-bold text-slate-900">{course.format}</span>
              </li>
              <li className="flex justify-between py-4 border-b border-slate-200 text-[0.9rem] border-l-4 border-l-emerald-500 pl-4">
                <span className="text-slate-500 font-medium">Status</span>
                <span className="font-extrabold text-emerald-500">● {course.status}</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] mb-4">
            <h4 className="text-lg font-extrabold mb-2 text-slate-900">Application Portal</h4>
            <p className="text-[0.85rem] text-slate-500 mb-6">Secure your future with Education Force. Connect with our academic counselors today.</p>
            
            <div className="bg-emerald-50 border border-emerald-500 p-4 rounded-lg flex gap-4 items-start mb-6">
              <Calendar size={16} className="text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[0.9rem] text-emerald-800">Admissions 2026-27</strong>
                <div className="text-emerald-500 text-xs mt-1">Currently accepting applications</div>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white border-none rounded-lg p-4 font-bold cursor-pointer flex items-center justify-center transition-colors hover:bg-blue-700">Proceed to Apply <Send size={14} style={{marginLeft:'5px'}}/></button>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] mb-4">
            <h4 className="flex items-center gap-2 text-lg font-extrabold mb-6 text-slate-900"><MapPin size={16} className="text-blue-600" /> Available At</h4>
            <div>
              {course.universities.map((uni, idx) => (
                <div key={idx} className="border border-slate-200 p-4 rounded-lg text-center font-semibold text-[0.9rem] text-slate-600 mb-4">
                  {uni.name}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 italic text-center m-0">We provide direct admission guidance to all partner universities.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseDetail;
