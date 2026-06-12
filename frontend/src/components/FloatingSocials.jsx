import React from 'react';
import { MessageCircle } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const FloatingSocials = () => {
  return (
    <>
      <div className="fixed right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-[1000]">
        <a href="#" className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-slate-500 shadow-md transition-all duration-200 hover:text-blue-500 hover:scale-110">
          <FaFacebookF size={20} />
        </a>
        <a href="#" className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-slate-500 shadow-md transition-all duration-200 hover:text-blue-500 hover:scale-110">
          <FaInstagram size={20} />
        </a>
        <a href="#" className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-slate-500 shadow-md transition-all duration-200 hover:text-blue-500 hover:scale-110">
          <FaLinkedinIn size={20} />
        </a>
        <a href="#" className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-slate-500 shadow-md transition-all duration-200 hover:text-blue-500 hover:scale-110">
          <FaYoutube size={20} />
        </a>
      </div>

      <a href="#" className="fixed right-5 bottom-5 w-[60px] h-[60px] bg-[#25D366] rounded-full flex items-center justify-center shadow-lg z-[1000] transition-transform duration-200 hover:scale-110">
        <MessageCircle size={28} color="white" />
      </a>
    </>
  );
};

export default FloatingSocials;
