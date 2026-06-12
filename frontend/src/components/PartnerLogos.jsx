import React from 'react';

const PartnerLogos = () => {
  return (
    <section className="py-16 px-8 bg-white border-b border-slate-100">
      <div className="text-center">
        <h4 className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-8">OUR KNOWLEDGE PARTNERS & AFFILIATED UNIVERSITIES</h4>
        <div className="flex justify-center items-center flex-wrap gap-6 max-w-5xl mx-auto">
          {/* Using styled text placeholders for logos since actual images are unavailable */}
          <div className="bg-white border border-slate-200 py-4 px-6 rounded-lg text-slate-600 font-semibold text-sm shadow-sm flex items-center justify-center min-w-[140px] text-center">Gandhinagar University</div>
          <div className="bg-white border border-slate-200 py-4 px-6 rounded-lg text-slate-600 font-semibold text-sm shadow-sm flex items-center justify-center min-w-[140px] text-center">Vidhyadeep University</div>
          <div className="bg-white border border-slate-200 py-4 px-6 rounded-lg text-slate-600 font-semibold text-sm shadow-sm flex items-center justify-center min-w-[140px] text-center">Shreyarth University</div>
          <div className="bg-white border border-orange-500 py-4 px-6 rounded-lg text-orange-600 font-semibold text-sm shadow-sm flex items-center justify-center min-w-[140px] text-center">Rai University</div>
          <div className="bg-white border border-slate-200 py-4 px-6 rounded-lg text-slate-600 font-semibold text-sm shadow-sm flex items-center justify-center min-w-[140px] text-center">Monark University</div>
          <div className="bg-white border border-slate-200 py-4 px-6 rounded-lg text-slate-600 font-semibold text-sm shadow-sm flex items-center justify-center min-w-[140px] text-center">The New Progressive</div>
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;
