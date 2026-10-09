import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export interface Invitation7MusicButtonProps {
  audioSrc?: string;
  title?: string;
  artist?: string;
  isPlaying?: boolean;
  onToggle?: () => void;
  hasError?: boolean;
}

export const Invitation7MusicButton: React.FC<Invitation7MusicButtonProps> = ({
  isPlaying = false,
  onToggle,
  hasError = false,
}) => {
  // Fayl yüklənməsə və ya audio xəta versə, səhifə pozulmasın; düyməni gizlət
  if (hasError) {
    return null;
  }

  return (
    <aside 
      aria-label="Musiqi İdarəetməsi"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-[max(1.5rem,calc((100vw-500px)/2+1.5rem))] z-50 flex items-center gap-2"
      style={{ transform: 'translateZ(0)' }}
    >
      {/* Floating Gold & Burgundy Music Toggle */}
      <button
        onClick={onToggle}
        type="button"
        title={isPlaying ? 'Musiqini dayandır' : 'Musiqini başlat'}
        aria-label={isPlaying ? 'Musiqini dayandır' : 'Musiqini başlat'}
        className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full border transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] active:scale-95 cursor-pointer ${
          isPlaying
            ? 'border-[#C9A56A] bg-[#7A1623] text-[#F7EEE8] shadow-[0_0_15px_rgba(201,165,106,0.35)]'
            : 'border-[#C9A56A]/40 bg-[#2A0308]/95 text-[#C9A56A]/75 hover:text-[#C9A56A] hover:border-[#C9A56A]'
        }`}
      >
        {isPlaying ? (
          <>
            {/* Animated equalizer bars */}
            <div className="flex items-end gap-0.5 h-3.5 w-3 justify-center">
              <span className="w-0.5 bg-current rounded-full h-3 animate-pulse" />
              <span className="w-0.5 bg-current rounded-full h-3.5 animate-pulse delay-75" />
              <span className="w-0.5 bg-current rounded-full h-2 animate-pulse delay-150" />
            </div>
            <Volume2 className="w-3.5 h-3.5 text-[#C9A56A]" />
            <span className="font-montserrat text-[11px] font-medium tracking-wider uppercase">
              Musiqi
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-[#C9A56A]/70" />
            <span className="font-montserrat text-[11px] font-medium tracking-wider uppercase text-[#C9A56A]/70">
              Səssiz
            </span>
          </>
        )}
      </button>
    </aside>
  );
};
