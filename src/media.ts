/**
 * Mərkəzi Media Konfiqurasiyası
 * Template 7: Aygünün Xına Gecəsi
 */

export interface MediaVideoAsset {
  webm: string;
  posterWebp: string;
  title?: string;
}

export interface MediaImageAsset {
  webp: string;
  alt: string;
  caption?: string;
}

export interface Invitation7MediaConfig {
  basePath: string;
  intro: MediaVideoAsset;
  delivery: MediaVideoAsset;
  curtain: MediaVideoAsset;
  ballroom: MediaVideoAsset;
  contentBackground: MediaVideoAsset;
  gallery: [MediaImageAsset, MediaImageAsset];
  music: {
    introSrc: string;
    mainSrc: string;
    title: string;
    artist?: string;
  };
}

export const INVITATION7_MEDIA: Invitation7MediaConfig = {
  basePath: '/templates/invitation7',
  intro: {
    webm: '/templates/invitation7/phone-opening.webm',
    posterWebp: '/templates/invitation7/phone-cover.webp',
    title: 'Telefonlu Giriş',
  },
  delivery: {
    webm: '/templates/invitation7/delivery-motion.webm',
    posterWebp: '/templates/invitation7/delivery-cover.webp',
    title: 'Dəvət / Bordo Çanta Təqdimatı',
  },
  curtain: {
    webm: '/templates/invitation7/curtain-opening.webm',
    posterWebp: '/templates/invitation7/curtain-cover.webp',
    title: 'Pərdələrin Açılması',
  },
  ballroom: {
    webm: '/templates/invitation7/ballroom-motion.webm',
    posterWebp: '/templates/invitation7/ballroom-cover.webp',
    title: 'Ballroom / Əsas Zal Animasiyası',
  },
  contentBackground: {
    webm: '/templates/invitation7/content-background.webm',
    posterWebp: '/templates/invitation7/content-background.webp',
    title: 'Məzmun Fon Videosu',
  },
  gallery: [
    {
      webp: '/templates/invitation7/gallery-1.webp',
      alt: 'Aygünün Xına Gecəsi Foto 1',
      caption: 'Unudulmaz anlar',
    },
    {
      webp: '/templates/invitation7/gallery-2.webp',
      alt: 'Aygünün Xına Gecəsi Foto 2',
      caption: 'Şirin xatirələr',
    },
  ],
  music: {
    introSrc: '/templates/invitation7/intro-music.mp3',
    mainSrc: '/templates/invitation7/main-music.mp3',
    title: 'Xına Melodiyası',
    artist: 'Instrumental',
  },
};
