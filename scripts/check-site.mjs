import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

// Check the actual build, including CMS-generated concert routes, before it can be published.
const site = new URL(process.argv[2] ?? 'https://majkey25.github.io');
const base = process.argv[3] ?? '/';
assert(
  site.protocol === 'https:' &&
    site.pathname === '/' &&
    !site.username &&
    !site.password &&
    !site.search &&
    !site.hash,
  'Expected an HTTPS origin',
);
assert(/^\/(?:[^\s/#?\\]+\/)*$/.test(base), 'Expected an absolute base path ending with /');
const dist = new URL('../dist/', import.meta.url);
const files = (await readdir(dist, { recursive: true })).map((p) => p.replaceAll('\\', '/'));
const htmlFiles = files.filter((p) => p.endsWith('.html'));
assert(
  htmlFiles.includes('index.html') &&
    htmlFiles.includes('cs/index.html') &&
    htmlFiles.includes('404.html'),
  'Missing language homepage or 404',
);
const decode = (text) =>
  text.replace(
    /&(amp|quot|apos|lt|gt);/g,
    (_, key) => ({ amp: '&', quot: '"', apos: "'", lt: '<', gt: '>' })[key],
  );
const attributes = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)(?:=(?:"([^"]*)"|'([^']*)'))?/g)].map((m) => [
      m[1],
      decode(m[2] ?? m[3] ?? ''),
    ]),
  );
const sitemap = await readFile(new URL('sitemap.xml', dist), 'utf8');
assert(
  sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'),
  'Missing sitemap namespace',
);
assert(!/&(?!(?:amp|quot|apos|lt|gt);)/.test(sitemap), 'Unescaped XML entity');
const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
const listed = entries.map((entry) => decode(/<loc>([^<]+)<\/loc>/.exec(entry)?.[1] ?? ''));
const expected = htmlFiles
  .filter((p) => p !== '404.html')
  .map((p) => new URL(`${base}${p.replace(/index\.html$/, '')}`, site).href);
