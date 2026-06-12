import React from 'react';
import { Monitor, BookOpen, Award, Cloud, Code, Database } from 'lucide-react';
import './Pages.css';

const Courses = () => {
  const programs = [
    { title: 'AI & Machine Learning', desc: 'Master the algorithms shaping the future.', icon: Monitor },
    { title: 'Data Science', desc: 'Turn data into actionable insights.', icon: Database },
    { title: 'Cyber Security', desc: 'Protect systems from digital threats.', icon: Award },
    { title: 'Cloud Technology', desc: 'Build scalable cloud architectures.', icon: Cloud },
    { title: 'Web & Mobile Dev', desc: 'Create stunning modern applications.', icon: Code },
    { title: 'Animation & VFX', desc: 'Bring your imagination to life.', icon: BookOpen }
  ];

  return (
    <div className="courses-page">
      <section className="contact-banner">
        <div className="banner-container">
          <span className="banner-label">PROGRAMS</span>
          <h1 className="banner-title">Our Courses</h1>
          <p className="banner-subtitle">
            Explore 30+ industry-aligned programs across various domains.
          </p>
        </div>
      </section>

      <section className="section bg-light">
        <div className="section-container text-center">
          <div className="card-grid">
            {programs.map((prog, idx) => (
              <div key={idx} className="program-card">
                <div className="card-icon"><prog.icon size={32} /></div>
                <h3>{prog.title}</h3>
                <p>{prog.desc}</p>
                <button className="btn-outline-sm">Learn More</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
