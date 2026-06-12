import React from 'react';
import { BookOpen, Users, Briefcase, Building2, MonitorPlay, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';

const featuresData = [
  {
    title: 'Industry-Aligned Syllabus',
    description: 'Curriculum designed with industry experts to match real-world requirements.',
    icon: BookOpen
  },
  {
    title: 'Qualified Trainers',
    description: 'Learn from experienced professionals with deep domain expertise.',
    icon: Users
  },
  {
    title: 'Placement Tie-ups',
    description: 'Strong industry connections ensuring excellent placement opportunities.',
    icon: Briefcase
  },
  {
    title: 'Campus Placements',
    description: 'Dedicated placement cell organizing on-campus recruitment drives.',
    icon: Building2
  },
  {
    title: 'Hands-on Learning',
    description: 'Project-based approach with real-world tools and technologies.',
    icon: MonitorPlay
  },
  {
    title: 'Exam Management',
    description: 'Comprehensive exam preparation and assessment framework.',
    icon: FileCheck
  }
];

const Features = () => {
  return (
    <section className="py-20 px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h4 className="text-blue-500 text-[0.85rem] font-bold tracking-widest uppercase mb-2">WHY EDUCATION FORCE</h4>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">What Makes Us Different</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            We go beyond traditional education to create industry-ready professionals.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {featuresData.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={idx} 
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300 flex flex-col"
                variants={fadeInUp}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