assert.deepEqual(
  [...listed].sort(),
  [...expected].sort(),
  'Sitemap must contain every canonical HTML page exactly once',
);
const titles = new Set();
const descriptions = new Set();
let events = 0;
for (const file of htmlFiles) {
  const html = await readFile(new URL(file, dist), 'utf8');
  if (['index.html', 'cs/index.html', 'music/index.html', 'cs/music/index.html'].includes(file)) {
    assert(/<dialog\b[^>]*id="music-details"/.test(html), `${file}: missing music detail dialog`);
    const musicPath = `${base}${file.startsWith('cs/') ? 'cs/' : ''}music/`;
    assert(
      html.includes(`data-music-url="${musicPath}"`),
      `${file}: share links must use the localized music page and deploy base`,
    );
    if (file.endsWith('music/index.html'))
      assert(
        !html.slice(0, html.indexOf('<dialog')).includes('class="tracks__description"'),
        `${file}: track descriptions belong in the popup`,
      );
    const panelIds = [...html.matchAll(/data-music-panel="([^"]+)"/g)].map((m) => m[1]);
    const panels = new Set(panelIds);
    assert.equal(panels.size, panelIds.length, `${file}: duplicate music panel ID`);
    const triggers = [...html.matchAll(/data-music-open="([^"]+)"/g)].map((m) => m[1]);
    assert(panels.size === 0 || triggers.length > 0, `${file}: music details need links`);
    assert(
      triggers.every((id) => panels.has(id)),
      `${file}: a music link has no detail panel`,
    );
    for (const [, panel] of html.matchAll(
      /<article\b[^>]*data-music-panel="[^"]+"[^>]*>([\s\S]*?)<\/article>/g,
    )) {
      assert(/href="https:\/\//.test(panel), `${file}: detail needs a streaming link`);
      assert(panel.includes('https://www.musixmatch.com/'), `${file}: detail needs lyrics link`);
      const cover = attributes(/<img\b(?:[^"'<>]|"[^"]*"|'[^']*')*>/.exec(panel)?.[0] ?? '');
      assert(
        cover.loading === 'eager' && cover.fetchpriority === 'low',
        `${file}: popup covers must preload at low priority`,
      );
      const lyricsSection =
        /<section\b[^>]*aria-labelledby="lyrics-[^"]+"[^>]*>([\s\S]*?)<\/section>/.exec(panel);
      if (lyricsSection) {
        assert(
          !lyricsSection[1].includes('Writer(s):'),
          `${file}: writer credits belong beside the description, outside the lyrics`,
        );
        const href = /<a\b[^>]*href="([^"]+)"/.exec(lyricsSection[1])?.[1];
        assert(href && URL.canParse(decode(href)), `${file}: missing lyrics destination`);
        const url = new URL(decode(href));
        assert(
          url.protocol === 'https:' &&
            ['musixmatch.com', 'www.musixmatch.com'].includes(url.hostname),
          `${file}: lyrics must link to Musixmatch`,
        );
        assert(
          panel.includes('class="music-detail__description"'),
          `${file}: song needs a description`,
        );
      }
    }
    const platformLists = [...html.matchAll(/<ul class="platforms"[^>]*>([\s\S]*?)<\/ul>/g)];
    assert(panels.size === 0 || platformLists.length, `${file}: missing Listen platforms`);
    for (const [, platforms] of platformLists)
      assert(
        platforms.includes('href="https://www.musixmatch.com/artist/WETHEGODS"'),
        `${file}: Musixmatch must be listed beside streaming platforms`,
      );
  }
  const links = [...html.matchAll(/<link\b(?:[^"'<>]|"[^"]*"|'[^']*')*>/g)].map((m) =>
    attributes(m[0]),
  );
  const meta = [...html.matchAll(/<meta\b(?:[^"'<>]|"[^"]*"|'[^']*')*>/g)].map((m) =>
    attributes(m[0]),
  );
  const title = /<title>([^<]+)<\/title>/.exec(html)?.[1];
  const description = meta.find((m) => m.name === 'description')?.content;
  assert(title && description, `${file}: missing title or description`);
  assert(
    title.includes(' | ') && !/\s[—–-]\s/.test(title),
    `${file}: page titles must use a pipe separator`,
  );
  assert(!titles.has(title), `${file}: duplicate title`);
  assert(!descriptions.has(description), `${file}: duplicate description`);
  titles.add(title);
  descriptions.add(description);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${file}: expected one H1`);
  assert.equal(
    /<div\b[^>]*class="intro"/.test(html),
    file === 'index.html' || file === 'cs/index.html',
    `${file}: entry overlay belongs only on homepages`,
  );
  let level = 0;
  for (const [, heading] of html.matchAll(/<h([1-6])\b/g)) {
    assert(Number(heading) <= level + 1, `${file}: skipped heading level before H${heading}`);
    level = Number(heading);
  }
  for (const [img] of html.matchAll(/<img\b(?:[^"'<>]|"[^"]*"|'[^']*')*>/g))
    assert(Object.hasOwn(attributes(img), 'alt'), `${file}: missing image alt attribute: ${img}`);
  const canonical = links.filter((l) => l.rel === 'canonical');
  const robots = meta.find((m) => m.name === 'robots')?.content;
  if (file === '404.html') {
    assert(
      robots?.includes('noindex') && canonical.length === 0,
      '404 must be noindex without a canonical',
    );
    continue;
  }
  const path = file.replace(/index\.html$/, '');
  const url = new URL(`${base}${path}`, site).href;
  assert.deepEqual(
    canonical.map((l) => l.href),
    [url],
    `${file}: incorrect canonical`,
  );
  assert.equal(
    meta.find((m) => m.property === 'og:url')?.content,
    url,
    `${file}: incorrect OG URL`,
  );
  assert.equal(
    meta.find((m) => m.name === 'twitter:image')?.content,
    new URL(`${base}og.jpg`, site).href,
    `${file}: missing social image`,
  );
  assert.equal(
    robots,
    'index, follow, max-image-preview:large',
    `${file}: incorrect indexing policy`,
  );
  const lang = path.startsWith('cs/') ? 'cs' : 'en';
  assert.equal(/<html\b[^>]*\blang="([^"]+)"/.exec(html)?.[1], lang, `${file}: incorrect language`);
  const en = path.replace(/^cs\//, '');
  for (const [l, p] of [
    ['en', en],
    ['cs', `cs/${en}`],
    ['x-default', en],
  ]) {
    assert.equal(
      links.find((link) => link.hreflang === l)?.href,
      new URL(`${base}${p}`, site).href,
      `${file}: incorrect ${l} alternate`,
    );
  }
  for (const [, json] of html.matchAll(
    /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  )) {
    for (const ld of [JSON.parse(json)].flat()) {
      if (ld['@type'] === 'MusicGroup') {
        assert.equal(
          ld['@id'],
          new URL(`${base}#band`, site).href,
          `${file}: inconsistent band identity`,
        );
        assert(
          ld.sameAs?.length && ld.description && ld.foundingDate,
          `${file}: missing band facts`,
        );
        assert(
          (ld.album ?? []).slice(1).every((album) => !album.track && !album.numTracks),
          `${file}: only the featured release has a visible tracklist`,
        );
      }
      if (ld['@type'] === 'MusicEvent' || ld['@type'] === 'Event') {
        events++;
        assert(
          ld.location?.['@type'] === 'Place' &&
            ld.location.address.addressLocality &&
            ld.description,
          `${file}: event needs real location and description`,
        );
        assert(
          ld.performer?.['@id'] === new URL(`${base}#band`, site).href,
          `${file}: incorrect performer identity`,
        );
      }
    }
  }
}
for (const entry of entries) {
  const alternates = [...entry.matchAll(/<xhtml:link\b[^>]*>/g)].map((m) => attributes(m[0]));
  assert.deepEqual(
    alternates.map((a) => a.hreflang).sort(),
    ['cs', 'en', 'x-default'],
    'Missing sitemap alternates',
  );
  assert(
    alternates.every((a) => listed.includes(a.href)),
    'Sitemap alternate is not canonical',
  );
  for (const [, image] of entry.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)) {
    const url = new URL(decode(image));
    assert.equal(url.origin, site.origin, 'Sitemap image must be local');
    assert(url.pathname.startsWith(base), 'Sitemap image escaped the base path');
    assert(
      files.includes(decodeURIComponent(url.pathname.slice(base.length))),
      `Missing sitemap image: ${image}`,
    );
  }
}
const robots = await readFile(new URL('robots.txt', dist), 'utf8');
assert(
  robots.includes(`Sitemap: ${new URL(`${base}sitemap.xml`, site).href}`),
  'robots.txt sitemap target differs from the build',
);
console.log(
  `Validated ${htmlFiles.length} HTML files, ${listed.length} sitemap URLs and ${events} physical event entries at ${new URL(base, site).href}`,
);
