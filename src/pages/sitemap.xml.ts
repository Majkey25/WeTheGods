import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getImage } from 'astro:assets';
import { getEvents } from '../content';
import { langs, pages, pageUrl, type Lang } from '../i18n';

const xml = (text: string) =>
  text.replace(
    /[<>&"']/g,
    (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[c]!,
  );

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error('Sitemap requires the configured site URL');
  const { all } = await getEvents();
  const photos = await Promise.all(
    (await getCollection('gallery'))
      .sort((a, b) => a.id.localeCompare(b.id))
      .map(
        async ({ data }) =>
          new URL(
            (
              await getImage({
                src: data.image,
                width: Math.min(1600, data.image.width),
                format: 'webp',
                quality: 72,
              })
            ).src,
            site,
          ).href,
      ),
  );
  const routes = [
    ...pages.map((page) => ({
      path: (lang: Lang) => pageUrl(lang, page),
      photos: page === 'gallery' ? photos : page === '' ? photos.slice(0, 5) : [],
    })),
    ...all.map((event) => ({
      path: (lang: Lang) => `${pageUrl(lang, 'shows')}${event.slug}/`,
      photos: [],
    })),
  ];
  const entries = routes.flatMap(({ path, photos }) =>
    langs.map(
      (lang) =>
        `<url><loc>${xml(new URL(path(lang), site).href)}</loc>${[...langs, 'x-default' as const]
          .map(
            (l) =>
              `<xhtml:link rel="alternate" hreflang="${l}" href="${xml(new URL(path(l === 'x-default' ? 'en' : l), site).href)}"/>`,
          )
          .join(
            '',
          )}${photos.map((photo) => `<image:image><image:loc>${xml(photo)}</image:loc></image:image>`).join('')}</url>`,
    ),
  );
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${entries.join('')}</urlset>`,
    {
      headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    },
  );
};
