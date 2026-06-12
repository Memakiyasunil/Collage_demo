import React from 'react';
import Hero from '../components/Hero';
import PartnerLogos from '../components/PartnerLogos';
import ProgramsSection from '../components/ProgramsSection';
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

      <PartnerLogos />
      <ProgramsSection />

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
