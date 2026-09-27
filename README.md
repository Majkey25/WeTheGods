<div align="center">

<img src="src/assets/monogram.svg" width="72" alt="WeTheGods monogram" />

# WeTheGods

Official website of **WeTheGods**, an alternative metalcore band from Uherské Hradiště, Czech Republic.

[![CI](https://github.com/Majkey25/WeTheGods/actions/workflows/ci.yml/badge.svg)](https://github.com/Majkey25/WeTheGods/actions/workflows/ci.yml)
[![Deploy](https://github.com/Majkey25/WeTheGods/actions/workflows/deploy.yml/badge.svg)](https://github.com/Majkey25/WeTheGods/actions/workflows/deploy.yml)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fmajkey25.github.io%2FWeTheGods%2F&label=site)](https://majkey25.github.io/WeTheGods/)
[![Astro](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Node](https://img.shields.io/badge/node-%E2%89%A522.12-339933?logo=nodedotjs&logoColor=white)](.nvmrc)
[![Dependabot](https://img.shields.io/badge/dependabot-enabled-025E8C?logo=dependabot&logoColor=white)](.github/dependabot.yml)
[![Last commit](https://img.shields.io/github/last-commit/Majkey25/WeTheGods)](https://github.com/Majkey25/WeTheGods/commits/main)

**[majkey25.github.io/WeTheGods](https://majkey25.github.io/WeTheGods/)** · soon at **wethegods.cz**

</div>

## Features

- **Signal-interference look**: a 2-second glitch intro on the WTG emblem, RGB-split distortion on hover for text and photos, a looping glitch on the footer logo, film grain and scanlines. All CSS, stepped animations, off under `prefers-reduced-motion`.
- **Dark and light themes**: the light theme inverts the palette and turns the hero footage into a negative. The new theme surges out of the moon/sun switch with a view transition.
- **Seven pages, two languages**: Home, Shows, Music, Videos, About, Gallery and Contact in English (`/`) and Czech (`/cs/`), with `hreflang` alternates. Links prerender on hover and pages change with a native cross-document view transition.
- **Shows from one file**: [`src/data/shows.yaml`](src/data/shows.yaml). Every field is validated at build time, so a broken entry can never reach the live site. Finished shows move to the archive during the nightly rebuild.
- **Fast by default**: static HTML with no client framework, responsive AVIF/WebP images, a deferred 0.5 MB AV1 hero loop (skipped on slow connections), self-hosted fonts with metric-matched fallbacks, SVG icons instead of font glyphs, and YouTube players that load only on click.
- **Search-ready**: `MusicGroup` and `MusicEvent` structured data, Open Graph image, canonical URLs.

## Stack

| Layer     | Choice                                                            |
| --------- | ----------------------------------------------------------------- |
| Framework | [Astro 7](https://astro.build), static output                     |
| Styling   | Plain CSS with custom properties                                  |
| Images    | `astro:assets` + `sharp` (AVIF with WebP fallback)                |
| Fonts     | Astro Fonts API: Instrument Serif, JetBrains Mono                 |
| Hosting   | GitHub Pages, deployed by GitHub Actions                          |
| Quality   | Prettier, `astro check` (TypeScript strict), content schema (Zod) |

## CI/CD

| Workflow                                     | Trigger                                    | Job                                               |
| -------------------------------------------- | ------------------------------------------ | ------------------------------------------------- |
| [`ci.yml`](.github/workflows/ci.yml)         | every pull request and push to `main`      | Prettier check → `astro check` → production build |
| [`deploy.yml`](.github/workflows/deploy.yml) | push to `main`, daily at 03:17 UTC, manual | Build with the Pages URL → deploy to GitHub Pages |

Actions are pinned to commit SHAs and kept current by Dependabot. Workflows run with read-only
tokens; only the deploy job gets `pages: write`. The site URL and base path come from the Pages
settings, so the move to wethegods.cz needs no code change.

## Content and media

Live photos by Petr Ovsík / Petrov Visuals. Music videos, artwork, logos and photos are © WeTheGods and
are not covered by any open-source licence.
