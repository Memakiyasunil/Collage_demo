import React from 'react';
import { MessageCircle } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import './FloatingSocials.css';

const FloatingSocials = () => {
  return (
    <>
      <div className="floating-socials-vertical">
        <a href="#" className="social-icon">
          <FaFacebookF size={20} />
        </a>
        <a href="#" className="social-icon">
          <FaInstagram size={20} />
        </a>
        <a href="#" className="social-icon">
          <FaLinkedinIn size={20} />
        </a>
        <a href="#" className="social-icon">
          <FaYoutube size={20} />
        </a>
      </div>

      <a href="#" className="floating-whatsapp">
        <MessageCircle size={28} color="white" />
      </a>
    </>
  );
};

export default FloatingSocials;
