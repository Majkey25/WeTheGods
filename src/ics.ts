import { nextDay, type Event } from './content';

// iCalendar (RFC 5545) file for one event, so visitors can add it to any calendar app.

const pad = (n: number) => String(n).padStart(2, '0');
const utc = (d: Date) =>
  `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

/** Prague's UTC offset in minutes at a given instant (+60 in winter, +120 in summer). */
const pragueOffset = (at: Date) => {
  const zone =
    new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Prague', timeZoneName: 'longOffset' })
      .formatToParts(at)
      .find((p) => p.type === 'timeZoneName')?.value ?? 'GMT';
  const m = /GMT([+-])(\d{2}):?(\d{2})?/.exec(zone);
  return m ? (m[1] === '-' ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3] ?? 0)) : 0;
};

/** Wall-clock time in Prague to a UTC instant; UTC keeps every calendar app in agreement. */
const pragueToUtc = (date: string, time: string) => {
  const wall = new Date(`${date}T${time}:00Z`).getTime();
  // Two passes: the offset at the first guess can sit on the other side of a DST switch.
  const first = new Date(wall - pragueOffset(new Date(wall)) * 60_000);
  return new Date(wall - pragueOffset(first) * 60_000);
};

const escape = (text: string) =>
  text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

const encoder = new TextEncoder();

/** At most 75 octets per line; continuation lines start with a space (which counts too). */
const fold = (line: string) => {
  const lines: string[] = [];
  let current = '';
  let bytes = 0;
  for (const char of line) {
    const size = encoder.encode(char).length;
    if (bytes + size > (lines.length ? 74 : 75)) {
      lines.push(current);
      current = '';
      bytes = 0;
    }
    current += char;
    bytes += size;
  }
  lines.push(current);
  return lines.join('\r\n ');
};

export const buildIcs = (e: Event, url: string, now: Date) => {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//WeTheGods//Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${e.slug}@wethegods`,
    `DTSTAMP:${utc(now)}`,
  ];
  if (e.time) {
    const start = pragueToUtc(e.date, e.time);
    // An end at or before the start is after midnight: take it on the next local day.
    const end = !e.end
      ? new Date(start.getTime() + 2 * 3_600_000)
      : pragueToUtc(e.end > e.time ? e.date : nextDay(e.date), e.end);
    lines.push(`DTSTART:${utc(start)}`, `DTEND:${utc(end)}`);
  } else {
    lines.push(
      `DTSTART;VALUE=DATE:${e.date.replaceAll('-', '')}`,
      `DTEND;VALUE=DATE:${nextDay(e.date).replaceAll('-', '')}`,
    );
  }
  const place = [e.venue, e.address, e.city, e.country === 'CZ' ? '' : e.country]
    .filter(Boolean)
    .join(', ');
  const description = [
    e.info_cs ?? e.info_en,
    e.lineup?.length ? `Line-up: ${e.lineup.join(', ')}` : '',
    e.tickets ?? '',
    url,
  ]
    .filter(Boolean)
    .join('\n\n');
  lines.push(`SUMMARY:${escape(`WeTheGods — ${e.name}`)}`);
  if (place) lines.push(`LOCATION:${escape(place)}`);
  lines.push(`DESCRIPTION:${escape(description)}`, `URL:${url}`);
  if (e.status === 'cancelled') lines.push('STATUS:CANCELLED');
  lines.push('END:VEVENT', 'END:VCALENDAR');
  return `${lines.map(fold).join('\r\n')}\r\n`;
};
