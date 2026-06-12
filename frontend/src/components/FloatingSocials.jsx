import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaWhatsapp } from 'react-icons/fa';

const FloatingSocials = () => {
  return (
    <>
      <div className="fixed right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-[1000]">
        <a href="#" className="group w-11 h-11 bg-white rounded-full flex items-center justify-center text-slate-500 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg">
          <FaFacebookF size={20} className="transition-colors duration-300 group-hover:text-[#1877F2]" />
        </a>
        <a href="#" className="group w-11 h-11 bg-white rounded-full flex items-center justify-center text-slate-500 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg">
          <FaInstagram size={20} className="transition-colors duration-300 group-hover:text-[#E4405F]" />
        </a>
        <a href="#" className="group w-11 h-11 bg-white rounded-full flex items-center justify-center text-slate-500 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg">
          <FaLinkedinIn size={20} className="transition-colors duration-300 group-hover:text-[#0A66C2]" />
        </a>
        <a href="#" className="group w-11 h-11 bg-white rounded-full flex items-center justify-center text-slate-500 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg">
          <FaYoutube size={20} className="transition-colors duration-300 group-hover:text-[#FF0000]" />
        </a>
      </div>

      <a href="#" className="fixed right-5 bottom-5 w-[60px] h-[60px] bg-[#25D366] rounded-full flex items-center justify-center shadow-lg z-[1000] transition-transform duration-300 hover:scale-110 hover:shadow-xl hover:bg-[#20bd5a]">
        <FaWhatsapp size={32} color="white" />
      </a>
    </>
  );
};

export default FloatingSocials;
