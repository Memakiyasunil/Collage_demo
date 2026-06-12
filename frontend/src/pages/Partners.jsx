import React from 'react';
import { CheckCircle2, GraduationCap } from 'lucide-react';
import './Partners.css';

const partnersData = [
  {
    id: 1,
    name: "Gandhinagar University",
    programCount: 12,
    colorTheme: "purple",
    programs: [
      "Int. M.Sc. IT Animation, VFX & Game Design",
      "Int. M.Sc. IT Cyber Security & Digital Forensics",
      "Int. M.Sc. IT Software & Mobile Application Development"
    ],
    moreCount: 9,
    buttonText: "View University"
  },
  {
    id: 2,
    name: "Vidhyadeep University",
    programCount: 13,
    colorTheme: "blue",
    programs: [
      "Integrated MBA - Data Science",
      "M.Sc. IT Animation, VFX & Game Design",
      "M.Sc. IT Artificial Intelligence & Machine Learning"
    ],
    moreCount: 10,
    buttonText: "View University"
  },
  {
    id: 3,
    name: "Shreyarth University",
    programCount: 4,
    colorTheme: "orange",
    programs: [
      "B.Sc. IT (Hons) Artificial Intelligence & Machine Learning",
      "B.Sc. IT (Hons) Data Analytics",
      "B.Voc. Cyber Security & Cloud Technology"
    ],
    moreCount: 1,
    buttonText: "View University"
  },
  {
    id: 4,
    name: "Rai University",
    programCount: 3,
    colorTheme: "green",
    programs: [
      "B.Sc. IT (Hons) Artificial Intelligence & Machine Learning",
      "B.Sc. IT (Hons) Cyber Security & Cloud Technology",
      "M.Sc. IT Cyber Security & Cloud Technology"
    ],
    moreCount: 0,
    buttonText: "View University"
  },
  {
    id: 5,
    name: "Monark University",
    programCount: 0,
    colorTheme: "pink",
    programs: [],
    moreCount: 0,
    customMessage: "Program details will be available soon.",
    buttonText: "View University"
  },
  {
    id: 6,
    name: "The New Progressive College",
    programCount: 2,
    colorTheme: "teal",
    programs: [
      "Bachelor of Business Administration (BBA)",
      "Bachelor of Computer Application (BCA)"
    ],
    moreCount: 0,
    buttonText: "View College"
  }
];

const Partners = () => {
  return (
    <div className="partners-page">
      <div className="partners-header">
        <div className="partners-title-section">
          <span className="partners-label">OUR NETWORK</span>
          <h1 className="partners-title">Partner <span className="highlight-blue">Universities</span></h1>
        </div>
        <div className="partners-desc-section">
          <p>We partner with leading universities to bring you accredited, industry-aligned programs.</p>
        </div>
      </div>

      <div className="partners-grid-container">
        <div className="partners-grid">
          {partnersData.map((partner) => (
            <div key={partner.id} className="partner-card">
              {/* Card Top / Colored Section */}
              <div className={`partner-card-top theme-${partner.colorTheme}`}>
                <div className="partner-logo-placeholder">
                  <GraduationCap size={24} className={`icon-${partner.colorTheme}`} />
                </div>
                <h3>{partner.name}</h3>
                <p>{partner.programCount > 0 ? `${partner.programCount} Programs Available` : 'Programs Coming Soon'}</p>
                {/* Decorative circle in the top right corner */}
                <div className="decorative-circle"></div>
              </div>

              {/* Card Bottom / White Section */}
              <div className="partner-card-bottom">
                {partner.customMessage ? (
                  <p className="custom-message">{partner.customMessage}</p>
                ) : (
                  <ul className="program-checklist">
                    {partner.programs.map((prog, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={16} className={`check-${partner.colorTheme}`} />
                        <span>{prog}</span>
                      </li>
                    ))}
                    {partner.moreCount > 0 && (
                      <li className="more-programs">
                        +{partner.moreCount} more programs
                      </li>
                    )}
                  </ul>
                )}

                <button className="btn-view-partner">
                  {partner.buttonText} <span className="arrow">&gt;</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
