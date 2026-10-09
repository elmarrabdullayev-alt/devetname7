import React, { useState, useRef } from 'react';
import { INVITATION7_MEDIA } from '../media';

export interface Invitation7MusicButtonProps {
  audioSrc?: string;
  title?: string;
  artist?: string;
  initialPlaying?: boolean;
}

export const Invitation7MusicButton: React.FC<Invitation7MusicButtonProps> = ({
  audioSrc = INVITATION7_MEDIA.music.audioSrc,
  title = INVITATION7_MEDIA.music.title,
  artist = INVITATION7_MEDIA.music.artist,
  initialPlaying = false,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(initialPlaying);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // If browser policy blocks or media file not yet uploaded
          setIsPlaying(!isPlaying);
        });
    }
  };

  return (
    <aside 
      aria-label="Musiqi İdarəetməsi"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-[max(1.5rem,calc((100vw-500px)/2+1.5rem))] z-50 flex items-center gap-2"
    >
      <audio ref={audioRef} src={audioSrc} loop preload="none" />

      {/* Floating Gold & Burgundy Music Toggle */}
      <button
        onClick={toggleMusic}
        type="button"
        title={isPlaying ? 'Musiqini dayandır' : 'Musiqini oxut'}
        aria-label={isPlaying ? 'Musiqini dayandır' : 'Musiqini oxut'}
        className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-full border transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] active:scale-95 ${
          isPlaying
            ? 'border-[#C9A56A] bg-[#7A1623] text-[#F7EEE8] shadow-[0_0_15px_rgba(201,165,106,0.35)]'
            : 'border-[#C9A56A]/50 bg-[#2A0308]/90 text-[#C9A56A] hover:border-[#C9A56A]'
        }`}
      >
        {/* Animated wave bars or music icon */}
        <div className="flex items-end gap-0.5 h-3.5 w-3.5 justify-center">
          <span
            className={`w-0.5 bg-current rounded-full transition-all duration-300 ${
              isPlaying ? 'h-3 animate-pulse' : 'h-1.5'
            }`}
          />
          <span
            className={`w-0.5 bg-current rounded-full transition-all duration-300 ${
              isPlaying ? 'h-3.5 animate-pulse delay-75' : 'h-3'
            }`}
          />
          <span
            className={`w-0.5 bg-current rounded-full transition-all duration-300 ${
              isPlaying ? 'h-2 animate-pulse delay-150' : 'h-1.5'
            }`}
          />
        </div>

        {/* Text description */}
        <span className="font-montserrat text-[11px] font-medium tracking-wider uppercase">
          {isPlaying ? 'Musiqi' : 'Musiqi'}
        </span>
      </button>
    </aside>
  );
};
