import type { APIRoute } from 'astro';
import { getEvents, type Event } from '../../content';
import { pageUrl } from '../../i18n';
import { buildIcs } from '../../ics';

// One downloadable calendar file per event: /shows/<slug>.ics
export async function getStaticPaths() {
  const { all } = await getEvents();
  return all.map((event) => ({ params: { slug: event.slug }, props: { event } }));
}

export const GET: APIRoute = ({ props, site }) => {
  const { event } = props as { event: Event };
  const url = new URL(`${pageUrl('en', 'shows')}${event.slug}/`, site).href;
  return new Response(buildIcs(event, url, new Date()), {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
};
