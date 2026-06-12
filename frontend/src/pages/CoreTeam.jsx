import React from 'react';
import { UserCircle2 } from 'lucide-react';
import './Pages.css';

const CoreTeam = () => {
  const team = [
    { name: "Dr. Ananya Sharma", role: "Dean of IT", desc: "15+ years of experience in AI research." },
    { name: "Rahul Verma", role: "Head of Operations", desc: "Former Tech Lead at top multinational companies." },
    { name: "Priya Desai", role: "Student Success Director", desc: "Passionate about career development and placement." }
  ];

  return (
    <div className="about-page">
      <section className="contact-banner">
        <div className="banner-container">
          <span className="banner-label">LEADERSHIP</span>
          <h1 className="banner-title">Core Team</h1>
          <p className="banner-subtitle">
            Meet the minds shaping the future of Education Force.
          </p>
        </div>
      </section>

      <section className="section bg-light">
        <div className="section-container text-center">
          <h2 className="section-title">Our Leaders</h2>
          <div className="card-grid mt-4">
            {team.map((member, idx) => (
              <div key={idx} className="program-card" style={{textAlign: 'center'}}>
                <div className="card-icon" style={{margin: '0 auto 1.5rem'}}><UserCircle2 size={48} /></div>
                <h3>{member.name}</h3>
                <p style={{color: '#3b82f6', fontWeight: '600', marginBottom: '1rem'}}>{member.role}</p>
                <p>{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoreTeam;
