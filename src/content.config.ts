import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { defineCollection } from 'astro:content';
import type { Loader } from 'astro/loaders';
import { z } from 'astro/zod';
import { CORE_SCHEMA, load } from 'js-yaml';

const SHOWS = 'src/data/shows.yaml';

// Own loader instead of file(): file() only logs YAML syntax errors and ships an empty list.
// The core schema keeps dates as strings; the default one turns 2026-11-31 into 1 December.
const showsLoader: Loader = {
  name: 'shows-yaml',
  load: async ({ config, store, parseData, logger, watcher }) => {
    const path = fileURLToPath(new URL(SHOWS, config.root));
    const sync = async () => {
      const raw = load(await readFile(path, 'utf8'), {
        schema: CORE_SCHEMA,
        filename: SHOWS,
      });
      if (raw != null && (typeof raw !== 'object' || Array.isArray(raw))) {
        throw new Error(`${SHOWS} must be a list of named shows`);
      }
      const entries = Object.entries((raw ?? {}) as Record<string, Record<string, unknown>>);
      const parsed = await Promise.all(
        entries.map(async ([id, data]) => ({ id, data: await parseData({ id, data }) })),
      );
      store.clear();
      parsed.forEach((entry) => store.set(entry));
    };
    await sync();
    watcher?.add(path);
    watcher?.on('change', (changed) => {
      if (changed === path) sync().catch((error: Error) => logger.error(error.message));
    });
  },
};

const shows = defineCollection({
  loader: showsLoader,
  schema: z.strictObject({
    date: z.iso.date({ error: 'Use a real date as YYYY-MM-DD, e.g. 2026-11-14' }),
    time: z
      .string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Use HH:MM, e.g. 20:00')
      .optional(),
    venue: z.string().trim().min(1),
    city: z.string().trim().min(1),
    country: z
      .string()
      .regex(/^[A-Z]{2}$/, 'Use a 2-letter country code, e.g. CZ')
      .default('CZ'),
    event: z.string().trim().min(1).optional(),
    lineup: z.array(z.string().trim().min(1)).optional(),
    tickets: z.url({ protocol: /^https$/, error: 'Tickets must be an https:// link' }).optional(),
    status: z.enum(['sold-out', 'cancelled', 'postponed', 'free']).optional(),
  }),
});

export const collections = { shows };
