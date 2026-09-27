import type { ImageMetadata } from 'astro';

import one from '../assets/releases/one.jpg';
import labyrinth from '../assets/releases/labyrinth-of-lies.jpg';
import illusions from '../assets/releases/illusions.jpg';
import aloneIStand from '../assets/releases/alone-i-stand.jpg';
import reflection from '../assets/releases/reflection.jpg';
import yebaThumb from '../assets/videos/yeba.jpg';
import labyrinthThumb from '../assets/videos/labyrinth-of-lies.jpg';
import illusionsThumb from '../assets/videos/illusions.jpg';
import stageBackdrop from '../assets/gallery/rfp25-stage-backdrop.jpg';
import guitarLights from '../assets/gallery/rfp25-guitar-lights.jpg';
import vocalsSmile from '../assets/gallery/rfp25-vocals-smile.jpg';
import armsUp from '../assets/gallery/rfp25-arms-up.jpg';
import vocalsClose from '../assets/gallery/flf26-vocals-close.jpg';
import stageWide from '../assets/gallery/rfp25-stage-wide.jpg';
import guitarHaze from '../assets/gallery/rfp25-guitar-haze.jpg';
import guitarFist from '../assets/gallery/flf26-guitar-fist.jpg';
import vocalsPortrait from '../assets/gallery/rfp25-vocals-portrait.jpg';
import crowd from '../assets/gallery/rfp25-crowd.jpg';
import flip from '../assets/gallery/flf26-flip.jpg';
import fist from '../assets/gallery/rfp25-fist.jpg';
import vocals from '../assets/gallery/flf26-vocals.jpg';
import guitarTent from '../assets/gallery/rfp25-guitar-tent.jpg';
import neonLogo from '../assets/gallery/stage-neon-logo.jpg';

type Localized = { en: string; cs: string };
type Link = { label: string; href: string };

export const email = 'wethegodsband@gmail.com';

export const links = {
  merch: 'https://wethegodsband.bigcartel.com',
  presskit: 'https://drive.google.com/drive/folders/1eBzUSUBVqwt1LSkvSOVZeFkUcANrpx-e',
  youtube: 'https://www.youtube.com/@Wethegods',
  instagram: 'https://www.instagram.com/wethegodsband/',
};

export const socials: Link[] = [
  { label: 'Instagram', href: links.instagram },
  { label: 'Facebook', href: 'https://www.facebook.com/wethegodsband/' },
  { label: 'YouTube', href: links.youtube },
  { label: 'TikTok', href: 'https://www.tiktok.com/@wethegodsband' },
  { label: 'Spotify', href: 'https://open.spotify.com/artist/0t37G5AusfBBeHTv85jxj9' },
  { label: 'Apple Music', href: 'https://music.apple.com/cz/artist/wethegods/1720429835' },
  { label: 'Bandcamp', href: 'https://wethegods.bandcamp.com' },
];

export type Release = {
  title: string;
  kind: 'ep' | 'single';
  date: string;
  cover: ImageMetadata;
  href: string;
  tracks?: string[];
  platforms?: Link[];
};

export const releases: Release[] = [
  {
    title: 'ONE',
    kind: 'ep',
    date: '2026-05-26',
    cover: one,
    href: 'https://distrokid.com/hyperfollow/wethegods/one',
    tracks: ['Y.E.B.A.', 'Alone I Stand', 'Labyrinth of Lies', 'Illusions', 'Disconnect.exe'],
    platforms: [
      { label: 'Spotify', href: 'https://open.spotify.com/album/0Z6fnxi8DO7o3rtjO70MSO' },
      { label: 'Apple Music', href: 'https://music.apple.com/cz/album/one-ep/6770138158' },
      { label: 'Deezer', href: 'https://www.deezer.com/album/984091021' },
      { label: 'Tidal', href: 'https://tidal.com/album/525223320/u' },
    ],
  },
  {
    title: 'Labyrinth of Lies',
    kind: 'single',
    date: '2026-02-26',
    cover: labyrinth,
    href: 'https://distrokid.com/hyperfollow/wethegods/labyrinth-of-lies',
  },
  {
    title: 'Illusions',
    kind: 'single',
    date: '2025-09-26',
    cover: illusions,
    href: 'https://distrokid.com/hyperfollow/wethegods/illusions-2',
  },
  {
    title: 'Alone I Stand',
    kind: 'single',
    date: '2025-03-28',
    cover: aloneIStand,
    href: 'https://open.spotify.com/album/1wy92U2nK4v3DrlmIfrcUq',
  },
  {
    title: 'Reflection (feat. Damián Kučera)',
    kind: 'single',
    date: '2024-01-12',
    cover: reflection,
    href: 'https://open.spotify.com/album/0BDV9JqJqilR3LRR26aoHY',
  },
];

