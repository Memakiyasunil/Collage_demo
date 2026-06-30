import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { slideInLeft, slideInRight, staggerContainer, fadeInUp, scaleUp, floatAnimation, rotateIn } from '../utils/animations';
import GlassIcon from '../components/GlassIcon';

// Hardcoded fallback data based on user prompt in case DB is empty
const defaultServices = [
  {
    _id: '1',
    title: 'Industry-Oriented Technical Training',
    description: 'We provide practical, hands-on technical training designed according to current industry standards. Our courses focus on real-world projects, problem-solving skills, and career readiness.',
    icon: 'MonitorPlay',
    features: ['MERN Stack Development', 'Python Programming', 'Data Science & AI', 'Cloud Computing', 'Cyber Security', 'DevOps', 'Live Projects'],
    isActive: true
  },
  {
    _id: '2',
    title: 'Expert Teaching & Academic Guidance',
    description: 'Our experienced trainers and educators provide high-quality teaching, personalized mentorship, and continuous academic support to help students achieve excellence.',
    icon: 'GraduationCap',
    features: ['Experienced Faculty', 'One-to-One Mentorship', 'Concept-Based Learning', 'Doubt Solving Sessions', 'Career Guidance'],
    isActive: true
  },
  {
    _id: '3',
    title: 'Job Ready Bootcamp Programs',
    description: 'Intensive bootcamp programs designed to transform beginners into industry-ready professionals through practical training, projects, and interview preparation.',
    icon: 'Rocket',
    features: ['30/60/90 Days Bootcamps', 'Full Stack Bootcamp', 'AI & Data Science', 'Resume Building', 'Mock Interviews'],
    isActive: true
  },
  {
    _id: '4',
    title: 'Knowledge Sharing & Workshops',
    description: 'Regular seminars, workshops, and technology events conducted by industry experts to keep students updated with the latest trends and innovations.',
    icon: 'Lightbulb',
    features: ['Technology Seminars', 'Guest Lectures', 'Coding Workshops', 'Hackathons', 'Innovation Challenges'],
    isActive: true
  },
  {
    _id: '5',
    title: 'Faculty Provision & Corporate Training',
    description: 'We provide skilled faculty members and customized training programs for colleges, universities, educational institutions, and organizations.',
    icon: 'Users',
    features: ['Guest Faculty Services', 'Visiting Professors', 'Corporate Technical Training', 'College Workshops', 'FDP Programs'],
    isActive: true
  },
  {
    _id: '6',
    title: 'Internship and Real-World Project Experience',
    description: 'Students gain practical experience by working on live projects under expert supervision, helping them understand the complete software development lifecycle.',
    icon: 'Briefcase',
    features: ['Industrial Projects', 'Team Collaboration', 'Agile Methodology', 'Git & GitHub Workflow', 'Portfolio Development'],
    isActive: true
  },
  {
    _id: '7',
    title: 'Career Development & Placement Assistance',
    description: 'We guide students from learning to employment through professional career services and industry preparation.',
    icon: 'Target',
    features: ['Resume Preparation', 'Interview Training', 'Technical Mock Interviews', 'Aptitude Training', 'Job Referral Support'],
    isActive: true
  }
];

const DynamicIcon = ({ name, ...props }) => {
  const IconComponent = LucideIcons[name] || LucideIcons['Settings'];
  return <IconComponent {...props} />;
};

