import React from 'react';
import './Pages.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="contact-banner">
        <div className="banner-container">
          <span className="banner-label">ABOUT US</span>
          <h1 className="banner-title">Our Story</h1>
          <p className="banner-subtitle">
            Built on a simple, powerful belief to transform education.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-container">
          <div className="section-grid">
            <div className="section-content">
              <h2 className="section-title">Vision & Mission</h2>
              <p className="section-desc">
                Our vision is to be the global leader in providing accessible, high-quality IT and management education. We strive to create an ecosystem where innovation thrives and students are equipped with real-world skills.
              </p>
              <p className="section-desc">
                Our mission is to bridge the gap between academia and industry by offering updated curriculum, expert mentorship, and hands-on project experience.
              </p>
            </div>
            <div className="section-image-wrapper">
              <div className="placeholder-image">
                <span style={{color: '#9ca3af'}}>Image Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
