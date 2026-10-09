import React, { useState, useRef, useEffect } from 'react';
import { INVITATION7_MEDIA } from '../media';

export interface Invitation7BallroomProps {
  title?: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
}

export const Invitation7Ballroom: React.FC<Invitation7BallroomProps> = ({
  title = 'Təntənəli Mərasim Zalı',
  subtitle = 'Sehrli Ab-hava və Zəriflik',
  description = 'Göz oxşayan şamlar, qızılı bəzəklər və milli naxışlarla bəzədilmiş zalımızda əsl xına nağılı yaşanacaq.',
  children,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isFirstFrameRendered, setIsFirstFrameRendered] = useState(false);

  // IntersectionObserver: Yalnız ekranda görünəndə oynat, çıxanda pause et
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

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
      className="invitation7-video-page relative w-full min-h-[100svh] overflow-hidden bg-[#2A0308] select-none"
    >
      {/* 1. Arxa Fon Videosu (loop={true}) */}
      <video
        ref={videoRef}
        src={INVITATION7_MEDIA.ballroom.webm}
        loop
        muted
        playsInline
        preload="auto"
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
      />

      {/* 2. Poster Qoruyucu Şəkil */}
      <img
        src={INVITATION7_MEDIA.ballroom.posterWebp}
        alt="Zal Görünüşü"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10 ${
          isFirstFrameRendered ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* 3. Çox yüngül, tam ekran gradient (şəffaf kart/blur olmadan) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#170104]/30 via-transparent to-[#170104]/60 pointer-events-none z-15" />

      {/* 4. HTML Mətn Qatı */}
      <div className="invitation7-video-page__content invitation7-ballroom-content">
        {children || (
          <div 
            className="flex flex-col items-center justify-center max-w-[320px] px-2"
            style={{ transform: 'translateY(-10vh)' }}
          >
            <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#C9A56A] text-gold-shadow mb-2 font-medium">
              {subtitle}
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl text-[#F7EEE8] text-soft-shadow font-normal gold-gradient-text mb-2.5">
              {title}
            </h2>
            <p className="font-cormorant text-base sm:text-lg text-[#F7EEE8]/90 text-soft-shadow leading-relaxed italic">
              "{description}"
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
