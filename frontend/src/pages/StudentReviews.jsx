import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../utils/animations';
import { Star, Quote, Building2 } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Vikram Malhotra",
    course: "B.Tech Computer Science",
    company: "Google India",
    image: "https://i.pravatar.cc/150?img=11",
    text: "The curriculum here is perfectly aligned with industry standards. The placement cell worked tirelessly, conducting mock interviews and coding rounds that exactly matched what Google asked.",
    rating: 5,
    size: "large" // determines spanning in masonry layout
  },
  {
    id: 2,
    name: "Anjali Desai",
    course: "MCA Specialization",
    company: "Microsoft",
    image: "https://i.pravatar.cc/150?img=5",
    text: "I was skeptical about finding a product-based company role off-campus. Edufordge's corporate connect program made it possible. The mentors are incredibly supportive.",
    rating: 5,
    size: "normal"
  },
  {
    id: 3,
    name: "Karan Singh",
    course: "Full Stack Bootcamp",
    company: "Zomato",
    image: "https://i.pravatar.cc/150?img=33",
    text: "Intensive, rigorous, and completely worth it. From knowing zero React to building production apps.",
    rating: 4,
    size: "normal"
  },
  {
    id: 4,
    name: "Priya Sharma",
    course: "Cyber Security",
    company: "Palo Alto Networks",
    image: "https://i.pravatar.cc/150?img=9",
    text: "The hands-on labs and ethical hacking challenges gave me the practical exposure that textbooks simply can't provide. Best learning experience of my life.",
    rating: 5,
    size: "large"
  },
  {
    id: 5,
    name: "Rahul Verma",
    course: "B.Tech IT",
    company: "TCS Digital",
    image: "https://i.pravatar.cc/150?img=60",
    text: "Great faculty and an amazing campus life. The technical fests and hackathons really helped build my resume.",
    rating: 4,
    size: "normal"
  },
  {
    id: 6,
    name: "Sneha Reddy",
    course: "Data Science Masters",
    company: "Amazon",
    image: "https://i.pravatar.cc/150?img=20",
    text: "The transition from academics to corporate was seamless thanks to the intensive interview prep sessions.",
    rating: 5,
    size: "normal"
  }
];

const StudentReviews = () => {
  return (
    <div className="min-h-screen bg-[#0b1120] font-sans pt-32 pb-20 overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-amber-500/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <motion.div 
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 mb-6">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
            <span className="text-yellow-400 text-sm font-bold tracking-widest uppercase">Student Testimonials</span>
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Don't just take <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">our word for it.</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Hear the authentic stories of transformation from our alumni who have successfully launched their tech careers.
          </motion.p>
        </motion.div>

        {/* Masonry Grid Simulation */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {reviews.map((review, idx) => (
            <motion.div 
              key={review.id}
              variants={fadeInUp}
              className={`bg-slate-900 border border-slate-700/50 rounded-3xl p-8 relative group hover:-translate-y-2 hover:border-amber-500/50 transition-all duration-300 shadow-xl ${review.size === 'large' ? 'md:col-span-2 lg:col-span-2' : ''}`}
            >
              <div className="absolute top-6 right-8 text-slate-700 group-hover:text-amber-500/20 transition-colors">
                <Quote size={48} />
              </div>
              
              <div className="flex gap-1 mb-6 text-amber-400 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-slate-600" : ""} />
                ))}
              </div>

              <p className={`text-slate-300 leading-relaxed mb-8 relative z-10 ${review.size === 'large' ? 'text-xl' : 'text-lg'}`}>
                "{review.text}"
              </p>

              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-800 relative z-10">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-slate-700 group-hover:border-amber-500 transition-colors"
                />
                <div>
                  <h4 className="text-white font-bold">{review.name}</h4>
                  <p className="text-slate-400 text-sm mb-1">{review.course}</p>
                  <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md inline-flex">
                    <Building2 size={12} /> Placed at {review.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default StudentReviews;
