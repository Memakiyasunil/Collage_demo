import React from 'react';
import { GraduationCap, ArrowRight, Check, FileDown } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        
        {/* Left Content */}
        <div className="hero-content">
          <div className="badge">
            <span className="dot"></span>
            <GraduationCap size={16} />
            <span>Admissions Open 2026-27</span>
          </div>
          
          <h1 className="hero-title">
            Transform Your Future<br />
            with <span className="highlight">Cutting-Edge IT<br/>Education</span>
          </h1>
          
          <p className="hero-subtitle">
            Explore 30+ industry-aligned programs across 5 top<br/>
            universities. Get expert career guidance, detailed fee<br/>
            structure, and scholarship information — absolutely free.
          </p>
          
          <div className="hero-buttons">
            <button className="btn-explore">
              Explore Programs <ArrowRight size={18} />
            </button>
            <button className="btn-outline">
              Inquire Now
            </button>
          </div>
          
          <div className="hero-features">
            <div className="feature-item">
              <Check size={16} className="check-icon" />
              <span>Free Career Counselling</span>
            </div>
            <div className="feature-item">
              <Check size={16} className="check-icon" />
              <span>Fee Structure & Scholarships</span>
            </div>
            <div className="feature-item">
              <Check size={16} className="check-icon" />
              <span>Callback in 24 Hours</span>
            </div>
          </div>
        </div>

        {/* Right Content - Form */}
        <div className="hero-form-wrapper">
          <div className="hero-form-card">
            <div className="form-icon-wrapper">
              <FileDown size={20} className="form-icon" />
            </div>
            <h3 className="form-title">Download Free Brochure</h3>
            <p className="form-subtitle">Get detailed fee structure, curriculum & placement info</p>
            
            <form className="brochure-form">
              <div className="form-group">
                <input type="text" placeholder="Your Name *" required />
              </div>
              <div className="form-group">
                <input type="tel" placeholder="Mobile Number *" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Email Address" />
              </div>
              <div className="form-group">
                <select defaultValue="">
                  <option value="" disabled>Select University</option>
                  <option value="uni1">University 1</option>
                  <option value="uni2">University 2</option>
                </select>
              </div>
              <div className="form-group">
                <input type="text" placeholder="City" />
              </div>
              
              <button type="submit" className="btn-submit">
                <FileDown size={18} />
                Download Brochure & Get Callback
              </button>
            </form>
            
            <p className="form-footer">
              Your information is 100% secure and never shared
            </p>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;
