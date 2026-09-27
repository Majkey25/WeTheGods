import type { ImageMetadata } from 'astro';

import one from '../assets/releases/one.jpg';
import labyrinth from '../assets/releases/labyrinth-of-lies.jpg';
import illusions from '../assets/releases/illusions.jpg';
import aloneIStand from '../assets/releases/alone-i-stand.jpg';
import reflection from '../assets/releases/reflection.jpg';
import yebaThumb from '../assets/videos/yeba.jpg';
import labyrinthThumb from '../assets/videos/labyrinth-of-lies.jpg';
import illusionsThumb from '../assets/videos/illusions.jpg';

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
