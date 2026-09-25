<div align="center">

<img src="public/favicon.svg" width="96" alt="WeTheGods monogram" />

# WeTheGods

Official website of **WeTheGods**, a metalcore band from the Czech Republic.

[![CI](https://github.com/Majkey25/WeTheGods/actions/workflows/ci.yml/badge.svg)](https://github.com/Majkey25/WeTheGods/actions/workflows/ci.yml)
[![Deploy](https://github.com/Majkey25/WeTheGods/actions/workflows/deploy.yml/badge.svg)](https://github.com/Majkey25/WeTheGods/actions/workflows/deploy.yml)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fmajkey25.github.io%2FWeTheGods%2F&label=site)](https://majkey25.github.io/WeTheGods/)
[![Astro](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Node](https://img.shields.io/badge/node-%E2%89%A522.12-339933?logo=nodedotjs&logoColor=white)](.nvmrc)
[![Dependabot](https://img.shields.io/badge/dependabot-enabled-025E8C?logo=dependabot&logoColor=white)](.github/dependabot.yml)
[![Last commit](https://img.shields.io/github/last-commit/Majkey25/WeTheGods)](https://github.com/Majkey25/WeTheGods/commits/main)

**[majkey25.github.io/WeTheGods](https://majkey25.github.io/WeTheGods/)** · soon at **wethegods.cz**

</div>

## Stack

- [Astro 7](https://astro.build) static output, no server. Hosted on GitHub Pages.
- Zero client-side framework. Plain CSS and a few lines of vanilla JS.
- Build-time image optimisation (AVIF/WebP, responsive sizes) via `astro:assets` + `sharp`.

## Local development

Requires Node.js 22.12+ (see [`.nvmrc`](.nvmrc)).

```sh
npm ci
npm run dev          # http://localhost:4321
```

| Command                | What it does                                  |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Dev server with hot reload                    |
| `npm run build`        | Production build to `dist/`                   |
| `npm run preview`      | Serve the production build locally            |
| `npm run check`        | Type-check `.astro` / `.ts` files and content |
| `npm run format`       | Format everything with Prettier               |
| `npm run format:check` | Verify formatting (runs in CI)                |

## CI/CD

| Workflow                                     | Trigger                                    | Job                                               |
| -------------------------------------------- | ------------------------------------------ | ------------------------------------------------- |
| [`ci.yml`](.github/workflows/ci.yml)         | every pull request and push to `main`      | Prettier check → `astro check` → production build |
| [`deploy.yml`](.github/workflows/deploy.yml) | push to `main`, daily at 03:17 UTC, manual | Build with the Pages URL → deploy to GitHub Pages |

All actions are pinned to commit SHAs and kept current by Dependabot. Workflows run with read-only
tokens; only the deploy job gets `pages: write`.

## Custom domain (wethegods.cz)

The deploy workflow reads the site URL and base path from the GitHub Pages settings, so switching
domains needs **no code change**:

1. At the DNS provider for `wethegods.cz`, add `A` records for the apex pointing to GitHub Pages
   (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) and a `CNAME` for
   `www` pointing to `majkey25.github.io`.
2. In **Settings → Pages → Custom domain**, enter `wethegods.cz`, save, then tick **Enforce HTTPS**
   once the certificate is issued.
3. Re-run the **Deploy** workflow (or push any commit).

## Content & media

All photos, videos, logos and music are © WeTheGods. They are not covered by any open-source
licence and may not be reused without permission.
