import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaWhatsapp } from 'react-icons/fa';

const FloatingSocials = () => {
  return (
    <>
      <div className="fixed right-5 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[1000] hidden md:flex">
        <a href="#" className="group w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center text-white transition-all shadow-lg hover:scale-110">
          <FaFacebookF size={18} className="transition-colors duration-300 group-hover:text-[#1877F2]" />
        </a>
        <a href="#" className="group w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center text-white transition-all shadow-lg hover:scale-110">
          <FaInstagram size={18} className="transition-colors duration-300 group-hover:text-[#E4405F]" />
        </a>
        <a href="#" className="group w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center text-white transition-all shadow-lg hover:scale-110">
          <FaLinkedinIn size={18} className="transition-colors duration-300 group-hover:text-[#0A66C2]" />
        </a>
        <a href="#" className="group w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center text-white transition-all shadow-lg hover:scale-110">
          <FaYoutube size={18} className="transition-colors duration-300 group-hover:text-[#FF0000]" />
        </a>
      </div>

      <a href="#" className="fixed right-5 bottom-5 w-[60px] h-[60px] bg-[#25D366] rounded-full flex items-center justify-center shadow-lg z-[1000] transition-transform duration-300 hover:scale-110 hover:shadow-xl hover:bg-[#20bd5a]">
        <FaWhatsapp size={32} color="white" />
      </a>
    </>
  );
};

export default FloatingSocials;
