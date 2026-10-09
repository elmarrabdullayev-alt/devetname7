import React from 'react';

export interface Invitation7EndingProps {
  closingMessage?: string;
  signOff?: string;
  signature?: string;
  familyNote?: string;
}

export const Invitation7Ending: React.FC<Invitation7EndingProps> = ({
  closingMessage = 'Sizi bu özəl gecədə aramızda görməkdən məmnun olarıq.',
  signOff,
  signature = 'Aygün',
  familyNote,
}) => {
  return (
    <section className="content-zone-section blend-transition-bottom relative w-full py-16 px-6 flex flex-col items-center text-center bg-transparent overflow-hidden">
      {/* Background soft ambient radial light */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 60%, #7A1623 0%, transparent 70%)',
        }}
      />

      {/* Decorative Golden Paisley / Henna Motif */}
      <div className="relative z-10 w-12 h-12 mb-4 text-[#C9A56A] opacity-90 flex items-center justify-center">
        <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
          <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3"/>
          <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1"/>
          <path d="M24 12C20 18 16 21 16 26C16 30.4183 19.5817 34 24 34C28.4183 34 32 30.4183 32 26C32 21 28 18 24 12Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.2"/>
          <circle cx="24" cy="26" r="3" fill="currentColor"/>
        </svg>
      </div>

      {/* Qısa Yekun Dəvət */}
      <p className="relative z-10 font-cormorant text-xl sm:text-2xl text-[#F7EEE8] max-w-xs italic leading-relaxed mb-6 px-2">
        "{closingMessage}"
      </p>

      {/* Gold Divider */}
      <div className="gold-divider max-w-[200px] my-3">
        <span className="w-2 h-2 rotate-45 bg-[#C9A56A]" />
      </div>

      {/* Sign-off */}
      <p className="relative z-10 font-montserrat text-xs tracking-[0.2em] uppercase text-[#C9A56A]/80 mt-2 mb-1">
        {signOff}
      </p>

      {/* Aygün İmzası */}
      <div className="relative z-10 my-1">
        <h2 className="font-cormorant text-5xl sm:text-6xl text-[#F7EEE8] gold-gradient-text font-normal tracking-wide">
          {signature}
        </h2>
        {familyNote && (
          <p className="font-cormorant text-base text-[#F7EEE8]/70 italic mt-0.5">
            {familyNote}
          </p>
        )}
      </div>

      {/* Small copyright/watermark-free quiet bottom marker */}
      <div className="relative z-10 mt-10 pt-4 border-t border-[rgba(201,165,106,0.15)] w-full max-w-xs flex justify-center">
        <span className="font-montserrat text-[10px] text-[#C9A56A]/50 tracking-[0.25em] uppercase">
          Xına Gecəsi 2026
        </span>
      </div>
    </section>
  );
};