const ServicesPage = () => {
  const [services, setServices] = useState(defaultServices);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${BASE_URL}/services`);
      if (response.ok) {
        const data = await response.json();
        // If DB has active services, use them, otherwise stick to defaults
        if (data.success && data.data && data.data.length > 0) {
          const activeServices = data.data.filter(s => s.isActive);
          if (activeServices.length > 0) {
            setServices(activeServices);
          }
        }
      }
    } catch (error) {
      console.log('Failed to fetch from API, using default services', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#0b1120] min-h-screen font-sans overflow-hidden">
      {/* Hero Section */}
      <div className="relative pt-32 pb-24 px-8 bg-[#060b14] overflow-hidden min-h-[60vh] flex items-center">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <motion.div variants={floatAnimation} initial="hidden" animate="visible" className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-sky-600/20 rounded-full blur-[120px] mix-blend-screen" />
          <motion.div variants={floatAnimation} initial="hidden" animate="visible" style={{ animationDelay: '2s' }} className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden" animate="visible" variants={slideInLeft}
          >
            <motion.div variants={floatAnimation} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-800/50 backdrop-blur-md border border-slate-700/50 mb-8 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
              <span className="text-sky-300 text-sm font-bold tracking-widest uppercase">Our Expertise</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
              Empowering Future Professionals Through <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 relative">
                Technology & Education
                <svg className="absolute w-full h-4 -bottom-1 left-0 text-sky-500" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 50 Q 50 100 100 50" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed font-medium mt-8 max-w-lg">
              Transforming knowledge into career success. We bridge the gap between academic learning and industry innovation.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden" animate="visible" variants={slideInRight}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] aspect-[4/3] group">
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80" alt="Professional Training" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060b14] via-transparent to-transparent opacity-60" />
            </div>
            
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 bg-slate-900/90 backdrop-blur-xl border border-slate-700 p-6 rounded-3xl shadow-2xl flex items-center gap-5"
            >
              <div className="w-16 h-16 bg-sky-500/20 rounded-2xl flex items-center justify-center text-sky-400">
                <LucideIcons.Award size={32} />
              </div>
              <div>
                <p className="text-white font-bold text-lg mb-1">Top Rated</p>
                <p className="text-slate-400 text-sm">Industry Excellence</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Services Grid Section */}
      <div className="max-w-7xl mx-auto px-8 py-20 relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Our Professional Services</h2>
          <p className="text-slate-400 text-xl font-medium">Comprehensive solutions for students and institutions.</p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}
        >
          {services.map((service, index) => (
            <motion.div 
              key={service._id} 
              variants={fadeInUp}
              className="group relative bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-10 rounded-[2rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.3)] overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-sky-500/20 to-transparent rounded-bl-[4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="mb-8">
                <GlassIcon 
                  icon={LucideIcons[service.icon] || LucideIcons['Settings']} 
                  colorClass="text-sky-400" 
                  bgClass="bg-sky-500/10" 
                  size={32}
                />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-sky-400 group-hover:to-indigo-400 transition-all duration-300">{service.title}</h3>
              <p className="text-slate-400 text-base leading-relaxed mb-8 font-medium">
                {service.description}
              </p>
              
              {service.features && service.features.length > 0 && (
                <div className="space-y-3 mt-auto border-t border-slate-700/50 pt-6">
                  {service.features.slice(0, 4).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <LucideIcons.CheckCircle2 className="text-sky-500 shrink-0 mt-0.5" size={18} />
                      <span className="text-slate-300 text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                  {service.features.length > 4 && (
                    <div className="text-sky-400 text-sm font-bold mt-4 pt-2">+ {service.features.length - 4} more features</div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Timeline Section */}
      <div className="bg-[#0f172a] py-32 relative overflow-hidden border-y border-slate-800/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-900/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">The Pathway to Excellence</h2>
            <p className="text-slate-400 text-xl font-medium">Our proven methodology for transforming beginners into experts.</p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-12 relative"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-[48px] left-[12%] right-[12%] h-1 bg-gradient-to-r from-slate-800 via-sky-900 to-slate-800 z-0" />
            
            {[
              { step: '01', title: 'Learn', desc: 'Master core concepts through expert instruction', icon: 'BookOpen' },
              { step: '02', title: 'Practice', desc: 'Apply knowledge in hands-on workshops', icon: 'Code' },
              { step: '03', title: 'Build', desc: 'Develop real-world industry projects', icon: 'Hammer' },
              { step: '04', title: 'Achieve', desc: 'Secure placements and career growth', icon: 'Trophy' }
            ].map((item, idx) => (
              <motion.div key={idx} variants={scaleUp} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-[#0b1120] border-4 border-slate-800 flex items-center justify-center mb-8 group-hover:border-sky-500 group-hover:shadow-[0_0_30px_rgba(14,165,233,0.3)] transition-all duration-500 relative">
                  <div className="absolute inset-2 rounded-full bg-slate-800 group-hover:bg-sky-500/10 transition-colors duration-500" />
                  <DynamicIcon name={item.icon} size={36} className="text-sky-400 group-hover:scale-110 transition-transform duration-500 relative z-10" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-sky-500 text-white font-bold text-xs flex items-center justify-center border-2 border-[#0b1120]">{item.step}</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 text-base leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-8 py-32">
        <motion.div 
          className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft}
        >
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-sky-500/20 to-indigo-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
            {[
              { label: 'Students Trained', value: '5,000+' },
              { label: 'Industry Partners', value: '50+' },
              { label: 'Placement Rate', value: '94%' },
              { label: 'Expert Mentors', value: '120+' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 mb-4 tracking-tight group-hover:scale-110 transition-transform duration-300 origin-bottom">{stat.value}</div>
                <div className="text-slate-300 font-bold text-sm md:text-base uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-8 py-16 mb-24 text-center relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleUp}>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight leading-tight">
            Start Your Journey Towards a <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Successful Career</span> Today
          </h2>
          <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto font-medium">
            Join thousands of successful alumni who have transformed their careers through our industry-aligned programs and mentorship.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/courses" className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 text-lg font-bold py-5 px-10 rounded-2xl hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(251,191,36,0.5)] transition-all duration-300 text-center">
              Explore Courses
            </Link>
            <Link to="/contact" className="w-full sm:w-auto bg-slate-800/80 backdrop-blur-md text-white text-lg font-bold py-5 px-10 rounded-2xl border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-center">
              Book Free Counseling
            </Link>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default ServicesPage;
