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
      className="invitation7-video-page scene-transition-overlap relative z-20 w-full min-h-[100svh] overflow-hidden bg-[#2A0308] select-none blend-transition-top blend-transition-bottom"
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

      {/* 4. HTML Mətn Qatı - Səhifənin yuxarı hissəsində (top: 15%-20%), çilçıraq və aşağıdakı zal görünüşü açıq qalır */}
      <div 
        className="absolute left-0 right-0 z-20 flex flex-col items-center justify-center text-center pointer-events-none px-5"
        style={{ top: '16%' }}
      >
        {children || (
          <div className="flex flex-col items-center justify-center max-w-[380px] px-2">
            <span
              className="font-montserrat uppercase tracking-[0.16em] mb-2"
              style={{
                color: '#F4D59B',
                fontSize: 'clamp(15px, 4.2vw, 16px)',
                fontWeight: 700,
                opacity: 1,
                textShadow: '0 2px 10px rgba(23, 1, 4, 0.85)',
              }}
            >
              {subtitle}
            </span>
            <h2
              className="font-cormorant mb-2.5 leading-snug"
              style={{
                color: '#F7EEE8',
                fontSize: 'clamp(34px, 9vw, 38px)',
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
