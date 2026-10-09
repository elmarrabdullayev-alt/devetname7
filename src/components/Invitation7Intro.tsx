import React, { useState, useRef, useEffect } from 'react';
import { INVITATION7_MEDIA } from '../media';

export interface Invitation7IntroProps {
  onComplete?: () => void;
  brideName?: string;
  tagline?: string;
}

export const Invitation7Intro: React.FC<Invitation7IntroProps> = ({
  onComplete,
  brideName = 'Aygün sizi',
  tagline = 'xına gecəsinə dəvət edir',
}) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isFirstFrameRendered, setIsFirstFrameRendered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasEndedRef = useRef(false);

  const handleComplete = () => {
    if (hasEndedRef.current) return;
    hasEndedRef.current = true;
    if (onComplete) {
      onComplete();
    }
  };

  const handleStart = () => {
    if (hasStarted) return;
    setHasStarted(true);

    const video = videoRef.current;
    if (video) {
      video
        .play()
        .then(() => {
          // Video playing successfully
        })
        .catch(() => {
          // Playback blocked or file error: show poster, wait 1.5s and advance safely
          setTimeout(() => {
            handleComplete();
          }, 1500);
        });
    } else {
      setTimeout(() => {
        handleComplete();
      }, 1500);
    }
  };

  const onVideoError = () => {
    // If file is 0 bytes or format error: poster remains visible, wait 1.5s and proceed
    if (hasStarted) {
      setTimeout(() => {
        handleComplete();
      }, 1500);
    }
  };

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
      onClick={handleStart}
      className="relative w-full h-[100dvh] min-h-[560px] max-w-[500px] mx-auto flex flex-col items-center justify-center overflow-hidden bg-[#2A0308] cursor-pointer select-none"
    >
      {/* 1. Video Element */}
      <video
        ref={videoRef}
        src={INVITATION7_MEDIA.intro.webm}
        muted
        playsInline
        preload="auto"
        loop={false}
        onEnded={handleComplete}
        onError={onVideoError}
        onTimeUpdate={(e) => {
          if (e.currentTarget.currentTime > 0.05) {
            setIsFirstFrameRendered(true);
          }
        }}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* 2. WebP Poster */}
      <img
        src={INVITATION7_MEDIA.intro.posterWebp}
        alt="Aygünün Xına Gecəsi"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 z-10 ${
          isFirstFrameRendered ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* 3. Text Overlay */}
      {/* Rəng: bordo #5A0712, zərif əlyazması fontu, arxa fon, kart, blur və çərçivə YOXDUR */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6 text-center">
        <div className="flex flex-col items-center justify-center max-w-[280px] -mt-10 sm:-mt-14">
          <span 
            className="font-handwriting text-4xl sm:text-5xl leading-tight"
            style={{ color: '#5A0712' }}
          >
            {brideName}
          </span>
          <span 
            className="font-handwriting text-2xl sm:text-3xl leading-snug mt-1"
            style={{ color: '#5A0712' }}
          >
            {tagline}
          </span>
        </div>

        {/* Gentle touch hint before user taps */}
        {!hasStarted && (
          <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center justify-center animate-pulse">
            <span className="font-montserrat text-[11px] text-[#C9A56A] uppercase tracking-[0.25em] font-medium drop-shadow-sm">
              Dəvətnaməni açmaq üçün toxunun
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#C9A56A] mt-2" />
          </div>
        )}
      </div>
    </section>
  );
};
