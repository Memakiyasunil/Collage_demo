import React, { useState } from 'react';
import { Book, Code, Shield, Cpu, Database, Cloud, Clock, CheckCircle } from 'lucide-react';
import './Programs.css';

// Generating Mock Data
const generateMockPrograms = (type, count) => {
  const titles = [
    "Animation, VFX & Game Design",
    "Artificial Intelligence & Machine Learning",
    "Blockchain Technology",
    "Cloud Automation",
    "Cyber Security & Cloud Technology",
    "Cyber Security & Digital Forensics",
    "Data Analytics",
    "Software & Mobile Application Development",
    "Internet of Things (IoT)",
    "Full Stack Web Development",
    "Robotics and Automation",
    "UI/UX Design & Engineering",
    "Cloud Computing & DevOps",
    "AR/VR Technology"
  ];

  const icons = [Book, Code, Shield, Cpu, Database, Cloud];
  const universities = [
    { name: "Vidhyadeep University", class: "uni-blue" },
    { name: "Gandhinagar University", class: "uni-purple" },
    { name: "Rai University", class: "uni-green" },
    { name: "Shreyarth University", class: "uni-orange" }
  ];

  return Array.from({ length: count }).map((_, i) => {
    const titleBase = titles[i % titles.length];
    let fullTitle = "";
    if (type === 'UG') fullTitle = `B.Sc. IT (Hons) ${titleBase}`;
    if (type === 'PG') fullTitle = `M.Sc. IT ${titleBase}`;
    if (type === 'INT') fullTitle = `Int. M.Sc. IT ${titleBase}`;

    const IconComponent = icons[i % icons.length];
    
    // Pick 1 or 2 random universities
    const numUnis = (i % 2) + 1;
    const progUnis = [];
    for(let j=0; j<numUnis; j++) {
      progUnis.push(universities[(i + j) % universities.length]);
    }

    return {
      id: `${type}-${i}`,
      title: fullTitle,
      type: type,
      icon: IconComponent,
      universities: progUnis,
      description: `${fullTitle} designed to prepare you for the most in-demand tech careers.`,
      duration: type === 'INT' ? "5 Years" : type === 'PG' ? "2 Years" : "4 Years",
      eligibility: type === 'PG' ? "Graduation" : "12th Pass"
    };
  });
};

const ugPrograms = generateMockPrograms('UG', 13);
const pgPrograms = generateMockPrograms('PG', 9);
const intPrograms = generateMockPrograms('INT', 4);

const ProgramsSection = () => {
  const [activeTab, setActiveTab] = useState('UG');

  let currentPrograms = ugPrograms;
  if (activeTab === 'PG') currentPrograms = pgPrograms;
  if (activeTab === 'INT') currentPrograms = intPrograms;

  return (
    <section className="programs-container">
      <div className="programs-header-section">
        <h4 className="programs-subtitle">OUR PROGRAMS</h4>
        <h2 className="programs-main-title">Cutting-Edge IT Specializations</h2>
        <p className="programs-desc">
          Choose from our range of industry-aligned programs designed to prepare you for the most in-demand tech careers.
        </p>
        
        <div className="programs-tabs">
          <button 
            className={`tab-button ${activeTab === 'UG' ? 'active' : ''}`}
            onClick={() => setActiveTab('UG')}
          >
            UG Programs <span className="tab-badge">13</span>
          </button>
          <button 
            className={`tab-button ${activeTab === 'PG' ? 'active' : ''}`}
            onClick={() => setActiveTab('PG')}
          >
            PG Programs <span className="tab-badge">9</span>
          </button>
          <button 
            className={`tab-button ${activeTab === 'INT' ? 'active' : ''}`}
            onClick={() => setActiveTab('INT')}
          >
            Integrated Programs <span className="tab-badge">4</span>
          </button>
        </div>
      </div>

      <div className="programs-grid">
        {currentPrograms.map((prog) => (
          <div key={prog.id} className="prog-card">
            <div className="prog-card-header">
              <div className="prog-icon-box">
                <prog.icon size={20} />
              </div>
              <span className="prog-type-badge">{prog.type}</span>
            </div>
            <div className="prog-card-body">
              <h3 className="prog-title">{prog.title}</h3>
              <div className="prog-universities">
                {prog.universities.map((uni, idx) => (
                  <span key={idx} className={`uni-tag ${uni.class}`}>{uni.name}</span>
                ))}
              </div>
              <p className="prog-description">{prog.description}</p>
            </div>
            <div className="prog-card-footer">
              <div className="prog-meta">
                <Clock size={16} /> {prog.duration}
              </div>
              <div className="prog-meta">
                <CheckCircle size={16} /> {prog.eligibility}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProgramsSection;
