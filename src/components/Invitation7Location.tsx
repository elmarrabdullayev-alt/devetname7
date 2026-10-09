import React from 'react';

export interface Invitation7LocationProps {
  venueName?: string;
  shortAddress?: string;
  mapUrl?: string;
  buttonLabel?: string;
}

export const Invitation7Location: React.FC<Invitation7LocationProps> = ({
  venueName = 'Böyük Saray Şadlıq Sarayı',
  shortAddress = 'Bakı şəhəri, Heydər Əliyev prospekti 115',
  mapUrl = 'https://maps.google.com/?q=Baku',
  buttonLabel = 'Xəritədə aç',
}) => {
  return (
    <section className="content-zone-section relative w-full py-10 px-6 flex flex-col items-center text-center bg-transparent">
      {/* Icon */}
      <div className="w-12 h-12 rounded-full border border-[#C9A56A]/40 flex items-center justify-center text-[#C9A56A] mb-3 bg-[#5A0712]/30">
        <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      </div>

      {/* Məkan adı */}
      <h3 className="font-cormorant text-2xl sm:text-3xl text-[#F7EEE8] font-normal gold-gradient-text mb-1">
        {venueName}
      </h3>

      {/* Qısa ünvan */}
      <p className="font-montserrat text-xs text-[#F7EEE8]/70 max-w-xs mb-5 tracking-wide leading-relaxed">
        {shortAddress}
      </p>

      {/* Xəritədə aç düyməsi */}
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-[#C9A56A] bg-gradient-to-r from-[#7A1623] via-[#5A0712] to-[#7A1623] text-[#F7EEE8] text-xs font-montserrat font-medium uppercase tracking-[0.15em] shadow-[0_4px_15px_rgba(201,165,106,0.2)] hover:border-[#F7EEE8] hover:shadow-[0_4px_20px_rgba(201,165,106,0.35)] transition-all active:scale-[0.98]"
      >
        <span>{buttonLabel}</span>
        <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
      </a>
    </section>
  );
};
