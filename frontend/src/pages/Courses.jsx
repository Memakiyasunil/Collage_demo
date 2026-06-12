import React from 'react';
import ProgramsSection from '../components/ProgramsSection';
import './Pages.css';

const Courses = () => {
  return (
    <div className="courses-page">
      <section className="contact-banner">
        <div className="banner-container">
          <span className="banner-label">PROGRAMS</span>
          <h1 className="banner-title">Our Courses</h1>
          <p className="banner-subtitle">
            Explore our comprehensive catalog of industry-aligned degree programs.
          </p>
        </div>
      </section>

      <ProgramsSection />
    </div>
  );
};

export default Courses;
