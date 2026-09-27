import { existsSync, statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { defineCollection } from 'astro:content';
import type { Loader } from 'astro/loaders';
import { z } from 'astro/zod';
import { CORE_SCHEMA, load } from 'js-yaml';

/**
 * Loads one YAML file edited by hand or through Pages CMS. A list becomes one entry per item
 * (ids keep the file order); a single object becomes one entry.
 * Own loader instead of file(): file() only logs YAML syntax errors and ships an empty list,
 * and it cannot read root-level lists. The core schema keeps dates as plain strings; the default
 * one turns 2026-11-31 into 1 December.
 */
const yamlFile = (file: string): Loader => ({
  name: `yaml:${file}`,
  load: async ({ config, store, parseData, logger, watcher }) => {
    const path = fileURLToPath(new URL(file, config.root));
    const sync = async () => {
      const raw = load(await readFile(path, 'utf8'), { schema: CORE_SCHEMA, filename: file });
      const items: unknown[] = Array.isArray(raw) ? raw : raw == null ? [] : [raw];
      const entries = await Promise.all(
        items.map(async (item, i) => {
          const id = String(i).padStart(3, '0');
          const data = item as Record<string, unknown>;
          return { id, filePath: file, data: await parseData({ id, data, filePath: file }) };
        }),
      );
      store.clear();
      entries.forEach((entry) => store.set(entry));
    };
    await sync();
    watcher?.add(path);
    watcher?.on('change', (changed) => {
      if (changed === path) sync().catch((error: Error) => logger.error(error.message));
    });
  },
});

// The CMS writes empty strings for fields left blank; treat them as missing.
const optional = <T extends z.ZodType>(schema: T) =>
  z.preprocess((v) => (v === '' || v === null ? undefined : v), schema.optional());
const text = z.string().trim().min(1);

const time = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Use HH:MM, e.g. 20:00');
const https = (field: string) =>
  z.url({ protocol: /^https$/, error: `${field} must be an https:// link` });

const shows = defineCollection({
  loader: yamlFile('src/data/shows.yaml'),
  schema: ({ image }) =>
    z
      .strictObject({
        type: z.preprocess(
          (v) => (v === '' || v == null ? 'show' : v),
          z.enum(['show', 'release', 'party', 'signing', 'other']),
        ),
        title: optional(text),
        date: z.iso.date({ error: 'Use a real date as YYYY-MM-DD, e.g. 2026-11-14' }),
        time: optional(time),
        doors: optional(time),
        end: optional(time),
        venue: optional(text),
        address: optional(text),
        city: optional(text),
        country: z.preprocess(
          (v) => (v === '' || v == null ? 'CZ' : v),
          z.string().regex(/^[A-Z]{2}$/, 'Use a 2-letter country code, e.g. CZ'),
        ),
        map: optional(https('Map')),
        lineup: optional(z.array(text)),
        tickets: optional(https('Tickets')),
        status: optional(z.enum(['sold-out', 'cancelled', 'postponed', 'free'])),
        info_en: optional(text),
        info_cs: optional(text),
        poster: optional(image()),
      })
      // Shows, parties and signings happen somewhere; releases do not need a place.
      .refine((e) => e.type === 'release' || e.type === 'other' || (e.venue && e.city), {
        error: 'Shows, parties and signings need a venue and a city',
      })
      .refine((e) => e.title || e.venue, { error: 'Give the event a title or a venue' }),
});

const gallery = defineCollection({
  loader: yamlFile('src/data/gallery.yaml'),
  schema: ({ image }) =>
    z.strictObject({
      image: image(),
      alt_en: text,
      alt_cs: text,
      credit: optional(text),
    }),
});

const members = defineCollection({
  loader: yamlFile('src/data/members.yaml'),
  schema: ({ image }) =>
    z.strictObject({
      name: text,
      nickname: optional(text),
      role_en: text,
      role_cs: text,
      photo: image(),
    }),
});

const about = defineCollection({
  loader: yamlFile('src/data/about.yaml'),
  schema: ({ image }) =>
    z.strictObject({
      lead_en: text,
      lead_cs: text,
      body_en: text,
      body_cs: text,
      photo: image(),
      origin_en: text,
      origin_cs: text,
      formed: text,
      genre_en: text,
      genre_cs: text,
      fans: text,
    }),
});

// A YouTube link in any common form, or a bare 11-character video id.
const youtubeId = z.string().transform((value, ctx) => {
  const id = /(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/.exec(value)?.[1] ?? value.trim();
  if (!/^[\w-]{11}$/.test(id)) {
    ctx.addIssue({ code: 'custom', message: 'Paste a YouTube link, e.g. https://youtu.be/…' });
    return z.NEVER;
  }
  return id;
});

const videos = defineCollection({
  loader: yamlFile('src/data/videos.yaml'),
  schema: ({ image }) =>
    z.strictObject({
      youtube: youtubeId,
      title: text,
      year: z.coerce.number().int().min(2000).max(2100),
      thumbnail: optional(image()),
    }),
});

const link = z.strictObject({ name: text, url: https('Link') });

const releases = defineCollection({
  loader: yamlFile('src/data/releases.yaml'),
  schema: ({ image }) =>
    z.strictObject({
      title: text,
      type: z.enum(['album', 'ep', 'single']),
      date: z.iso.date({ error: 'Use a real date as YYYY-MM-DD' }),
      cover: image(),
      link: https('Listen link'),
      tracks: optional(z.array(text)),
      platforms: optional(z.array(link)),
    }),
});

// The hero loop plays behind the logo on every visit, so an oversized upload fails the build
// instead of slowing the site down.
const HERO_VIDEO_MAX_MB = 10;
const heroVideo = z
  .string()
  .regex(/^\/media\/[\w.-]+\.mp4$/, {
    error: 'Hero video must be an .mp4 uploaded to public/media',
    abort: true,
  })
  .refine((v) => existsSync(`public${v}`), { error: 'Hero video file not found', abort: true })
  .refine((v) => statSync(`public${v}`).size <= HERO_VIDEO_MAX_MB * 2 ** 20, {
    error: `Hero video is over ${HERO_VIDEO_MAX_MB} MB; export it at 720p-1080p, no sound, 10-20 s`,
  });

const settings = defineCollection({
  loader: yamlFile('src/data/settings.yaml'),
  schema: ({ image }) =>
    z.strictObject({
      email: z.email(),
      presskit: optional(https('Press kit')),
      merch: optional(https('Merch')),
      youtube: https('YouTube'),
      instagram: https('Instagram'),
      hero_kicker_en: text,
      hero_kicker_cs: text,
      hero_tagline_en: text,
      hero_tagline_cs: text,
      hero_buttons: z
        .array(
          z.strictObject({
            text_en: text,
            text_cs: text,
            url: z
              .string()
              .regex(
                /^(https:\/\/[^\s/]+\.[^\s]+|[/#][\w\-/#.]*)$/,
                'Button link: use https://..., a page like /videos/ or #videos',
              ),
          }),
        )
        .max(3),
      hero_video: heroVideo,
      hero_poster: image(),
      socials: z.array(link),
    }),
});

export const collections = { shows, gallery, members, about, videos, releases, settings };
