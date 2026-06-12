import React from 'react';
import Hero from '../components/Hero';
import { Award, Users, BookOpen, Monitor } from 'lucide-react';
import './Pages.css';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      
      {/* About Section Snippet */}
      <section className="section bg-light">
        <div className="section-container">
          <div className="section-grid">
            <div className="section-content">
              <h2 className="section-title">Bridging Knowledge with Technology</h2>
              <p className="section-desc">
                Founded in 2015, Education Force was born from a simple yet powerful vision: to make world-class IT education accessible to every aspiring student. We recognize the growing gap between traditional education and the rapidly evolving technology industry.
              </p>
              <button className="btn-primary" style={{marginTop: '1rem'}}>Read Our Story</button>
            </div>
            <div className="section-image-wrapper">
              <div className="placeholder-image">
                <Users size={64} color="#9ca3af" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Programs */}
      <section className="section">
        <div className="section-container text-center">
          <h2 className="section-title">Popular Programs</h2>
          <p className="section-desc centered">Explore our industry-aligned programs designed to launch your career.</p>
          
          <div className="card-grid mt-4">
            {[
              { title: 'AI & Machine Learning', desc: 'Master the algorithms shaping the future.', icon: Monitor },
              { title: 'Data Science', desc: 'Turn data into actionable insights.', icon: BookOpen },
              { title: 'Cyber Security', desc: 'Protect systems from digital threats.', icon: Award }
            ].map((prog, idx) => (
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

      {/* Stats Counter */}
      <section className="section bg-dark text-white">
        <div className="section-container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>5000+</h3>
              <p>Students Enrolled</p>
            </div>
            <div className="stat-item">
              <h3>100+</h3>
              <p>Industry Partners</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Expert Trainers</p>
            </div>
            <div className="stat-item">
              <h3>10+</h3>
              <p>Years Experience</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
