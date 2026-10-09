import React, { useState } from 'react';
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

  const handleIntroComplete = () => {
    setIsIntroFinished(true);
    // Telefon animasiyası bitdikdən sonra səhifə yuxarıdan Invitation7Delivery bölməsində başlayır
    window.scrollTo({ top: 0, behavior: 'instant' });
    setTimeout(() => {
      setIsIntroDismissed(true);
    }, 500);
  };

  return (
    <div className="min-h-screen w-full bg-[#170104] text-[#F7EEE8] flex justify-center selection:bg-[#7A1623] selection:text-[#F7EEE8]">
      {/* Desktop Wrapper: Max 500px, mərkəzdə premium telefon görünüşü */}
      <main className="w-full max-w-[500px] min-h-screen bg-[#2A0308] shadow-[0_0_50px_rgba(0,0,0,0.85)] border-x border-[rgba(201,165,106,0.25)] flex flex-col relative overflow-x-hidden">
        {/* 1. Telefonlu giriş (Invitation7Intro): Tam ekran açılış mərhələsi */}
        {!isIntroDismissed && (
          <div
            className={`fixed inset-0 z-50 max-w-[500px] mx-auto transition-opacity duration-500 ${
              isIntroFinished ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <Invitation7Intro onComplete={handleIntroComplete} {...intro} />
          </div>
        )}

        {/* 2. Normal şaquli scroll edilən dəvətnamə axını */}
        {/* 1-ci səhifə (min-height: 100svh): Fon video + mətn */}
        <Invitation7Delivery {...delivery} />

        {/* 2-ci səhifə (min-height: 100svh): Fon video + mətn */}
        <Invitation7CurtainReveal {...curtainReveal} />

        {/* 3-cü səhifə (min-height: 100svh): Fon video + mətn */}
        <Invitation7Ballroom {...ballroom} />

        {/* Funksional Bölmələr */}
        <Invitation7Location {...location} />
        <Invitation7DressCode {...dressCode} />
        <Invitation7Gallery {...gallery} />
        <Invitation7RSVP {...rsvp} />
        <Invitation7Ending {...ending} />
        <Invitation7MusicButton {...music} />
      </main>
    </div>
  );
};

export default Invitation7Template;
