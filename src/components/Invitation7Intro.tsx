import React, { useState, useRef, useEffect } from 'react';
import { INVITATION7_MEDIA } from '../media';

export interface Invitation7IntroProps {
  onComplete?: () => void;
  onStart?: () => void;
  onBeforeComplete?: () => void;
  brideName?: string;
  tagline?: string;
}

export const Invitation7Intro: React.FC<Invitation7IntroProps> = ({
  onComplete,
  onStart,
  onBeforeComplete,
  brideName = 'Aygün sizi',
  tagline = 'xına gecəsinə dəvət edir',
}) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isFirstFrameRendered, setIsFirstFrameRendered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasEndedRef = useRef(false);
  const hasTriggeredBeforeCompleteRef = useRef(false);

  const handleComplete = () => {
    if (hasEndedRef.current) return;
    hasEndedRef.current = true;
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (!hasTriggeredBeforeCompleteRef.current) {
      hasTriggeredBeforeCompleteRef.current = true;
      if (onBeforeComplete) {
        onBeforeComplete();
      }
    }
    if (onComplete) {
      onComplete();
    }
  };

  const handleStart = () => {
    if (hasStarted) return;
    setHasStarted(true);
    if (onStart) {
      onStart();
    }

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
            if (!hasTriggeredBeforeCompleteRef.current) {
              hasTriggeredBeforeCompleteRef.current = true;
              onBeforeComplete?.();
            }
          }, 800);
          setTimeout(() => {
            handleComplete();
          }, 1500);
        });
    } else {
      setTimeout(() => {
        if (!hasTriggeredBeforeCompleteRef.current) {
          hasTriggeredBeforeCompleteRef.current = true;
          onBeforeComplete?.();
        }
      }, 800);
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
      className="invitation7-fullscreen-scene relative w-full max-w-[500px] mx-auto flex flex-col items-center justify-center bg-[#2A0308] cursor-pointer select-none blend-transition-bottom"
      style={{
        minHeight: '100svh',
        height: '100dvh',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* 1. Video Element */}
      <video
        ref={videoRef}
        src={INVITATION7_MEDIA.intro.webm}
        muted
        playsInline
        preload="metadata"
        loop={false}
        onEnded={handleComplete}
        onError={onVideoError}
        onTimeUpdate={(e) => {
          const video = e.currentTarget;
          if (video.currentTime > 0.05) {
            setIsFirstFrameRendered(true);
          }
          // Giriş videosunun bitməsinə 700ms qalmış intro musiqisini dayandırmaq üçün bildiriş
          if (
            !hasTriggeredBeforeCompleteRef.current &&
            video.duration &&
            Number.isFinite(video.duration) &&
            video.duration > 0
          ) {
            if (video.duration - video.currentTime <= 0.7) {
              hasTriggeredBeforeCompleteRef.current = true;
              if (onBeforeComplete) {
                onBeforeComplete();
              }
            }
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
      <div 
        className="absolute left-0 right-0 z-20 flex flex-col items-center pointer-events-none px-6 text-center"
        style={{ top: '20%' }}
      >
        <div className="flex flex-col items-center justify-center max-w-[320px]">
          <span 
            className="font-handwriting text-[42px] sm:text-[52px] leading-tight"
            style={{ 
              color: '#5A0712', 
              fontWeight: 700,
              textShadow: '0 1px 5px rgba(255, 238, 232, 0.25)',
            }}
          >
            {brideName}
          </span>
          <span 
            className="font-handwriting text-[29px] sm:text-[34px] leading-snug mt-1"
            style={{ 
              color: '#5A0712', 
              fontWeight: 600,
              textShadow: '0 1px 5px rgba(255, 238, 232, 0.25)',
            }}
          >
            {tagline}
          </span>
        </div>
      </div>

      {/* Gentle touch hint before user taps */}
      {!hasStarted && (
        <div className="absolute bottom-12 left-0 right-0 z-20 pointer-events-none flex flex-col items-center justify-center animate-pulse">
          <span className="font-montserrat text-[14px] sm:text-[15px] text-[#C9A56A] uppercase tracking-[0.14em] font-medium drop-shadow-sm">
            Dəvətnaməni açmaq üçün toxunun
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A56A] mt-2" />
        </div>
      )}
    </section>
  );
};
