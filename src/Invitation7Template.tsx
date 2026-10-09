import React, { useState, useRef, useEffect } from 'react';
import { Invitation7Intro, Invitation7IntroProps } from './components/Invitation7Intro';
import { Invitation7Delivery, Invitation7DeliveryProps } from './components/Invitation7Delivery';
import { Invitation7CurtainReveal, Invitation7CurtainRevealProps } from './components/Invitation7CurtainReveal';
import { Invitation7Ballroom, Invitation7BallroomProps } from './components/Invitation7Ballroom';
import { Invitation7Location, Invitation7LocationProps } from './components/Invitation7Location';
import { Invitation7DressCode, Invitation7DressCodeProps } from './components/Invitation7DressCode';
import { Invitation7Gallery, Invitation7GalleryProps } from './components/Invitation7Gallery';
import { Invitation7RSVP, Invitation7RSVPProps } from './components/Invitation7RSVP';
import { Invitation7Ending, Invitation7EndingProps } from './components/Invitation7Ending';
import { Invitation7MusicButton, Invitation7MusicButtonProps } from './components/Invitation7MusicButton';
import { INVITATION7_MEDIA } from './media';
import './invitation7.css';

export interface Invitation7TemplateProps {
  intro?: Invitation7IntroProps;
  delivery?: Invitation7DeliveryProps;
  curtainReveal?: Invitation7CurtainRevealProps;
  ballroom?: Invitation7BallroomProps;
  location?: Invitation7LocationProps;
  dressCode?: Invitation7DressCodeProps;
  gallery?: Invitation7GalleryProps;
  rsvp?: Invitation7RSVPProps;
  ending?: Invitation7EndingProps;
  music?: Invitation7MusicButtonProps;
  defaultOpen?: boolean;
}

