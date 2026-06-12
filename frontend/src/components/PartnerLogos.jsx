import React from 'react';
import './Programs.css';

const PartnerLogos = () => {
  return (
    <section className="partner-logos-section">
      <div className="section-container text-center">
        <h4 className="partner-logos-title">OUR KNOWLEDGE PARTNERS & AFFILIATED UNIVERSITIES</h4>
        <div className="partner-logos-grid">
          {/* Using styled text placeholders for logos since actual images are unavailable */}
          <div className="logo-box">Gandhinagar University</div>
          <div className="logo-box">Vidhyadeep University</div>
          <div className="logo-box">Shreyarth University</div>
          <div className="logo-box logo-highlight">Rai University</div>
          <div className="logo-box">Monark University</div>
          <div className="logo-box">The New Progressive</div>
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;