export type Video = { id: string; title: string; year: number; thumb: ImageMetadata };

export const videos: Video[] = [
  { id: 'zZ1o1wM81SA', title: 'Y.E.B.A.', year: 2026, thumb: yebaThumb },
  { id: 'fxt9NIF6qKI', title: 'Labyrinth of Lies', year: 2026, thumb: labyrinthThumb },
  { id: '1qFEP1XX3hI', title: 'Illusions', year: 2025, thumb: illusionsThumb },
];

export type Photo = { src: ImageMetadata; alt: Localized; credit?: string };

const ovsik = 'Petr Ovsík / Petrov Visuals';

export const gallery: Photo[] = [
  // Tiles 1, 6 and 11 render large in the mosaic.
  {
    src: stageBackdrop,
    alt: {
      en: 'The band on stage in blue haze under a giant WTG backdrop, Rock for People 2025',
      cs: 'Kapela na pódiu v modrém kouři pod obřím nápisem WTG, Rock for People 2025',
    },
    credit: ovsik,
  },
  {
    src: guitarLights,
    alt: {
      en: 'Guitarist in red light with cyan beams behind him, Rock for People 2025',
      cs: 'Kytarista v červeném světle s tyrkysovými paprsky za zády, Rock for People 2025',
    },
    credit: ovsik,
  },
  {
    src: vocalsSmile,
    alt: {
      en: 'Vocalist laughing under the painted tent roof, Rock for People 2025',
      cs: 'Zpěvák se směje pod malovanou střechou stanu, Rock for People 2025',
    },
    credit: ovsik,
  },
  {
    src: armsUp,
    alt: {
      en: 'Guitarist with both arms raised in red smoke',
      cs: 'Kytarista se zdviženýma rukama v červeném kouři',
    },
    credit: ovsik,
  },
  {
    src: vocals,
    alt: {
      en: 'Vocalist singing on the open-air stage, Front Line Fest 2026',
      cs: 'Zpěvák zpívá na open-air pódiu, Front Line Fest 2026',
    },
    credit: ovsik,
  },
  {
    src: crowd,
    alt: {
      en: 'Fans at the barrier cheering, Rock for People 2025',
      cs: 'Fanoušci u zábran fandí, Rock for People 2025',
    },
    credit: ovsik,
  },
  {
    src: guitarHaze,
    alt: {
      en: 'Guitarist mid-riff with light beams cutting through haze',
      cs: 'Kytarista uprostřed riffu, kouřem prosvítají paprsky světel',
    },
    credit: ovsik,
  },
  {
    src: guitarFist,
    alt: {
      en: 'Guitarist raising his fist under the open-air stage roof, Front Line Fest 2026',
      cs: 'Kytarista se zdviženou pěstí pod střechou open-air pódia, Front Line Fest 2026',
    },
    credit: ovsik,
  },
  {
    src: vocalsPortrait,
    alt: {
      en: 'Vocalist in a cap, hand on his chin, looking into the crowd',
      cs: 'Zpěvák v kšiltovce s rukou u brady hledí do publika',
    },
    credit: ovsik,
  },
  {
    src: stageWide,
    alt: {
      en: 'Wide shot of the stage in front of the Rock for People screen',
      cs: 'Celkový záběr pódia před obrazovkou Rock for People',
    },
    credit: ovsik,
  },
  {
    src: vocalsClose,
    alt: {
      en: 'Close-up of the vocalist screaming into the mic, Front Line Fest 2026',
      cs: 'Detail zpěváka, který řve do mikrofonu, Front Line Fest 2026',
    },
    credit: ovsik,
  },
  {
    src: flip,
    alt: {
      en: 'A fan doing a backflip in front of the stage, Front Line Fest 2026',
      cs: 'Fanoušek dělá salto před pódiem, Front Line Fest 2026',
    },
    credit: ovsik,
  },
  {
    src: fist,
    alt: {
      en: 'Silhouette of the guitarist with a raised fist in red light',
      cs: 'Silueta kytaristy se zdviženou pěstí v červeném světle',
    },
    credit: ovsik,
  },
  {
    src: guitarTent,
    alt: {
      en: 'Guitarist playing in the festival tent',
      cs: 'Kytarista hraje ve festivalovém stanu',
    },
    credit: ovsik,
  },
  {
    src: neonLogo,
    alt: {
      en: 'Empty stage with a glowing WTG sign next to the drum kit',
      cs: 'Prázdné pódium se svítícím nápisem WTG vedle bicí soupravy',
    },
  },
];
