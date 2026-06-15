import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { slideInLeft, slideInRight, staggerContainer, fadeInUp, scaleUp } from '../utils/animations';

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
      const response = await fetch('/api/services');
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
    <div className="bg-slate-950 min-h-screen font-sans overflow-hidden">
      {/* Hero Section */}
      <div className="relative pt-32 pb-24 px-8 flex items-center justify-center text-center min-h-[60vh]">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-sky-500/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]" />
        </div>

        <motion.div 
          className="relative z-10 max-w-4xl mx-auto"
          initial="hidden" animate="visible" variants={fadeInUp}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 font-bold text-sm tracking-wider uppercase mb-6 shadow-[0_0_15px_rgba(14,165,233,0.3)]">
            Our Expertise
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Empowering Future Professionals Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Technology & Education</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Transforming knowledge into career success. We bridge the gap between academic learning and industry innovation.
          </p>
        </motion.div>
      </div>

      {/* Services Grid Section */}
      <div className="max-w-7xl mx-auto px-8 py-20 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Our Professional Services</h2>
          <p className="text-slate-400 text-lg">Comprehensive solutions for students and institutions.</p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}
        >
          {services.map((service, index) => (
            <motion.div 
              key={service._id} 
              variants={fadeInUp}
              className="group bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-sky-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.2)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-sky-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="w-14 h-14 bg-sky-500/10 rounded-xl flex items-center justify-center mb-6 text-sky-400 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                <DynamicIcon name={service.icon} size={28} />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 leading-snug">{service.title}</h3>
              <p className="text-slate-400 text-[0.95rem] leading-relaxed mb-6 h-20 line-clamp-3">
                {service.description}
              </p>
              
              {service.features && service.features.length > 0 && (
                <div className="space-y-2 mt-auto">
                  {service.features.slice(0, 4).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <LucideIcons.CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                      <span className="text-slate-300 text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                  {service.features.length > 4 && (
                    <div className="text-sky-400 text-sm font-bold mt-2">+ {service.features.length - 4} more features</div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Timeline Section */}
      <div className="bg-slate-900 py-24 relative overflow-hidden border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">The Pathway to Excellence</h2>
            <p className="text-slate-400 text-lg">Our proven methodology for transforming beginners into experts.</p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8 relative"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-0.5 bg-slate-800 z-0" />
            
            {[
              { step: '01', title: 'Learn', desc: 'Master core concepts through expert instruction', icon: 'BookOpen' },
              { step: '02', title: 'Practice', desc: 'Apply knowledge in hands-on workshops', icon: 'Code' },
              { step: '03', title: 'Build', desc: 'Develop real-world industry projects', icon: 'Hammer' },
              { step: '04', title: 'Achieve', desc: 'Secure placements and career growth', icon: 'Trophy' }
            ].map((item, idx) => (
              <motion.div key={idx} variants={scaleUp} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-2xl bg-slate-950 border-2 border-slate-800 flex items-center justify-center mb-6 group-hover:border-sky-500 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all duration-300">
                  <DynamicIcon name={item.icon} size={32} className="text-sky-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-sky-500 font-black text-xl mb-2">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <motion.div 
          className="bg-gradient-to-r from-sky-900/40 to-indigo-900/40 border border-white/10 rounded-3xl p-10 md:p-16 relative overflow-hidden"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft}
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            {[
              { label: 'Students Trained', value: '5,000+' },
              { label: 'Industry Partners', value: '50+' },
              { label: 'Placement Rate', value: '94%' },
              { label: 'Expert Mentors', value: '120+' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">{stat.value}</div>
                <div className="text-sky-300 font-semibold text-sm uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-8 py-16 mb-16 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleUp}>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Start Your Journey Towards a <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Successful Technology Career</span> Today
          </h2>
          <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of successful alumni who have transformed their careers through our industry-aligned programs and mentorship.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/courses" className="w-full sm:w-auto bg-sky-500 text-white font-bold py-4 px-8 rounded-full hover:bg-sky-400 hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all duration-300 hover:-translate-y-1 text-center">
              Explore Courses
            </Link>
            <Link to="/contact" className="w-full sm:w-auto bg-slate-800 text-white font-bold py-4 px-8 rounded-full border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-all duration-300 hover:-translate-y-1 text-center">
              Book Free Counseling
            </Link>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default ServicesPage;
