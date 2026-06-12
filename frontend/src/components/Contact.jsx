import React from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Banner Section */}
      <section className="contact-banner">
        <div className="banner-container">
          <span className="banner-label">CONTACT</span>
          <h1 className="banner-title">Get in Touch</h1>
          <p className="banner-subtitle">
            Have questions? Fill out the form below or reach us through any of our contact channels.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="contact-content-section">
        <div className="contact-container">
          
          {/* Left Side: Info Cards */}
          <div className="info-cards-wrapper">
            <div className="info-card">
              <div className="info-icon-wrapper">
                <MapPin className="info-icon" size={24} />
              </div>
              <div className="info-details">
                <h3>Visit Us</h3>
                <p>18, Vithal Plaza, 4th Floor, Opp. GEB Office, Dehgam Road, Nava Naroda,<br/>Ahmedabad 382330<br/><span>Mon-Sat, 9 AM - 6 PM</span></p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon-wrapper">
                <Phone className="info-icon" size={24} />
              </div>
              <div className="info-details">
                <h3>Call Us</h3>
                <p>+91 93775 77596<br/>+91 93775 77597</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon-wrapper">
                <Mail className="info-icon" size={24} />
              </div>
              <div className="info-details">
                <h3>Email Us</h3>
                <p>info@educationforce.com<br/><span>We reply within 24 hours</span></p>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="contact-form-wrapper">
            <div className="contact-form-card">
              <h2 className="form-header-title">Send Us a Message</h2>
              <p className="form-header-subtitle">Fill in your details and our team will reach out to you within 24 hours.</p>

              <form className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>FULL NAME <span className="required">*</span></label>
                    <input type="text" placeholder="e.g. Rahul Sharma" required />
                  </div>
                  <div className="form-group">
                    <label>EMAIL ADDRESS</label>
                    <input type="email" placeholder="you@example.com" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>MOBILE NUMBER <span className="required">*</span></label>
                    <input type="tel" placeholder="+91 98765 43210" required />
                  </div>
                  <div className="form-group">
                    <label>CITY</label>
                    <input type="text" placeholder="Your city" />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>SELECT UNIVERSITY</label>
                  <select defaultValue="">
                    <option value="" disabled>Select a university (optional)</option>
                    <option value="uni1">University 1</option>
                    <option value="uni2">University 2</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>YOUR MESSAGE</label>
                  <textarea placeholder="Tell us how we can help you..." rows="4"></textarea>
                </div>

                <button type="submit" className="btn-submit-enquiry">
                  <Send size={18} /> Submit Enquiry
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
