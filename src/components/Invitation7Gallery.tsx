import React, { useState } from 'react';
import { INVITATION7_MEDIA } from '../media';

export interface Invitation7GalleryProps {
  title?: string;
  subtitle?: string;
}

export const Invitation7Gallery: React.FC<Invitation7GalleryProps> = ({
  title = 'Xatirə Şəkilləri',
  subtitle = 'Ən şirin anlar və unudulmaz xatirələr',
}) => {
  const [img1Error, setImg1Error] = useState(false);
  const [img2Error, setImg2Error] = useState(false);

  const images = [
    {
      src: INVITATION7_MEDIA.gallery[0].webp,
      alt: INVITATION7_MEDIA.gallery[0].alt,
      hasError: img1Error,
      onError: () => setImg1Error(true),
      label: 'Foto 1',
    },
    {
      src: INVITATION7_MEDIA.gallery[1].webp,
      alt: INVITATION7_MEDIA.gallery[1].alt,
      hasError: img2Error,
      onError: () => setImg2Error(true),
      label: 'Foto 2',
    },
  ];

  return (
    <section className="content-zone-section relative w-full py-12 px-6 flex flex-col items-center text-center bg-transparent">
      <p className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#C9A56A] mb-1 font-medium">
        QALEREYA
      </p>

      <h3 className="font-cormorant text-2xl sm:text-3xl text-[#F7EEE8] font-normal gold-gradient-text mb-1">
        {title}
      </h3>

      <p className="font-montserrat text-xs text-[#F7EEE8]/60 mb-6 max-w-xs">
        {subtitle}
      </p>

      {/* Yalnız 2 şəkil: gallery-1.webp və gallery-2.webp */}
      <div className="grid grid-cols-2 gap-3.5 w-full max-w-sm">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="group relative flex flex-col rounded-xl overflow-hidden border border-[#C9A56A]/30 bg-[#170104]/90 shadow-xl"
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-gradient-to-b from-[#5A0712]/30 to-[#170104] flex flex-col items-center justify-center">
              {!img.hasError ? (
                <img
                  src={img.src}
                  alt={img.alt}
                  onError={img.onError}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-3">
                  <div className="w-10 h-10 rounded-full border border-[#C9A56A]/40 flex items-center justify-center text-[#C9A56A] mb-2 bg-[#5A0712]/40">
                    <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                  <span className="font-cinzel text-xs text-[#C9A56A] tracking-wider">
                    {img.label}
                  </span>
                </div>
              )}

              {/* Inner gold hairline border */}
              <div className="absolute inset-1.5 border border-[#C9A56A]/20 rounded-lg pointer-events-none" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
