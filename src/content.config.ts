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

const shows = defineCollection({
  loader: yamlFile('src/data/shows.yaml'),
  schema: z.strictObject({
    date: z.iso.date({ error: 'Use a real date as YYYY-MM-DD, e.g. 2026-11-14' }),
    time: optional(z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Use HH:MM, e.g. 20:00')),
    venue: text,
    city: text,
    country: z.preprocess(
      (v) => (v === '' || v == null ? 'CZ' : v),
      z.string().regex(/^[A-Z]{2}$/, 'Use a 2-letter country code, e.g. CZ'),
    ),
    event: optional(text),
    lineup: optional(z.array(text)),
    tickets: optional(z.url({ protocol: /^https$/, error: 'Tickets must be an https:// link' })),
    status: optional(z.enum(['sold-out', 'cancelled', 'postponed', 'free'])),
  }),
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
  schema: z.strictObject({
    lead_en: text,
    lead_cs: text,
    body_en: text,
    body_cs: text,
    origin_en: text,
    origin_cs: text,
    formed: text,
    genre_en: text,
    genre_cs: text,
    fans: text,
  }),
});

export const collections = { shows, gallery, members, about };
