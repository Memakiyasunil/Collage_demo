import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaWhatsapp, FaShareAlt, FaTimes } from 'react-icons/fa';

const FloatingSocials = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-5 bottom-5 flex flex-col items-center gap-3 z-[1000]">
      <div 
        className={`flex flex-col gap-3 transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0 scale-100 visible' : 'opacity-0 translate-y-10 scale-90 invisible absolute bottom-full pb-4'
        } origin-bottom`}
      >
        <a href="#" className="group w-12 h-12 bg-[#1a1f2c] hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center text-white transition-all shadow-lg hover:scale-110">
          <FaFacebookF size={20} className="transition-colors duration-300 group-hover:text-[#1877F2]" />
        </a>
        <a href="#" className="group w-12 h-12 bg-[#1a1f2c] hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center text-white transition-all shadow-lg hover:scale-110">
          <FaInstagram size={20} className="transition-colors duration-300 group-hover:text-[#E4405F]" />
        </a>
        <a href="#" className="group w-12 h-12 bg-[#1a1f2c] hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center text-white transition-all shadow-lg hover:scale-110">
          <FaLinkedinIn size={20} className="transition-colors duration-300 group-hover:text-[#0A66C2]" />
        </a>
        <a href="#" className="group w-12 h-12 bg-[#1a1f2c] hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center text-white transition-all shadow-lg hover:scale-110">
          <FaYoutube size={20} className="transition-colors duration-300 group-hover:text-[#FF0000]" />
        </a>
        <a href="#" className="group w-12 h-12 bg-[#1a1f2c] hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center text-white transition-all shadow-lg hover:scale-110">
          <FaWhatsapp size={20} className="transition-colors duration-300 group-hover:text-[#25D366]" />
        </a>
      </div>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-[60px] h-[60px] bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] text-white z-50 mt-2"
      >
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90 scale-0' : 'rotate-0 scale-100'} absolute`}>
          <FaShareAlt size={24} />
        </div>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-0 scale-100' : '-rotate-90 scale-0'} absolute`}>
          <FaTimes size={24} />
        </div>
      </button>
    </div>
  );
};

export default FloatingSocials;

