import React, { useState, useRef, useEffect } from 'react';
import { INVITATION7_MEDIA } from '../media';

export interface Invitation7DeliveryProps {
  brideName?: string;
  tagline?: string;
  children?: React.ReactNode;
  isActive?: boolean;
}

export const Invitation7Delivery: React.FC<Invitation7DeliveryProps> = ({
  brideName = 'Aygün',
  tagline = 'xına gecəsinə dəvət edir',
  children,
  isActive = true,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isFirstFrameRendered, setIsFirstFrameRendered] = useState(false);
  const isIntersectingRef = useRef(false);

  // IntersectionObserver: Yalnız ekranda görünəndə və aktiv olduqda oynat, çıxanda pause et
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersectingRef.current = entry.isIntersecting;
          if (entry.isIntersecting && isActive) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [isActive]);

  // Aktivlik dəyişdikdə video vəziyyətini yenilə
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive && isIntersectingRef.current) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isActive]);

  // Poster qoruması: İlk real video kadrı gələnədək poster görünsün
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if ('requestVideoFrameCallback' in video) {
      const handleFrame = () => {
        setIsFirstFrameRendered(true);
      };
      (video as any).requestVideoFrameCallback(handleFrame);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="invitation7-video-page relative z-20 w-full min-h-[100svh] overflow-hidden bg-[#2A0308] select-none blend-transition-top blend-transition-bottom"
    >
      {/* 1. Arxa Fon Videosu (loop={true}) */}
      <video
        ref={videoRef}
        src={INVITATION7_MEDIA.delivery.webm}
        loop
        muted
        playsInline
        preload="metadata"
        onError={() => {
          // Xəta olarsa poster qalsın, qara ekran yaranmasın
          setIsFirstFrameRendered(false);
        }}
        onTimeUpdate={(e) => {
          if (e.currentTarget.currentTime > 0.05) {
            setIsFirstFrameRendered(true);
          }
        }}
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ transform: 'translateZ(0)' }}
      />

      {/* 2. Poster Qoruyucu Şəkil */}
      <img
        src={INVITATION7_MEDIA.delivery.posterWebp}
        alt="Dəvət Çantası"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10 ${
          isFirstFrameRendered ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* 3. Çox yüngül, tam ekran gradient (şəffaf kart/blur olmadan) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#170104]/30 via-transparent to-[#170104]/50 pointer-events-none z-15" />

      {/* 4. HTML Mətn Qatı - Videonun yuxarı boş hissəsində, əllərin və çanta tutacaqlarının üzərinə çıxmır */}
      <div 
        className="absolute left-0 right-0 z-20 flex flex-col items-center justify-center text-center pointer-events-none px-6"
        style={{ top: '10%' }}
      >
        {children || (
          <div className="flex flex-col items-center justify-center max-w-[320px]">
            <span className="font-handwriting text-5xl sm:text-6xl text-[#C9A56A] text-gold-shadow leading-none">
              {brideName}
            </span>
            <span className="font-cormorant text-xs sm:text-sm text-[#F7EEE8] text-soft-shadow tracking-[0.2em] italic mt-2 uppercase font-light">
              {tagline}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
