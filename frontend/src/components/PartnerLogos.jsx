import React from 'react';

const PartnerLogos = () => {
  return (
    <section className="py-16 px-8 bg-slate-950 border-b border-white/10 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-sky-900/10 via-transparent to-transparent pointer-events-none" />
      <div className="text-center">
        <h4 className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-8">OUR KNOWLEDGE PARTNERS & AFFILIATED UNIVERSITIES</h4>
        <div className="flex justify-center items-center flex-wrap gap-6 max-w-5xl mx-auto">
          {/* Using styled text placeholders for logos since actual images are unavailable */}
          <div className="bg-white/5 border border-white/10 py-4 px-6 rounded-lg text-slate-300 font-semibold text-sm shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex items-center justify-center min-w-[140px] text-center hover:border-sky-500/50 transition-colors">Gandhinagar University</div>
          <div className="bg-white/5 border border-white/10 py-4 px-6 rounded-lg text-slate-300 font-semibold text-sm shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex items-center justify-center min-w-[140px] text-center hover:border-sky-500/50 transition-colors">Vidhyadeep University</div>
          <div className="bg-white/5 border border-white/10 py-4 px-6 rounded-lg text-slate-300 font-semibold text-sm shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex items-center justify-center min-w-[140px] text-center hover:border-sky-500/50 transition-colors">Shreyarth University</div>
          <div className="bg-orange-500/10 border border-orange-500/50 py-4 px-6 rounded-lg text-orange-400 font-semibold text-sm shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex items-center justify-center min-w-[140px] text-center hover:bg-orange-500/20 transition-colors">Rai University</div>
          <div className="bg-white/5 border border-white/10 py-4 px-6 rounded-lg text-slate-300 font-semibold text-sm shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex items-center justify-center min-w-[140px] text-center hover:border-sky-500/50 transition-colors">Monark University</div>
          <div className="bg-white/5 border border-white/10 py-4 px-6 rounded-lg text-slate-300 font-semibold text-sm shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex items-center justify-center min-w-[140px] text-center hover:border-sky-500/50 transition-colors">The New Progressive</div>
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;
