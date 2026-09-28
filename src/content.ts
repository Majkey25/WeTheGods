import { getCollection, type CollectionEntry } from 'astro:content';

// Read helpers for the YAML content in src/data (all editable in Pages CMS).

const byFileOrder = <T extends { id: string }>(a: T, b: T) => a.id.localeCompare(b.id);

export const getSettings = async () => {
  const [entry] = await getCollection('settings');
  if (!entry) throw new Error('src/data/settings.yaml is empty');
  return entry.data;
};

/** Newest release first; the first one is featured. */
export const getReleases = async () =>
  (await getCollection('releases')).map((e) => e.data).sort((a, b) => b.date.localeCompare(a.date));

/** Videos in file order. Without an uploaded thumbnail, YouTube's own one is used. */
export const getVideos = async () =>
  Promise.all(
    (await getCollection('videos')).sort(byFileOrder).map(async ({ data }) => {
      if (data.thumbnail) return { ...data, thumb: data.thumbnail };
      // Not every video has a max-resolution thumbnail; fall back to the one that always exists.
      const max = `https://i.ytimg.com/vi/${data.youtube}/maxresdefault.jpg`;
      const ok = await fetch(max, { method: 'HEAD' }).then(
        (r) => r.ok,
        () => false,
      );
      return { ...data, thumb: ok ? max : `https://i.ytimg.com/vi/${data.youtube}/hqdefault.jpg` };
    }),
  );

const slugify = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export type Event = CollectionEntry<'shows'>['data'] & {
  name: string;
  slug: string;
  upcoming: boolean;
  inactive: boolean;
};

const byDate = (a: Event, b: Event) =>
  a.date.localeCompare(b.date) || (a.time ?? '').localeCompare(b.time ?? '');

/** Events split at build time in the band's time zone; the nightly rebuild moves finished ones. */
export const getEvents = async (): Promise<{ all: Event[]; upcoming: Event[]; past: Event[] }> => {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Prague' }).format(new Date());
  const taken = new Map<string, number>();
  const all = (await getCollection('shows')).sort(byFileOrder).map(({ data }) => {
    const name = data.title ?? data.venue ?? data.type;
    const base = `${data.date}-${slugify(name)}`;
    const count = (taken.get(base) ?? 0) + 1;
    taken.set(base, count);
    return {
      ...data,
      name,
      slug: count > 1 ? `${base}-${count}` : base,
      upcoming: data.date >= today,
      inactive: data.status === 'cancelled' || data.status === 'postponed',
    };
  });
  return {
    all,
    upcoming: all.filter((e) => e.upcoming).sort(byDate),
    past: all.filter((e) => !e.upcoming).sort((a, b) => byDate(b, a)),
  };
};

/** The band's own map link, or a map search for the venue. */
export const mapUrl = (e: Event) =>
  e.map ??
  (e.venue
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        [e.venue, e.address, e.city, e.country].filter(Boolean).join(', '),
      )}`
    : undefined);

/** Date pieces for the show lists and detail pages, in the page locale. */
export const dateParts = (locale: string, iso: string) => {
  const d = new Date(`${iso}T12:00:00Z`);
  const f = (o: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale, { timeZone: 'UTC', ...o }).format(d);
  return {
    day: f({ day: 'numeric' }),
    rest: `${f({ month: 'short' }).replace('.', '')} ${f({ year: 'numeric' })} · ${f({ weekday: 'short' })}`,
    short: f({ day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\s/g, ''),
    long: f({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
  };
};

/** "Brno" at home, "Dresden, Germany" abroad. */
export const cityLabel = (locale: string, e: Event) => {
  if (!e.city) return '';
  if (e.country === 'CZ') return e.city;
  return `${e.city}, ${new Intl.DisplayNames([locale], { type: 'region' }).of(e.country) ?? e.country}`;
};

const eventStatus = { cancelled: 'EventCancelled', postponed: 'EventPostponed' } as const;

/** The calendar day after an ISO date: nextDay('2026-12-31') -> '2027-01-01'. */
export const nextDay = (date: string) => {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
};

/** schema.org Event for search engines; concerts become MusicEvent. */
export const eventJsonLd = (e: Event, url: string) => ({
  '@context': 'https://schema.org',
  '@type': e.type === 'show' ? 'MusicEvent' : 'Event',
  name: `WeTheGods — ${e.name}`,
  url,
  startDate: e.time ? `${e.date}T${e.time}` : e.date,
  // An end at or before the start is after midnight, on the next day.
  ...(e.time && e.end && { endDate: `${e.end > e.time ? e.date : nextDay(e.date)}T${e.end}` }),
  eventStatus: `https://schema.org/${e.status === 'cancelled' || e.status === 'postponed' ? eventStatus[e.status] : 'EventScheduled'}`,
  eventAttendanceMode: `https://schema.org/${e.venue ? 'OfflineEventAttendanceMode' : 'OnlineEventAttendanceMode'}`,
  location: e.venue
    ? {
        '@type': 'Place',
        name: e.venue,
        address: {
          '@type': 'PostalAddress',
          ...(e.address && { streetAddress: e.address }),
          addressLocality: e.city,
          addressCountry: e.country,
        },
      }
    : { '@type': 'VirtualLocation', url },
  performer: { '@type': 'MusicGroup', name: 'WeTheGods' },
  ...(e.info_en && { description: e.info_en }),
  ...(e.tickets && {
    offers: {
      '@type': 'Offer',
      url: e.tickets,
      availability: `https://schema.org/${e.status === 'sold-out' ? 'SoldOut' : 'InStock'}`,
    },
  }),
});