export const Invitation7Template: React.FC<Invitation7TemplateProps> = ({
  intro,
  delivery,
  curtainReveal,
  ballroom,
  location,
  dressCode,
  gallery,
  rsvp,
  ending,
  music,
  defaultOpen = false,
}) => {
  // Yalnız telefonlu giriş açılış mərhələsidir
  const [isIntroFinished, setIsIntroFinished] = useState<boolean>(defaultOpen);
  const [isIntroDismissed, setIsIntroDismissed] = useState<boolean>(defaultOpen);

  // useRef ilə iki ayrı audio elementi: introAudioRef və mainAudioRef
  const introAudioRef = useRef<HTMLAudioElement | null>(null);
  const mainAudioRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedIntroMusicRef = useRef<boolean>(false);
  const hasStartedMainMusicRef = useRef<boolean>(false);
  const fadeIntroAnimationFrameRef = useRef<number | null>(null);
  const fadeMainAnimationFrameRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasAudioError, setHasAudioError] = useState<boolean>(false);

  // Vahid Məzmun Zonası üçün fon videosu və görünmə qoruması
  const contentZoneRef = useRef<HTMLElement | null>(null);
  const contentVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isContentVideoReady, setIsContentVideoReady] = useState<boolean>(false);
  const [isContentZoneVisible, setIsContentZoneVisible] = useState<boolean>(false);

  useEffect(() => {
    const el = contentZoneRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsContentZoneVisible(entry.isIntersecting);
          if (entry.isIntersecting) {
            contentVideoRef.current?.play().catch(() => {});
          }
        });
      },
      {
        root: null,
        rootMargin: '100px 0px 100px 0px',
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = contentVideoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    if ('requestVideoFrameCallback' in video) {
      const handleFrame = () => {
        setIsContentVideoReady(true);
      };
      (video as any).requestVideoFrameCallback(handleFrame);
    }
  }, []);

  // 1. İstifadəçi giriş ekranında ilk dəfə “Dəvətnaməni aç” toxunuşuna basan anda intro-music.mp3 başlasın
  // Mobil brauzerlər üçün həmçinin main-music.mp3 toxunuş anında səssiz şəkildə hazır (unlocked) vəziyyətə gətirilir
  const handleIntroStart = () => {
    if (hasStartedIntroMusicRef.current) return;
    hasStartedIntroMusicRef.current = true;

    // Intro musiqisini dərhal normal səslə başlat
    const introAudio = introAudioRef.current;
    if (introAudio) {
      introAudio.currentTime = 0;
      introAudio.volume = 1;
      introAudio.play().catch((err) => {
        console.warn('Intro audio play error on touch:', err);
      });
    }

    // Mobil Safari/Chrome üçün main-music audio elementini istifadəçi toxunuşu ilə unlock et
    const mainAudio = mainAudioRef.current;
    if (mainAudio) {
      mainAudio.volume = 0;
      const primePromise = mainAudio.play();
      if (primePromise !== undefined) {
        primePromise
          .then(() => {
            // Intro bitənədək mainAudio səssiz saxlanılır
            if (!hasStartedMainMusicRef.current) {
              mainAudio.pause();
              mainAudio.currentTime = 0;
            }
          })
          .catch(() => {});
      }
    }
  };

  // 3. Giriş videosunun bitməsinə 700ms qalmış intro musiqisini yavaşca 0 səsə endir və dayandır
  const handleIntroBeforeComplete = () => {
    const introAudio = introAudioRef.current;
    if (!introAudio || introAudio.paused) return;

    if (fadeIntroAnimationFrameRef.current) {
      cancelAnimationFrame(fadeIntroAnimationFrameRef.current);
    }

    const startVolume = introAudio.volume;
    const startTime = performance.now();
    const duration = 700; // 700ms

    const fadeStep = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      if (introAudioRef.current) {
        introAudioRef.current.volume = Math.max(0, startVolume * (1 - progress));
      }
      if (progress < 1) {
        fadeIntroAnimationFrameRef.current = requestAnimationFrame(fadeStep);
      } else {
        if (introAudioRef.current) {
          introAudioRef.current.pause();
          introAudioRef.current.volume = 0;
        }
      }
    };
    fadeIntroAnimationFrameRef.current = requestAnimationFrame(fadeStep);
  };

  // 4. Giriş bitib 1-ci əsas səhifə açılan anda main-music.mp3 0 səsdən 700ms ərzində normal səsə yüksələrək başlasın
  const handleIntroComplete = () => {
    setIsIntroFinished(true);
    // Telefon animasiyası bitdikdən sonra səhifə yuxarıdan Invitation7Delivery bölməsində başlayır
    window.scrollTo({ top: 0, behavior: 'instant' });
    setTimeout(() => {
      setIsIntroDismissed(true);
    }, 500);

    // Intro musiqisi qəti şəkildə dayandırılır (hər iki musiqi eyni anda səslənməsin)
    const introAudio = introAudioRef.current;
    if (introAudio) {
      introAudio.pause();
      introAudio.volume = 0;
    }

    // Əgər mainAudio artıq işə düşübsə, təkrar başlatma
    if (hasStartedMainMusicRef.current) return;
    hasStartedMainMusicRef.current = true;

    // main-music.mp3 0 səsdən 700ms ərzində normal səsə yüksələrək başlayır
    const mainAudio = mainAudioRef.current;
    if (mainAudio) {
      if (fadeMainAnimationFrameRef.current) {
        cancelAnimationFrame(fadeMainAnimationFrameRef.current);
      }
      mainAudio.currentTime = 0;
      mainAudio.volume = 0;
      mainAudio
        .play()
        .then(() => {
          setIsPlaying(true);
          const startTime = performance.now();
          const duration = 700; // 700ms fade-in
          const fadeStep = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / duration);
            if (mainAudioRef.current) {
              mainAudioRef.current.volume = progress;
            }
            if (progress < 1) {
              fadeMainAnimationFrameRef.current = requestAnimationFrame(fadeStep);
            }
          };
          fadeMainAnimationFrameRef.current = requestAnimationFrame(fadeStep);
        })
        .catch((err) => {
          console.warn('Main audio play error:', err);
        });
    }
  };

  // 8. Sağ altdakı musiqi düyməsi yalnız main-music.mp3 üçün play/pause funksiyası edir
  const handleToggleMusic = () => {
    const mainAudio = mainAudioRef.current;
    if (!mainAudio || hasAudioError) return;

    if (isPlaying) {
      mainAudio.pause();
      setIsPlaying(false);
    } else {
      mainAudio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Main audio toggle error:', err);
        });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#170104] text-[#F7EEE8] flex justify-center selection:bg-[#7A1623] selection:text-[#F7EEE8]">
      {/* İki ayrı HTMLAudioElement: introAudioRef və mainAudioRef */}
      <audio
        ref={introAudioRef}
        src={INVITATION7_MEDIA.music.introSrc}
        loop={false}
        preload="auto"
      />
      <audio
        ref={mainAudioRef}
        src={INVITATION7_MEDIA.music.mainSrc}
        loop={true}
        preload="auto"
        onError={() => setHasAudioError(true)}
      />

      {/* Desktop Wrapper: Max 500px, mərkəzdə premium telefon görünüşü */}
      <main className="w-full max-w-[500px] min-h-screen bg-[#2A0308] shadow-[0_0_50px_rgba(0,0,0,0.85)] border-x border-[rgba(201,165,106,0.25)] flex flex-col relative overflow-x-hidden">
        {/* 1. Telefonlu giriş (Invitation7Intro): Tam ekran açılış mərhələsi */}
        {!isIntroDismissed && (
          <div
            className={`fixed inset-0 z-50 max-w-[500px] mx-auto transition-opacity duration-500 ${
              isIntroFinished ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <Invitation7Intro
              onStart={handleIntroStart}
              onBeforeComplete={handleIntroBeforeComplete}
              onComplete={handleIntroComplete}
              {...intro}
            />
          </div>
        )}

        {/* 2. Normal şaquli scroll edilən dəvətnamə axını */}
        {/* 1-ci səhifə (min-height: 100svh): Fon video + mətn */}
        <Invitation7Delivery {...delivery} />

        {/* 2-ci səhifə (min-height: 100svh): Fon video + mətn */}
        <Invitation7CurtainReveal {...curtainReveal} />

        {/* 3-cü səhifə (min-height: 100svh): Fon video + mətn */}
        <Invitation7Ballroom {...ballroom} />

        {/* 4-cü Ballroom səhifəsindən SONRA aktiv olan Sabit Fon Videosu */}
        <div
          className={`fixed inset-y-0 w-full max-w-[500px] pointer-events-none z-[5] overflow-hidden transition-opacity duration-500 ${
            isContentZoneVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          aria-hidden="true"
        >
          <video
            ref={contentVideoRef}
            src={INVITATION7_MEDIA.contentBackground.webm}
            muted
            playsInline
            autoPlay
            loop
            onTimeUpdate={(e) => {
              if (e.currentTarget.currentTime > 0.05) {
                setIsContentVideoReady(true);
              }
            }}
            onError={() => {
              setIsContentVideoReady(false);
            }}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          {/* Poster fallback: İlk real video kadrı gələnədək və ya xəta olduqda görünür */}
          <img
            src={INVITATION7_MEDIA.contentBackground.posterWebp}
            alt="Məzmun Arxa Fonu"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-[1] ${
              isContentVideoReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          />

          {/* Oxunaqlılıq üçün bütün ekrana yayılan çox yüngül tünd-bordo gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#170104]/70 via-[#2A0308]/60 to-[#170104]/80 pointer-events-none z-[2]" />
        </div>

        {/* 4-cü Ballroom səhifəsindən sonra Location, Dress Code, Qalereya, RSVP və Son dəvət hissələrinin scroll zonası */}
        <section ref={contentZoneRef} className="relative z-10 w-full flex flex-col bg-transparent">
          <Invitation7Location {...location} />
          <Invitation7DressCode {...dressCode} />
          <Invitation7Gallery {...gallery} />
          <Invitation7RSVP {...rsvp} />
          <Invitation7Ending {...ending} />
        </section>

        {/* Musiqi İdarəetmə Düyməsi */}
        <Invitation7MusicButton
          isPlaying={isPlaying}
          onToggle={handleToggleMusic}
          hasError={hasAudioError}
          {...music}
        />
      </main>
    </div>
  );
};

export default Invitation7Template;
