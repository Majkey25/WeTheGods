# Search visibility and performance

The English site lives at the configured base URL; Czech lives under `cs/`. Titles, descriptions, canonical URLs, language alternates and social metadata are rendered into static HTML. Concert titles include the city and date so separate stops on the same tour remain distinguishable. The 404 page is `noindex` and has no canonical URL.

## Content and structured data

`src/data/` is the source for band facts, music, concerts, photography and official profile links. Keep those facts current through Pages CMS. Use the real venue, date, line-up and event description; leave unknown facts blank. A missing start time remains a date, not an invented midnight start. Do not fabricate ticket prices, ratings, reviews, future shows or achievements.

The home, about and music pages share one `MusicGroup` identity. Albums and tracks describe the releases visible on that page, with cover images and official listening links. Physical concert pages use localized `MusicEvent` data linked to the same band. An album becoming available online is not marked as a virtual concert. Structured data describes the content; it does not guarantee a special search result.

Gallery photos have bilingual descriptions. The about-page photograph reuses its description from the gallery when the same image is selected. Background images and thumbnails whose link already names the video or release intentionally have empty alternative text. Avoid repeating captions or adding keywords to decorative images.

## Discovery

`sitemap.xml` is generated from the same page and CMS event lists as the site. It includes both languages, reciprocal language alternates and optimized images on the gallery and home pages. It excludes 404, calendar downloads and asset URLs as page entries. No fabricated modification dates are emitted.

`robots.txt` and the sitemap follow the configured origin and base path. **On a GitHub Pages project URL, only the host-root `/robots.txt` is authoritative.** `/WeTheGods/robots.txt` cannot control crawling of `majkey25.github.io`. A missing host-root robots file does not block crawling. The project sitemap remains available at `/WeTheGods/sitemap.xml`; an owner with Search Console or Bing Webmaster Tools access can submit that exact URL. No account submission is performed by the website.

If a custom domain is configured later, rebuild with its real Pages origin and base. Never point canonical links at a domain that has not been connected. Run the artifact checks against the intended origin and base before publication.

## AI search

Google's AI search uses normal indexing and snippet eligibility. It does not require `llms.txt`, a special AI schema, hidden instructions or duplicated Markdown pages. The site therefore publishes useful band information, a visible discography and concert archive, ordinary links, meaningful images and consistent identity data. Crawlers can read this content without JavaScript.

The permissive crawling policy does not block Googlebot, Bingbot, SeznamBot or OpenAI's search crawler. OpenAI distinguishes `OAI-SearchBot` for search from `GPTBot` for training; allowing a crawler is not proof of indexing or citation.

Assess visibility with real questions, for example the band's origin, members, debut EP, tracklist, producer, upcoming shows, booking and official profiles. Record the exact question, engine, date, cited URL and any factual error. Repeat the same questions after recrawling. Do not turn an audit grade into a ranking or traffic claim.

## Validation and performance

Run `npm run format:check`, `npm run check`, `npm run build` and `npm test`. For a Pages-path build, use `npm run build -- --base /WeTheGods/` followed by `npm test -- https://majkey25.github.io /WeTheGods/`. CI checks metadata, indexing, schema and the sitemap against the actual generated HTML; deployment runs its own format, type and artifact checks before uploading.

Lighthouse runs three mobile audits per configured URL. Scores are lab observations, not field Core Web Vitals or a ranking guarantee. Compare the same build target, Chrome/Lighthouse version and throttling. Inspect actual LCP, layout shift, blocking time and downloaded bytes before changing code.

Gallery thumbnails use candidates suitable for small screens and `sizes` matching the grid's gutters and maximum width. Full-size viewer images load on demand. The first gallery and music content is visible without waiting for a scroll reveal. The entry animation remains on the homepages; direct links to other pages open without the overlay. Below-the-fold effects remain. Keep reduced-motion handling, keyboard controls, no-JavaScript links and the video's data-saving rules.

GitHub Pages controls HTTP caching headers. This static app cannot configure arbitrary response headers through an unused `_headers` file. Do not add a service worker, tracker or third-party script solely to improve an audit grade.

## Primary references

- [Google SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google generative AI search guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google robots.txt scope](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt)
- [Google descriptions](https://developers.google.com/search/docs/appearance/snippet)
- [Google image guidance](https://developers.google.com/search/docs/appearance/google-images)
- [Google event structured data](https://developers.google.com/search/docs/appearance/structured-data/event)
- [Seznam optimization guidance](https://o-seznam.cz/napoveda/vyhledavani/optimalizace/)
- [OpenAI crawlers](https://developers.openai.com/api/docs/bots)
