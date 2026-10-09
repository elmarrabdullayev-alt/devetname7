import React, { useState, useRef, useEffect } from 'react';
import { INVITATION7_MEDIA } from '../media';

export interface Invitation7CurtainRevealProps {
  title?: string;
  tagline?: string;
  description?: string;
  children?: React.ReactNode;
}

export const Invitation7CurtainReveal: React.FC<Invitation7CurtainRevealProps> = ({
  title = 'Qırmızı İpək Pərdə Açılışı',
  tagline = 'Milli Adət-Ənənələrimizlə',
  description = 'Qırmızı örtük, xına nəğmələri və zərif anların sehrinə şahidlik etmək üçün qapılarımız üzünüzə açılır.',
  children,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isFirstFrameRendered, setIsFirstFrameRendered] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const hasRevealedRef = useRef(false);

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
      { threshold: 0.15 }
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

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.currentTime > 0.05) {
      setIsFirstFrameRendered(true);
    }
    // Videonun təxminən 65-70%-i tamamlandıqda mətni göstər və loop zamanı yoxa çıxarma
    if (!hasRevealedRef.current) {
      if (video.duration && Number.isFinite(video.duration) && video.duration > 0) {
        if (video.currentTime / video.duration >= 0.65) {
          hasRevealedRef.current = true;
          setIsRevealed(true);
        }
      } else if (video.currentTime >= 2.4) {
        hasRevealedRef.current = true;
        setIsRevealed(true);
      }
    }
  };

  const handleVideoError = () => {
    setIsFirstFrameRendered(false);
    if (!hasRevealedRef.current) {
      setTimeout(() => {
        hasRevealedRef.current = true;
        setIsRevealed(true);
      }, 1000);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="invitation7-video-page invitation7-fullscreen-scene relative z-20 bg-[#2A0308] select-none blend-transition-top blend-transition-bottom"
      style={{
        minHeight: '100svh',
        height: '100dvh',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* 1. Arxa Fon Videosu (loop={true}) */}
      <video
        ref={videoRef}
        src={INVITATION7_MEDIA.curtain.webm}
        loop
        muted
        playsInline
        preload="metadata"
        onError={handleVideoError}
        onTimeUpdate={handleTimeUpdate}
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ transform: 'translateZ(0)' }}
      />

      {/* 2. Poster Qoruyucu Şəkil */}
      <img
        src={INVITATION7_MEDIA.curtain.posterWebp}
        alt="Pərdə Açılışı"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10 ${
          isFirstFrameRendered ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* 3. Çox yüngül, tam ekran gradient (şəffaf kart/blur olmadan) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#170104]/35 via-transparent to-[#170104]/55 pointer-events-none z-15" />

      {/* 4. HTML Mətn Qatı - Birbaşa video üzərində, kartsız və blursuz */}
      <div className="invitation7-video-page__content invitation7-curtain-content">
        {children || (
          <div
            className={`transition-[opacity,transform] duration-1000 ease-out transform ${
              isRevealed
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6 pointer-events-none'
            } flex flex-col items-center justify-center max-w-[380px] px-4 text-center`}
          >
            <span
              className="font-montserrat uppercase tracking-[0.16em] mb-2"
              style={{
                color: '#F4D59B',
                fontSize: 'clamp(14px, 4vw, 16px)',
                fontWeight: 700,
                opacity: 1,
                textShadow: '0 2px 10px rgba(23, 1, 4, 0.85)',
              }}
            >
              {tagline}
            </span>
            <h2
              className="font-cormorant mb-3 leading-snug"
              style={{
                color: '#F7EEE8',
                fontSize: 'clamp(32px, 8.5vw, 36px)',
                fontWeight: 600,
                opacity: 1,
                textShadow: '0 2px 10px rgba(23, 1, 4, 0.85)',
              }}
            >
              {title}
            </h2>
            <p
              className="font-cormorant italic leading-relaxed"
              style={{
                color: '#F7EEE8',
                fontSize: 'clamp(18px, 4.8vw, 20px)',
                fontWeight: 500,
                opacity: 1,
                textShadow: '0 2px 10px rgba(23, 1, 4, 0.85)',
              }}
            >
              "{description}"
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
